// Blog post data management.
// In production, auto-generated posts are stored as JSON files in /data/blog/
// For now, returns static placeholder data derived from episodes.

import { getEpisodes } from './episodes';

// Static blog post content (placeholder — will be auto-generated in production)
const STATIC_BLOG_CONTENT = {
  6: `We use therapy language all the time now. Triggered. Boundaries. Protecting your peace. But how many of us are actually in therapy, and how many of us are actually doing the work when we get there?

**TLDR:** Therapy is hard even when you know you need it — especially if you grew up in a culture that treats needing help as weakness. We got into the stigma, the self-sabotage, and what it actually takes to show up.

In this episode, we had the honest, slightly uncomfortable, and surprisingly personal conversation about what it means to try very hard in therapy. Amanda is a trauma-informed psychotherapist who still finds it hard to fully show up in her own sessions. Monica has tried everything from talk therapy to hypnotherapy. Together we explored why therapy is inaccessible — not just financially, but emotionally.

## Why Therapy Stigma Is Still So Strong in Asian Families

If you grew up in a Southeast Asian household, chances are the messaging around mental health was somewhere between "just don't think about it" and "other people have it worse." We talked about how that internalized shame doesn't just disappear when you book your first session — it follows you into the room and sometimes keeps you performing wellness instead of actually doing the work.

## Finding the Right Therapist Shouldn't Feel This Hard

One of the biggest barriers isn't stigma — it's the sheer overwhelm of choosing someone. How do you know if they're the right fit? When should you switch? We shared our own experiences of therapist-shopping and why it's okay to treat it like dating: not every first session will be a match, and that's fine.

## Couples Therapy as Prevention, Not a Last Resort

We also got into why couples therapy shouldn't be something you only consider when things are falling apart. Monica made a point that stuck with us: if you'd go to a personal trainer before you're injured, why wouldn't you invest in your relationship before it's in crisis?

## What Stuck With Us

You don't have to be broken to go to therapy. In fact, the people who benefit most are often the ones who think they don't need it yet. Therapy isn't about fixing — it's about understanding. And sometimes the hardest part isn't finding a therapist. It's letting yourself be seen by one.

What's your experience with therapy? Have you taken the leap, or are you still thinking about it? Tell us [@tryingveryhardpod](https://instagram.com/tryingveryhardpod).`,
};

/**
 * Get all blog posts (derived from episodes with blog content).
 */
export async function getBlogPosts() {
  const episodes = await getEpisodes();
  return episodes.map(ep => ({
    ...ep,
    blogSlug: ep.slug,
    blogContent: STATIC_BLOG_CONTENT[ep.id] || null,
    hasBlogPost: !!STATIC_BLOG_CONTENT[ep.id],
  }));
}

/**
 * Get a single blog post by slug.
 */
export async function getBlogPostBySlug(slug) {
  const posts = await getBlogPosts();
  return posts.find(p => p.blogSlug === slug) || null;
}

/**
 * Get paginated blog posts.
 */
export async function getBlogPostsPaginated(page = 1, perPage = 8) {
  const posts = await getBlogPosts();
  const start = (page - 1) * perPage;
  return {
    posts: posts.slice(start, start + perPage),
    total: posts.length,
    totalPages: Math.ceil(posts.length / perPage),
    page,
  };
}
