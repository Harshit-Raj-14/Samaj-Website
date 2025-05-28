// app/blogs/[slug]/page.js - Individual blog post pages
import BlogPostPage from '../components/BlogPostPage';
import { getPostBySlug } from '../components/blogUtils';

export default async function BlogPost({ params }) {
  const { slug } = await params;
  return <BlogPostPage slug={slug} />;
}

// Generate static params for all blog posts (optional but recommended)
export async function generateStaticParams() {
  const { blogPosts } = require('../components/blogUtils');
  
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each post (optional but good for SEO)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}