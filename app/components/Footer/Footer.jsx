'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Youtube, MessageCircle, Bell } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const footerElement = document.getElementById('footer');
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, []);

  return (
    <footer className={`footer ${isVisible ? 'animate-in' : ''}`} id="footer">
      {/* Decorative Top Wave */}
      <div className="footer-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,120 C200,80 400,40 600,80 C800,120 1000,40 1200,80 L1200,120 Z" fill="#000"></path>
        </svg>
      </div>

      <div className="footer-content">
        <div className="container">
          {/* Main Footer Content */}
          <div className="footer-main">
            <div className="footer-grid">
              
              {/* Organization Info */}
              <div className="footer-section organization-info">
                <div className="footer-logo">
                  <div>
                    <Image 
                      src="/logo.png" 
                      alt="Baranwal Ekta Sanstha Logo" 
                      width={48} 
                      height={48}
                      className="logo-image"
                      style={{
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <div className="logo-text">
                    <h3>Baranwal Ekta Sanstha</h3>
                  </div>
                </div>
                
                <p className="organization-description">
                  Preserving our rich cultural heritage while building a strong, 
                  united community for future generations. Together we celebrate 
                  traditions, support each other, and create lasting bonds.
                </p>

                <div className="social-links">
                  <h4>Connect With Us</h4>
                  <div className="social-icons">
                    <Link href="https://facebook.com" className="social-link facebook">
                      <Facebook className="social-icon" size={20} />
                    </Link>
                    <Link href="https://twitter.com" className="social-link twitter">
                      <Twitter className="social-icon" size={20} />
                    </Link>
                    <Link href="https://instagram.com" className="social-link instagram">
                      <Instagram className="social-icon" size={20} />
                    </Link>
                    <Link href="https://youtube.com" className="social-link youtube">
                      <Youtube className="social-icon" size={20} />
                    </Link>
                    <Link href="https://whatsapp.com" className="social-link whatsapp">
                      <MessageCircle className="social-icon" size={20} />
                    </Link>
                  </div>
                </div>

                {/* Newsletter Signup - Moved below social links */}
                <div className="newsletter-inline">
                  <h4>Stay Updated</h4>
                  <p className="newsletter-description">
                    Subscribe to our newsletter for latest events, news, and community updates.
                  </p>
                  
                  <form className="newsletter-form">
                    <div className="input-group">
                      <input 
                        type="email" 
                        placeholder="Enter your email address"
                        className="newsletter-input"
                        required
                      />
                      <button type="submit" className="newsletter-button">
                        <span>Subscribe</span>
                        <Bell className="button-icon" size={16} />
                      </button>
                    </div>
                    <label className="newsletter-checkbox">
                      <input type="checkbox" required />
                      <span className="checkmark"></span>
                      <span className="checkbox-text">
                        I agree to receive newsletters and updates
                      </span>
                    </label>
                  </form>
                </div>
              </div>

              {/* Quick Links */}
              <div className="footer-section">
                <h4 className="footer-title">Quick Links</h4>
                <ul className="footer-links">
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/about">About Us</Link></li>
                  <li><Link href="/activities">Our Activities</Link></li>
                  <li><Link href="/events">Events</Link></li>
                  <li><Link href="/achievements">Achievements</Link></li>
                  <li><Link href="/gallery">Photo Gallery</Link></li>
                  <li><Link href="/contact">Contact Us</Link></li>
                </ul>
              </div>

              {/* Community Services */}
              <div className="footer-section">
                <h4 className="footer-title">Community Services</h4>
                <ul className="footer-links">
                  <li><Link href="/services/membership">Membership</Link></li>
                  <li><Link href="/services/cultural">Cultural Programs</Link></li>
                  <li><Link href="/services/education">Educational Support</Link></li>
                  <li><Link href="/services/youth">Youth Development</Link></li>
                  <li><Link href="/services/welfare">Community Welfare</Link></li>
                  <li><Link href="/services/matrimonial">Matrimonial Network</Link></li>
                </ul>
              </div>

              {/* Contact Information */}
              <div className="footer-section contact-info">
                <h4 className="footer-title">Get In Touch</h4>
                
                <div className="contact-details">
                  <div className="contact-item">
                    <div className="contact-icon">📍</div>
                    <div className="contact-text">
                      <h5>Main Office</h5>
                      <p>CHL, 13 Prem Nagar Sudhar Sangh<br />Linking Road, Opp. Teen Dongri<br />Goregaon(West), Mumbai-400090</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">📞</div>
                    <div className="contact-text">
                      <h5>Phone Numbers</h5>
                      <p>+91 7870868601<br />+91 9029995569</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">✉️</div>
                    <div className="contact-text">
                      <h5>Email Address</h5>
                      <p>baranwalektasanstha@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="footer-legal">
                <p>&copy; {currentYear} Baranwal Ekta Sanstha. All rights reserved.</p>
                <div className="legal-links">
                  <Link href="#">Privacy Policy</Link>
                  <span className="separator">•</span>
                  <Link href="#">Terms of Service</Link>
                  <span className="separator">•</span>
                  <Link href="#">Cookie Policy</Link>
                  <span className="separator">•</span>
                  <Link href="https://baranwalektasanstha.vercel.app/sitemap.xml">Sitemap</Link>
                </div>
              </div>
              
              <div className="footer-credits">
                <p>Made with ❤️ for our community</p>
                <div className="developer-credit">
                  <span>Developed by</span>
                  <Link href="https://mythraglobal.vercel.app/" className="developer-link">Mythra Global Technologies</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
    </footer>
  );
};

export default Footer;