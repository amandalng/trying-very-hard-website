// lib/blog-generator.js
// Generates blog post content from YouTube transcripts
// Uses the TVH Blog Writing Brief rules stored in the project

/**
 * BLOG CONTENT GENERATION PIPELINE
 * 
 * This module fetches YouTube transcripts for each episode and generates
 * companion blog posts following the TVH Blog Writing Brief.
 * 
 * Flow:
 * 1. getEpisodes() provides episode metadata (from RSS + YouTube)
 * 2. For each episode, fetch the YouTube transcript
 * 3. Pass transcript + episode metadata to content generator
 * 4. Generate blog body following the 25/75 rule
 * 5. Cache generated content to avoid re-generating on every build
 * 
 * SETUP:
 * - Requires YOUTUBE_API_KEY in .env (you already have this)
 * - Requires ANTHROPIC_API_KEY in .env for content generation
 * - Add to .env.local:
 *     YOUTUBE_API_KEY=AIzaSyAiyzQqVwsz5tNMW3UDlOgNBTl6ExRFdqk
 *     ANTHROPIC_API_KEY=your_anthropic_api_key
 *     SPOTIFY_RSS_URL=https://anchor.fm/s/105f3a394/podcast/rss
 */

import { getEpisodes } from './episodes';
import fs from 'fs';
import path from 'path';

const CACHE_DIR = path.join(process.cwd(), '.blog-cache');
const BLOG_BRIEF = `
You are writing a companion blog post for the podcast "Trying Very Hard" hosted by Amanda and Monica.

VOICE: Written as "we/us" (Amanda & Monica together). Warm, self-aware, occasionally funny, never preachy.

STRUCTURE: ~25% episode context (what sparked the conversation, 1-2 key moments from the transcript), ~75% continued reflection — expand on what was discussed, explore what wasn't fully said, sit with the questions that came up.

ALWAYS DO:
- Ground every claim in the transcript. Only reference what was actually said.
- Include a real quote or paraphrased moment from the transcript that sparked the post.
- Reflect honestly on what was discussed — what surprised us, what stuck, what shifted.
- Ask questions still being sat with. Do NOT wrap up neatly.
- For guest episodes: stick strictly to what the guest said. Never assume or embellish.
- Reference listener DMs or reactions only if genuinely relevant.

NEVER DO:
- Never fabricate personal anecdotes, stories, or details not in the transcript.
- Never invent or assume feelings, reactions, or quotes for Amanda, Monica, or guests.
- Never make up "after recording" moments.
- Never give generic self-help advice.
- Never use listicle structure.
- Never put direct quotes in quotation marks (paraphrase instead, since transcript may not be exact).
- Never invent content. If you can't ground it in the transcript, don't include it.

FORMAT:
- Use **bold text** for section transitions (not numbered headers)
- Paragraphs separated by double newlines
- 800-1200 words
- End with an open question or unresolved thought, not a conclusion
`;

// ─── YOUTUBE TRANSCRIPT FETCH ────────────────────────────

