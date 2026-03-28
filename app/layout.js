import './globals.css';

export const metadata = {
  // ─── CORE META ──────────────────────────────────────────
  title: 'Trying Very Hard: The Podcast | Amanda & Monica',
  description: 'A podcast about ambition, adulthood, identity, effort, and the messy beauty of caring deeply. Two best friends in Singapore — a therapist and a startup founder — navigate quarter-life doubt, mental health, friendships, career pressure, and what it means to try hard in a world obsessed with effortlessness. New episodes every Tuesday.',
  keywords: [
    'podcast', 'trying very hard podcast', 'trying hard',
    'adulthood', 'ambition', 'identity', 'quarter-life crisis',
    'mental health', 'therapy', 'burnout', 'self-improvement',
    'friendship', 'relationships', 'adult friendships',
    'third culture kids', 'TCK', 'expat life',
    'Singapore podcast', 'Asian podcast', 'Southeast Asia',
    'millennials', 'career pressure', 'hustle culture',
    'vulnerability', 'personal growth', 'self-awareness',
    'Amanda', 'Monica', 'Monanda',
  ],
  authors: [
    { name: 'Amanda Ng', url: 'https://www.instagram.com/mandypants__/' },
    { name: 'Monica Pranatajaya', url: 'https://www.instagram.com/monica.pranatajaya/' },
  ],
  creator: 'Trying Very Hard',
  publisher: 'Trying Very Hard',

  // ─── ICONS ──────────────────────────────────────────────
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
  },

  // ─── OPEN GRAPH (Facebook, LinkedIn, WhatsApp, Telegram) ─
  openGraph: {
    title: 'Trying Very Hard: The Podcast',
    description: 'Honest yaps about ambition, adulthood, identity, and the messy beauty of caring deeply. A podcast by Amanda & Monica from Singapore.',
    url: 'https://tryingveryhard.com',
    siteName: 'Trying Very Hard: The Podcast',
    type: 'website',
    locale: 'en_SG',
    images: [
      {
        url: 'https://tryingveryhard.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Trying Very Hard: The Podcast — Amanda & Monica',
      },
    ],
  },

  // ─── TWITTER / X ────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Trying Very Hard: The Podcast',
    description: 'Honest yaps about ambition, adulthood, identity, and the messy beauty of caring deeply. By Amanda & Monica.',
    images: ['https://tryingveryhard.com/images/og-image.jpg'],
  },

  // ─── ADDITIONAL SEO ─────────────────────────────────────
  metadataBase: new URL('https://tryingveryhard.com'),
  alternates: {
    canonical: 'https://tryingveryhard.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these once you set up Google Search Console and Bing Webmaster Tools:
    // google: 'your-google-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

// ─── STRUCTURED DATA (JSON-LD) ────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'PodcastSeries',
  name: 'Trying Very Hard: The Podcast',
  description: 'A podcast about ambition, adulthood, identity, effort, and the messy beauty of caring deeply. Hosted by Amanda and Monica from Singapore.',
  url: 'https://tryingveryhard.com',
  author: [
    { '@type': 'Person', name: 'Amanda Ng', url: 'https://somitherapy.com/' },
    { '@type': 'Person', name: 'Monica Pranatajaya' },
  ],
  inLanguage: 'en',
  genre: ['Society & Culture', 'Self-Improvement', 'Mental Health'],
  webFeed: 'https://anchor.fm/s/105f3a394/podcast/rss',
  image: 'https://tryingveryhard.com/images/og-image.jpg',
  sameAs: [
    'https://www.youtube.com/@TryingVeryHardPod',
    'https://open.spotify.com/show/4kQL0nJmPhv38D8io58eMX',
    'https://podcasts.apple.com/sg/podcast/trying-very-hard-the-podcast/id1878052269',
    'https://www.instagram.com/tryingveryhardpod/',
    'https://www.tiktok.com/@tryingveryhardpod',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
