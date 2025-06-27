'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Youtube, MessageCircle, Bell } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const footerElement = document.getElementById('footer');
    if (footerElement) observer.observe(footerElement);

    return () => {
      if (footerElement) observer.unobserve(footerElement);
    };
  }, []);

  return (
    <footer className={`${styles.footer} ${isVisible ? styles['animate-in'] : ''}`} id="footer">
      <div className={styles['footer-content']}>
        <div className={styles.container}>
          <div className={styles['footer-main']}>
            <div className={styles['footer-grid']}>

              {/* Organization Info */}
              <div className={`${styles['footer-section']} ${styles['organization-info']}`}>
                <div className={styles['footer-logo']}>
                  <div>
                    <Image 
                      src="/logo.png" 
                      alt="Baranwal Ekta Sanstha Logo" 
                      width={48} 
                      height={48}
                      className={styles['logo-image']}
                      style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className={styles['logo-text']}>
                    <h3>Baranwal Ekta Sanstha</h3>
                  </div>
                </div>

                <p className={styles['organization-description']}>
                  Preserving our rich cultural heritage while building a strong, 
                  united community for future generations. Together we celebrate 
                  traditions, support each other, and create lasting bonds.
                </p>

                <div className={styles['social-links']}>
                  <h4>Connect With Us</h4>
                  <div className={styles['social-icons']}>
                    <Link href="https://facebook.com" className={`${styles['social-link']} ${styles.facebook}`}>
                      <Facebook className={styles['social-icon']} size={20} />
                    </Link>
                    <Link href="https://twitter.com" className={`${styles['social-link']} ${styles.twitter}`}>
                      <Twitter className={styles['social-icon']} size={20} />
                    </Link>
                    <Link href="https://instagram.com" className={`${styles['social-link']} ${styles.instagram}`}>
                      <Instagram className={styles['social-icon']} size={20} />
                    </Link>
                    <Link href="https://youtube.com" className={`${styles['social-link']} ${styles.youtube}`}>
                      <Youtube className={styles['social-icon']} size={20} />
                    </Link>
                    <Link href="https://whatsapp.com" className={`${styles['social-link']} ${styles.whatsapp}`}>
                      <MessageCircle className={styles['social-icon']} size={20} />
                    </Link>
                  </div>
                </div>

                <div className={styles['newsletter-inline']}>
                  <h4>Stay Updated</h4>
                  <p className={styles['newsletter-description']}>
                    Subscribe to our newsletter for latest events, news, and community updates.
                  </p>

                  <form className={styles['newsletter-form']}>
                    <div className={styles['input-group']}>
                      <input 
                        type="email" 
                        placeholder="Enter your email address"
                        className={styles['newsletter-input']}
                        required
                      />
                      <button type="submit" className={styles['newsletter-button']}>
                        <span>Subscribe</span>
                        <Bell className={styles['button-icon']} size={16} />
                      </button>
                    </div>
                    <label className={styles['newsletter-checkbox']}>
                      <input type="checkbox" required />
                      <span className={styles.checkmark}></span>
                      <span className={styles['checkbox-text']}>
                        I agree to receive newsletters and updates
                      </span>
                    </label>
                  </form>
                </div>
              </div>

              {/* Quick Links */}
              <div className={styles['footer-section']}>
                <h4 className={styles['footer-title']}>Quick Links</h4>
                <ul className={styles['footer-links']}>
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
              <div className={styles['footer-section']}>
                <h4 className={styles['footer-title']}>Community Services</h4>
                <ul className={styles['footer-links']}>
                  <li><Link href="/services/membership">Membership</Link></li>
                  <li><Link href="/services/cultural">Cultural Programs</Link></li>
                  <li><Link href="/services/education">Educational Support</Link></li>
                  <li><Link href="/services/youth">Youth Development</Link></li>
                  <li><Link href="/services/welfare">Community Welfare</Link></li>
                  <li><Link href="/services/matrimonial">Matrimonial Network</Link></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className={`${styles['footer-section']} ${styles['contact-info']}`}>
                <h4 className={styles['footer-title']}>Get In Touch</h4>
                <div className={styles['contact-details']}>
                  <div className={styles['contact-item']}>
                    <div className={styles['contact-icon']}>📍</div>
                    <div className={styles['contact-text']}>
                      <h5>Main Office</h5>
                      <p>CHL, 13 Prem Nagar Sudhar Sangh<br />Linking Road, Opp. Teen Dongri<br />Goregaon(West), Mumbai-400090</p>
                    </div>
                  </div>

                  <div className={styles['contact-item']}>
                    <div className={styles['contact-icon']}>📞</div>
                    <div className={styles['contact-text']}>
                      <h5>Phone Numbers</h5>
                      <p>+91 7870868601<br />+91 9136600629</p>
                    </div>
                  </div>

                  <div className={styles['contact-item']}>
                    <div className={styles['contact-icon']}>✉️</div>
                    <div className={styles['contact-text']}>
                      <h5>Email Address</h5>
                      <p>baranwalektasanstha@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className={styles['footer-bottom']}>
            <div className={styles['footer-bottom-content']}>
              <div className={styles['footer-legal']}>
                <p>&copy; {currentYear} Baranwal Ekta Sanstha. All rights reserved.</p>
                <div className={styles['legal-links']}>
                  <Link href="#">Privacy Policy</Link>
                  <span className={styles.separator}>•</span>
                  <Link href="#">Terms of Service</Link>
                  <span className={styles.separator}>•</span>
                  <Link href="#">Cookie Policy</Link>
                  <span className={styles.separator}>•</span>
                  <Link href="https://baranwalektasanstha.vercel.app/sitemap.xml">Sitemap</Link>
                </div>
              </div>

              <div className={styles['footer-credits']}>
                <p>Made with ❤️ for our community</p>
                <div className={styles['developer-credit']}>
                  <span>Developed by</span>
                  <Link href="https://mythraglobal.vercel.app/" className={styles['developer-link']}>
                    Mythra Global Technologies
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </footer>
  );
};

export default Footer;
