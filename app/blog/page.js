import { getEpisodes } from '../../lib/episodes';
import { getBlogPosts } from '../../lib/blog';
import BlogClient from './BlogClient';

export const metadata = {
  title: 'The TVH Journal | Trying Very Hard: The Podcast',
  description: 'Episode recaps and reflections from the Trying Very Hard podcast. Deeper dives, personal reflections, and the stuff that didn\'t fit in 45 minutes.',
};

export default async function BlogPage() {
  const episodes = await getEpisodes();
  const posts = getBlogPosts(episodes);
  return <BlogClient posts={posts} episodes={episodes} />;
}
