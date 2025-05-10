import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './ActivitiesSection.css';

const ActivitiesSection = () => {
  // Example activities data
  const activities = [
    {
      id: 1,
      title: 'Cultural Festivals',
      description: 'Annual celebrations that showcase our traditions, music, dance, and cuisine.',
      image: '/api/placeholder/400/300',
      link: '/events',
    },
    {
      id: 2,
      title: 'Youth Programs',
      description: 'Educational and recreational activities designed to engage and inspire the next generation.',
      image: '/api/placeholder/400/300',
      link: '/events',
    },
    {
      id: 3,
      title: 'Community Service',
      description: 'Volunteer opportunities to give back to the broader community and support those in need.',
      image: '/api/placeholder/400/300',
      link: '/events',
    },
    {
      id: 4,
      title: 'Educational Workshops',
      description: 'Skill-building sessions, language classes, and cultural education programs.',
      image: '/api/placeholder/400/300',
      link: '/events',
    },
    {
      id: 5,
      title: 'Senior Support',
      description: 'Programs dedicated to the well-being and engagement of our elderly community members.',
      image: '/api/placeholder/400/300',
      link: '/events',
    },
    {
      id: 6,
      title: 'Sports & Recreation',
      description: 'Athletic events and recreational activities that promote health and camaraderie.',
      image: '/api/placeholder/400/300',
      link: '/events',
    },
  ];

  return (
    <section className="section activities-section" id="activities">
      <div className="container">
        <h2 className="section-title">Our Activities</h2>
        
        <div className="activities-intro">
          <p>
            At Baranwal Samaj, we organize a wide range of activities throughout 
            the year to engage our members, preserve our culture, and strengthen 
            our bonds. Here are some of our key programs:
          </p>
        </div>
        
        <div className="activities-grid">
          {activities.map((activity) => (
            <div className="activity-card" key={activity.id}>
              <div className="activity-image-container">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  width={400}
                  height={300}
                  className="activity-image"
                />
              </div>
              <div className="activity-details">
                <h3 className="activity-title">{activity.title}</h3>
                <p className="activity-description">{activity.description}</p>
                <Link href={activity.link} className="activity-link">
                  Learn More <span>&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="activities-cta">
          <Link href="/events" className="btn">
            View All Activities
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;