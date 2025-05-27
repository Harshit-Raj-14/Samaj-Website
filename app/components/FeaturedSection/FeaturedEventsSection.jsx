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
    type: 'featured',
    title: 'महाराजा अहिबरन जयंती समारोह, 2024',
    subtitle: 'हमारे पूर्वजों को श्रद्धांजलि',
    date: '2024',
    time: '5:00 PM - 9:00 PM',
    location: 'Baranwal Ekta Sanstha Mumbai',
    description: 'सांस्कृतिक कार्यक्रमों, इतिहास प्रस्तुतियों और भव्य भोजन प्रसाद के साथ एक भव्य समारोह जिसने हमारे गौरवशाली अतीत को जीवंत किया।',
    highlights: ['सांस्कृतिक कार्यक्रम', 'इतिहास प्रस्तुति', 'विशेष भोजन प्रसाद', 'सामूहिक सहभागिता'],
    image: '/images/ahivarn-jayanti.png',
    gradient: 'linear-gradient(135deg, #9c27b0 0%, #6a1b9a 100%)',
    accentColor: '#9c27b0',
    icon: '🕉️',
    status: 'Completed',
    attendees: '1000+ Attended'
  },
  {
    id: 2,
    type: 'featured',
    title: 'होली मिलन समारोह',
    subtitle: 'रंगों में एकता',
    date: 'March, 2024',
    time: '10:00 AM - 2:00 PM',
    location: 'Baranwal Ekta Sanstha Grounds',
    description: 'रंग, संगीत और उत्सव के साथ मनाई गई होली, जिसने पूरे समुदाय को आपसी भाईचारे में बाँध दिया।',
    highlights: ['रंग खेल', 'डांडिया/नृत्य', 'पारंपरिक नाश्ता', 'परिवारिक गेम्स'],
    image: '/images/holi-milan.png',
    gradient: 'linear-gradient(135deg, #e91e63 0%, #c2185b 100%)',
    accentColor: '#e91e63',
    icon: '🌈',
    status: 'Completed',
    attendees: '1000+ Attended'
  },
  {
    id: 3,
    type: 'upcoming',
    title: 'महापूजा एवं सामूहिक हवन',
    subtitle: 'सद्भावना, शांति और समृद्धि के लिए',
    date: '2025-2026',
    time: '7:00 AM - 1:00 PM',
    location: 'Baranwal Ekta Sanstha',
    description: 'धार्मिक अनुष्ठानों, सामूहिक हवन और भजन-कीर्तन के साथ एक दिव्य आयोजन जो पूरे समाज को अध्यात्म से जोड़ता है।',
    highlights: ['सामूहिक हवन', 'भजन-कीर्तन', 'प्रवचन', 'प्रसाद वितरण'],
    image: '/images/maha-puja.png',
    gradient: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
    accentColor: '#4caf50',
    icon: '🙏',
    status: 'Upcoming',
    attendees: 'Open for All'
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
          <br></br>
          <p className="section-subtitle">
            Extraordinary moments that bring our community together
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
                  href={`/gallery`} 
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
                <div className="event-image-wrapper">
                  <Image
                    src={currentEvent.image}
                    alt={currentEvent.title}
                    width={600}
                    height={400}
                    className="event-image"
                    priority={activeCard === 0}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyejFhiuImuLFAmpJTyesMzAoJIuNksJCgsK1GgqRfEcCksZJIkCLzQv6fP/9k="
                    onError={(e) => {
                      console.error('Image failed to load:', currentEvent.image);
                      e.target.style.display = 'none';
                      // Show fallback gradient background
                      e.target.parentElement.style.background = currentEvent.gradient;
                    }}
                  />
                  <div 
                    className="image-overlay" 
                    onClick={() => window.open('https://www.youtube.com/watch?v=MyjlZAl6X_s', '_blank')}
                    style={{ cursor: 'pointer' }}
                  >
                  <div className="play-button">
                      <i className="play-icon">▶</i>
                    </div>
                    <p>View Event Gallery</p>
                  </div>
                </div>
                
                {/* Floating stats */}
                {/* <div className="floating-stats">
                  <div className="stat-card">
                    <span className="stat-number">
                      {currentEvent.type === 'upcoming' ? '🎟️' : '📸'}
                    </span>
                    <span className="stat-label">
                      {currentEvent.type === 'upcoming' ? 'Register' : 'Gallery'}
                    </span>
                  </div>
                </div> */}
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
              <Link href="/events" className="btn btn-gradient">
                <span>Subscribe to Updates</span>
                <i className="btn-icon">🔔</i>
              </Link>
              <Link href="/events" className="btn btn-outline">
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