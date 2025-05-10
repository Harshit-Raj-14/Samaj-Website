import React from 'react';
import Image from 'next/image';

const CommitteePage = () => {
  // Example data for committee members
  const committeeMembers = [
    {
      id: 1,
      name: 'John Doe',
      position: 'President',
      image: '/api/placeholder/300/300',
      bio: 'John has served as president for 3 years, bringing 15 years of community leadership experience. He focuses on strategic planning and community growth.',
      email: 'john.doe@example.com',
      phone: '(123) 456-7890',
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'Vice President',
      image: '/api/placeholder/300/300',
      bio: 'Jane works closely with the president to oversee day-to-day operations and lead special initiatives to strengthen our community bonds.',
      email: 'jane.smith@example.com',
      phone: '(123) 456-7891',
    },
    {
      id: 3,
      name: 'Michael Brown',
      position: 'Treasurer',
      image: '/api/placeholder/300/300',
      bio: 'Michael manages our finances, budgeting, and fundraising efforts to ensure the sustainability of our community programs.',
      email: 'michael.brown@example.com',
      phone: '(123) 456-7892',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      position: 'Secretary',
      image: '/api/placeholder/300/300',
      bio: 'Sarah handles communications, record-keeping, and documentation of all community meetings and events.',
      email: 'sarah.williams@example.com',
      phone: '(123) 456-7893',
    },
    {
      id: 5,
      name: 'David Wilson',
      position: 'Cultural Affairs',
      image: '/api/placeholder/300/300',
      bio: 'David leads initiatives to preserve and promote our cultural heritage through events, education, and documentation.',
      email: 'david.wilson@example.com',
      phone: '(123) 456-7894',
    },
    {
      id: 6,
      name: 'Emily Davis',
      position: 'Education Director',
      image: '/api/placeholder/300/300',
      bio: 'Emily oversees educational programs for community members of all ages, from language classes to skill development workshops.',
      email: 'emily.davis@example.com',
      phone: '(123) 456-7895',
    },
    {
      id: 7,
      name: 'Robert Johnson',
      position: 'Youth Coordinator',
      image: '/api/placeholder/300/300',
      bio: 'Robert designs and implements programs specifically for young community members, focusing on leadership and cultural connection.',
      email: 'robert.johnson@example.com',
      phone: '(123) 456-7896',
    },
    {
      id: 8,
      name: 'Lisa Martinez',
      position: 'Senior Affairs',
      image: '/api/placeholder/300/300',
      bio: 'Lisa advocates for the needs of elderly members and coordinates support services and social activities for seniors.',
      email: 'lisa.martinez@example.com',
      phone: '(123) 456-7897',
    },
    {
      id: 9,
      name: 'Thomas Clark',
      position: 'Events Coordinator',
      image: '/api/placeholder/300/300',
      bio: 'Thomas plans and organizes community gatherings, celebrations, and other events throughout the year.',
      email: 'thomas.clark@example.com',
      phone: '(123) 456-7898',
    },
  ];

  return (
    <div className="committee-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Our Committee</h1>
          <p className="page-description">
            Meet the dedicated individuals who lead our community and work tirelessly to fulfill our mission.
          </p>
        </div>
      </div>
      
      <section className="section">
        <div className="container">
          <div className="committee-intro">
            <h2>Executive Committee</h2>
            <p>
              Our executive committee is elected by community members to serve two-year terms. 
              They meet monthly to discuss and decide on matters affecting our community, plan events, 
              and oversee various initiatives.
            </p>
          </div>
          
          <div className="committee-grid grid-3">
            {committeeMembers.slice(0, 4).map((member) => (
              <div className="committee-card" key={member.id}>
                <div className="committee-image-container">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="committee-image"
                  />
                </div>
                <div className="committee-details">
                  <h3 className="committee-name">{member.name}</h3>
                  <p className="committee-position">{member.position}</p>
                  <p className="committee-bio">{member.bio}</p>
                  <div className="committee-contact">
                    <p><strong>Email:</strong> {member.email}</p>
                    <p><strong>Phone:</strong> {member.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="committee-intro">
            <h2>Department Heads</h2>
            <p>
              These individuals lead specific areas of community activity, bringing their expertise 
              and passion to their respective domains.
            </p>
          </div>
          
          <div className="committee-grid grid-3">
            {committeeMembers.slice(4).map((member) => (
              <div className="committee-card" key={member.id}>
                <div className="committee-image-container">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="committee-image"
                  />
                </div>
                <div className="committee-details">
                  <h3 className="committee-name">{member.name}</h3>
                  <p className="committee-position">{member.position}</p>
                  <p className="committee-bio">{member.bio}</p>
                  <div className="committee-contact">
                    <p><strong>Email:</strong> {member.email}</p>
                    <p><strong>Phone:</strong> {member.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="section organizational-structure">
        <div className="container">
          <h2 className="section-title">Organizational Structure</h2>
          <div className="organization-chart">
            <div className="chart-level">
              <div className="chart-box chart-box-main">
                <h3>General Assembly</h3>
                <p>All Community Members</p>
              </div>
            </div>
            
            <div className="chart-arrow"></div>
            
            <div className="chart-level">
              <div className="chart-box chart-box-secondary">
                <h3>Executive Committee</h3>
                <p>President, Vice President, Secretary, Treasurer</p>
              </div>
            </div>
            
            <div className="chart-arrow"></div>
            
            <div className="chart-level chart-level-departments">
              <div className="chart-box">
                <h3>Cultural Affairs</h3>
              </div>
              <div className="chart-box">
                <h3>Education</h3>
              </div>
              <div className="chart-box">
                <h3>Youth</h3>
              </div>
              <div className="chart-box">
                <h3>Senior Affairs</h3>
              </div>
              <div className="chart-box">
                <h3>Events</h3>
              </div>
            </div>
          </div>
          
          <div className="elections-info">
            <h3>Committee Elections</h3>
            <p>
              Elections for committee positions are held every two years in April. 
              All community members in good standing are eligible to vote and run for positions. 
              The next election will be held in April 2026.
            </p>
            <p>
              If you are interested in serving on the committee or have questions about the election process, 
              please contact our current Secretary at secretary@Baranwal Samajcommunity.org.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommitteePage;