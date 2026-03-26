// Server Component — fetches episodes from RSS + YouTube, passes to client
import { getEpisodes } from '../lib/episodes';
import HomeClient from './HomeClient';

export default async function Home() {
  const episodes = await getEpisodes();
  return <HomeClient episodes={episodes} />;
}
