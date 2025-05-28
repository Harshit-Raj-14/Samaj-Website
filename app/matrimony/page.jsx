'use client';

import React, { useState, useEffect } from 'react';
import './MatrimonyPage.css';
import { 
  fetchMatrimonialData,
  filterByGender,
  filterByAgeRange,
  searchByName,
  getUniqueGenders
} from '../utils/matrimonialutil';

const MatrimonyPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  
  // Filter options
  const [genderOptions, setGenderOptions] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchMatrimonialData();
        setProfiles(data);
        setFilteredProfiles(data);
        
        // Set filter options
        setGenderOptions(getUniqueGenders(data));
      } catch (error) {
        console.error('Error loading matrimonial data:', error);
      }
      setLoading(false);
    };

    loadData();
  }, []); // Empty dependency array to prevent infinite re-renders

  // Apply filters
  useEffect(() => {
    let filtered = profiles;

    // Apply search filter
    filtered = searchByName(filtered, searchTerm);
    
    // Apply gender filter
    filtered = filterByGender(filtered, genderFilter);
    
    // Apply age range filter
    filtered = filterByAgeRange(filtered, parseInt(minAge) || null, parseInt(maxAge) || null);

    setFilteredProfiles(filtered);
  }, [profiles, searchTerm, genderFilter, minAge, maxAge]);

  const resetFilters = () => {
    setSearchTerm('');
    setGenderFilter('all');
    setMinAge('');
    setMaxAge('');
  };

  const openProfileModal = (profile) => {
    setSelectedProfile(profile);
  };

  const closeProfileModal = () => {
    setSelectedProfile(null);
  };

  // Helper function to format social media URL
  const formatSocialMediaUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  if (loading) {
    return (
      <div className="matrimony-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading matrimonial profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="matrimony-container">
      {/* Header Section */}
      <header className="matrimony-header">
        <div className="header-content">
          <h1 className="main-title">
            Baranwal Matrimony
          </h1>
          {/* <br></br> */}
          <p className="subtitle">Find your perfect life partner</p>
        </div>
      </header>

      <div className="add-profile-section">
        <a 
          href="https://forms.gle/ChJkQz6x9cWFRWu39" 
          target="_blank" 
          rel="noopener noreferrer"
          className="add-profile-btn"
        >
          Add Your Matrimonial Profile
        </a>
      </div>

      {/* Filters Section */}
      <section className="filters-section">
        <div className="filters-container">
          <h2 className="filters-title">Find Your Match</h2>
          
          <div className="filters-grid">
            {/* Search Bar */}
            <div className="filter-group">
              <label htmlFor="search">Search by Name</label>
              <input
                type="text"
                id="search"
                placeholder="Enter name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="filter-input"
              />
            </div>

            {/* Gender Filter */}
            <div className="filter-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Genders</option>
                {genderOptions.map(gender => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </select>
            </div>

            {/* Age Range */}
            <div className="filter-group age-group">
              <label>Age Range</label>
              <div className="age-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={minAge}
                  onChange={(e) => setMinAge(e.target.value)}
                  className="filter-input age-input"
                  min="18"
                  max="80"
                />
                <span className="age-separator">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxAge}
                  onChange={(e) => setMaxAge(e.target.value)}
                  className="filter-input age-input"
                  min="18"
                  max="80"
                />
              </div>
            </div>
          </div>

          <div className="filter-actions">
            <button onClick={resetFilters} className="reset-btn">
              Reset Filters
            </button>
            <div className="results-count">
              {filteredProfiles.length} profiles found
            </div>
          </div>
        </div>
      </section>

      {/* Profiles Grid */}
      <section className="profiles-section">
        <div className="profiles-container">
          {filteredProfiles.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No profiles found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="profiles-grid">
              {filteredProfiles.map((profile) => (
                <div
                  key={profile.id}
                  className="profile-card"
                  onClick={() => openProfileModal(profile)}
                >
                  <div className="profile-card-header">
                    <div className="profile-image-circular">
                      {profile.photograph ? (
                        <img
                          src={profile.photograph}
                          alt={profile.name}
                          onLoad={(e) => {
                            e.target.style.display = 'block';
                            e.target.nextSibling.style.display = 'none';
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                            console.log('Image failed to load:', profile.photograph);
                          }}
                          style={{display: 'none'}}
                        />
                      ) : null}
                      <div className="placeholder-image-circular" style={{display: 'flex'}}>
                        <span className="placeholder-icon">👤</span>
                      </div>
                    </div>
                    
                    <div className="profile-basic-info">
                      <h3 className="profile-name">{profile.name}</h3>
                      <div className="profile-subtitle">
                        <span className="age-gender">{profile.age} years • {profile.gender}</span>
                      </div>
                      <div className="profile-location">
                        <span className="location-icon">📍</span>
                        <span className="location-text">
                          {profile.currentAddress ? profile.currentAddress.split(',')[0] : 'Location not specified'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="profile-info-expanded">
                    <div className="info-row">
                      <div className="info-item-full">
                        <span className="info-icon">👨‍👩‍👧‍👦</span>
                        <div className="info-text">
                          <span className="info-label">Father's Name</span>
                          <span className="info-value">{profile.fatherName}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="info-row">
                      <div className="info-item-half">
                        <span className="info-icon">📏</span>
                        <div className="info-text">
                          <span className="info-label">Height</span>
                          <span className="info-value">{profile.heightInFeet}</span>
                        </div>
                      </div>
                      <div className="info-item-half">
                        <span className="info-icon">📞</span>
                        <div className="info-text">
                          <span className="info-label">Phone</span>
                          <span className="info-value">{profile.phoneNo ? profile.phoneNo.substring(0, 10) : 'Not provided'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="info-row">
                      <div className="info-item-full">
                        <span className="info-icon">🎓</span>
                        <div className="info-text">
                          <span className="info-label">Education</span>
                          <span className="info-value">{profile.education.length > 35 ? profile.education.substring(0, 35) + '...' : profile.education}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="info-row">
                      <div className="info-item-full">
                        <span className="info-icon">💼</span>
                        <div className="info-text">
                          <span className="info-label">Occupation</span>
                          <span className="info-value">{profile.occupation.length > 35 ? profile.occupation.substring(0, 35) + '...' : profile.occupation}</span>
                        </div>
                      </div>
                    </div>
                    
                    {profile.socialMedia && (
                      <div className="info-row">
                        <div className="info-item-full">
                          <span className="info-icon">🌐</span>
                          <div className="info-text">
                            <span className="info-label">Social Media</span>
                            <a 
                              href={formatSocialMediaUrl(profile.socialMedia)} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="info-value social-link-inline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View Profile
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="profile-actions">
                    <button className="view-profile-btn">
                      <span className="btn-icon">👁️</span>
                      View Details
                    </button>
                    {profile.biodata && (
                      <button className="download-biodata-btn" onClick={(e) => {
                        e.stopPropagation();
                        window.open(profile.biodata, '_blank');
                      }}>
                        <span className="btn-icon">📄</span>
                        Biodata
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Profile Modal */}
      {selectedProfile && (
        <div className="modal-overlay" onClick={closeProfileModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeProfileModal}>
              ×
            </button>
            
            <div className="modal-header">
              <div className="modal-image">
                {selectedProfile.photograph ? (
                  <img
                    src={selectedProfile.photograph}
                    alt={selectedProfile.name}
                    onLoad={(e) => {
                      e.target.style.display = 'block';
                      e.target.nextSibling.style.display = 'none';
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                      console.log('Modal image failed to load:', selectedProfile.photograph);
                    }}
                    style={{display: 'none'}}
                  />
                ) : null}
                <div className="placeholder-image large" style={{display: 'flex'}}>
                  <span className="placeholder-icon">👤</span>
                </div>
              </div>
              
              <div className="modal-basic-info">
                <h2>{selectedProfile.name}</h2>
                <div className="basic-details">
                  <span className="age-height">{selectedProfile.age} years • {selectedProfile.heightInFeet}</span>
                  <span className="gender">{selectedProfile.gender}</span>
                </div>
              </div>
            </div>
            
            <div className="modal-body">
              <div className="detail-section">
                <h3>Personal Information</h3>
                <div className="detail-grid">
                  <div className="detail-row">
                    <strong>Father's Name:</strong>
                    <span>{selectedProfile.fatherName}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Date of Birth:</strong>
                    <span>{selectedProfile.dateOfBirth}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Height:</strong>
                    <span>{selectedProfile.height} cm ({selectedProfile.heightInFeet})</span>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h3>Education & Career</h3>
                <div className="detail-grid">
                  <div className="detail-row">
                    <strong>Education:</strong>
                    <span>{selectedProfile.education}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Occupation:</strong>
                    <span>{selectedProfile.occupation}</span>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h3>Contact Information</h3>
                <div className="detail-grid">
                  <div className="detail-row">
                    <strong>Phone:</strong>
                    <span>{selectedProfile.phoneNo}</span>
                  </div>
                  {selectedProfile.alternatePhone && (
                    <div className="detail-row">
                      <strong>Alternate Phone:</strong>
                      <span>{selectedProfile.alternatePhone}</span>
                    </div>
                  )}
                  <div className="detail-row">
                    <strong>Current Address:</strong>
                    <span>{selectedProfile.currentAddress}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Native Address:</strong>
                    <span>{selectedProfile.nativeAddress}</span>
                  </div>
                </div>
              </div>
              
              {selectedProfile.socialMedia && (
                <div className="detail-section">
                  <h3>Social Media</h3>
                  <div className="detail-row">
                    <a
                      href={formatSocialMediaUrl(selectedProfile.socialMedia)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '2.5rem',
                        width: '2.5rem',
                        fontSize: '1.5rem',
                        color: '#0073e6',
                        textDecoration: 'none',
                        borderRadius: '50%',       // full circle
                        border: '1px solid #0073e6',
                        backgroundColor: '#ffffff',// solid white background
                        padding: 0,
                        margin: 0,
                        lineHeight: 1,
                        userSelect: 'none',
                        transition: 'background-color 0.3s, color 0.3s',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = '#0073e6';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = '#ffffff';
                        e.currentTarget.style.color = '#0073e6';
                      }}
                    >
                      🔗
                    </a>
                  </div>
                </div>
              )}
              
              <div className="detail-section">
                <h3>Actions</h3>
                <div className="contact-actions">
                  {selectedProfile.phoneNo && (
                    <a 
                      href={'tel:' + selectedProfile.phoneNo} 
                      className="contact-action-btn call-btn"
                    >
                      📞 Call Now
                    </a>
                  )}
                  {selectedProfile.alternatePhone && (
                    <a 
                      href={'tel:' + selectedProfile.alternatePhone} 
                      className="contact-action-btn alt-call-btn"
                    >
                      📱 Call Alternate
                    </a>
                  )}
                  {selectedProfile.biodata && (
                    <a 
                      href={selectedProfile.biodata} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="contact-action-btn download-btn"
                    >
                      📄 Download Biodata
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatrimonyPage;