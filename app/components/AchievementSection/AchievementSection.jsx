'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './AchievementsSection.css';

const AchievementsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);

  // Achievements data - Only 2 achievements
  const achievements = [
    {
      id: 1,
      type: 'Sports Excellence',
      name: 'Aadya Baranwal',
      title: '3-Time Guinness World Record Holder',
      subtitle: 'Endurance National Championship Qualifier',
      description: 'Our community proudly supported this exceptional athlete who achieved remarkable success in the Endurance National Championship 2024-25. Selected to represent India in the Endurance Afro-Asian Championship, this achievement showcases the sporting excellence within our Baranwal Ekta Sanstha family.',
      achievement: 'Selected for International Championship',
      location: 'Maharashtra, India',
      date: 'June 5-8, 2025',
      supportRole: 'Community Financial Support',
      highlights: [
        '3-Time Guinness World Record Holder',
        'National Championship Participant',
        'India Team Representative',
        'Afro-Asian Championship Qualifier'
      ],
      images: [
        '/images/achievement-1-1.png',
        '/images/achievement-1-2.png',
        '/images/achievement-1-3.png'
      ],
      color: '#007bff',
      icon: '🏆',
      category: 'Sports',
      link: 'https://drive.google.com/file/d/11KYKZuc8dsWlykMBQ0VUODnv1lGGlt-E/view?usp=sharing'
    },
    {
      id: 2,
      type: 'Cinema & Arts',
      name: 'Rajeev Barnwal',
      title: 'Acclaimed Film Director & Writer',
      subtitle: 'Filmfare Award Winner',
      description: 'Rajeev Barnwal has made significant contributions to Indian cinema as a writer and director. Known for his exceptional work on "VADH" and the critically acclaimed web series "Jehanabad: Of Love and War", he represents the artistic excellence of our community.',
      achievement: 'Best Debut Director - 68th Filmfare Awards',
      location: 'Indian Film Industry',
      date: '2023',
      supportRole: 'Community Pride & Recognition',
      highlights: [
        'Best Debut Director - Filmfare Awards',
        'Director of "VADH"',
        'Creator of "Jehanabad: Of Love and War"',
        'Acclaimed for Nuanced Storytelling'
      ],
      images: [
        '/images/achievement-2-1.png',
        '/images/achievement-2-2.png',
        '/images/achievement-2-3.png'
      ],
      color: '#ffc107',
      icon: '🎬',
      category: 'Arts',
      link: 'https://www.imdb.com/name/nm2426355/'
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
      { threshold: 0.2 }
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

  // Auto-rotate carousel
  useEffect(() => {
    if (!isPaused && achievements.length > 1) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) =>
          prevIndex === achievements.length - 1 ? 0 : prevIndex + 1
        );
      }, 7000); // Change every 7 seconds

      return () => clearInterval(interval);
    }
  }, [achievements.length, isPaused]);

  // Debug effect to log activeIndex changes
  useEffect(() => {
    console.log('Active index changed to:', activeIndex);
  }, [activeIndex]);

  const currentAchievement = achievements[activeIndex];

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const nextSlide = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = prevIndex === achievements.length - 1 ? 0 : prevIndex + 1;
      console.log('Next slide - Current:', prevIndex, 'New:', newIndex); // Debug log
      return newIndex;
    });
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? achievements.length - 1 : prevIndex - 1;
      console.log('Prev slide - Current:', prevIndex, 'New:', newIndex); // Debug log
      return newIndex;
    });
  };

  return (
    <section 
      className={`achievements-section ${isVisible ? 'animate-in' : ''}`}
      ref={sectionRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Elements */}
      <div className="achievements-bg">
        <div className="bg-pattern"></div>
        <div className="floating-awards">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`award-shape award-${i + 1}`}>
              {['🏆', '🥇', '⭐', '🎖️', '👑'][i]}
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="header-badge">
            <span className="badge-icon">🌟</span>
            <span className="badge-text">Community Pride</span>
          </div>
          {/* <h2 className="section-title">Our Achievements</h2> */}
          <br></br>
          <p className="section-subtitle">
            Celebrating the remarkable accomplishments of Baranwal Ekta Sanstha members who bring honor to our community
          </p>
        </div>

        {/* Main Achievement Carousel */}
        <div className="achievement-carousel">
          <div className="carousel-container">
            <div 
              className="achievement-slides"
              style={{ 
                transform: `translateX(-${activeIndex * 50}%)`,
                width: '200%'
              }}
            >
              {achievements.map((achievement, index) => (
                <div key={achievement.id} className="achievement-slide">
                  <div className="achievement-card">
                    {/* Left Side - Content */}
                    <div className="achievement-content">
                      <div className="achievement-header">
                        <div className="achievement-meta">
                          <span 
                            className="achievement-category"
                            style={{ backgroundColor: achievement.color }}
                          >
                            <span className="category-icon">{achievement.icon}</span>
                            {achievement.type}
                          </span>
                          <span className="achievement-date">{achievement.date}</span>
                        </div>
                        
                        <h3 className="achiever-name">{achievement.name}</h3>
                        <h4 className="achievement-title">{achievement.title}</h4>
                        <p className="achievement-subtitle">{achievement.subtitle}</p>
                      </div>

                      <div className="achievement-details">
                        <div className="main-achievement">
                          <div className="achievement-icon" style={{ color: achievement.color }}>
                            🏅
                          </div>
                          <div className="achievement-info">
                            <h5>Main Achievement</h5>
                            <p>{achievement.achievement}</p>
                          </div>
                        </div>

                        <div className="support-info">
                          <div className="support-item">
                            <i className="icon">📍</i>
                            <span>{achievement.location}</span>
                          </div>
                          <div className="support-item">
                            <i className="icon">🤝</i>
                            <span>{achievement.supportRole}</span>
                          </div>
                        </div>

                        <p className="achievement-description">
                          {achievement.description}
                        </p>

                        <div className="achievement-highlights">
                          <h6>Key Highlights:</h6>
                          <div className="highlights-list">
                            {achievement.highlights.map((highlight, idx) => (
                              <span key={idx} className="highlight-tag">
                                ✓ {highlight}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="achievement-actions">
                          <Link 
                            href={`${achievement.link}`} target='blank'
                            className="btn btn-primary"
                            style={{ backgroundColor: achievement.color }}
                          >
                            <span>Read More</span>
                            <i className="btn-arrow">→</i>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Images */}
                    <div className="achievement-gallery">
                      <div className="gallery-header">
                        <h6>Achievement Gallery</h6>
                        <span className="gallery-count">
                          {achievement.images.length} Photos
                        </span>
                      </div>
                      
                      <div 
                        className="image-showcase"
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gridTemplateRows: 'auto auto',
                          gap: '12px',
                          height: '100%'
                        }}
                      >
                        {/* Main image - takes up left column, both rows */}
                        <div 
                          style={{ 
                            position: 'relative',
                            gridColumn: '1',
                            gridRow: '1 / 3',
                            height: '300px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            border: `3px solid ${achievement.color}`,
                            boxShadow: `0 8px 25px ${achievement.color}30`
                          }}
                        >
                          <Image
                            src={achievement.images[0]}
                            alt={`${achievement.name} - Main Achievement`}
                            fill
                            style={{
                              objectFit: 'cover',
                              objectPosition: 'center'
                            }}
                            sizes="(max-width: 768px) 100vw, 40vw"
                            onError={(e) => {
                              // Fallback if image fails to load
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          {/* Fallback content */}
                          <div 
                            style={{
                              display: 'none',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: `linear-gradient(135deg, ${achievement.color}30, ${achievement.color}50)`,
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'column',
                              color: achievement.color,
                              textAlign: 'center',
                              padding: '20px'
                            }}
                          >
                            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
                              {achievement.icon}
                            </div>
                            <h5 style={{ margin: '5px 0', fontSize: '1.1rem' }}>
                              {achievement.category}
                            </h5>
                            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
                              Main Achievement Photo
                            </p>
                          </div>
                        </div>
                        
                        {/* Thumbnail images - take up right column */}
                        {achievement.images.slice(1).map((img, idx) => (
                          <div 
                            key={idx}
                            style={{ 
                              position: 'relative',
                              gridColumn: '2',
                              gridRow: `${idx + 1}`,
                              height: '300px',
                              borderRadius: '8px',
                              overflow: 'hidden',
                              border: `2px solid ${achievement.color}`,
                              boxShadow: `0 4px 12px ${achievement.color}20`,
                              justifyContent: 'center',
                              alignContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Image
                              src={img}
                              alt={`${achievement.name} - Gallery ${idx + 2}`}
                              fill
                              style={{
                                objectFit: 'cover',
                                objectPosition: 'center'
                              }}
                              sizes="(max-width: 768px) 80vw, 80vw"
                              onError={(e) => {
                                // Fallback if image fails to load
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            {/* Fallback content */}
                            <div 
                              style={{
                                display: 'none',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: `linear-gradient(45deg, ${achievement.color}20, ${achievement.color}40)`,
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: achievement.color,
                                fontSize: '1.5rem'
                              }}
                            >
                              📸
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="carousel-navigation">
            <button className="nav-btn prev-btn" onClick={prevSlide}>
              <i className="nav-icon">‹</i>
            </button>
            <button className="nav-btn next-btn" onClick={nextSlide}>
              <i className="nav-icon">›</i>
            </button>
          </div>

          {/* Progress Indicators */}
          <div className="carousel-indicators">
            {achievements.map((achievement, index) => (
              <button
                key={achievement.id}
                className={`indicator ${index === activeIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                style={{ 
                  backgroundColor: index === activeIndex ? achievement.color : 'rgba(0,0,0,0.3)' 
                }}
              >
                <span className="indicator-tooltip">
                  {achievement.name}
                </span>
              </button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="progress-container">
            <div 
              className="progress-fill" 
              style={{ 
                backgroundColor: currentAchievement.color,
                animation: isPaused ? 'none' : 'progress-animation 7s linear infinite'
              }}
            ></div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="achievements-stats">
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-info">
              <h4>15+</h4>
              <p>Community Achievers</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🌟</div>
            <div className="stat-info">
              <h4>25+</h4>
              <p>Awards & Recognition</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <h4>100%</h4>
              <p>Community Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;