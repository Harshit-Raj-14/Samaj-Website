'use client';
import React, { useState, useMemo } from 'react';
import { dharmshalas, searchDharmshalas, getUniqueStates, filterByState } from './dharmshalaUtils';
import './DharmshalaPage.css';

const DharmshalaPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const states = useMemo(() => getUniqueStates(), []);

  const filteredDharmshalas = useMemo(() => {
    let results = dharmshalas;
    
    if (searchQuery) {
      results = searchDharmshalas(searchQuery);
    }
    
    if (selectedState) {
      results = results.filter(dharmshala => 
        dharmshala.location.includes(selectedState)
      );
    }
    
    return results;
  }, [searchQuery, selectedState]);

  const totalPages = Math.ceil(filteredDharmshalas.length / itemsPerPage);
  const currentDharmshalas = filteredDharmshalas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedState('');
    setCurrentPage(1);
  };

  return (
    <div className="dharmshala-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">बरनवाल सेवा सदन एवं धर्मशाला</h1>
          <p className="hero-subtitle">सेवा, सुविधा और आध्यात्म का संगम</p>
        </div>
        <div className="hero-overlay"></div>
      </div>

      {/* Search and Filter Section */}
      <div className="search-section">
        <div className="search-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="खोजें - नाम, स्थान, या व्यवस्थापक के नाम से..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            <div className="search-icon">🔍</div>
          </div>
          
          <div className="filter-box">
            <select
              value={selectedState}
              onChange={handleStateChange}
              className="state-select"
            >
              <option value="">सभी राज्य</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          
          <button onClick={resetFilters} className="reset-btn">
            रीसेट करें
          </button>
        </div>
        
        <div className="results-info">
          <p>{filteredDharmshalas.length} धर्मशालाएं मिलीं</p>
        </div>
      </div>

      {/* Dharmshalas Grid */}
      <div className="dharmshalas-grid">
        {currentDharmshalas.map(dharmshala => (
          <div key={dharmshala.id} className="dharmshala-card">
            <div className="card-header">
              <h3 className="dharmshala-name">{dharmshala.name}</h3>
              {dharmshala.type && (
                <span className="dharmshala-type">{dharmshala.type}</span>
              )}
            </div>
            
            <div className="card-body">
              <div className="location-info">
                <div className="location-icon">📍</div>
                <div>
                  <p className="location">{dharmshala.location}</p>
                  <p className="address">{dharmshala.address}</p>
                </div>
              </div>
              
              <div className="managers-section">
                <h4 className="managers-title">व्यवस्थापक:</h4>
                <div className="managers-list">
                  {dharmshala.managers.map((manager, index) => (
                    <div key={index} className="manager-item">
                      <div className="manager-info">
                        <span className="manager-name">{manager.name}</span>
                        <span className="manager-role">({manager.role})</span>
                      </div>
                      <a href={`tel:+91${manager.phone}`} className="phone-link">
                        📞 {manager.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="card-footer">
              <div className="contact-actions">
                {dharmshala.managers.map((manager, index) => (
                  <a
                    key={index}
                    href={`tel:+91${manager.phone}`}
                    className="call-btn"
                    title={`${manager.name} को कॉल करें`}
                  >
                    📞 कॉल करें
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            ‹ पिछला
          </button>
          
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            अगला ›
          </button>
        </div>
      )}

      {/* No Results */}
      {filteredDharmshalas.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">🏛️</div>
          <h3>कोई धर्मशाला नहीं मिली</h3>
          <p>कृपया अपना खोज शब्द बदलकर पुनः प्रयास करें</p>
          <button onClick={resetFilters} className="reset-btn">
            सभी धर्मशालाएं देखें
          </button>
        </div>
      )}

      {/* Footer Info */}
      <div className="info-section">
        <div className="info-card">
          <h3>सेवा की जानकारी</h3>
          <ul>
            <li>✅ स्वच्छ आवास व्यवस्था</li>
            <li>✅ उचित दरों पर सुविधा</li>
            <li>✅ धार्मिक वातावरण</li>
            <li>✅ 24 घंटे सुरक्षा</li>
          </ul>
        </div>
        
        <div className="info-card">
          <h3>संपर्क सुविधा</h3>
          <ul>
            <li>📞 प्रत्येक धर्मशाला में व्यवस्थापक उपलब्ध</li>
            <li>🕐 पूर्व बुकिंग की सुविधा</li>
            <li>🗺️ सभी प्रमुख स्थानों पर स्थित</li>
            <li>🚗 यातायात की सुविधा</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DharmshalaPage;