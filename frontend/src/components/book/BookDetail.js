import React from 'react';
import PropTypes from 'prop-types';
import BookDescription from './BookDescription';
import BookCitation from './BookCitation';

const BookDetail = ({
  book,
}) => (
  <>
    <div className="container">
      <BookDescription
        book={book}
      />
    </div>
    <div className="container">
      <BookCitation
        book={book}
      />
    </div>
  </>
);

BookDetail.propTypes = {
  book: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default BookDetail;
