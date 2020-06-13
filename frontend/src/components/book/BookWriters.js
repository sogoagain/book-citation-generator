import React from 'react';
import BookUtils from '../../utils/BookUtils';

const BookWriters = ({ title, writers }) => (
  <>
    <dt className="col-md-3">{title}</dt>
    <dd className="col-md-9">{BookUtils.getFormattedWriters(writers, 2)}</dd>
  </>
);

export default BookWriters;
