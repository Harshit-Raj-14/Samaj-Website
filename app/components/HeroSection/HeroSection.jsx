import React from 'react';
import Link from 'next/link';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Baranwal Samaj</h1>
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
    </section>
  );
};

export default HeroSection;