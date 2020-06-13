import React from 'react';
import BookUtils from '../../utils/BookUtils';

const BookYear = ({ datetime }) => (
  <>
    <dt className="col-md-3">출판연도</dt>
    <dd className="col-md-9">{BookUtils.convertISO8601toYear(datetime)}</dd>
  </>
);

export default BookYear;
