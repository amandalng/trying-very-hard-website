import './globals.css';

export const metadata = {
  title: 'Trying Very Hard: The Podcast | Amanda & Monica',
  description: 'Honest yaps that call out & celebrate our inner tryhards. A podcast about adulthood, ambition, identity, and the messy beauty of caring deeply and trying hard — with microphones. Hosted by Amanda & Monica from Singapore.',
  keywords: ['podcast', 'adulthood', 'ambition', 'identity', 'friendship', 'mental health', 'third culture kids', 'Singapore', 'millennials', 'trying hard', 'self-improvement'],
  authors: [{ name: 'Amanda & Monica' }],
  openGraph: {
    title: 'Trying Very Hard: The Podcast',
    description: 'Honest yaps that call out & celebrate our inner tryhards.',
    url: 'https://tryingveryhardpod.com',
    siteName: 'Trying Very Hard',
    type: 'website',
    locale: 'en_SG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trying Very Hard: The Podcast',
    description: 'Honest yaps that call out & celebrate our inner tryhards.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
