# TVH Website Subpages — Deployment Guide

## What's in this package

### Pages (drop into your existing Next.js project)
- `app/episodes/page.js` — Episodes listing (server component)
- `app/episodes/EpisodesClient.jsx` — Episodes listing UI
- `app/episodes/[slug]/page.js` — Episode detail (dynamic route)
- `app/episodes/[slug]/EpisodeDetailClient.jsx` — Episode detail UI
- `app/blog/page.js` — The TVH Journal listing (server component)
- `app/blog/BlogClient.jsx` — Journal listing UI
- `app/blog/[slug]/page.js` — Blog post detail (dynamic route)
- `app/blog/[slug]/BlogDetailClient.jsx` — Blog post detail UI

### Data layer
- `lib/blog.js` — Generates blog post metadata from episode data
- `lib/blog-generator.js` — Generates blog content from YouTube transcripts via Claude API

### Automation
- `scripts/generate-blog-posts.mjs` — CLI script to generate blog posts
- `.github/workflows/generate-blog-posts.yml` — Tuesday 11pm SGT auto-generation

### Docs
- `docs/TVH-Blog-Writing-Brief.md` — Blog writing guidelines

## Setup (5 minutes)

### 1. Extract files
```bash
tar xzf tvh-final-package.tar.gz -C ~/your-project/
```

### 2. Install dependency
```bash
npm install youtube-transcript
```

### 3. Add GitHub Secrets
Go to your repo → Settings → Secrets and variables → Actions → New repository secret:
- `SPOTIFY_RSS_URL` → `https://anchor.fm/s/105f3a394/podcast/rss`
- `YOUTUBE_API_KEY` → your key
- `ANTHROPIC_API_KEY` → your Anthropic API key

### 4. Add to .env.local (for local development)
```
SPOTIFY_RSS_URL=https://anchor.fm/s/105f3a394/podcast/rss
YOUTUBE_API_KEY=AIzaSyAiyzQqVwsz5tNMW3UDlOgNBTl6ExRFdqk
YOUTUBE_CHANNEL_HANDLE=TryingVeryHardPod
ANTHROPIC_API_KEY=your_key_here
```

### 5. Generate initial blog posts
```bash
node scripts/generate-blog-posts.mjs
```

### 6. Push and deploy
```bash
git add .
git commit -m "Add episodes + blog subpages"
git push
```

## How it works

All pages consume `getEpisodes()` from your existing `lib/episodes.js`. No hardcoded data.

**When you publish a new episode:**
1. Upload to Spotify/YouTube as usual
2. Episode auto-appears on all pages via RSS + YouTube API
3. Tuesday 11pm SGT: GitHub Action generates companion blog post from transcript
4. Push triggers redeploy on Netlify

**Manual blog generation:**
- Run `node scripts/generate-blog-posts.mjs` any time
- Or trigger from GitHub Actions tab → "Generate Blog Posts" → "Run workflow"

## Nav routing
- Subscribe → `/#subscribe` (homepage)
- Episodes → `/episodes`
- Blog → `/blog`
- About → `/#about` (homepage)
- Contact → `/#contact` (homepage)
