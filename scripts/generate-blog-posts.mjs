#!/usr/bin/env node

// scripts/generate-blog-posts.mjs
// Run: node scripts/generate-blog-posts.mjs
// 
// Generates blog post content for all episodes using YouTube transcripts.
// Results are cached in .blog-cache/ and picked up by lib/blog.js at build time.
//
// Prerequisites:
//   npm install youtube-transcript
//   
// Environment variables (in .env.local):
//   SPOTIFY_RSS_URL=https://anchor.fm/s/105f3a394/podcast/rss
//   YOUTUBE_API_KEY=AIzaSyAiyzQqVwsz5tNMW3UDlOgNBTl6ExRFdqk
//   YOUTUBE_CHANNEL_HANDLE=TryingVeryHardPod
//   ANTHROPIC_API_KEY=your_key_here

import 'dotenv/config';
import { generateAllBlogPosts } from '../lib/blog-generator.js';

async function main() {
  console.log('🎙  Trying Very Hard — Blog Post Generator');
  console.log('─'.repeat(50));
  console.log('');

  const results = await generateAllBlogPosts();

  let generated = 0;
  let cached = 0;
  let skipped = 0;

  for (const r of results) {
    if (r.body && r.fromCache) {
      cached++;
      console.log(`  ✓ ${r.slug} (cached)`);
    } else if (r.body) {
      generated++;
      console.log(`  ✨ ${r.slug} (generated)`);
    } else {
      skipped++;
      console.log(`  ⏭  ${r.slug} (skipped — no transcript)`);
    }
  }

  console.log('');
  console.log('─'.repeat(50));
  console.log(`  Generated: ${generated} | Cached: ${cached} | Skipped: ${skipped}`);
  console.log('');
  console.log('Blog posts cached in .blog-cache/');
  console.log('Run `npm run build` to deploy with generated content.');
}

main().catch(console.error);
