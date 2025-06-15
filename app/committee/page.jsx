'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './CommitteePage.css';


const CommitteePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPosition, setFilterPosition] = useState('');

  // Real committee members data from Baranwal Ekta Sanstha
  const committeeMembers = [
    {
      id: 1,
      name: 'Dilipkumar Harihar Prasad Baranwal',
      position: 'President',
      age: 54,
      occupation: 'Business',
      nationality: 'Indian',
      address: 'Chawl No. 18, Prem Nagar, Om Sai Seva Mandal, Unnat Nagar, Road No. 2, Goregaon (W), Mumbai - 400104',
      mobile: '9029995599',
      email: 'president@baranwalsamaj.org',
      image: '/api/placeholder/300/300',
      bio: 'Leading the community with dedication and vision for over a decade. Focused on strengthening cultural bonds and community development.'
    },
    {
      id: 2,
      name: 'Tulsidas Ramsaran Baranwal',
      position: 'Vice President',
      age: 69,
      occupation: 'Business',
      nationality: 'Indian',
      address: 'Room no. 889, Sangam Nagar, S.P Road, Near Police Chouki, Wadala, Antop Hill, Mumbai - 400037',
      mobile: '8928088448',
      email: 'vicepresident@baranwalsamaj.org',
      image: '/api/placeholder/300/300',
      bio: 'Supporting the president in strategic decisions and overseeing day-to-day community operations.'
    },
    {
      id: 3,
      name: 'Pramod Gopal Baranwal',
      position: 'Secretary',
      age: 50,
      occupation: 'Business',
      nationality: 'Indian',
      address: 'Flat no. G/3 Ground Floor, OM Krupa CHS LTD, Marve Road, Opp. Bafira Nagar, Near Fire Bridge, Lower Kharodi, Malad (West), Mumbai - 400095',
      mobile: '9223224808',
      email: 'pramodgbaranwal@gmail.com',
      image: '/api/placeholder/300/300',
      bio: 'Managing all documentation, communications, and ensuring proper record-keeping for the community.'
    },
    {
      id: 4,
      name: 'Anandkumar Sadhuram Baranwal',
      position: 'Joint Secretary',
      age: 64,
      occupation: 'Business',
      nationality: 'Indian',
      address: 'Room No. 461/2, Salt Pan Road, Manurwadi Antop Hill, Wadala (East), Mumbai - 400037',
      mobile: '8080967446',
      email: 'jointsecretary@baranwalsamaj.org',
      image: '/api/placeholder/300/300',
      bio: 'Assisting the secretary in administrative duties and supporting community initiatives.'
    },
    {
      id: 5,
      name: 'Brijeshkumar Harakchand Baranwal',
      position: 'Treasurer',
      age: 45,
      occupation: 'Business',
      nationality: 'Indian',
      address: 'Room No.15, Shiv Shankar Welfare Society, Prem Nagar, Near Sharmila Hotel, Goregaon (West), Mumbai - 400104',
      mobile: '9819938236',
      email: 'treasurer@baranwalsamaj.org',
      image: '/api/placeholder/300/300',
      bio: 'Managing finances, budgeting, and ensuring transparent financial operations for the community.'
    },
    {
      id: 6,
      name: 'Mahadeo Bamshankar Prasad',
      position: 'Joint Treasurer',
      age: 64,
      occupation: 'Business',
      nationality: 'Indian',
      address: 'Flat No.104, A wing Subharsh CHS Ltd, Plot No. 32, Sector 11, Kamothe Navi Mumbai, Kalamboli Node, Raighar, Maharashtra - 410218',
      mobile: '8850169173',
      email: 'jointtreasurer@baranwalsamaj.org',
      image: '/api/placeholder/300/300',
      bio: 'Supporting financial management and assisting in budget planning and execution.'
    },
    {
      id: 7,
      name: 'Vishal Kumar',
      position: 'Member',
      age: 62,
      occupation: 'Business',
      nationality: 'Indian',
      address: 'B/203, Orchid, Bld-10, Agarwal Doshi Complex, Opp. Sai Baba Mandir, Kauls Heritage city, Bhabola, Bassein Road, Vasai (West), Thane - 401202',
      mobile: '9819596939',
      email: 'member1@baranwalsamaj.org',
      image: '/api/placeholder/300/300',
      bio: 'Contributing to community welfare and participating in various social initiatives.'
    },
    {
      id: 8,
      name: 'Ramjit Ramsundar Gupta',
      position: 'Member',
      age: 65,
      occupation: 'Business',
      nationality: 'Indian',
      address: 'Room No. 6, Chacha Dhume Chawl, Road No. 1, Pahadi School, Goregaon (East), Mumbai - 400063',
      mobile: '7738757206',
      email: 'member2@baranwalsamaj.org',
      image: '/api/placeholder/300/300',
      bio: 'Active participant in community events and cultural preservation activities.'
    },
    {
      id: 9,
      name: 'Krishna Rambriksh Baranwal',
      position: 'Member',
      age: 35,
      occupation: 'Service',
      nationality: 'Indian',
      address: 'Room No. 2, Shri Niwas Chawl, Shivji Nagar, Near Sairam Apartment, Naupada, Thane (West), Maharashtra - 400602',
      mobile: '9987130673',
      email: 'member3@baranwalsamaj.org',
      image: '/api/placeholder/300/300',
      bio: 'Young leader bringing fresh perspectives and energy to community development.'
    },
    {
      id: 10,
      name: 'Subhashchandra Ramkaran Baranwal',
      position: 'Member',
      age: 57,
      occupation: 'Service',
      nationality: 'Indian',
      address: 'B205, Avantika Apartment, Chandansar Road, Behind Balchandra Nagar, Virar (East), Vasai, Palghar, Maharashtra - 401305',
      mobile: '9960021788',
      email: 'member4@baranwalsamaj.org',
      image: '/api/placeholder/300/300',
      bio: 'Dedicated to social service and community outreach programs.'
    },
    {
      id: 11,
      name: 'Ajay Jagatnarayan Baranwal',
      position: 'Member',
      age: 55,
      occupation: 'Business',
      nationality: 'Indian',
      address: 'Khadavla Apartment, Market Road, Boisar, Nawapur Boisar Thane, Maharashtra - 401501',
      mobile: '9892152558',
      email: 'member5@baranwalsamaj.org',
      image: '/api/placeholder/300/300',
      bio: 'Supporting business development initiatives and entrepreneurship within the community.'
    },
    {
      id: 12,
      name: 'Deepak Kumar',
      position: 'Member',
      age: 74,
      occupation: 'Business',
      nationality: 'Indian',
      address: 'PA/307, Malwani Satyam CO-OP Housing Society Ltd, New Mahada, Jankalyan Nagar, Nr. Bhoomi Park, Malad (West), Mumbai - 400095',
      mobile: '7870868601',
      email: 'member6@baranwalsamaj.org',
      image: '/api/placeholder/300/300',
      bio: 'Senior member providing wisdom and guidance to the community leadership.'
    },
    {
      id: 13,
      name: 'Abhinavkumar Shiv Kumarprasad Gupta',
      position: 'Member',
      age: 64,
      occupation: 'Service',
      nationality: 'Indian',
      address: '1401, Evergreen A RODAS Enclave, Ghodbunder Road, Pilipada, Hiranandani Estate, Thane, Maharashtra - 400607',
      mobile: '9867301169',
      email: 'member7@baranwalsamaj.org',
      image: '/api/placeholder/300/300',
      bio: 'Contributing expertise in public service and community administration.'
    },
    {
      id: 14,
      name: 'Ramprasad Shrinath Shah',
      position: 'Member',
      age: 55,
      occupation: 'Business',
      nationality: 'Indian',
      address: 'Room No.6, Rati Vihar Bld, Aarey Road, Near Asarambapu Ashram Pagru Baug, Goregaon (East), Mumbai - 400063',
      mobile: '9819530553',
      email: 'member8@baranwalsamaj.org',
      image: '/api/placeholder/300/300',
      bio: 'Involved in cultural activities and heritage preservation initiatives.'
    },
    {
      id: 15,
      name: 'Shatrudhan Harilal Baranwal Gupta',
      position: 'Member',
      age: 50,
      occupation: 'Business',
      nationality: 'Indian',
      address: '01 GRD, Floor, Omkar Chawi, Charni Pada Road, Near Bosco School, Mumbai, Thane- 400612',
      mobile: '',
      email: 'member9@baranwalsamaj.org',
      image: '/api/placeholder/300/300',
      bio: 'Involved in cultural activities and heritage preservation initiatives.'
    }
  ];

  // Filter committee members based on search and position filter
  const filteredMembers = committeeMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.occupation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = filterPosition === '' || member.position === filterPosition;
    
    return matchesSearch && matchesPosition;
  });

  // Separate executive and general members
  const executivePositions = ['President', 'Vice President', 'Secretary', 'Joint Secretary', 'Treasurer', 'Joint Treasurer'];
  const executiveMembers = filteredMembers.filter(member => 
    executivePositions.includes(member.position)
  );
  const generalMembers = filteredMembers.filter(member => 
    member.position === 'Member'
  );

  return (
    <>
    {/* SEO Content */}
      <div style={{ display: 'none' }}>
        <h1>Baranwal Ekta Sanstha Mumbai Committee</h1>
        <p>
          Our dedicated committee members lead the Baranwal Ekta Sanstha Mumbai with commitment to 
          serving the Ahibaran Baranwal community. Meet our leadership team working for the betterment 
          of Baranwal samaj in Mumbai.
        </p>
      </div>

      <div className="committee-page">
        {/* Page Header */}
        <div className="page-header">
          <div className="header-content">
            <div className="header-text">
              <h1 className="page-title">Our Committee</h1>
              <p className="page-description">
                Meet the dedicated leaders who guide our community and work tirelessly to preserve our heritage and strengthen our bonds.
              </p>
              <div className="header-actions">
                <Link href="/members" className="btn btn-primary">
                  <span>View All Members</span>
                  <i className="btn-icon">👥</i>
                </Link>
                <Link href="https://drive.google.com/file/d/1cfeMw_B0Xak-Tko3TQVgQ8UckL23gEAw/view?usp=sharing" target='blank' className="btn btn-secondary">
                  <span>Committee Info</span>
                  <i className="btn-icon">📞</i>
                </Link>
              </div>
            </div>
            <div className="header-stats">
              <div className="stat-card">
                <div className="stat-number">{committeeMembers.length}</div>
                <div className="stat-label">Committee Members</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">6</div>
                <div className="stat-label">Executive Positions</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">25+</div>
                <div className="stat-label">Years of Service</div>
              </div>
            </div>
          </div>
        </div>

        {/* Committee Directory Section */}
        <section className="committee-directory-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Committee Directory</h2>
              <p className="section-subtitle">
                Our elected representatives working to serve the community with dedication and transparency
              </p>
            </div>

            {/* Search and Filters */}
            <div className="directory-controls">
              <div className="search-box">
                <i className="search-icon">🔍</i>
                <input
                  type="text"
                  placeholder="Search by name, position, or occupation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              
              <div className="filters">
                <select
                  value={filterPosition}
                  onChange={(e) => setFilterPosition(e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Positions</option>
                  <option value="President">President</option>
                  <option value="Vice President">Vice President</option>
                  <option value="Secretary">Secretary</option>
                  <option value="Joint Secretary">Joint Secretary</option>
                  <option value="Treasurer">Treasurer</option>
                  <option value="Joint Treasurer">Joint Treasurer</option>
                  <option value="Member">Member</option>
                </select>
              </div>
            </div>

            {/* Executive Committee */}
            {executiveMembers.length > 0 && (
              <div className="committee-section">
                <div className="committee-intro">
                  <h2>Executive Committee</h2>
                  <p>
                    Our executive committee is elected by community members to serve terms of office. 
                    They meet regularly to discuss and decide on matters affecting our community, plan events, 
                    and oversee various initiatives.
                  </p>
                </div>
                
                <div className="committee-grid">
                  {executiveMembers.map((member) => (
                    <div className="committee-card" key={member.id}>
                      <div className="committee-image-container">
                        <div className="member-avatar-large">
                          {member.name.charAt(0)}
                        </div>
                        <div className="position-badge">
                          {member.position}
                        </div>
                      </div>
                      <div className="committee-details">
                        <h3 className="committee-name">{member.name}</h3>
                        <div className="member-info">
                          <div className="info-row">
                            <span className="info-label">Age:</span>
                            <span className="info-value">{member.age} years</span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">Occupation:</span>
                            <span className="occupation-tag">{member.occupation}</span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">Nationality:</span>
                            <span className="nationality-badge">{member.nationality}</span>
                          </div>
                        </div>
                        <p className="committee-bio">{member.bio}</p>
                        <div className="committee-contact">
                          <div className="contact-item">
                            <i className="contact-icon">📧</i>
                            <a href={`mailto:${member.email}`} className="contact-link">{member.email}</a>
                          </div>
                          <div className="contact-item">
                            <i className="contact-icon">📱</i>
                            <a href={`tel:+91${member.mobile}`} className="contact-link">+91 {member.mobile}</a>
                          </div>
                        </div>
                        <div className="address-section">
                          <i className="address-icon">📍</i>
                          <p className="member-address">{member.address}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* General Members */}
            {generalMembers.length > 0 && (
              <div className="committee-section">
                <div className="committee-intro">
                  <h2>Committee Members</h2>
                  <p>
                    These dedicated individuals contribute their time, expertise, and passion to serve 
                    the community in various capacities and support our collective goals.
                  </p>
                </div>
                
                <div className="committee-grid">
                  {generalMembers.map((member) => (
                    <div className="committee-card" key={member.id}>
                      <div className="committee-image-container">
                        <div className="member-avatar-large">
                          {member.name.charAt(0)}
                        </div>
                        <div className="position-badge member-badge">
                          {member.position}
                        </div>
                      </div>
                      <div className="committee-details">
                        <h3 className="committee-name">{member.name}</h3>
                        <div className="member-info">
                          <div className="info-row">
                            <span className="info-label">Age:</span>
                            <span className="info-value">{member.age} years</span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">Occupation:</span>
                            <span className="occupation-tag">{member.occupation}</span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">Nationality:</span>
                            <span className="nationality-badge">{member.nationality}</span>
                          </div>
                        </div>
                        <p className="committee-bio">{member.bio}</p>
                        <div className="committee-contact">
                          <div className="contact-item">
                            <i className="contact-icon">📧</i>
                            <a href={`mailto:${member.email}`} className="contact-link">{member.email}</a>
                          </div>
                          <div className="contact-item">
                            <i className="contact-icon">📱</i>
                            <a href={`tel:+91${member.mobile}`} className="contact-link">+91 {member.mobile}</a>
                          </div>
                        </div>
                        <div className="address-section">
                          <i className="address-icon">📍</i>
                          <p className="member-address">{member.address}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filteredMembers.length === 0 && (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3>No committee members found</h3>
                <p>Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>
        </section>
        
        {/* Organizational Structure */}
        <section className="organizational-structure">
          <div className="container">
            <h2 className="section-title">Organizational Structure</h2>
            <div className="organization-chart">
              <div className="chart-level">
                <div className="chart-box chart-box-main">
                  <h3>General Assembly</h3>
                  <p>All Community Members</p>
                </div>
              </div>
              
              <div className="chart-arrow">↓</div>
              
              <div className="chart-level">
                <div className="chart-box chart-box-secondary">
                  <h3>Executive Committee</h3>
                  <p>President, Vice President, Secretary, Treasurer</p>
                </div>
              </div>
              
              <div className="chart-arrow">↓</div>
              
              <div className="chart-level chart-level-departments">
                <div className="chart-box">
                  <h3>Cultural Affairs</h3>
                </div>
                <div className="chart-box">
                  <h3>Social Welfare</h3>
                </div>
                <div className="chart-box">
                  <h3>Education</h3>
                </div>
                <div className="chart-box">
                  <h3>Youth Affairs</h3>
                </div>
                <div className="chart-box">
                  <h3>Events</h3>
                </div>
              </div>
            </div>
            
            <div className="elections-info">
              <h3>Official Document</h3>
                <Link href="https://drive.google.com/file/d/1Bkwr1Bzm34JOOSw8ViFzYkUTtkYAEVgr/view?usp=sharing" target='blank' className="btn btn-primary large">
                  <span>Official Document</span>
                  <i className="btn-icon">📋</i>
                </Link>
            </div>
          </div>
        </section>

        {/* Join CTA Section */}
        <section className="join-cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Get Involved with Our Community</h2>
              <p>
                Join us in our mission to preserve our heritage, strengthen our bonds, and create a better future for our community.
              </p>
              <div className="cta-actions">
                <Link href="/join" className="btn btn-primary large">
                  <span>Become a Member</span>
                  <i className="btn-icon">📋</i>
                </Link>
                <Link href="/contact" className="btn btn-outline large">
                  <span>Contact Committee</span>
                  <i className="btn-icon">💬</i>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CommitteePage;