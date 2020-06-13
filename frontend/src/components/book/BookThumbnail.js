import React from 'react';

const BookThumbnail = ({ thumbnail, title }) => (
  <img className="Book-Thumbnail" src={thumbnail} alt={title} title={title} />
);

export default BookThumbnail;
