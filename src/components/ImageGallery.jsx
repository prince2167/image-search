import React from "react";

const ImageGallery = ({ images, onAddCaptionClick }) => {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
      {images.map((image, index) => (
        <div key={index} className="mb-4 relative group">
          <img
            src={image}
            alt={index}
            className="w-full rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          />
          <button
            onClick={() => onAddCaptionClick(image)}
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Add Caption
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
