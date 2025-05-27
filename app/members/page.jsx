'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// IMPORTANT: Make sure this path matches your file structure
import { fetchMembersFromGoogleSheets, setupRealTimeSync, getSyncStatus } from '../utils/googleSheets';
import './MembersPage.css';

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBloodGroup, setFilterBloodGroup] = useState('');
  const [filterMatrimony, setFilterMatrimony] = useState('');
  const [syncStatus, setSyncStatus] = useState({
    status: 'connecting',
    lastSync: null,
    memberCount: 0,
    error: null
  });
  const [autoSync, setAutoSync] = useState(true);

  // Fallback sample data - will be used if Google Sheets fails
  const getSampleMembers = () => {
    return [
      {
        id: 1,
        name: 'Rajesh Kumar Baranwal',
        fatherName: 'Shri Ram Prasad Baranwal',
        currentAddress: '123 MG Road, Delhi - 110001',
        correspondenceAddress: 'Same as Current Address',
        occupation: 'Software Engineer',
        bloodGroup: 'B+',
        matrimonyStatus: 'Married',
        phoneNo: '+91 9876543210'
      },
      {
        id: 2,
        name: 'Priya Baranwal Sharma',
        fatherName: 'Shri Mohan Lal Baranwal',
        currentAddress: '456 Park Street, Mumbai - 400001',
        correspondenceAddress: '789 Civil Lines, Lucknow - 226001',
        occupation: 'Doctor',
        bloodGroup: 'A+',
        matrimonyStatus: 'Married',
        phoneNo: '+91 8765432109'
      },
      {
        id: 3,
        name: 'Amit Baranwal',
        fatherName: 'Shri Suresh Baranwal',
        currentAddress: '321 Sector 15, Noida - 201301',
        correspondenceAddress: 'Same as Current Address',
        occupation: 'Business Owner',
        bloodGroup: 'O+',
        matrimonyStatus: 'Single',
        phoneNo: '+91 7654321098'
      },
      {
        id: 4,
        name: 'Sunita Baranwal',
        fatherName: 'Shri Ramesh Baranwal',
        currentAddress: '654 Model Town, Pune - 411001',
        correspondenceAddress: 'Same as Current Address',
        occupation: 'Teacher',
        bloodGroup: 'AB+',
        matrimonyStatus: 'Married',
        phoneNo: '+91 6543210987'
      },
      {
        id: 5,
        name: 'Vikash Baranwal',
        fatherName: 'Shri Prakash Baranwal',
        currentAddress: '987 Ring Road, Jaipur - 302001',
        correspondenceAddress: '123 Gandhi Nagar, Kanpur - 208001',
        occupation: 'Civil Engineer',
        bloodGroup: 'B-',
        matrimonyStatus: 'Single',
        phoneNo: '+91 5432109876'
      },
      {
        id: 6,
        name: 'Kavita Baranwal Singh',
        fatherName: 'Shri Dinesh Baranwal',
        currentAddress: '147 Salt Lake, Kolkata - 700001',
        correspondenceAddress: 'Same as Current Address',
        occupation: 'Bank Manager',
        bloodGroup: 'A-',
        matrimonyStatus: 'Married',
        phoneNo: '+91 4321098765'
      }
    ];
  };

  // Load members data from Google Sheets
  useEffect(() => {
    let cleanupSync = null;

    const loadMembersData = async () => {
      setLoading(true);
      
      try {
        console.log('🔄 Starting to load members data...');
        
        // Check if fetchMembersFromGoogleSheets function exists
        if (typeof fetchMembersFromGoogleSheets !== 'function') {
          throw new Error('Google Sheets utility functions not properly imported. Check file path and exports.');
        }
        
        // Get initial sync status
        const status = await getSyncStatus();
        setSyncStatus(status);
        
        // Fetch members data
        const membersData = await fetchMembersFromGoogleSheets();
        setMembers(membersData);
        
        setSyncStatus(prev => ({
          ...prev,
          status: 'connected',
          memberCount: membersData.length,
          lastSync: new Date().toLocaleString(),
          error: null
        }));
        
        // Setup real-time sync if enabled
        if (autoSync) {
          cleanupSync = setupRealTimeSync((newMembers, syncInfo) => {
            if (newMembers) {
              setMembers(newMembers);
              setSyncStatus(prev => ({
                ...prev,
                status: 'connected',
                memberCount: newMembers.length,
                lastSync: syncInfo.lastSync,
                error: null
              }));
            } else {
              setSyncStatus(prev => ({
                ...prev,
                status: 'error',
                error: syncInfo.error,
                lastSync: syncInfo.lastSync
              }));
            }
          }, 300000); // Sync every 5 minutes
        }
        
      } catch (error) {
        console.error('❌ Failed to load members:', error);
        setSyncStatus({
          status: 'error',
          lastSync: new Date().toLocaleString(),
          memberCount: 0,
          error: error.message
        });
        
        // Fallback to sample data if Google Sheets fails
        console.log('🔄 Using fallback sample data...');
        setMembers(getSampleMembers());
      } finally {
        setLoading(false);
      }
    };

    loadMembersData();

    // Cleanup function
    return () => {
      if (cleanupSync) {
        cleanupSync();
      }
    };
  }, [autoSync]);

  // Manual refresh function
  const handleManualRefresh = async () => {
    setLoading(true);
    try {
      console.log('🔄 Manual refresh triggered...');
      const membersData = await fetchMembersFromGoogleSheets();
      setMembers(membersData);
      setSyncStatus(prev => ({
        ...prev,
        status: 'connected',
        memberCount: membersData.length,
        lastSync: new Date().toLocaleString(),
        error: null
      }));
    } catch (error) {
      console.error('❌ Manual refresh failed:', error);
      setSyncStatus(prev => ({
        ...prev,
        status: 'error',
        error: error.message,
        lastSync: new Date().toLocaleString()
      }));
    } finally {
      setLoading(false);
    }
  };

  // Filter members based on search and filters
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.occupation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBloodGroup = filterBloodGroup === '' || member.bloodGroup === filterBloodGroup;
    const matchesMatrimony = filterMatrimony === '' || member.matrimonyStatus === filterMatrimony;
    
    return matchesSearch && matchesBloodGroup && matchesMatrimony;
  });

  const objectives = [
    "To create unity, brotherhood etc. through public awareness.",
    "To render and support all kinds of social, educational services irrespective of race, colour, religion, caste or cultural grouping.",
    "To encourage physical education by training and coaching in various sports discipline (Outdoor as well as indoor).",
    "To provide facilities for outdoor as well as indoor games.",
    "To provide relief to the people who are affected by natural calamities.",
    "To arrange different types of sports competitions.",
    "To establish, construction, maintenance or support of boarding schools, orphanages, schools.",
    "To help and support to run institutions, colleges, schools, reading rooms, playgrounds etc.",
    "To run and organize social activities and programs for benefit of the society.",
    "To give educational help to the deserving students.",
    "To arrange various programs for welfare of handicapped children.",
    "To do social, cultural and educational activities for upliftment of the poor and needy students of the locality.",
    "To organize various camps like medical camps, group discussions etc. for awakening among the people.",
    "To undertake training and development programmes of women empowerment, mother and child care, and any other activity for welfare.",
    "To organize/support to provide aid to poorer students with government authority etc.",
    "To promote, support Gaushalas and promote the welfare, protection, and well-being of cows.",
    "To contribute to the conservation and protection of the environment by supporting projects and organizations focused on sustainable practices, ecological preservation, and awareness campaigns."
  ];

  return (
    <div className="members-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="page-title">Our Members Directory</h1>
            <p className="page-description">
              Connect with fellow members of the Baranwal Ekta Sanstha community. Together we preserve our heritage and build a stronger future.
            </p>
            <div className="header-actions">
              <Link href="https://forms.gle/mCq9oUr9CMyUxf7r9" className="btn btn-primary">
                <span>Join Our Community</span>
                <i className="btn-icon">🤝</i>
              </Link>
              <Link href="mailto:baranwalektasanstha@gmail.com" className="btn btn-secondary">
                <span>Contact Us</span>
                <i className="btn-icon">📞</i>
              </Link>
            </div>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-number">{members.length}+</div>
              <div className="stat-label">Active Members</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Cities</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">25+</div>
              <div className="stat-label">Years United</div>
            </div>
          </div>
        </div>
      </div>

      {/* Members Directory Section */}
      <section className="members-directory-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Members Directory</h2>
            <br></br>
            <p className="section-subtitle">
              Search and connect with our community members across different locations and professions
            </p>
          </div>

          {/* Sync Status Bar */}
          {/* <div className={`sync-status-bar ${syncStatus.status}`}>
            <div className="sync-info">
              <div className="sync-indicator">
                {syncStatus.status === 'connected' && <span className="status-icon connected">🟢</span>}
                {syncStatus.status === 'error' && <span className="status-icon error">🔴</span>}
                {syncStatus.status === 'connecting' && <span className="status-icon connecting">🟡</span>}
                <span className="sync-text">
                  {syncStatus.status === 'connected' && `Connected to Google Sheets • ${syncStatus.memberCount} members`}
                  {syncStatus.status === 'error' && `Connection Error • ${syncStatus.error}`}
                  {syncStatus.status === 'connecting' && 'Connecting to Google Sheets...'}
                </span>
              </div>
              <div className="sync-actions">
                <span className="last-sync">Last sync: {syncStatus.lastSync || 'Never'}</span>
                <button 
                  onClick={handleManualRefresh} 
                  className="refresh-btn"
                  disabled={loading}
                  title="Refresh data from Google Sheets"
                >
                  <span className={`refresh-icon ${loading ? 'spinning' : ''}`}>🔄</span>
                  Refresh
                </button>
                <label className="auto-sync-toggle">
                  <input 
                    type="checkbox" 
                    checked={autoSync} 
                    onChange={(e) => setAutoSync(e.target.checked)}
                  />
                  Auto-sync
                </label>
              </div>
            </div>
          </div> */}

          {/* Show setup instructions if there's an error */}
          {/* {syncStatus.status === 'error' && (
            <div className="fallback-notice">
              <span className="notice-icon">ℹ️</span>
              <strong>Google Sheets Setup Required:</strong> To connect your live data, please set up Google Sheets integration. Currently showing sample data.
              <br />
              <small>Error: {syncStatus.error}</small>
            </div>
          )} */}

          {/* Search and Filters */}
          <div className="directory-controls">
            <div className="search-box">
              <i className="search-icon">🔍</i>
              <input
                type="text"
                placeholder="Search by name, father's name, or occupation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filters">
              <select
                value={filterBloodGroup}
                onChange={(e) => setFilterBloodGroup(e.target.value)}
                className="filter-select"
              >
                <option value="">All Blood Groups</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              
              <select
                value={filterMatrimony}
                onChange={(e) => setFilterMatrimony(e.target.value)}
                className="filter-select"
              >
                <option value="">All Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
            </div>
          </div>

          {/* Members Table */}
          <div className="table-container">
            {loading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading members data from Google Sheets...</p>
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="members-table">
                  <thead>
                    <tr>
                      <th>Your Name</th>
                      <th>Father's Name</th>
                      <th>Current Address</th>
                      <th>Correspondence Address</th>
                      <th>Occupation</th>
                      <th>Blood Group</th>
                      <th>Matrimony Status</th>
                      <th>Phone No.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMembers.map((member) => (
                      <tr key={member.id} className="member-row">
                        <td className="member-name-cell">
                          <div className="name-with-avatar">
                            <div className="member-avatar">
                              {member.name.charAt(0)}
                            </div>
                            <span className="name-text">{member.name}</span>
                          </div>
                        </td>
                        <td>{member.fatherName}</td>
                        <td className="address-cell">{member.currentAddress}</td>
                        <td className="address-cell">{member.correspondenceAddress}</td>
                        <td>
                          <span className="occupation-tag">{member.occupation}</span>
                        </td>
                        <td>
                          <span className="blood-group-badge">{member.bloodGroup}</span>
                        </td>
                        <td>
                          <span className={`status-badge ${member.matrimonyStatus.toLowerCase()}`}>
                            {member.matrimonyStatus}
                          </span>
                        </td>
                        <td>
                          <a href={`tel:${member.phoneNo}`} className="phone-link">
                            {member.phoneNo}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredMembers.length === 0 && (
                  <div className="no-results">
                    <div className="no-results-icon">🔍</div>
                    <h3>No members found</h3>
                    <p>Try adjusting your search criteria or filters</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Table Footer */}
          <div className="table-footer">
            <div className="results-count">
              Showing {filteredMembers.length} of {members.length} members
            </div>
            <div className="data-source">
              <span className="sheets-icon">📊</span>
              <span>
                {syncStatus.status === 'connected' ? 'Live data' : 'Sample data (setup Google Sheets for live data)'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Society Objectives Section */}
      <section className="objectives-section">
        <div className="container">
          <div className="objectives-header">
            <h2 className="section-title">Object of Society</h2>
            <br></br>
            <p className="section-subtitle">
              Our mission and objectives that guide our community activities and initiatives
            </p>
          </div>
          
          <div className="objectives-grid">
            {objectives.map((objective, index) => (
              <div key={index} className="objective-card">
                <div className="objective-number">{index + 1}</div>
                <div className="objective-content">
                  <p>{objective}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA Section */}
      <section className="join-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Join Our Community?</h2>
            <p>
              Become part of our growing family and contribute to preserving our rich cultural heritage while building meaningful connections.
            </p>
            <div className="cta-actions">
              <Link href="https://forms.gle/mCq9oUr9CMyUxf7r9" className="btn btn-primary large">
                <span>Become A Member</span>
                <i className="btn-icon">📋</i>
              </Link>
              <Link href="mailto:baranwalektasanstha@gmail.com" className="btn btn-outline large">
                <span>Get More Information</span>
                <i className="btn-icon">💬</i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MembersPage;