// This module handles episode data.
// In production, it fetches from your RSS feed and caches the results.
// During development or if the RSS feed is unavailable, it falls back to static data.

const STATIC_EPISODES = [
  { id: 6, slug: 'you-dont-have-to-be-broken-to-go-to-therapy', title: "You Don't Have to Be Broken to Go to Therapy: On Mental Health, Stigma, and What We've Learned", blogTitle: 'Why Going to Therapy Still Feels So Hard (Even When You Know You Need It)', date: 'Mar 24, 2026', duration: '40 min', type: 'monanda', guest: null, description: "Why is it so hard to fully show up in therapy, even when you know you need it? We get into mental health stigma, Asian family dynamics, finding the right therapist, and the quiet self-sabotage of performing wellness.", youtube: '#', spotify: '#', apple: 'https://podcasts.apple.com/sg/podcast/you-dont-have-to-be-broken-to-go-to-therapy-on-mental/id1878052269?i=1000756871967', spotifyEmbed: null },
  { id: 5, slug: 'if-you-care-for-me-one-bankers-journey', title: "If You Care for Me: One Banker's Journey from Shower Singer to Releasing Original Music", blogTitle: 'What Happens When You Finally Take Your Creative Side Seriously', date: 'Mar 16, 2026', duration: '46 min', type: 'guest', guest: 'Kelvin Kuan', description: "What happens when you've spent your whole life being 'the practical one,' and then music starts demanding more of you? Asian family expectations, the fear of self-promotion, and taking creative passion seriously later in life.", youtube: '#', spotify: '#', apple: 'https://podcasts.apple.com/sg/podcast/if-you-care-for-me-one-bankers-journey-from-shower/id1878052269?i=1000755662503', spotifyEmbed: null },
  { id: 4, slug: 'friendship-after-30', title: "Friendship After 30: Why It's Harder, Why It's Better, and How to Actually Keep It", blogTitle: 'Why Your Friendships Change in Your 30s (and What to Do About It)', date: 'Mar 9, 2026', duration: '47 min', type: 'monanda', guest: null, description: 'Friendships in your 30s require actual, deliberate effort. The shift from convenient to intentional friendships, how milestones reshape closeness, and why directness takes years.', youtube: '#', spotify: '#', apple: 'https://podcasts.apple.com/sg/podcast/friendship-after-30-why-its-harder-why-its-better-and/id1878052269?i=1000754115606', spotifyEmbed: null },
  { id: 3, slug: 'booktok-brain-are-reading-challenges-ruining-reading', title: 'BookTok Brain: Are Reading Challenges Ruining Reading?', blogTitle: 'Are Reading Challenges Actually Ruining the Joy of Reading?', date: 'Mar 2, 2026', duration: '58 min', type: 'guest', guest: 'Raissa Smarasista', description: "She read 84 books in a year — then realized she was doing it wrong. Hobby burnout, performative reading, Goodreads goals, and the BookTok effect.", youtube: '#', spotify: '#', apple: 'https://podcasts.apple.com/sg/podcast/booktok-brain-are-reading-challenges-ruining-reading/id1878052269?i=1000752775306', spotifyEmbed: null },
  { id: 2, slug: 'this-was-supposed-to-feel-better', title: 'This Was Supposed to Feel Better: On Inherited Ambition, Quarter-Life Doubt, and Redefining Success', blogTitle: 'Why Career Success Feels Empty (and How to Redefine What Matters)', date: 'Feb 23, 2026', duration: '39 min', type: 'monanda', guest: null, description: "Why does career success sometimes feel underwhelming? Quarter-life doubt, inherited ambition, and the quiet identity crisis of your 20s and 30s.", youtube: '#', spotify: '#', apple: 'https://podcasts.apple.com/sg/podcast/this-was-supposed-to-feel-better-on-inherited-ambition/id1878052269?i=1000751091535', spotifyEmbed: null },
  { id: 1, slug: 'introducing-trying-very-hard', title: 'Introducing Trying Very Hard: Why We Started a Podcast in Our 30s', blogTitle: 'Why We Started a Podcast About Trying Hard in Our 30s', date: 'Feb 17, 2026', duration: '38 min', type: 'monanda', guest: null, description: 'Welcome to Trying Very Hard! Who we are, the stories that shaped us, and why we started this podcast now.', youtube: '#', spotify: '#', apple: 'https://podcasts.apple.com/sg/podcast/introducing-trying-very-hard-why-we-started-a/id1878052269?i=1000750268992', spotifyEmbed: null },
];

/**
 * Get all episodes.
 * TODO: In production, this will fetch from RSS feed and merge with YouTube data.
 * For now, returns static data.
 */
export async function getEpisodes() {
  // TODO: Replace with RSS fetch when SPOTIFY_RSS_URL env var is set
  // const rssUrl = process.env.SPOTIFY_RSS_URL;
  // if (rssUrl) { return await fetchFromRSS(rssUrl); }
  return STATIC_EPISODES;
}

/**
 * Get a single episode by slug.
 */
export async function getEpisodeBySlug(slug) {
  const episodes = await getEpisodes();
  return episodes.find(ep => ep.slug === slug) || null;
}

/**
 * Get paginated episodes.
 */
export async function getEpisodesPaginated(page = 1, perPage = 8) {
  const episodes = await getEpisodes();
  const start = (page - 1) * perPage;
  return {
    episodes: episodes.slice(start, start + perPage),
    total: episodes.length,
    totalPages: Math.ceil(episodes.length / perPage),
    page,
  };
}

// ─── RSS FETCH (activate when env vars are set) ───────────────────────
// import Parser from 'rss-parser';
//
// async function fetchFromRSS(rssUrl) {
//   const parser = new Parser();
//   const feed = await parser.parseURL(rssUrl);
//   return feed.items.map((item, i) => ({
//     id: feed.items.length - i,
//     slug: slugify(item.title),
//     title: item.title,
//     blogTitle: null, // auto-generated later
//     date: new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
//     duration: item.itunes?.duration || 'TBD',
//     type: detectType(item),
//     guest: detectGuest(item),
//     description: item.contentSnippet || item.content || '',
//     youtube: '#',
//     spotify: item.link || '#',
//     apple: '#',
//     spotifyEmbed: item.enclosure?.url || null,
//   }));
// }
//
// function slugify(str) {
//   return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '').replace(/^-/, '');
// }
//
// function detectType(item) {
//   // Simple heuristic — customize based on your naming convention
//   const title = item.title.toLowerCase();
//   if (title.includes('with ') || title.includes('feat.')) return 'guest';
//   return 'monanda';
// }
//
// function detectGuest(item) {
//   // Extract guest name from title if it contains "with [Name]"
//   const match = item.title.match(/with\s+(.+?)(?:\s*[:\-|]|$)/i);
//   return match ? match[1].trim() : null;
// }
