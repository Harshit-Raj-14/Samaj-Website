'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './HeroSection.css';

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
 
  // Replace these with your actual image paths from the public folder
  const backgroundImages = [
    '/images/community-1.jpg',
    '/images/community-2.jpg',
    '/images/community-3.jpg',
    '/images/community-4.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <section className="hero-section">
      {/* Background Image Slideshow */}
      <div className="hero-background">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`hero-background-image ${index === activeIndex ? 'active' : ''}`}
          >
            <Image
              src={image}
              alt={`Baranwal Samaj Community ${index + 1}`}
              fill
              sizes="100vw"
              priority={index === 0}
              style={{ 
                objectFit: 'cover',
                objectPosition: 'center'
              }}
              onError={(e) => {
                console.error(`Failed to load image: ${image}`);
                // Fallback to a placeholder or hide the image
                e.target.style.display = 'none';
              }}
            />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="hero-overlay"></div>
     
      {/* Hero Content */}
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Baranwal Ekta Sanstha Mumbai</h1>
        <p className="hero-subtitle">
          Uniting our community, preserving our heritage, and building our future together.
        </p>
        <div className="hero-buttons">
          <Link href="/members" className="btn">
            Join Our Community
          </Link>
          <Link href="/events" className="btn btn-secondary">
            Upcoming Events
          </Link>
        </div>
      </div>

      {/* Slideshow indicators */}
      <div className="hero-indicators">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;