import { getEpisodes } from '../../lib/episodes';
import EpisodesClient from './EpisodesClient';

export const metadata = {
  title: 'All Episodes | Trying Very Hard: The Podcast',
  description: 'Browse all episodes of Trying Very Hard — honest yaps about ambition, identity, adulthood, and the messy beauty of caring deeply. New episodes every Tuesday.',
};

export default async function EpisodesPage() {
  const episodes = await getEpisodes();
  return <EpisodesClient episodes={episodes} />;
}
