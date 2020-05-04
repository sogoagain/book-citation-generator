import React from 'react';

const BookThumbnail = ({thumbnail, title}) => {
    return (
        <img className="Book-Thumbnail" src={thumbnail} alt={title} title={title}/>
    );
};

export default BookThumbnail;