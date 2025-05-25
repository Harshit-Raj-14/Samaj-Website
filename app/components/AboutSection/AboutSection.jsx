'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './AboutSection.css';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    members: 0,
    events: 0,
    years: 0
  });
  const sectionRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Start counter animation when section becomes visible
          animateCounters();
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Counter animation function
  const animateCounters = () => {
    const duration = 2000; // 2 seconds
    const targets = { members: 500, events: 50, years: 25 };
    const startTime = Date.now();

    const updateCounters = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats({
        members: Math.floor(targets.members * easeOutCubic),
        events: Math.floor(targets.events * easeOutCubic),
        years: Math.floor(targets.years * easeOutCubic)
      });

      if (progress < 1) {
        requestAnimationFrame(updateCounters);
      }
    };

    updateCounters();
  };

  return (
    <section 
      className={`section about-section ${isVisible ? 'animate-in' : ''}`} 
      id="about"
      ref={sectionRef}
    >
      <div className="container">
        <h2 className="section-title">About Baranwal Samaj</h2>
        
        {/* Full width text content */}
        <div className="about-text-full">
          <div className="text-content">
            <p className="fade-in-text">
              The Baranwal Samaj was established with a vision to preserve our rich cultural heritage
              while adapting to a changing world. Over the decades, we have grown into a vibrant
              organization with hundreds of members across the region.
            </p>
            <p className="fade-in-text">
              Our community is built on the principles of unity, service, and cultural preservation.
              We organize various events, educational programs, and social activities to bring our
              members together and strengthen our community bonds.
            </p>
            <p className="fade-in-text">
              Whether you're looking to connect with your roots, participate in cultural activities,
              or simply be part of a supportive community, Baranwal Samaj welcomes you with open arms.
            </p>
          </div>
        </div>

        {/* Stats and Image Grid */}
        <div className="stats-image-grid">
          <div className="stats-section">
            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">{animatedStats.members}+</span>
                <span className="stat-text">Members</span>
              </div>
              <div className="stat">
                <span className="stat-number">{animatedStats.events}+</span>
                <span className="stat-text">Annual Events</span>
              </div>
              <div className="stat">
                <span className="stat-number">{animatedStats.years}+</span>
                <span className="stat-text">Years of Service</span>
              </div>
            </div>

            <div className="about-cta">
              <Link href="/members" className="btn btn-primary">
                Join Our Community
              </Link>
              <Link href="/about" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          </div>

          <div className="about-image">
            <div className="image-container">
              <div className="image-placeholder">
                <div className="placeholder-content">
                  <div className="placeholder-icon">🏛️</div>
                  <div className="placeholder-text">
                    <h3>Our Heritage</h3>
                    <p>Preserving traditions for future generations</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="image-decoration decoration-1"></div>
              <div className="image-decoration decoration-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;