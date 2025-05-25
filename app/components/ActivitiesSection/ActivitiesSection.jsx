'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './ActivitiesSection.css';

const ActivitiesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
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

  // Example activities data with icons
  const activities = [
    {
      id: 1,
      title: 'Cultural Festivals',
      description: 'Annual celebrations that showcase our traditions, music, dance, and cuisine with vibrant performances.',
      icon: '🎭',
      color: '#ff6b6b',
      link: '/events',
    },
    {
      id: 2,
      title: 'Youth Programs',
      description: 'Educational and recreational activities designed to engage and inspire the next generation.',
      icon: '🌟',
      color: '#4ecdc4',
      link: '/events',
    },
    {
      id: 3,
      title: 'Community Service',
      description: 'Volunteer opportunities to give back to the broader community and support those in need.',
      icon: '🤝',
      color: '#45b7d1',
      link: '/events',
    },
    {
      id: 4,
      title: 'Educational Workshops',
      description: 'Skill-building sessions, language classes, and cultural education programs for all ages.',
      icon: '📚',
      color: '#96ceb4',
      link: '/events',
    },
    {
      id: 5,
      title: 'Senior Support',
      description: 'Programs dedicated to the well-being and engagement of our elderly community members.',
      icon: '👴',
      color: '#feca57',
      link: '/events',
    },
    {
      id: 6,
      title: 'Sports & Recreation',
      description: 'Athletic events and recreational activities that promote health and camaraderie among members.',
      icon: '⚽',
      color: '#ff9ff3',
      link: '/events',
    },
  ];

  return (
    <section 
      className={`section activities-section ${isVisible ? 'animate-in' : ''}`} 
      id="activities"
      ref={sectionRef}
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Activities</h2>
          <div className="title-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-dot"></div>
            <div className="decoration-line"></div>
          </div>
        </div>
       
        <div className="activities-intro">
          <p>
            At Baranwal Samaj, we organize a wide range of activities throughout
            the year to engage our members, preserve our culture, and strengthen
            our bonds. Here are some of our key programs:
          </p>
        </div>
       
        <div className="activities-grid">
          {activities.map((activity, index) => (
            <div 
              className={`activity-card ${isVisible ? 'card-animate-in' : ''}`}
              key={activity.id}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                '--card-color': activity.color 
              }}
              onMouseEnter={() => setHoveredCard(activity.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="activity-icon-container">
                <div className="activity-icon" style={{ backgroundColor: activity.color }}>
                  <span className="icon-emoji">{activity.icon}</span>
                </div>
                <div className="icon-glow" style={{ backgroundColor: activity.color }}></div>
              </div>
              
              <div className="activity-content">
                <h3 className="activity-title">{activity.title}</h3>
                <p className="activity-description">{activity.description}</p>
                
                <div className="activity-footer">
                  <Link href={activity.link} className="activity-link">
                    <span className="link-text">Learn More</span>
                    <span className="link-arrow">&rarr;</span>
                  </Link>
                </div>
              </div>

              {/* Hover effects */}
              <div 
                className={`card-overlay ${hoveredCard === activity.id ? 'active' : ''}`}
                style={{ background: `linear-gradient(135deg, ${activity.color}15, ${activity.color}25)` }}
              ></div>
              
              <div className="card-border" style={{ borderColor: activity.color }}></div>
            </div>
          ))}
        </div>
       
        {/* <div className="activities-cta">
          <Link href="/events" className="btn btn-primary">
            <span className="btn-text">View All Activities</span>
            <span className="btn-icon">🎯</span>
          </Link>
          <Link href="/join" className="btn btn-secondary">
            <span className="btn-text">Join Us Today</span>
            <span className="btn-icon">✨</span>
          </Link>
        </div> */}

        {/* Floating decorative elements */}
        <div className="floating-elements">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;