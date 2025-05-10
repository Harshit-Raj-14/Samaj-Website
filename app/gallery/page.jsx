'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeImage, setActiveImage] = useState(null);

  // Example gallery images with categories
  const galleryImages = [
    {
      id: 1,
      title: 'Annual Festival 2024',
      src: '/api/placeholder/600/400',
      category: 'events',
      description: 'Celebration of our cultural heritage with performances, food, and activities.',
      date: 'April 15, 2024',
    },
    {
      id: 2,
      title: 'Community Service Day',
      src: '/api/placeholder/600/400',
      category: 'service',
      description: 'Members volunteering at the local food bank and community garden.',
      date: 'March 22, 2024',
    },
    {
      id: 3,
      title: 'Youth Program Graduation',
      src: '/api/placeholder/600/400',
      category: 'youth',
      description: 'Celebrating our young members completing leadership training.',
      date: 'February 18, 2024',
    },
    {
      id: 4,
      title: 'Cultural Dance Performance',
      src: '/api/placeholder/600/400',
      category: 'culture',
      description: 'Traditional dances performed at the community center.',
      date: 'January 30, 2024',
    },
    {
      id: 5,
      title: 'Seniors Reunion',
      src: '/api/placeholder/600/400',
      category: 'seniors',
      description: 'Annual gathering of our respected elders sharing stories and wisdom.',
      date: 'December 12, 2023',
    },
    {
      id: 6,
      title: 'Community Center Opening',
      src: '/api/placeholder/600/400',
      category: 'events',
      description: 'Inauguration of our new community center building.',
      date: 'November 5, 2023',
    },
    {
      id: 7,
      title: 'Traditional Cooking Workshop',
      src: '/api/placeholder/600/400',
      category: 'culture',
      description: 'Learning ancestral recipes and cooking techniques.',
      date: 'October 25, 2023',
    },
    {
      id: 8,
      title: 'Youth Sports Tournament',
      src: '/api/placeholder/600/400',
      category: 'youth',
      description: 'Annual sports competition for young community members.',
      date: 'September 18, 2023',
    },
    {
      id: 9,
      title: 'Elders Appreciation Day',
      src: '/api/placeholder/600/400',
      category: 'seniors',
      description: 'Honoring the contributions of our community elders.',
      date: 'August 30, 2023',
    },
    {
      id: 10,
      title: 'Neighborhood Cleanup',
      src: '/api/placeholder/600/400',
      category: 'service',
      description: 'Community-led initiative to beautify our local area.',
      date: 'July 15, 2023',
    },
    {
      id: 11,
      title: 'Summer Festival',
      src: '/api/placeholder/600/400',
      category: 'events',
      description: 'Annual summer celebration with games, food, and performances.',
      date: 'June 24, 2023',
    },
    {
      id: 12,
      title: 'Language Classes',
      src: '/api/placeholder/600/400',
      category: 'culture',
      description: 'Community members learning our ancestral language.',
      date: 'May 10, 2023',
    },
  ];
  
  // Get unique categories for filter
  const categories = ['all', ...new Set(galleryImages.map(img => img.category))];
  
  // Filter images based on active category
  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (id) => {
    setActiveImage(id);
  };

  const closeLightbox = () => {
    setActiveImage(null);
  };

  const navigateImage = (direction) => {
    const currentIndex = galleryImages.findIndex(img => img.id === activeImage);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % galleryImages.length;
    } else {
      newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    }
    
    setActiveImage(galleryImages[newIndex].id);
  };

  return (
    <div className="gallery-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Photo Gallery</h1>
          <p className="page-description">
            Explore moments from our community events, celebrations, and activities.
          </p>
        </div>
      </div>
      
      <section className="section">
        <div className="container">
          <div className="gallery-filters">
            <p>Filter by category:</p>
            <div className="filter-buttons">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="gallery-grid">
            {filteredImages.map((image) => (
              <div className="gallery-item" key={image.id} onClick={() => openLightbox(image.id)}>
                <div className="gallery-image-container">
                  <Image
                    src={image.src}
                    alt={image.title}
                    width={600}
                    height={400}
                    className="gallery-image"
                  />
                </div>
                <div className="gallery-item-overlay">
                  <h3 className="gallery-item-title">{image.title}</h3>
                  <p className="gallery-item-category">
                    {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                  </p>
                  <p className="gallery-item-date">{image.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Lightbox */}
      {activeImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>×</button>
            <button className="lightbox-nav lightbox-prev" onClick={() => navigateImage('prev')}>
              &#8249;
            </button>
            <button className="lightbox-nav lightbox-next" onClick={() => navigateImage('next')}>
              &#8250;
            </button>
            {galleryImages.find(img => img.id === activeImage) && (
              <>
                <Image
                  src={galleryImages.find(img => img.id === activeImage)?.src || ''}
                  alt={galleryImages.find(img => img.id === activeImage)?.title || ''}
                  width={900}
                  height={600}
                  className="lightbox-image"
                />
                <div className="lightbox-caption">
                  <h3>{galleryImages.find(img => img.id === activeImage)?.title}</h3>
                  <p className="lightbox-description">
                    {galleryImages.find(img => img.id === activeImage)?.description}
                  </p>
                  <p className="lightbox-date">
                    {galleryImages.find(img => img.id === activeImage)?.date}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      <section className="section gallery-upload">
        <div className="container">
          <div className="upload-container">
            <h2>Share Your Photos</h2>
            <p>
              Have photos from a recent Baranwal Samaj event? Share them with us to be featured in our gallery!
            </p>
            <button className="btn">Upload Photos</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;

