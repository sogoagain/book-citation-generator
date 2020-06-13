import React from 'react';
import BookUtils from '../../utils/BookUtils';

const BookWriters = ({ writers }) => (
  <span className="Book-Writers">{BookUtils.getFormattedWriters(writers, 2)}</span>
);

export default BookWriters;
