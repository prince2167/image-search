import { useState } from "react";
import SearchBox from "./SearchBox";
import Images from "./Images";
import Info from "./Info";

const ImagesApp = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const displayImages = (data) => {
    const results = data.results.map((el) => el.urls.regular);
    setImages(results);
  };
  if (error) alert("Something went wrong");
  return (
    <div>
      <Info />
      <SearchBox
        displayImages={displayImages}
        setIsLoading={setIsLoading}
        setError={setError}
      />
      <Images images={images} isLoading={isLoading} />
    </div>
  );
};

export default ImagesApp;
