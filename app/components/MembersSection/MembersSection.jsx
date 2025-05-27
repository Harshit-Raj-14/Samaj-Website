import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './MembersSection.css';

const MembersSection = () => {
  // Example data for featured members
  const featuredMembers = [
    {
      id: 1,
      name: 'John Doe',
      position: 'President',
      image: '/api/placeholder/300/300',
      bio: 'Community leader with 15 years of experience.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'Cultural Secretary',
      image: '/api/placeholder/300/300',
      bio: 'Passionate about preserving our cultural heritage.',
    },
    {
      id: 3,
      name: 'Robert Johnson',
      position: 'Youth Coordinator',
      image: '/api/placeholder/300/300',
      bio: 'Engaging the next generation of community members.',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      position: 'Events Director',
      image: '/api/placeholder/300/300',
      bio: 'Organizing community gatherings for over a decade.',
    },
  ];

  return (
    <section className="section members-section" id="members">
      <div className="container">
        <h2 className="section-title">Our Members</h2>
        
        <div className="members-intro">
          <p>
            Our community is made up of dedicated individuals who contribute 
            their time, expertise, and passion to make Baranwal Ekta Sanstha a vibrant and 
            supportive organization for all. Here are some of our featured members.
          </p>
        </div>
        
        <div className="members-grid">
          {featuredMembers.map((member) => (
            <div className="member-card" key={member.id}>
              <div className="member-image-container">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="member-image"
                />
              </div>
              <div className="member-details">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-position">{member.position}</p>
                <p className="member-bio">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="members-cta">
          <p>
            Interested in joining our community or learning more about our members?
          </p>
          <Link href="/members" className="btn">
            View All Members
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MembersSection;