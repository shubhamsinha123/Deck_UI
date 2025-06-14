/* eslint-disable linebreak-style */
import React from 'react';
import ContentLoader from 'react-content-loader';

// common/ImageLoadPlaceholder
const ImageLoader = () => {
  return (
    <ContentLoader
      className="hello"
      speed={2}
      width={500}
      height={300}
      marginLeft={400}
      viewBox="0 0 500 300"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      {/* Rectangle shape to match the image size */}
      <rect x="0" y="0" rx="0" ry="0" width="500" height="300" />
    </ContentLoader>
  );
};

export default ImageLoader;
