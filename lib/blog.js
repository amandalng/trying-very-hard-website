// lib/blog.js
// Blog post data management
// Generates metadata from episodes, pulls body content from cache or generator

import fs from 'fs';
import path from 'path';

const CACHE_DIR = path.join(process.cwd(), '.blog-cache');

function generateExcerpt(episode) {
  const desc = episode.description || '';
  if (desc.length > 200) return desc.substring(0, 197) + '...';
  return desc;
}

function detectCategory(episode) {
  const combined = ((episode.title || '') + ' ' + (episode.description || '')).toLowerCase();
  if (combined.includes('therapy') || combined.includes('mental health') || combined.includes('stigma')) return 'Mental Health';
  if (combined.includes('friendship') || combined.includes('relationship')) return 'Relationships';
  if (combined.includes('ambition') || combined.includes('success') || combined.includes('career') || combined.includes('quarter-life')) return 'Identity';
  if (combined.includes('book') || combined.includes('reading') || combined.includes('hobby') || combined.includes('productivity culture')) return 'Culture';
  if (combined.includes('music') || combined.includes('creative') || combined.includes('passion')) return 'Creativity';
  if (combined.includes('introducing') || combined.includes('started') || combined.includes('welcome')) return 'Behind the Scenes';
  return 'Reflections';
}

function estimateReadTime(body) {
  if (!body) return '5 min read';
  const words = body.split(/\s+/).length;
  return `${Math.max(3, Math.ceil(words / 250))} min read`;
}

function getCachedBody(slug) {
  try {
    const cachePath = path.join(CACHE_DIR, `${slug}.json`);
    if (fs.existsSync(cachePath)) {
      const cached = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
      return cached.body;
    }
  } catch { }
  return null;
}

function generatePlaceholderBody(episode) {
  const isGuest = episode.type === 'guest';
  const guestLine = isGuest && episode.guest
    ? `\n\nWe sat down with ${episode.guest} for this one, and the conversation went places we didn't expect.`
    : '';

  return `${episode.description}${guestLine}\n\nThis is one of those episodes where we walked away still thinking about it hours later. There's more we want to say — and we will, once we've had time to sit with it properly.\n\nFor now, press play. We think you'll feel something.\n\n**This companion post is coming soon.** We're writing a proper reflection grounded in what we actually said on the episode — not a recap, but an extension. The conversation kept going after we turned the mics off. Check back soon.`;
}

/**
 * Get all blog posts derived from episodes.
 * Checks cache for generated content, falls back to placeholder.
 */
export function getBlogPosts(episodes) {
  return episodes.map(episode => {
    const cachedBody = getCachedBody(episode.slug);
    const body = cachedBody || generatePlaceholderBody(episode);

    return {
      slug: episode.slug,
      title: episode.blogTitle || episode.title,
      excerpt: generateExcerpt(episode),
      date: episode.date,
      category: detectCategory(episode),
      readTime: estimateReadTime(body),
      episodeSlug: episode.slug,
      type: episode.type,
      guest: episode.guest,
      body,
      hasGeneratedContent: !!cachedBody,
    };
  });
}

/**
 * Get a single blog post by slug.
 */
export function getBlogPostBySlug(slug, episodes) {
  const posts = getBlogPosts(episodes);
  return posts.find(p => p.slug === slug) || null;
}
