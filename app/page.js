import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
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

      {/* About Section */}
      <section className="section about-section" id="about">
        <div className="container">
          <h2 className="section-title">About Baranwal Samaj</h2>
          <div className="about-content grid-2">
            <div className="about-text">
              <p>
                The Baranwal Samaj was established with a vision to preserve our rich cultural heritage 
                while adapting to a changing world. Over the decades, we have grown into a vibrant 
                organization with hundreds of members across the region.
              </p>
              <p>
                Our community is built on the principles of unity, service, and cultural preservation. 
                We organize various events, educational programs, and social activities to bring our 
                members together and strengthen our community bonds.
              </p>
              <p>
                Whether you're looking to connect with your roots, participate in cultural activities, 
                or simply be part of a supportive community, Baranwal Samaj welcomes you with open arms.
              </p>
              <div className="about-stats">
                <div className="stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-text">Members</span>
                </div>
                <div className="stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-text">Annual Events</span>
                </div>
                <div className="stat">
                  <span className="stat-number">25+</span>
                  <span className="stat-text">Years of Service</span>
                </div>
              </div>
            </div>
            <div className="about-image">
              <div className="image-placeholder" style={{ 
                width: '100%', 
                height: '400px', 
                backgroundColor: '#f0f0f0', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundImage: 'linear-gradient(135deg, #ffc107 10%, #ff9800 100%)',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
              }}>
                Community Image Placeholder
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="section activities-section" id="activities">
        <div className="container">
          <h2 className="section-title">Our Activities</h2>
          <p className="section-description">
            At Baranwal Samaj, we organize a wide range of activities throughout the year to engage our members, 
            preserve our culture, and strengthen our bonds. Here are some of our key programs:
          </p>
          <div className="activities-grid grid-3">
            <div className="card">
              <div className="card-icon">
                <i className="fas fa-music"></i>
              </div>
              <h3>Cultural Events</h3>
              <p>Celebrations that showcase our traditions, music, dance, and cuisine throughout the year.</p>
              <Link href="/events" className="card-link">
                Learn More <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            <div className="card">
              <div className="card-icon">
                <i className="fas fa-book"></i>
              </div>
              <h3>Educational Programs</h3>
              <p>Language classes, workshops, and heritage sessions for all age groups.</p>
              <Link href="/events" className="card-link">
                Learn More <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            <div className="card">
              <div className="card-icon">
                <i className="fas fa-hands-helping"></i>
              </div>
              <h3>Community Service</h3>
              <p>Volunteer opportunities to give back to the broader community and support those in need.</p>
              <Link href="/events" className="card-link">
                Learn More <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Event Section */}
      <section className="section featured-event-section">
        <div className="container">
          <div className="featured-event">
            <div className="featured-event-content">
              <div className="event-label">Upcoming Event</div>
              <h2>Annual Community Festival 2025</h2>
              <p className="event-date">
                <i className="fas fa-calendar"></i> June 15-16, 2025
              </p>
              <p className="event-location">
                <i className="fas fa-map-marker-alt"></i> Baranwal Samaj Center
              </p>
              <p className="event-description">
                Join us for our biggest celebration of the year featuring cultural performances, 
                traditional food, games, and activities for all ages. This two-day event brings 
                together community members from across the region.
              </p>
              <Link href="/events" className="btn">
                Register Now
              </Link>
            </div>
            <div className="featured-event-image">
              <div className="image-placeholder" style={{ 
                width: '100%', 
                height: '100%', 
                backgroundColor: '#f0f0f0', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundImage: 'linear-gradient(135deg, #ff9800 10%, #ff5722 100%)',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
              }}>
                Event Image Placeholder
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Members Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial">
              <div className="testimonial-content">
                <p>
                  "Being part of the Baranwal Samaj has helped me stay connected to my roots and pass 
                  on our cultural traditions to my children. The events and activities bring us together 
                  and create a sense of belonging."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-image" style={{ 
                  width: '60px', 
                  height: '60px', 
                  backgroundColor: '#ffc107', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}>
                  AP
                </div>
                <div className="author-info">
                  <h4>Anita Patel</h4>
                  <p>Member since 2018</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial">
              <div className="testimonial-content">
                <p>
                  "The educational programs and cultural events have been invaluable for our family. 
                  My kids love attending the youth programs and have made lifelong friends within 
                  the community."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-image" style={{ 
                  width: '60px', 
                  height: '60px', 
                  backgroundColor: '#ff9800', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}>
                  RK
                </div>
                <div className="author-info">
                  <h4>Raj Kumar</h4>
                  <p>Member since 2015</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container text-center">
          <h2>Join Our Community Today</h2>
          <p>
            Become a part of the Baranwal Samaj family and connect with people who share your values and heritage. 
            Our membership is open to individuals and families who wish to participate in our community's 
            growth and activities.
          </p>
          <Link href="/members" className="btn">
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
}