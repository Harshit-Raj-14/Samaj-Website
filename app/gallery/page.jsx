'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import './GalleryPage.css';

const GalleryPage = () => {
  const [activeImage, setActiveImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const galleryRef = useRef(null);
  const observerRef = useRef(null);

  // Example gallery images
  const galleryImages = [
  {
    id: 1,
    title: 'Annual Festival 2024',
    href: '/gallery/image (1).png',
    description: 'Celebration of our cultural heritage with performances, food, and activities.',
    date: 'April 15, 2024',
  },
  {
    id: 2,
    title: 'Community Service Day',
    href: '/gallery/image (2).png',
    description: 'Members volunteering at the local food bank and community garden.',
    date: 'March 22, 2024',
  },
  {
    id: 3,
    title: 'Youth Program Graduation',
    href: '/gallery/image (3).png',
    description: 'Celebrating our young members completing leadership training.',
    date: 'February 18, 2024',
  },
  {
    id: 4,
    title: 'Cultural Dance Performance',
    href: '/gallery/image (4).png',
    description: 'Traditional dances performed at the community center.',
    date: 'January 30, 2024',
  },
  {
    id: 5,
    title: 'Seniors Reunion',
    href: '/gallery/image (5).png',
    description: 'Annual gathering of our respected elders sharing stories and wisdom.',
    date: 'December 12, 2023',
  },
  {
    id: 6,
    title: 'Community Center Opening',
    href: '/gallery/image (6).png',
    description: 'Inauguration of our new community center building.',
    date: 'November 5, 2023',
  },
  {
    id: 7,
    title: 'Traditional Cooking Workshop',
    href: '/gallery/image (7).png',
    description: 'Learning ancestral recipes and cooking techniques.',
    date: 'October 25, 2023',
  },
  {
    id: 8,
    title: 'Youth Sports Tournament',
    href: '/gallery/image (8).png',
    description: 'Annual sports competition for young community members.',
    date: 'September 18, 2023',
  },
  {
    id: 9,
    title: 'Elders Appreciation Day',
    href: '/gallery/image (9).png',
    description: 'Honoring the contributions of our community elders.',
    date: 'August 30, 2023',
  },
  {
    id: 10,
    title: 'Neighborhood Cleanup',
    href: '/gallery/image (10).png',
    description: 'Community-led initiative to beautify our local area.',
    date: 'July 15, 2023',
  },
  {
    id: 11,
    title: 'Summer Festival',
    href: '/gallery/image (11).png',
    description: 'Annual summer celebration with games, food, and performances.',
    date: 'June 24, 2023',
  },
  {
    id: 12,
    title: 'Language Classes',
    href: '/gallery/image (12).png',
    description: 'Community members learning our ancestral language.',
    date: 'May 10, 2023',
  },
];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-id');
          setVisibleItems(prev => new Set([...prev, parseInt(id)]));
        }
      });
    }, options);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Observe gallery items
  useEffect(() => {
    if (galleryRef.current && observerRef.current) {
      const items = galleryRef.current.querySelectorAll('.gallery-item');
      items.forEach(item => {
        observerRef.current.observe(item);
      });
    }
  }, [galleryImages]);

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const openLightbox = (id) => {
    setActiveImage(id);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const closeLightbox = () => {
    setActiveImage(null);
    document.body.style.overflow = 'unset';
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

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (activeImage) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateImage('prev');
        if (e.key === 'ArrowRight') navigateImage('next');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeImage]);

  const currentImage = galleryImages.find(img => img.id === activeImage);

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
          <div className="gallery-grid" ref={galleryRef}>
            {galleryImages.map((image, index) => (
              <div 
                key={image.id}
                data-id={image.id}
                className={`gallery-item ${visibleItems.has(image.id) ? 'animate' : ''}`}
                onClick={() => openLightbox(image.id)}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="gallery-image-container">
                  <Image
                    src={image.href}
                    alt={image.title}
                    width={600}
                    height={400}
                    className="gallery-image"
                    loading="lazy"
                    onLoadingComplete={() => {
                      // Remove loading animation class when image loads
                      const img = document.querySelector(`[data-id="${image.id}"] .gallery-image`);
                      if (img) img.style.animation = 'none';
                    }}
                  />
                </div>
                <div className="gallery-item-overlay">
                  <h3 className="gallery-item-title">{image.title}</h3>
                  <p className="gallery-item-date">{image.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Lightbox */}
      {activeImage && currentImage && (
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
              onClick={() => navigateImage('prev')}
              aria-label="Previous image"
            >
              &#8249;
            </button>
            <button 
              className="lightbox-nav lightbox-next" 
              onClick={() => navigateImage('next')}
              aria-label="Next image"
            >
              &#8250;
            </button>
            <Image
              src={currentImage.href}
              alt={currentImage.title}
              width={900}
              height={600}
              className="lightbox-image"
              priority
            />
            <div className="lightbox-caption">
              <h3>{currentImage.title}</h3>
              <p className="lightbox-description">
                {currentImage.description}
              </p>
              <p className="lightbox-date">
                {currentImage.date}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <section className="section gallery-upload">
        <div className="container">
          <div className="upload-container">
            <h2>Share Your Photos</h2>
            <p>
              Have photos from a recent Baranwal Ekta Sanstha event? Share them with us to be featured in our gallery!
            </p>
            <button className="btn" onClick={() => {
              // Add your upload functionality here
              console.log('Upload photos clicked');
            }}>
              Upload Photos
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;