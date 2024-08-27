import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="mb-4 relative group">
          <div className="w-full h-40 bg-gray-200 animate-pulse rounded-lg shadow-md"></div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-400 text-white text-sm py-1 px-3 rounded-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-20 h-4 bg-gray-300 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