async function fetchYouTubeTranscript(videoId) {
  if (!videoId) return null;
  
  try {
    // Method 1: YouTube Data API captions
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) return null;

    // First, get available caption tracks
    const captionsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${apiKey}`
    );
    const captionsData = await captionsRes.json();
    
    if (captionsData.items && captionsData.items.length > 0) {
      // Find English auto-generated or manual captions
      const track = captionsData.items.find(
        t => t.snippet.language === 'en' || t.snippet.language === 'en-US'
      ) || captionsData.items[0];
      
      if (track) {
        // Note: Downloading captions requires OAuth, not just API key
        // For auto-generated captions, we'll use an alternative approach
        console.log(`Found caption track: ${track.snippet.language} (${track.snippet.trackKind})`);
      }
    }

    // Method 2: Use a transcript service or manually provided transcripts
    // For production, consider:
    // - youtube-transcript npm package (scrapes auto-generated captions)
    // - AssemblyAI / Deepgram for custom transcription
    // - Manually uploaded transcript files

    // Try youtube-transcript package approach
    try {
      const { YoutubeTranscript } = await import('youtube-transcript');
      const transcript = await YoutubeTranscript.fetchTranscript(videoId);
      if (transcript && transcript.length > 0) {
        return transcript.map(t => t.text).join(' ');
      }
    } catch (e) {
      console.log(`youtube-transcript package not available or failed for ${videoId}`);
    }

    return null;
  } catch (err) {
    console.error(`Transcript fetch error for ${videoId}:`, err);
    return null;
  }
}

// ─── CONTENT GENERATION ──────────────────────────────────

async function generateBlogContent(episode, transcript) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.log('No ANTHROPIC_API_KEY — skipping blog generation');
    return null;
  }

  const isGuest = episode.type === 'guest';
  const guestContext = isGuest && episode.guest
    ? `This is a GUEST EPISODE with ${episode.guest}. Be especially careful to only attribute statements and views that are clearly from the transcript. Never assume what the guest thinks or feels.`
    : 'This is a MONANDA episode (just Amanda and Monica).';

  const prompt = `${BLOG_BRIEF}

EPISODE TITLE: ${episode.title}
EPISODE DESCRIPTION: ${episode.description}
TYPE: ${guestContext}
DATE: ${episode.date}

TRANSCRIPT:
${transcript.substring(0, 12000)}

Write the companion blog post now. Remember: only reference what was actually said in the transcript. The post should feel like the conversation kept going after recording — not a summary of what happened during it.`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await res.json();
    if (data.content && data.content[0] && data.content[0].text) {
      return data.content[0].text;
    }
    return null;
  } catch (err) {
    console.error('Blog generation error:', err);
    return null;
  }
}

// ─── CACHING ─────────────────────────────────────────────

function getCachedPost(slug) {
  try {
    const cachePath = path.join(CACHE_DIR, `${slug}.json`);
    if (fs.existsSync(cachePath)) {
      const cached = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
      // Cache for 7 days
      if (Date.now() - cached.generatedAt < 7 * 24 * 60 * 60 * 1000) {
        return cached.body;
      }
    }
  } catch { }
  return null;
}

function cachePost(slug, body) {
  try {
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }
    const cachePath = path.join(CACHE_DIR, `${slug}.json`);
    fs.writeFileSync(cachePath, JSON.stringify({
      slug,
      body,
      generatedAt: Date.now(),
    }));
  } catch (err) {
    console.error('Cache write error:', err);
  }
}

// ─── MAIN EXPORT ─────────────────────────────────────────

/**
 * Generate blog content for all episodes.
 * Called during build or on-demand.
 * 
 * Usage:
 *   import { generateAllBlogPosts } from '../lib/blog-generator';
 *   const posts = await generateAllBlogPosts();
 */
export async function generateAllBlogPosts() {
  const episodes = await getEpisodes();
  const results = [];

  for (const episode of episodes) {
    // Check cache first
    const cached = getCachedPost(episode.slug);
    if (cached) {
      results.push({ slug: episode.slug, body: cached });
      continue;
    }

    // Extract YouTube video ID from URL
    const videoIdMatch = episode.youtube?.match(/[?&]v=([^&]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    if (!videoId) {
      console.log(`No YouTube video ID for "${episode.title}" — skipping`);
      results.push({ slug: episode.slug, body: null });
      continue;
    }

    // Fetch transcript
    const transcript = await fetchYouTubeTranscript(videoId);
    if (!transcript) {
      console.log(`No transcript available for "${episode.title}" — skipping`);
      results.push({ slug: episode.slug, body: null });
      continue;
    }

    // Generate content
    console.log(`Generating blog post for "${episode.title}"...`);
    const body = await generateBlogContent(episode, transcript);
    
    if (body) {
      cachePost(episode.slug, body);
      results.push({ slug: episode.slug, body });
    } else {
      results.push({ slug: episode.slug, body: null });
    }

    // Rate limit — wait 2 seconds between generations
    await new Promise(r => setTimeout(r, 2000));
  }

  return results;
}

/**
 * Generate blog content for a single episode by slug.
 */
export async function generateBlogPost(slug) {
  const episodes = await getEpisodes();
  const episode = episodes.find(e => e.slug === slug);
  if (!episode) return null;

  const cached = getCachedPost(slug);
  if (cached) return cached;

  const videoIdMatch = episode.youtube?.match(/[?&]v=([^&]+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;
  if (!videoId) return null;

  const transcript = await fetchYouTubeTranscript(videoId);
  if (!transcript) return null;

  const body = await generateBlogContent(episode, transcript);
  if (body) cachePost(slug, body);
  return body;
}
