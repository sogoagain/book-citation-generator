import React from 'react';
import BookUtils from '../../utils/BookUtils';

const BookYear = ({ datetime }) => (
  <span>{BookUtils.convertISO8601toYear(datetime)}</span>
);

export default BookYear;
