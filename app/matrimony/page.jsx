import React from 'react';
import Image from 'next/image';

const MatrimonyPage = () => {
  return (
    <div className="matrimony-page">
      <div className="page-header matrimony-header">
        <div className="container">
          <h1 className="page-title">Baranwal Ekta Sanstha Matrimony</h1>
          <p className="page-description">
            Connecting community members for meaningful relationships based on shared values and traditions.
          </p>
        </div>
      </div>
      
      <section className="section matrimony-intro">
        <div className="container">
          <div className="grid-2">
            <div className="matrimony-text">
              <h2>About Our Matrimony Service</h2>
              <p>
                The Baranwal Ekta Sanstha Matrimony service is designed to help community members find compatible partners 
                who share our cultural values and traditions. We understand the importance of preserving 
                our heritage while building strong families for the future.
              </p>
              <p>
                Our service is exclusively available to Baranwal Ekta Sanstha members and their families. 
                We prioritize privacy, respect, and compatibility in all our matchmaking efforts.
              </p>
              <div className="matrimony-stats">
                <div className="stat-item">
                  <span className="stat-number">200+</span>
                  <span className="stat-label">Active Profiles</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Successful Matches</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Years of Service</span>
                </div>
              </div>
            </div>
            <div className="matrimony-image">
              <Image
                src="/api/placeholder/600/400"
                alt="Baranwal Ekta Sanstha Matrimony"
                width={600}
                height={400}
                className="intro-image"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="section how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Register</h3>
                <p>
                  Complete our detailed profile registration form with information about yourself, 
                  your background, interests, and what you're looking for in a partner.
                </p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Verification</h3>
                <p>
                  Our team verifies your community membership and the information provided 
                  to ensure a safe and trustworthy environment for all participants.
                </p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Browse Profiles</h3>
                <p>
                  Once approved, you can browse through profiles of other members who match 
                  your preferences and compatibility factors.
                </p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Express Interest</h3>
                <p>
                  When you find profiles that interest you, you can express interest through 
                  our system, which will notify the other party discreetly.
                </p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h3>Connect</h3>
                <p>
                  If there's mutual interest, our team will facilitate an introduction and 
                  provide a secure way for both parties to communicate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">Success Stories</h2>
          
          <div className="testimonials-slider">
            <div className="testimonial-card">
              <div className="testimonial-image">
                <Image
                  src="/api/placeholder/400/400"
                  alt="Happy Couple"
                  width={100}
                  height={100}
                  className="testimonial-couple"
                />
              </div>
              <div className="testimonial-content">
                <p className="testimonial-text">
                  "We met through the Baranwal Ekta Sanstha Matrimony service in 2022 and immediately connected 
                  over our shared values and interests. The community support made our journey 
                  to marriage so much smoother. We're grateful for this wonderful platform!"
                </p>
                <p className="testimonial-author">- Rahul & Priya, Matched in 2022</p>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-image">
                <Image
                  src="/api/placeholder/400/400"
                  alt="Happy Couple"
                  width={100}
                  height={100}
                  className="testimonial-couple"
                />
              </div>
              <div className="testimonial-content">
                <p className="testimonial-text">
                  "As someone who values cultural traditions, I was looking for a partner who 
                  shared the same priorities. The Baranwal Ekta Sanstha Matrimony service understood exactly what 
                  I was looking for and helped me find my perfect match."
                </p>
                <p className="testimonial-author">- Anita & Vijay, Matched in 2023</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section registration-section">
        <div className="container">
          <div className="registration-box">
            <h2>Ready to Begin Your Journey?</h2>
            <p>
              Join our matrimony service to connect with potential partners who share your values, 
              culture, and vision for the future. Our team is dedicated to helping you find a 
              meaningful and lasting relationship.
            </p>
            <div className="registration-buttons">
              <a href="#" className="btn">
                Register Now
              </a>
              <a href="#" className="btn btn-secondary">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          
          <div className="faq-container">
            <div className="faq-item">
              <h3 className="faq-question">Who can register for the matrimony service?</h3>
              <p className="faq-answer">
                Our matrimony service is available to all Baranwal Ekta Sanstha members and their families. 
                Both individuals seeking partners and parents searching for matches for their children are welcome.
              </p>
            </div>
            
            <div className="faq-item">
              <h3 className="faq-question">Is my information kept confidential?</h3>
              <p className="faq-answer">
                Yes, we take privacy very seriously. Your personal information is only shared with 
                potential matches after you have given consent. We never share your details with third parties.
              </p>
            </div>
            
            <div className="faq-item">
              <h3 className="faq-question">Is there a fee for using the service?</h3>
              <p className="faq-answer">
                There is a nominal registration fee to maintain the quality of our service. 
                Community members with financial constraints may apply for a fee waiver.
              </p>
            </div>
            
            <div className="faq-item">
              <h3 className="faq-question">How long does the matching process take?</h3>
              <p className="faq-answer">
                The time frame varies for each individual based on their specific preferences and compatibility factors. 
                Our team works diligently to identify suitable matches, but quality is our priority over speed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MatrimonyPage;