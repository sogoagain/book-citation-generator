import React from 'react';

const BookThumbnail = ({ thumbnail, title }) => (
  <img
    className="center-block"
    style={{
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}
    src={thumbnail}
    alt={title}
    title={title}
  />
);

export default BookThumbnail;
