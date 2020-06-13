import React from 'react';
import './BookItem.css';
import PropTypes from 'prop-types';
import BookDescription from './BookDescription';

const BookItem = ({
  book,
  onClick,
}) => {
  const onBookClick = () => {
    onClick(book);
  };

  return (
    <div
      className="BookItem"
      onClick={onBookClick}
      onKeyDown={onBookClick}
      role="button"
      tabIndex="0"
    >
      <BookDescription book={book} />
    </div>
  );
};

BookItem.propTypes = {
  book: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default React.memo(BookItem);
