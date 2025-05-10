import React from 'react';
import Link from 'next/link';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ff9800" fillOpacity="0.2" d="M0,96L48,112C96,128,192,160,288,154.7C384,149,480,107,576,112C672,117,768,171,864,176C960,181,1056,139,1152,117.3C1248,96,1344,96,1392,96L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>
      
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h3 className="footer-title">Baranwal Samaj</h3>
            <p>
              We are dedicated to preserving our cultural heritage and 
              building a strong, supportive community for all our members.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div className="footer-section links">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/members">Members</Link></li>
              <li><Link href="/committee">Committee</Link></li>
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/matrimony">Matrimony</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
            </ul>
          </div>

          <div className="footer-section contact">
            <h3 className="footer-title">Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <p>123 Community Avenue, City, State, Country</p>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <p>+1 (123) 456-7890</p>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <p>info@Baranwal Samajcommunity.org</p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {currentYear} Baranwal Samaj. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

