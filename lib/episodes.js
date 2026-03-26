// Episode data management
// Fetches from RSS feed + YouTube API, with static fallback

const STATIC_EPISODES = [
  { id: 6, slug: 'you-dont-have-to-be-broken-to-go-to-therapy', title: "You Don't Have to Be Broken to Go to Therapy: On Mental Health, Stigma, and What We've Learned", blogTitle: 'Why Going to Therapy Still Feels So Hard (Even When You Know You Need It)', date: 'Mar 24, 2026', duration: '40 min', type: 'monanda', guest: null, description: "Why is it so hard to fully show up in therapy, even when you know you need it? We get into mental health stigma, Asian family dynamics, finding the right therapist, and the quiet self-sabotage of performing wellness.", youtube: 'https://www.youtube.com/@TryingVeryHardPod', spotify: 'https://open.spotify.com/show/4kQL0nJmPhv38D8io58eMX', apple: 'https://podcasts.apple.com/sg/podcast/you-dont-have-to-be-broken-to-go-to-therapy-on-mental/id1878052269?i=1000756871967', thumbnail: null },
  { id: 5, slug: 'if-you-care-for-me-one-bankers-journey', title: "If You Care for Me: One Banker's Journey from Shower Singer to Releasing Original Music", blogTitle: 'What Happens When You Finally Take Your Creative Side Seriously', date: 'Mar 16, 2026', duration: '46 min', type: 'guest', guest: 'Kelvin Kuan', description: "What happens when you've spent your whole life being 'the practical one,' and then music starts demanding more of you? Asian family expectations, the fear of self-promotion, and taking creative passion seriously later in life.", youtube: 'https://www.youtube.com/@TryingVeryHardPod', spotify: 'https://open.spotify.com/show/4kQL0nJmPhv38D8io58eMX', apple: 'https://podcasts.apple.com/sg/podcast/if-you-care-for-me-one-bankers-journey-from-shower/id1878052269?i=1000755662503', thumbnail: null },
  { id: 4, slug: 'friendship-after-30', title: "Friendship After 30: Why It's Harder, Why It's Better, and How to Actually Keep It", blogTitle: 'Why Your Friendships Change in Your 30s (and What to Do About It)', date: 'Mar 9, 2026', duration: '47 min', type: 'monanda', guest: null, description: 'Friendships in your 30s require actual, deliberate effort. The shift from convenient to intentional friendships, how milestones reshape closeness, and why directness takes years.', youtube: 'https://www.youtube.com/@TryingVeryHardPod', spotify: 'https://open.spotify.com/show/4kQL0nJmPhv38D8io58eMX', apple: 'https://podcasts.apple.com/sg/podcast/friendship-after-30-why-its-harder-why-its-better-and/id1878052269?i=1000754115606', thumbnail: null },
  { id: 3, slug: 'booktok-brain-are-reading-challenges-ruining-reading', title: 'BookTok Brain: Are Reading Challenges Ruining Reading?', blogTitle: 'Are Reading Challenges Actually Ruining the Joy of Reading?', date: 'Mar 2, 2026', duration: '58 min', type: 'guest', guest: 'Raissa Smarasista', description: "She read 84 books in a year — then realized she was doing it wrong. Hobby burnout, performative reading, Goodreads goals, and the BookTok effect.", youtube: 'https://www.youtube.com/@TryingVeryHardPod', spotify: 'https://open.spotify.com/show/4kQL0nJmPhv38D8io58eMX', apple: 'https://podcasts.apple.com/sg/podcast/booktok-brain-are-reading-challenges-ruining-reading/id1878052269?i=1000752775306', thumbnail: null },
  { id: 2, slug: 'this-was-supposed-to-feel-better', title: 'This Was Supposed to Feel Better: On Inherited Ambition, Quarter-Life Doubt, and Redefining Success', blogTitle: 'Why Career Success Feels Empty (and How to Redefine What Matters)', date: 'Feb 23, 2026', duration: '39 min', type: 'monanda', guest: null, description: "Why does career success sometimes feel underwhelming? Quarter-life doubt, inherited ambition, and the quiet identity crisis of your 20s and 30s.", youtube: 'https://www.youtube.com/@TryingVeryHardPod', spotify: 'https://open.spotify.com/show/4kQL0nJmPhv38D8io58eMX', apple: 'https://podcasts.apple.com/sg/podcast/this-was-supposed-to-feel-better-on-inherited-ambition/id1878052269?i=1000751091535', thumbnail: null },
  { id: 1, slug: 'introducing-trying-very-hard', title: 'Introducing Trying Very Hard: Why We Started a Podcast in Our 30s', blogTitle: 'Why We Started a Podcast About Trying Hard in Our 30s', date: 'Feb 17, 2026', duration: '38 min', type: 'monanda', guest: null, description: 'Welcome to Trying Very Hard! Who we are, the stories that shaped us, and why we started this podcast now.', youtube: 'https://www.youtube.com/@TryingVeryHardPod', spotify: 'https://open.spotify.com/show/4kQL0nJmPhv38D8io58eMX', apple: 'https://podcasts.apple.com/sg/podcast/introducing-trying-very-hard-why-we-started-a/id1878052269?i=1000750268992', thumbnail: null },
];

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Parse duration from various formats: "2396" (seconds), "39:56" (mm:ss), "1:05:30" (h:mm:ss)
function formatDuration(raw) {
  if (!raw) return '';
  const str = raw.trim();
  if (str.includes(':')) {
    const parts = str.split(':').map(Number);
    let totalMin;
    if (parts.length === 3) totalMin = parts[0] * 60 + parts[1];
    else if (parts.length === 2) totalMin = parts[0];
    else return '';
    return `${totalMin} min`;
  }
  const secs = parseInt(str);
  if (isNaN(secs)) return '';
  return `${Math.round(secs / 60)} min`;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  } catch { return ''; }
}

function detectType(title) {
  const lower = title.toLowerCase();
  if (lower.match(/\bwith\b/i) && title.match(/with\s+[A-Z]/)) return 'guest';
  return 'monanda';
}

function detectGuest(title) {
  const withMatch = title.match(/with\s+([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)*)/);
  if (withMatch) return withMatch[1].trim();
  const parenMatch = title.match(/\(with\s+(.+?)\)/i);
  if (parenMatch) return parenMatch[1].trim();
  return null;
}

function matchYouTubeVideo(episodeTitle, youtubeVideos) {
  if (!youtubeVideos || youtubeVideos.length === 0) return null;
  const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
  const epNorm = normalize(episodeTitle);
  let bestMatch = null;
  let bestScore = 0;
  for (const video of youtubeVideos) {
    const vidNorm = normalize(video.title);
    const epWords = new Set(epNorm.split(/\s+/).filter(w => w.length > 2));
    const vidWords = new Set(vidNorm.split(/\s+/).filter(w => w.length > 2));
    let overlap = 0;
    for (const w of epWords) { if (vidWords.has(w)) overlap++; }
    const score = overlap / Math.max(epWords.size, vidWords.size);
    if (score > bestScore && score > 0.25) {
      bestScore = score;
      bestMatch = video;
    }
  }
  return bestMatch;
}

// ─── RSS FEED FETCH ───────────────────────────────────────

async function fetchRSSEpisodes() {
  const rssUrl = process.env.SPOTIFY_RSS_URL;
  if (!rssUrl) return null;

  try {
    const res = await fetch(rssUrl, { next: { revalidate: 3600 } });
    const xml = await res.text();

    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null) {
      const item = match[1];

      // More robust tag extraction — handles CDATA, namespaced tags, multiline
      const getTag = (tag) => {
        // Try exact tag first
        let m = item.match(new RegExp(`<${tag}(?:\\s[^>]*)?>\\s*(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?\\s*</${tag}>`, 'i'));
        if (m) return m[1].trim();
        // Try self-closing or empty
        return '';
      };

      const getAttr = (tag, attr) => {
        const m = item.match(new RegExp(`<${tag}[^>]*${attr}\\s*=\\s*"([^"]*)"`, 'i'));
        return m ? m[1] : '';
      };

      const title = getTag('title');

      // Description — try itunes:summary first (often cleaner), then description
      let description = getTag('itunes:summary') || getTag('description');
      description = description
        .replace(/<[^>]*>/g, '')
        .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 400);

      const pubDate = getTag('pubDate');

      // Duration — try itunes:duration (may be seconds or HH:MM:SS)
      const durationRaw = getTag('itunes:duration');

      // Episode link — Spotify/Anchor link
      const episodeLink = getTag('link');

      // Enclosure URL for the audio file
      const enclosureUrl = getAttr('enclosure', 'url');

      // Episode image from itunes:image
      const episodeImage = getAttr('itunes:image', 'href');

      if (title) {
        items.push({
          title,
          description,
          pubDate,
          durationRaw,
          episodeLink,
          enclosureUrl,
          episodeImage,
        });
      }
    }

    return items;
  } catch (err) {
    console.error('RSS fetch error:', err);
    return null;
  }
}

// ─── YOUTUBE FETCH ────────────────────────────────────────

async function fetchYouTubeVideos() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const handle = process.env.YOUTUBE_CHANNEL_HANDLE;
  if (!apiKey || !handle) return [];

  try {
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${handle}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    const channelData = await channelRes.json();
    if (!channelData.items || channelData.items.length === 0) {
      console.error('YouTube: No channel found for handle', handle);
      return [];
    }

    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    const videosData = await videosRes.json();
    if (!videosData.items) return [];

    return videosData.items.map(item => ({
      title: item.snippet.title,
      videoId: item.snippet.resourceId.videoId,
      url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
      thumbnail: item.snippet.thumbnails?.maxres?.url
        || item.snippet.thumbnails?.high?.url
        || item.snippet.thumbnails?.medium?.url
        || item.snippet.thumbnails?.default?.url
        || null,
      publishedAt: item.snippet.publishedAt,
    }));
  } catch (err) {
    console.error('YouTube fetch error:', err);
    return [];
  }
}

// ─── MAIN FETCH ──────────────────────────────────────────

let cachedEpisodes = null;
let cacheTime = 0;
const CACHE_DURATION = 60 * 60 * 1000;

export async function getEpisodes() {
  if (cachedEpisodes && Date.now() - cacheTime < CACHE_DURATION) {
    return cachedEpisodes;
  }

  const [rssItems, youtubeVideos] = await Promise.all([
    fetchRSSEpisodes(),
    fetchYouTubeVideos(),
  ]);

  if (!rssItems || rssItems.length === 0) {
    console.log('RSS fetch returned empty, using static data');
    return STATIC_EPISODES;
  }

  const episodes = rssItems.map((item, i) => {
    const type = detectType(item.title);
    const guest = type === 'guest' ? detectGuest(item.title) : null;
    const ytMatch = matchYouTubeVideo(item.title, youtubeVideos);

    const spotifyLink = item.episodeLink && item.episodeLink.includes('spotify')
      ? item.episodeLink
      : `https://open.spotify.com/show/4kQL0nJmPhv38D8io58eMX`;

    return {
      id: rssItems.length - i,
      slug: slugify(item.title),
      title: item.title,
      blogTitle: null,
      date: formatDate(item.pubDate),
      duration: formatDuration(item.durationRaw),
      type,
      guest,
      description: item.description,
      youtube: ytMatch ? ytMatch.url : 'https://www.youtube.com/@TryingVeryHardPod',
      spotify: spotifyLink,
      apple: `https://podcasts.apple.com/sg/podcast/trying-very-hard-the-podcast/id1878052269`,
      thumbnail: ytMatch?.thumbnail || item.episodeImage || null,
    };
  });

  cachedEpisodes = episodes;
  cacheTime = Date.now();
  return episodes;
}

export async function getEpisodeBySlug(slug) {
  const episodes = await getEpisodes();
  return episodes.find(ep => ep.slug === slug) || null;
}

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
