import React from 'react';
import './Css/ImageSlider.css';

function ImageSlider({ type, imagePath }) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imagePath.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imagePath.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="image-slider">
      <button className="next-button" onClick={prevSlide}>
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
      <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
    </svg>
      </button>
      <img
        src={imagePath[currentImageIndex]}
        alt={`Slide ${currentImageIndex + 1}`}
        className="slider-image"
      />
      <button className="next-button" onClick={nextSlide}>
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
      </svg>
      </button>
    </div>
  );
}

export default ImageSlider;
