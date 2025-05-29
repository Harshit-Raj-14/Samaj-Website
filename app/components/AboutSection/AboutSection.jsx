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
    const targets = { members: 500, events: 50, years: 20 };
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
        <h2 className="section-title">About Us</h2>
        
        {/* Full width text content */}
        <div className="about-text-full">
          <div className="text-content">
            <br></br>
            <p className="fade-in-text">
              Baranwal Ekta Sanstha Mumbai was founded to unite and empower the Baranwal community in Mumbai, 
              preserving our rich cultural heritage while fostering a sense of belonging in a rapidly evolving world.  
              Over the years, we have grown into a vibrant organization with hundreds of members across the region.
            </p>
            <p className="fade-in-text">
              Our community is built on the principles of unity, service, and cultural preservation.
              We organize various events, educational programs, and social activities to bring our
              members together and strengthen our community bonds.
            </p>
            <p className="fade-in-text">
              Whether you're looking to connect with your roots, participate in cultural activities,
              or simply be part of a supportive community, Baranwal Ekta Sanstha welcomes you with open arms.
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

            <div className="about-cta" style={{ opacity: 1, transform: 'translateY(0)', visibility: 'visible' }}>
              <Link 
                href="/members" 
                className="btn btn-primary"
                style={{
                  display: 'inline-block',
                  opacity: 1,
                  visibility: 'visible',
                  transform: 'translateY(0)',
                  marginRight: '1rem',
                  marginBottom: '1rem',
                  padding: '0.8rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                  color: 'white',
                  boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)',
                  transition: 'all 0.3s ease',
                  border: 'none'
                }}
              >
                Join Our Community
              </Link>
              <Link 
                href="/events" 
                className="btn btn-secondary"
                style={{
                  display: 'inline-block',
                  opacity: 1,
                  visibility: 'visible',
                  transform: 'translateY(0)',
                  marginRight: '1rem',
                  marginBottom: '1rem',
                  padding: '0.8rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  background: 'transparent',
                  color: '#007bff',
                  border: '2px solid #007bff',
                  transition: 'all 0.3s ease'
                }}
              >
                Watch Our Events
              </Link>
            </div>
          </div>

          <div className="about-image">
            <div className="image-container">
              <div className="actual-image">
                <Image
                  src="/images/about.png" // Replace with your actual image path
                  alt="Baranwal Ekta Sanstha Heritage"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="heritage-image"
                />
                <div className="image-overlay">
                  <div className="overlay-content">
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