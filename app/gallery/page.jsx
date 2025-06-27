'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import './GalleryPage.css';
import { galleryItems, getFilterOptions, filterGalleryItems } from './galleryData';

const GalleryPage = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [loadedItems, setLoadedItems] = useState(new Set());
  const [activeFilter, setActiveFilter] = useState('all');
  const [itemsToShow, setItemsToShow] = useState(12); // Load 12 items initially
  const [imageDimensions, setImageDimensions] = useState(new Map());
  const galleryRef = useRef(null);
  const observerRef = useRef(null);
  const loadMoreObserverRef = useRef(null);
  const loadMoreTriggerRef = useRef(null);

  // Get filter options from imported helper function
  const filterOptions = getFilterOptions();

  // Filter items using imported helper function
  const filteredItems = filterGalleryItems(galleryItems, activeFilter);

  // Items to display based on pagination
  const displayedItems = filteredItems.slice(0, itemsToShow);

  // Function to handle image load and get dimensions
  const handleImageLoad = (event, itemId) => {
    const img = event.target;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    setImageDimensions(prev => new Map(prev.set(itemId, {
      width: img.naturalWidth,
      height: img.naturalHeight,
      aspectRatio
    })));
  };

  // Intersection Observer for scroll animations and lazy loading
  useEffect(() => {
    const options = {
      threshold: 0.1,
      rootMargin: '50px 0px 50px 0px'
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-id');
          const itemId = parseInt(id);
          setVisibleItems(prev => new Set([...prev, itemId]));
          setLoadedItems(prev => new Set([...prev, itemId]));
        }
      });
    }, options);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Load more observer
  useEffect(() => {
    const options = {
      threshold: 0.1,
      rootMargin: '100px 0px 0px 0px'
    };

    loadMoreObserverRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && itemsToShow < filteredItems.length) {
          setItemsToShow(prev => Math.min(prev + 12, filteredItems.length));
        }
      });
    }, options);

    return () => {
      if (loadMoreObserverRef.current) {
        loadMoreObserverRef.current.disconnect();
      }
    };
  }, [filteredItems.length, itemsToShow]);

  // Observe gallery items and load more trigger
  useEffect(() => {
    if (galleryRef.current && observerRef.current) {
      const items = galleryRef.current.querySelectorAll('.gallery-item');
      items.forEach(item => {
        observerRef.current.observe(item);
      });
    }

    if (loadMoreTriggerRef.current && loadMoreObserverRef.current) {
      loadMoreObserverRef.current.observe(loadMoreTriggerRef.current);
    }

    return () => {
      if (observerRef.current) {
        const items = galleryRef.current?.querySelectorAll('.gallery-item');
        items?.forEach(item => {
          observerRef.current.unobserve(item);
        });
      }
      if (loadMoreObserverRef.current && loadMoreTriggerRef.current) {
        loadMoreObserverRef.current.unobserve(loadMoreTriggerRef.current);
      }
    };
  }, [displayedItems]);

  // Reset items when filter changes
  useEffect(() => {
    setItemsToShow(12);
    setVisibleItems(new Set());
    setLoadedItems(new Set());
    setImageDimensions(new Map());
  }, [activeFilter]);

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const openLightbox = (id) => {
    setActiveItem(id);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setActiveItem(null);
    document.body.style.overflow = 'unset';
  };

  const navigateItem = (direction) => {
    const currentIndex = filteredItems.findIndex(item => item.id === activeItem);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredItems.length;
    } else {
      newIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    }
    
    setActiveItem(filteredItems[newIndex].id);
  };

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (activeItem) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateItem('prev');
        if (e.key === 'ArrowRight') navigateItem('next');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeItem, filteredItems]);

  const currentItem = filteredItems.find(item => item.id === activeItem);

  const renderMediaContent = (item, isLightbox = false) => {
    if (item.type === 'video') {
      return (
        <video
          src={item.href}
          controls
          className={isLightbox ? 'lightbox-video' : 'gallery-video'}
          preload="metadata"
          width={isLightbox ? 900 : undefined}
          height={isLightbox ? 600 : undefined}
          style={!isLightbox ? { width: '100%', height: 'auto' } : {}}
        >
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return (
        <Image
          src={item.href}
          alt={item.title}
          width={isLightbox ? 900 : 600}
          height={isLightbox ? 600 : 400}
          className={isLightbox ? 'lightbox-image' : 'gallery-image'}
          loading={isLightbox ? 'eager' : 'lazy'}
          priority={isLightbox}
          onLoad={(e) => !isLightbox && handleImageLoad(e, item.id)}
          style={!isLightbox && imageDimensions.has(item.id) ? {
            width: '100%',
            height: 'auto',
            aspectRatio: imageDimensions.get(item.id).aspectRatio
          } : {}}
        />
      );
    }
  };

  // Get item style based on dimensions
  const getItemStyle = (item) => {
    if (item.type === 'video') {
      return { aspectRatio: '16/9' }; // Default video aspect ratio
    }
    
    const dimensions = imageDimensions.get(item.id);
    if (dimensions) {
      return { aspectRatio: dimensions.aspectRatio };
    }
    
    return {}; // Default until image loads
  };

  return (
    <div className="gallery-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Photo & Video Gallery</h1>
          <p className="page-description">
            Explore moments from our community events, celebrations, and activities.
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <section className="section filter-section">
        <div className="container">
          <div className="filter-container">
            <h3 className="filter-title">Filter by Event</h3>
            <div className="filter-buttons">
              {filterOptions.map(option => (
                <button
                  key={option.value}
                  className={`filter-btn ${activeFilter === option.value ? 'active' : ''}`}
                  onClick={() => setActiveFilter(option.value)}
                >
                  {option.label}
                  <span className="filter-count">({option.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <div className="results-info">
            <p>
              Showing {displayedItems.length} of {filteredItems.length} items
              {activeFilter !== 'all' && ` in "${filterOptions.find(f => f.value === activeFilter)?.label}"`}
            </p>
          </div>
          
          <div className="gallery-grid" ref={galleryRef}>
            {displayedItems.map((item, index) => (
              <div 
                key={item.id}
                data-id={item.id}
                className={`gallery-item ${visibleItems.has(item.id) ? 'animate' : ''} ${item.type === 'video' ? 'video-item' : ''}`}
                onClick={() => openLightbox(item.id)}
                style={{
                  animationDelay: `${index * 0.05}s`,
                  ...getItemStyle(item)
                }}
              >
                <div className="gallery-media-container">
                  {loadedItems.has(item.id) ? (
                    <>
                      {item.type === 'video' ? (
                        <div className="video-preview">
                          <video
                            src={item.href}
                            className="gallery-video"
                            preload="metadata"
                            muted
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          >
                            Your browser does not support the video tag.
                          </video>
                          <div className="video-play-overlay">
                            <div className="play-button">
                              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                <circle cx="30" cy="30" r="30" fill="rgba(255,255,255,0.9)"/>
                                <path d="M25 20L40 30L25 40V20Z" fill="#000"/>
                              </svg>
                            </div>
                          </div>
                          <div className="media-type-badge">
                            <span>Video</span>
                          </div>
                        </div>
                      ) : (
                        <Image
                          src={item.href}
                          alt={item.title}
                          width={600}
                          height={400}
                          className="gallery-image"
                          loading="lazy"
                          onLoad={(e) => handleImageLoad(e, item.id)}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      )}
                    </>
                  ) : (
                    <div className="gallery-placeholder">
                      <div className="loading-skeleton"></div>
                    </div>
                  )}
                </div>
                <div className="gallery-item-overlay">
                  <h3 className="gallery-item-title">{item.title}</h3>
                  <p className="gallery-item-date">{item.date}</p>
                  <div className="gallery-item-type">
                    {item.type === 'video' ? '🎥 Video' : '📷 Photo'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Trigger */}
          {itemsToShow < filteredItems.length && (
            <div ref={loadMoreTriggerRef} className="load-more-trigger">
              <div className="loading-more">
                <div className="spinner"></div>
                <p>Loading more items...</p>
              </div>
            </div>
          )}

          {filteredItems.length === 0 && (
            <div className="no-results">
              <p>No items found for the selected filter.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Lightbox */}
      {activeItem && currentItem && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="lightbox-close" 
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              ×
            </button>
            <button 
              className="lightbox-nav lightbox-prev" 
              onClick={() => navigateItem('prev')}
              aria-label="Previous item"
            >
              &#8249;
            </button>
            <button 
              className="lightbox-nav lightbox-next" 
              onClick={() => navigateItem('next')}
              aria-label="Next item"
            >
              &#8250;
            </button>
            
            <div className="lightbox-media">
              {renderMediaContent(currentItem, true)}
            </div>
            
            <div className="lightbox-caption">
              <h3>{currentItem.title}</h3>
              <p className="lightbox-description">
                {currentItem.description}
              </p>
              <div className="lightbox-meta">
                <span className="lightbox-date">{currentItem.date}</span>
                <span className="lightbox-type">
                  {currentItem.type === 'video' ? '🎥 Video' : '📷 Photo'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <section className="section gallery-upload">
        <div className="container">
          <div className="upload-container">
            <h2>Share Your Photos & Videos</h2>
            <p>
              Have photos or videos from a recent Baranwal Ekta Sanstha event? Share them with us to be featured in our gallery!
            </p>
            <button className="btn" onClick={() => {
              console.log('Upload media clicked');
            }}>
              Upload Media
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;