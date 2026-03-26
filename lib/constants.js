export const LINKS = {
  youtube: 'https://www.youtube.com/@TryingVeryHardPod',
  spotify: 'https://open.spotify.com/show/4kQL0nJmPhv38D8io58eMX',
  apple: 'https://podcasts.apple.com/sg/podcast/trying-very-hard-the-podcast/id1878052269',
  instagram: 'https://www.instagram.com/tryingveryhardpod/',
  tiktok: 'https://www.tiktok.com/@tryingveryhardpod',
};

export const HOSTS = [
  {
    name: 'Amanda',
    color: '#F5ACC8',
    instagram: 'https://www.instagram.com/mandypants__/',
    linkedin: 'https://www.linkedin.com/in/amandaleahng/',
    website: 'https://somitherapy.com/',
    bio: "Equal parts rigor, wit, and wildly contagious curiosity. Amanda is an integrative mind-body therapist and the founder of Somi Therapy, helping people who think too much, feel too much, and achieve too much — then wonder why they're exhausted. She draws from psychology, neuroscience, trauma theory, coaching, and somatic practice, because surface-level has never been her thing. Before becoming a therapist, she spent years in strategy roles across education, microfinance, and consulting. She's the friend who makes you believe in yourself — and now you get to have her in your ears.",
  },
  {
    name: 'Monica',
    color: '#FFD200',
    instagram: 'https://www.instagram.com/monica.pranatajaya/',
    linkedin: 'https://www.linkedin.com/in/monicapranatajaya/',
    website: null,
    bio: "One of the coolest, sharpest, and strongest women you'll meet — and she'll hype you up, call out your bullshit, and ask the one question that cuts right to the truth. Monica is the co-founder of Nona Woman, a platform breaking period stigma and creating space for women in Indonesia to feel seen, heard, and educated. She holds an MBA from London Business School and has worked across EY-Parthenon, public health innovation, startups, and product marketing. She's generous, smart, hilarious, and made of what we suspect is 0% body fat and 100% discipline.",
  },
];

export const NAV = ['subscribe', 'episodes', 'blog', 'about', 'contact'];

export const BLOG_GENERATION_SPEC = {
  voice: 'First person plural (we), slightly more polished than the podcast, warm and self-aware, never preachy',
  length: '600-900 words',
  titleStyle: 'SEO question/insight framing — match what people actually Google',
  structure: [
    'TLDR (2-3 sentences at the very top)',
    'Intro paragraph (sets the scene)',
    'Spotify embed player',
    'Body with H2 headings using searchable keyword phrases',
    'Personal reflections (here is what stuck with us)',
    'Guest bio + links (guest episodes only)',
    'Closing question → What do you think? Tell us @tryingveryhardpod',
    'Platform links (YouTube, Spotify, Apple Podcasts)',
  ],
  internalLinking: 'Link to 2-3 related episodes/posts in every post',
  seoElements: 'Meta description, keyword-rich H2s, schema markup',
  never: [
    'Sound like a transcript',
    'Use listicle energy',
    'Say "in this episode we discuss"',
    'Sound clinical or academic',
    'Use motivational-slogan tones',
    'Use clichés',
    'Sound like a self-help guru',
  ],
};
