import React from 'react';

const BookPublisher = ({ publisher }) => (
  <>
    <dt className="col-md-3">출판</dt>
    <dd className="col-md-9">{publisher}</dd>
  </>
);

export default BookPublisher;
