import { getEpisodes, getEpisodeBySlug } from '../../../lib/episodes';
import EpisodeDetailClient from './EpisodeDetailClient';

export async function generateStaticParams() {
  const episodes = await getEpisodes();
  return episodes.map((ep) => ({ slug: ep.slug }));
}

export async function generateMetadata({ params }) {
  const episode = await getEpisodeBySlug(params.slug);
  if (!episode) return { title: 'Episode Not Found' };
  return {
    title: `${episode.title} | Trying Very Hard`,
    description: episode.description,
  };
}

export default async function EpisodeDetailPage({ params }) {
  const episodes = await getEpisodes();
  const episode = episodes.find(ep => ep.slug === params.slug);
  if (!episode) return <div>Episode not found</div>;
  return <EpisodeDetailClient episode={episode} episodes={episodes} />;
}
