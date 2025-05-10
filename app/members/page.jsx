import React from 'react';
import Image from 'next/image';

const MembersPage = () => {
  // Example data for members
  const members = [
    {
      id: 1,
      name: 'John Doe',
      position: 'President',
      image: '/api/placeholder/300/300',
      bio: 'Community leader with 15 years of experience.',
      email: 'john.doe@example.com',
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'Cultural Secretary',
      image: '/api/placeholder/300/300',
      bio: 'Passionate about preserving our cultural heritage.',
      email: 'jane.smith@example.com',
    },
    {
      id: 3,
      name: 'Robert Johnson',
      position: 'Youth Coordinator',
      image: '/api/placeholder/300/300',
      bio: 'Engaging the next generation of community members.',
      email: 'robert.johnson@example.com',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      position: 'Events Director',
      image: '/api/placeholder/300/300',
      bio: 'Organizing community gatherings for over a decade.',
      email: 'sarah.williams@example.com',
    },
    {
      id: 5,
      name: 'Michael Brown',
      position: 'Treasurer',
      image: '/api/placeholder/300/300',
      bio: 'Managing the financial aspects of our community.',
      email: 'michael.brown@example.com',
    },
    {
      id: 6,
      name: 'Emily Davis',
      position: 'Education Coordinator',
      image: '/api/placeholder/300/300',
      bio: 'Developing educational programs for all age groups.',
      email: 'emily.davis@example.com',
    },
    {
      id: 7,
      name: 'David Wilson',
      position: 'Community Outreach',
      image: '/api/placeholder/300/300',
      bio: 'Building relationships with other organizations and communities.',
      email: 'david.wilson@example.com',
    },
    {
      id: 8,
      name: 'Lisa Martinez',
      position: 'Senior Affairs',
      image: '/api/placeholder/300/300',
      bio: 'Advocating for the needs of our elderly members.',
      email: 'lisa.martinez@example.com',
    },
  ];

  return (
    <div className="members-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Our Members</h1>
          <p className="page-description">
            Meet the dedicated individuals who make up our Baranwal Samaj and contribute to its success.
          </p>
        </div>
      </div>
      
      <section className="section">
        <div className="container">
          <div className="members-filters">
            <h2>Core Community Members</h2>
            <p>
              These individuals actively participate in community events, volunteer their time, and contribute to our collective growth.
            </p>
          </div>
          
          <div className="members-directory grid-4">
            {members.map((member) => (
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
                  <a href={`mailto:${member.email}`} className="member-contact">
                    Contact
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="section membership-section">
        <div className="container">
          <div className="grid-2">
            <div className="membership-info">
              <h2>Join Our Community</h2>
              <p>
                We welcome new members who are interested in preserving our cultural heritage and building strong community bonds. Membership benefits include:
              </p>
              <ul className="membership-benefits">
                <li>Access to all community events and activities</li>
                <li>Voting rights in community decisions</li>
                <li>Networking opportunities with fellow members</li>
                <li>Regular newsletters and updates</li>
                <li>Participation in special interest groups</li>
              </ul>
              <a href="#" className="btn">Apply for Membership</a>
            </div>
            <div className="membership-image">
              <Image
                src="/api/placeholder/600/400"
                alt="Community gathering"
                width={600}
                height={400}
                style={{ objectFit: 'cover', borderRadius: 'var(--border-radius)' }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MembersPage;