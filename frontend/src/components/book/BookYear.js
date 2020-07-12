import React from 'react';
import BookUtils from '../../utils/BookUtils';

const BookYear = ({ datetime }) => (
  <>
    <dt className="col-md-3">연도</dt>
    <dd className="col-md-9">{BookUtils.extractYearFromISO08601(datetime)}</dd>
  </>
);

export default BookYear;
