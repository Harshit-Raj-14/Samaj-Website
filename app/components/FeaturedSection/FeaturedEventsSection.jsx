'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './FeaturedEventsSection.css';

const FeaturedEventsSection = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  // Featured events data
  const featuredEvents = [
    {
      id: 1,
      type: 'upcoming',
      title: 'Annual Community Festival 2025',
      subtitle: 'Celebrating Unity & Heritage',
      date: 'June 15-16, 2025',
      time: '10:00 AM - 8:00 PM',
      location: 'Baranwal Samaj Center',
      description: 'Join us for our grandest celebration featuring cultural performances, traditional cuisine, art exhibitions, and activities for all generations.',
      highlights: ['Cultural Performances', 'Traditional Food', 'Art Gallery', 'Kids Zone'],
      image: '/images/festival-2025.jpg',
      gradient: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
      accentColor: '#007bff',
      icon: '🎉',
      status: 'Register Now',
      attendees: '500+ Expected'
    },
    {
      id: 2,
      type: 'upcoming',
      title: 'Youth Leadership Summit',
      subtitle: 'Empowering Tomorrow\'s Leaders',
      date: 'April 8, 2025',
      time: '9:00 AM - 5:00 PM',
      location: 'Community Learning Center',
      description: 'An inspiring day of workshops, mentorship sessions, and networking opportunities designed to nurture young leaders in our community.',
      highlights: ['Leadership Workshops', 'Mentorship', 'Networking', 'Career Guidance'],
      image: '/images/youth-summit.jpg',
      gradient: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)',
      accentColor: '#ffc107',
      icon: '🌟',
      status: 'Early Bird',
      attendees: '150 Spots'
    },
    {
      id: 3,
      type: 'featured',
      title: 'Winter Cultural Showcase',
      subtitle: 'Memories from December 2024',
      date: 'December 20, 2024',
      time: '6:00 PM - 11:00 PM',
      location: 'Grand Auditorium',
      description: 'A magical evening that brought together 300+ community members for an unforgettable celebration of our rich cultural heritage.',
      highlights: ['Dance Performances', 'Music Concert', 'Food Festival', 'Award Ceremony'],
      image: '/images/winter-showcase.jpg',
      gradient: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
      accentColor: '#6c757d',
      icon: '❄️',
      status: 'View Gallery',
      attendees: '300+ Attended'
    }
  ];

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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

  // Auto-rotate cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % featuredEvents.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredEvents.length]);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const currentEvent = featuredEvents[activeCard];

  return (
    <section 
      className={`featured-events-section ${isVisible ? 'animate-in' : ''}`}
      ref={sectionRef}
      style={{
        '--mouse-x': `${mousePosition.x}%`,
        '--mouse-y': `${mousePosition.y}%`,
      }}
    >
      {/* Animated Background */}
      <div className="background-animation">
        <div className="floating-shapes">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`shape shape-${i + 1}`}></div>
          ))}
        </div>
        <div className="gradient-orbs">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`orb orb-${i + 1}`}></div>
          ))}
        </div>
      </div>

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Featured Events</h2>
          <div className="header-decoration">
            <span className="decoration-line"></span>
            <span className="decoration-icon">✨</span>
            <span className="decoration-line"></span>
          </div>
          <p className="section-subtitle">
            Discover extraordinary moments that bring our community together
          </p>
        </div>

        {/* Main Featured Event */}
        <div className="featured-main">
          <div 
            className="featured-hero"
            style={{ background: currentEvent.gradient }}
          >
            <div className="hero-content">
              <div className="event-meta">
                <span className="event-type">{currentEvent.type}</span>
                <span className="event-icon">{currentEvent.icon}</span>
              </div>
              
              <h3 className="event-title">{currentEvent.title}</h3>
              <p className="event-subtitle">{currentEvent.subtitle}</p>
              
              <div className="event-details">
                <div className="detail-item">
                  <i className="icon">📅</i>
                  <span>{currentEvent.date}</span>
                </div>
                <div className="detail-item">
                  <i className="icon">⏰</i>
                  <span>{currentEvent.time}</span>
                </div>
                <div className="detail-item">
                  <i className="icon">📍</i>
                  <span>{currentEvent.location}</span>
                </div>
                <div className="detail-item">
                  <i className="icon">👥</i>
                  <span>{currentEvent.attendees}</span>
                </div>
              </div>

              <p className="event-description">
                {currentEvent.description}
              </p>

              <div className="event-highlights">
                {currentEvent.highlights.map((highlight, index) => (
                  <span key={index} className="highlight-tag">
                    {highlight}
                  </span>
                ))}
              </div>

              <div className="event-actions">
                <Link 
                  href={`/events/${currentEvent.id}`} 
                  className="btn btn-primary"
                  style={{ backgroundColor: currentEvent.accentColor }}
                >
                  <span>{currentEvent.status}</span>
                  <i className="btn-icon">→</i>
                </Link>
                <Link href="/events" className="btn btn-secondary">
                  <span>View All Events</span>
                  <i className="btn-icon">📋</i>
                </Link>
              </div>
            </div>

            <div className="hero-visual">
              <div className="image-container">
                <div 
                  className="event-image"
                  style={{ 
                    background: `${currentEvent.gradient}, url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="white" opacity="0.1"/><text x="50" y="60" text-anchor="middle" font-size="30" fill="white">${currentEvent.icon}</text></svg>')` 
                  }}
                >
                  <div className="image-overlay">
                    <div className="play-button">
                      <i className="play-icon">▶</i>
                    </div>
                    <p>View Event Gallery</p>
                  </div>
                </div>
                
                {/* Floating stats */}
                <div className="floating-stats">
                  <div className="stat-card">
                    <span className="stat-number">
                      {currentEvent.type === 'upcoming' ? '🎟️' : '📸'}
                    </span>
                    <span className="stat-label">
                      {currentEvent.type === 'upcoming' ? 'Register' : 'Gallery'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Navigation Cards */}
        <div className="events-navigation">
          <h4 className="nav-title">Explore More Events</h4>
          <div className="nav-cards">
            {featuredEvents.map((event, index) => (
              <div
                key={event.id}
                className={`nav-card ${index === activeCard ? 'active' : ''}`}
                onClick={() => setActiveCard(index)}
                style={{ '--accent-color': event.accentColor }}
              >
                <div className="card-header">
                  <span className="card-icon">{event.icon}</span>
                  <span className="card-status">{event.status}</span>
                </div>
                <h5 className="card-title">{event.title}</h5>
                <p className="card-date">{event.date}</p>
                <div className="card-progress">
                  <div 
                    className="progress-bar"
                    style={{ 
                      width: index === activeCard ? '100%' : '0%',
                      backgroundColor: event.accentColor 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="section-cta">
          <div className="cta-content">
            <h4>Don't Miss Out on Amazing Events!</h4>
            <p>Stay updated with our latest events and be part of something extraordinary.</p>
            <div className="cta-actions">
              <Link href="/events/subscribe" className="btn btn-gradient">
                <span>Subscribe to Updates</span>
                <i className="btn-icon">🔔</i>
              </Link>
              <Link href="/events/calendar" className="btn btn-outline">
                <span>View Full Calendar</span>
                <i className="btn-icon">📅</i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEventsSection;