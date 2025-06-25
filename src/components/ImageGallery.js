import React, { useState, useEffect } from 'react';
import galleryData from '../data/gallery.json';
import './ImageGallery.css';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setImages(galleryData);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [images.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (images.length === 0) {
    return <div className="gallery-container">Loading...</div>;
  }

  const currentImage = images[currentIndex];
  
  const formatAustralianDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="gallery-container">
      <h1>Running Creek Shack</h1>
      <div className="carousel-container">
        <button 
          onClick={handlePrevious} 
          className="carousel-btn prev-btn"
          aria-label="Previous image"
        >
          &#8249;
        </button>
        
        <div className="carousel-content">
          <img 
            src={currentImage.src} 
            alt={currentImage.caption} 
            className="carousel-image" 
          />
          <div className="image-info">
            <p className="caption">{currentImage.caption}</p>
            <p className="date">{formatAustralianDate(currentImage.date)}</p>
            <p className="counter">{currentIndex + 1} / {images.length}</p>
          </div>
        </div>
        
        <button 
          onClick={handleNext} 
          className="carousel-btn next-btn"
          aria-label="Next image"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;