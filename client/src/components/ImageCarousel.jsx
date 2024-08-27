import React, { useState } from 'react';

const ImageCarousel = () => {
  const [mainImage, setMainImage] = useState("https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg");

  const images = [
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
  ];

  return (
    <div className="grid gap-4">
      <div>
        <img id="mainImage" className="h-auto max-w-full rounded-lg" src={mainImage} alt="Main" />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div key={index}>
            <img
              className="h-auto max-w-full rounded-lg cursor-pointer"
              src={image}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setMainImage(image)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
