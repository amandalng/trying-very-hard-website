#!/usr/bin/env node

// scripts/generate-blog-posts.mjs
// Run: node scripts/generate-blog-posts.mjs
//
// Standalone script — fetches RSS + YouTube directly, generates blog posts from transcripts.
// No Next.js dependency.

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = path.join(__dirname, '..', '.blog-cache');

// ─── CONFIG ──────────────────────────────────────────────
const RSS_URL = process.env.SPOTIFY_RSS_URL;
const YT_API_KEY = process.env.YOUTUBE_API_KEY;
const YT_HANDLE = process.env.YOUTUBE_CHANNEL_HANDLE || 'TryingVeryHardPod';
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

if (!RSS_URL) { console.error('Missing SPOTIFY_RSS_URL in .env.local'); process.exit(1); }
if (!ANTHROPIC_KEY) { console.error('Missing ANTHROPIC_API_KEY in .env.local'); process.exit(1); }

// ─── BLOG WRITING BRIEF ─────────────────────────────────
const BLOG_BRIEF = `
You are writing a companion blog post for the podcast "Trying Very Hard" hosted by Amanda and Monica.

VOICE: Written as "we/us" (Amanda & Monica together). Warm, self-aware, occasionally funny, never preachy.

STRUCTURE: ~25% episode context (what sparked the conversation, 1-2 key moments from the transcript), ~75% continued reflection — expand on what was discussed, explore what wasn't fully said, sit with the questions that came up.

ALWAYS DO:
- Ground every claim in the transcript. Only reference what was actually said.
- Include a real paraphrased moment from the transcript that sparked the post.
- Reflect honestly on what was discussed — what surprised us, what stuck, what shifted.
- Ask questions still being sat with. Do NOT wrap up neatly.
- For guest episodes: stick strictly to what the guest said. Never assume or embellish.

NEVER DO:
- Never fabricate personal anecdotes, stories, or details not in the transcript.
- Never invent or assume feelings, reactions, or quotes for Amanda, Monica, or guests.
- Never make up "after recording" moments.
- Never give generic self-help advice.
- Never use listicle structure.
- Never put direct quotes in quotation marks (paraphrase instead).
- Never invent content. If you can't ground it in the transcript, don't include it.

FORMAT:
- Use **bold text** for section transitions (wrapped in double asterisks)
- Paragraphs separated by double newlines
- 800-1200 words
- End with an open question or unresolved thought, not a conclusion
`;

// ─── HELPERS ─────────────────────────────────────────────
function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch { return ''; }
}

function formatDuration(raw) {
  if (!raw) return '';
  const str = raw.trim();
  if (str.includes(':')) {
    const parts = str.split(':').map(Number);
    let totalMin = parts.length === 3 ? parts[0] * 60 + parts[1] : parts[0];
    return `${totalMin} min`;
  }
  const secs = parseInt(str);
  if (isNaN(secs)) return '';
  return `${Math.round(secs / 60)} min`;
}

function detectType(title) {
  if (title.match(/\bwith\b/i) && title.match(/with\s+[A-Z]/)) return 'guest';
  return 'monanda';
}

function detectGuest(title) {
  const m = title.match(/with\s+([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)*)/);
  if (m) return m[1].trim();
  const p = title.match(/\(with\s+(.+?)\)/i);
  if (p) return p[1].trim();
  return null;
}

// ─── FETCH RSS ───────────────────────────────────────────
async function fetchEpisodes() {
  console.log('  Fetching RSS feed...');
  const res = await fetch(RSS_URL);
  const xml = await res.text();
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1];
    const getTag = (tag) => {
      let m = item.match(new RegExp(`<${tag}(?:\\s[^>]*)?>\\s*(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?\\s*</${tag}>`, 'i'));
      return m ? m[1].trim() : '';
    };

    const title = getTag('title');
    let description = getTag('itunes:summary') || getTag('description');
    description = description
      .replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '')
      .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
      .replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    
    const cutoff = description.indexOf('In this episode of');
    if (cutoff > 50) description = description.substring(0, cutoff).trim();
    description = description.substring(0, 350);

    const type = detectType(title);

    if (title) {
      items.push({
        slug: slugify(title),
        title,
        description,
        date: formatDate(getTag('pubDate')),
        duration: formatDuration(getTag('itunes:duration')),
        type,
        guest: type === 'guest' ? detectGuest(title) : null,
      });
    }
  }

  console.log(`  Found ${items.length} episodes`);
  return items;
}

// ─── FETCH YOUTUBE VIDEOS ────────────────────────────────
async function fetchYouTubeVideos() {
  if (!YT_API_KEY) return [];
  console.log('  Fetching YouTube videos...');
  try {
    const chRes = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${YT_HANDLE}&key=${YT_API_KEY}`);
    const chData = await chRes.json();
    if (!chData.items?.length) return [];

    const playlistId = chData.items[0].contentDetails.relatedPlaylists.uploads;
    const vidRes = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${YT_API_KEY}`);
    const vidData = await vidRes.json();
    if (!vidData.items) return [];

    return vidData.items.map(item => ({
      title: item.snippet.title,
      videoId: item.snippet.resourceId.videoId,
    }));
  } catch (err) {
    console.error('  YouTube fetch error:', err.message);
    return [];
  }
}

