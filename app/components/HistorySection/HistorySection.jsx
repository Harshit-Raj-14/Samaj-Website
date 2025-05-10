import React from 'react';
import Image from 'next/image';
import './HistorySection.css';

const HistorySection = () => {
  return (
    <section className="section history-section" id="history">
      <div className="container">
        <h2 className="section-title">Our History</h2>
        
        <div className="history-content">
          <div className="history-image-container">
            <Image 
              src="/api/placeholder/600/400" 
              alt="Baranwal Samaj History" 
              width={600} 
              height={400} 
              className="history-image"
            />
          </div>
          
          <div className="history-text">
            <h3>Founded in 1950</h3>
            <p>
              The Baranwal Samaj was established in 1950 by a group of visionary 
              leaders who recognized the importance of preserving our cultural heritage 
              while adapting to a changing world.
            </p>
            
            <p>
              Over the decades, our community has grown from a small gathering of 
              families to a vibrant organization with hundreds of members across the region. 
              Through challenges and triumphs, we have remained committed to our founding 
              principles of unity, service, and cultural preservation.
            </p>
            
            <p>
              Today, the Baranwal Samaj continues to build on this rich legacy, 
              creating programs and initiatives that serve the evolving needs of our 
              members while honoring our traditions and history.
            </p>
            
            <div className="history-milestones">
              <div className="milestone">
                <div className="milestone-year">1950</div>
                <div className="milestone-text">Community Foundation</div>
              </div>
              
              <div className="milestone">
                <div className="milestone-year">1975</div>
                <div className="milestone-text">Cultural Center Established</div>
              </div>
              
              <div className="milestone">
                <div className="milestone-year">2000</div>
                <div className="milestone-text">50th Anniversary Celebration</div>
              </div>
              
              <div className="milestone">
                <div className="milestone-year">2020</div>
                <div className="milestone-text">Digital Transformation Initiative</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;