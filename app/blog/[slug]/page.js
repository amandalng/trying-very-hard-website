import { getEpisodes } from '../../../lib/episodes';
import { getBlogPosts, getBlogPostBySlug } from '../../../lib/blog';
import BlogDetailClient from './BlogDetailClient';

export async function generateStaticParams() {
  const episodes = await getEpisodes();
  const posts = getBlogPosts(episodes);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const episodes = await getEpisodes();
  const post = getBlogPostBySlug(params.slug, episodes);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} | The TVH Journal`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }) {
  const episodes = await getEpisodes();
  const posts = getBlogPosts(episodes);
  const post = posts.find(p => p.slug === params.slug);
  if (!post) return <div>Post not found</div>;
  const linkedEpisode = episodes.find(ep => ep.slug === post.episodeSlug);
  return <BlogDetailClient post={post} episode={linkedEpisode} />;
}