// ─── MATCH EPISODE TO YOUTUBE VIDEO ──────────────────────
function matchVideo(episodeTitle, videos) {
  if (!videos.length) return null;
  const normalize = s => s.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
  const epNorm = normalize(episodeTitle);
  let best = null, bestScore = 0;

  for (const v of videos) {
    const vidNorm = normalize(v.title);
    const epWords = new Set(epNorm.split(/\s+/).filter(w => w.length > 2));
    const vidWords = new Set(vidNorm.split(/\s+/).filter(w => w.length > 2));
    let overlap = 0;
    for (const w of epWords) { if (vidWords.has(w)) overlap++; }
    const score = overlap / Math.max(epWords.size, vidWords.size);
    if (score > bestScore && score > 0.25) { bestScore = score; best = v; }
  }
  return best;
}

// ─── FETCH YOUTUBE TRANSCRIPT ────────────────────────────
async function fetchTranscript(videoId) {
  try {
    const pageRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' }
    });
    const html = await pageRes.text();
    
    // Find captionTracks in the page data
    const idx = html.indexOf('"captionTracks":');
    if (idx === -1) { console.log('    No captions found in page'); return null; }
    
    // Extract the JSON array after "captionTracks":
    let bracketStart = html.indexOf('[', idx);
    let bracketEnd = html.indexOf(']', bracketStart);
    if (bracketStart === -1 || bracketEnd === -1) { console.log('    Could not parse captions'); return null; }
    
    const tracksJson = html.substring(bracketStart, bracketEnd + 1);
    let tracks;
    try { tracks = JSON.parse(tracksJson); } catch { 
      console.log('    JSON parse failed for caption tracks');
      return null; 
    }
    
    // Find English track
    const track = tracks.find(t => t.languageCode === 'en') 
      || tracks.find(t => (t.languageCode || '').startsWith('en')) 
      || tracks[0];
    
    if (!track || !track.baseUrl) { console.log('    No usable caption track'); return null; }
    
    // Unescape the URL (YouTube escapes \u0026 as &)
    const captionUrl = track.baseUrl.replace(/\\u0026/g, '&');
    
    const capRes = await fetch(captionUrl);
    const capXml = await capRes.text();
    
    // Extract text from XML caption format
    const parts = [];
    let textMatch;
    const textRe = new RegExp('<text[^>]*>([^<]*)</text>', 'g');
    while ((textMatch = textRe.exec(capXml)) !== null) {
      let t = textMatch[1]
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();
      if (t) parts.push(t);
    }
    
    if (parts.length === 0) { console.log('    No text found in captions'); return null; }
    console.log(`    Found ${parts.length} caption segments`);
    return parts.join(' ');
  } catch (err) {
    console.log(`    Transcript fetch failed: ${err.message}`);
  }
  return null;
}

// ─── GENERATE BLOG CONTENT ──────────────────────────────
async function generateBlogContent(episode, transcript) {
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

Write the companion blog post now. Remember: only reference what was actually said in the transcript.`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const data = await res.json();
  if (data.content?.[0]?.text) return data.content[0].text;
  if (data.error) console.error(`    API error: ${data.error.message}`);
  return null;
}

// ─── CACHE ───────────────────────────────────────────────
function getCached(slug) {
  try {
    const p = path.join(CACHE_DIR, `${slug}.json`);
    if (fs.existsSync(p)) {
      const c = JSON.parse(fs.readFileSync(p, 'utf-8'));
      if (Date.now() - c.generatedAt < 7 * 24 * 60 * 60 * 1000) return c.body;
    }
  } catch {}
  return null;
}

function setCache(slug, body) {
  if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(path.join(CACHE_DIR, `${slug}.json`), JSON.stringify({ slug, body, generatedAt: Date.now() }));
}

// ─── MAIN ────────────────────────────────────────────────
async function main() {
  console.log('');
  console.log('🎙  Trying Very Hard — Blog Post Generator');
  console.log('─'.repeat(50));

  const [episodes, videos] = await Promise.all([fetchEpisodes(), fetchYouTubeVideos()]);

  let generated = 0, cached = 0, skipped = 0;

  for (const ep of episodes) {
    const label = ep.title.substring(0, 60) + (ep.title.length > 60 ? '...' : '');

    // Check cache
    const cachedBody = getCached(ep.slug);
    if (cachedBody) {
      cached++;
      console.log(`  ✓ ${label} (cached)`);
      continue;
    }

    // Match to YouTube video
    const video = matchVideo(ep.title, videos);
    if (!video) {
      skipped++;
      console.log(`  ⏭  ${label} (no YouTube match)`);
      continue;
    }

    // Fetch transcript
    console.log(`  📝 ${label}`);
    console.log(`     → YouTube: ${video.videoId}`);
    const transcript = await fetchTranscript(video.videoId);
    if (!transcript) {
      skipped++;
      console.log(`     ⏭  No transcript available`);
      continue;
    }
    console.log(`     → Transcript: ${transcript.length} chars`);

    // Generate blog post
    console.log(`     → Generating blog post...`);
    const body = await generateBlogContent(ep, transcript);
    if (body) {
      setCache(ep.slug, body);
      generated++;
      console.log(`     ✨ Done (${body.split(/\s+/).length} words)`);
    } else {
      skipped++;
      console.log(`     ❌ Generation failed`);
    }

    // Rate limit
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log('');
  console.log('─'.repeat(50));
  console.log(`  ✨ Generated: ${generated} | ✓ Cached: ${cached} | ⏭  Skipped: ${skipped}`);
  console.log('');
  if (generated > 0) {
    console.log(`  Blog posts cached in .blog-cache/`);
    console.log(`  Push to deploy: git add . && git commit -m "Generate blog posts" && git push`);
  }
  console.log('');
}

main().catch(err => { console.error('Fatal error:', err); process.exit(1); });
