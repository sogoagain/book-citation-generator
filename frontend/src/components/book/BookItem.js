import React from 'react';
import PropTypes from 'prop-types';
import BookDescription from './BookDescription';

const BookItem = ({
  book,
  onClick,
  tabIndex,
}) => {
  const onBookClick = () => {
    onClick(book);
  };

  return (
    <div
      onClick={onBookClick}
      onKeyDown={onBookClick}
      role="button"
      tabIndex={tabIndex}
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
