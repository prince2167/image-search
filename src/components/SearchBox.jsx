import React, { useState } from "react";
import SkeletonLoader from "./SkeletonLoader";

const SearchBox = ({ displayImages, setIsLoading, setError, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      if (searchQuery.length === 0) {
        return alert("Enter Value inside search input");
      } else {
        setIsLoading(true);
        const key = "Xkm43Pq7gXUIJrAQlp2wp-e4bErUR0hSrr1Q49NNRIc";
        const URL = `https://api.unsplash.com/search/photos?page=1&query=${searchQuery}&client_id=${key}`;
        const res = await fetch(URL);
        const data = await res.json();
        displayImages(data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };
  if (isLoading) return <SkeletonLoader />;
  return (
    <div className="flex items-center justify-center p-4 bg-gray-100">
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for images"
          className="w-full px-4 py-2 text-gray-700 bg-white  border border-gray-300 rounded-l-lg focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="absolute right-0 px-4 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
