import React from 'react';

import BookDescription from './BookDescription';

const BookItem = ({
  tabIndex, book, onClick,
}) => (
  <div
    onClick={onClick}
    onKeyDown={onClick}
    role="button"
    tabIndex={tabIndex}
  >
    <BookDescription book={book} />
  </div>
);

export default BookItem;
