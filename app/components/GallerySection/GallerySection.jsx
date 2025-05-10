'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './GallerySection.css';

const GallerySection = () => {
  const [activeImage, setActiveImage] = useState(null);
  
  // Example gallery images
  const galleryImages = [
    {
      id: 1,
      title: 'Annual Festival 2024',
      src: '/api/placeholder/600/400',
      category: 'Events',
    },
    {
      id: 2,
      title: 'Community Service Day',
      src: '/api/placeholder/600/400',
      category: 'Service',
    },
    {
      id: 3,
      title: 'Youth Program Graduation',
      src: '/api/placeholder/600/400',
      category: 'Youth',
    },
    {
      id: 4,
      title: 'Cultural Dance Performance',
      src: '/api/placeholder/600/400',
      category: 'Culture',
    },
    {
      id: 5,
      title: 'Seniors Reunion',
      src: '/api/placeholder/600/400',
      category: 'Seniors',
    },
    {
      id: 6,
      title: 'Community Center Opening',
      src: '/api/placeholder/600/400',
      category: 'Events',
    },
  ];

  const openLightbox = (id) => {
    setActiveImage(id);
  };

  const closeLightbox = () => {
    setActiveImage(null);
  };

  return (
    <section className="section gallery-section" id="gallery">
      <div className="container">
        <h2 className="section-title">Gallery</h2>
        
        <div className="gallery-intro">
          <p>
            Explore moments from our community events, celebrations, and 
            activities through our photo gallery.
          </p>
        </div>
        
        <div className="gallery-grid">
          {galleryImages.map((image) => (
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
                <p className="gallery-item-category">{image.category}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="gallery-cta">
          <Link href="/gallery" className="btn">
            View Full Gallery
          </Link>
        </div>
      </div>
      
      {/* Lightbox */}
      {activeImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>×</button>
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
                  <p>{galleryImages.find(img => img.id === activeImage)?.category}</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;