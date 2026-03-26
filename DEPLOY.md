# Trying Very Hard — Deployment Guide

## What's In This Package

```
tvh-website/
├── app/                    # Next.js app router pages
│   ├── globals.css         # Global styles with Coco Gothic fonts
│   ├── layout.js           # Root layout with SEO metadata
│   └── page.js             # Landing page (to be created from artifact)
├── lib/                    # Shared logic
│   ├── constants.js        # Brand data, host bios, links, blog spec
│   ├── episodes.js         # Episode data (static + RSS-ready)
│   └── blog.js             # Blog data (static + auto-gen-ready)
├── public/
│   ├── fonts/              # Coco Gothic font files (.ttf)
│   └── images/             # Logos, hero banner
├── package.json            # Dependencies
├── next.config.js          # Next.js configuration
└── DEPLOY.md               # This file
```

## Phase 1: Deploy the Static Site

### Prerequisites
- A GitHub account (free)
- A Vercel account (free — sign up at vercel.com with your GitHub)

### Step-by-step:

1. **Create a GitHub repository**
   - Go to github.com → New Repository
   - Name it `trying-very-hard-website`
   - Keep it private
   - Don't add README (we'll push our own)

2. **Upload this project to GitHub**
   - Unzip this package to a folder on your computer
   - Open Terminal (Mac) or Command Prompt (Windows)
   - Navigate to the folder: `cd path/to/tvh-website`
   - Run these commands:
     ```
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/YOUR-USERNAME/trying-very-hard-website.git
     git push -u origin main
     ```

3. **Deploy to Vercel**
   - Go to vercel.com → "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it as a Next.js project
   - Click "Deploy"
   - Your site will be live at `trying-very-hard-xxxx.vercel.app` in ~2 minutes

4. **Connect your custom domain** (optional)
   - In Vercel dashboard → your project → Settings → Domains
   - Add your domain (e.g., tryingveryhardpod.com)
   - Update your domain's DNS records as instructed by Vercel

## Phase 2: Auto-Update Episodes from RSS Feed

### What you need:
- Your Spotify RSS feed URL (find it at podcasters.spotify.com → Settings → Distribution)

### Setup:
1. In Vercel dashboard → your project → Settings → Environment Variables
2. Add: `SPOTIFY_RSS_URL` = your RSS feed URL
3. In `lib/episodes.js`, uncomment the RSS fetch code
4. Push the change to GitHub — Vercel will auto-redeploy

### How it works:
- The site rebuilds on every push to GitHub
- To auto-rebuild on new episodes, set up a Vercel Cron Job (or use a free service like cron-job.org to hit a rebuild webhook)

## Phase 3: Auto-Generate Blog Posts

### What you need:
- An Anthropic API key (sign up at console.anthropic.com)
  - Cost: ~$0.03 per blog post generated

### Setup:
1. In Vercel → Environment Variables, add: `ANTHROPIC_API_KEY` = your key
2. Create an API route at `app/api/generate-blog/route.js` that:
   - Receives a new episode's data
   - Sends it to Claude with the blog generation spec (stored in `lib/constants.js`)
   - Saves the generated blog post as a JSON file
   - Triggers a site rebuild

### Blog Generation Prompt (stored in constants.js):
The prompt instructs Claude to:
- Write in "we" perspective, slightly polished newsletter tone
- Generate an SEO question/insight title
- Include: TLDR, intro, body with keyword-rich H2s, personal reflections, closing question
- Link to 2-3 related episodes
- 600-900 words
- Never sound like a transcript, use listicle energy, or say "in this episode we discuss"

## Phase 4: Things to Replace Before Going Live

### Must-do:
- [ ] Replace placeholder YouTube/Spotify episode links (`#`) with real URLs
- [ ] Add your headshot photos (replace AMANDA_HEADSHOT and MONICA_HEADSHOT)
- [ ] Test the contact form (connect to Formspree or similar)
- [ ] Add your Spotify RSS feed URL to environment variables

### Nice-to-do:
- [ ] Add real episode thumbnail images (replace colored placeholders)
- [ ] Set up Google Analytics or Plausible Analytics
- [ ] Create a sitemap.xml for better SEO crawling
- [ ] Add Open Graph images for social sharing
- [ ] Set up email capture (Mailchimp, ConvertKit, etc.)

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Hosting**: Vercel (free tier)
- **Fonts**: Coco Gothic (self-hosted)
- **Auto-episodes**: RSS feed parsing via rss-parser
- **Auto-blog**: Anthropic Claude API
- **Contact form**: Formspree (free tier, 50 submissions/month)

## Need Help?
Come back to this Claude conversation anytime — all the context is saved. Just say "I need help with the website deployment" and we'll pick up where we left off.
