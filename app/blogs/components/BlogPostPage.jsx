'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, formatDate } from './blogUtils';
import './BlogPostPage.css';

const BlogPostPage = ({ slug }) => {
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="blog-post-container">
        <div className="not-found">
          <h1>Blog Post Not Found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
          <Link href="/blogs" className="back-btn">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      {/* Back to Blog Link */}
      <div className="back-link-top">
        <Link href="/blogs" className="back-to-blog">
          ← Back to All Posts
        </Link>
      </div>

      {/* Article Header */}
      <header className="article-header">
        <h1 className="article-title">{post.title}</h1>
        
        <div className="article-meta">
          <span className="meta-item">
            <span className="meta-icon">👤</span>
            {post.author}
          </span>
          <span className="meta-item">
            <span className="meta-icon">📅</span>
            {formatDate(post.publishDate)}
          </span>
          <span className="meta-item">
            <span className="meta-icon">⏱️</span>
            {post.readTime}
          </span>
        </div>
      </header>

      {/* Featured Image */}
      <div className="article-image">
        <Image
          src={post.image}
          alt={post.title}
          width={800}
          height={400}
          className="main-image"
          priority
        />
      </div>

      {/* Article Content */}
      <article className="article-content">
        <div className="excerpt">
          {post.excerpt}
        </div>
        
        <div 
          className="content-body"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Back to Blog */}
      <div className="back-to-blog-bottom">
        <Link href="/blogs" className="back-btn">
          ← Back to All Posts
        </Link>
      </div>
    </div>
  );
};

export default BlogPostPage;