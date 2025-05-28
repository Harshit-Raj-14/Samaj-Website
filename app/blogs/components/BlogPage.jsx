'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts, formatDate } from './blogUtils';
import './BlogPage.css';

const BlogPage = () => {
  return (
    <div className="blog-container">
      {/* Hero Section */}
      <div className="blog-hero">
        <div className="hero-content">
          <h1 className="hero-title">Barnwal Community Blog</h1>
          <p className="hero-subtitle">
            Stories of Heritage, Culture, and Service
          </p>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="blog-posts">
        <div className="posts-grid">
          {blogPosts.map(post => (
            <article key={post.id} className="blog-card">
              <Link href={`/blogs/${post.slug}`} className="blog-link">
                <div className="blog-image-container">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="blog-image"
                  />
                  <div className="blog-overlay">
                    <span className="read-more">Read Article →</span>
                  </div>
                </div>
                
                <div className="blog-content">
                  <h2 className="blog-title">{post.title}</h2>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  
                  <div className="blog-meta">
                    <span className="blog-author">👤 {post.author}</span>
                    <span className="blog-date">📅 {formatDate(post.publishDate)}</span>
                    <span className="blog-read-time">⏱️ {post.readTime}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;