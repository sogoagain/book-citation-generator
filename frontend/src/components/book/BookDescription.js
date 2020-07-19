import React from 'react';

import BookThumbnail from './BookThumbnail';
import BookWriters from './BookWriters';
import BookYear from './BookYear';
import BookPublisher from './BookPublisher';

const BookDescription = ({
  book,
}) => (
  <div className="container">
    <div className="card mb-3">
      <div className="card-header">
        <h5 className="text-center">{book.title}</h5>
      </div>
      <div className="card-body d-flex justify-content-around align-items-center">
        <div className="p-2 w-50">
          <BookThumbnail
            thumbnail={book.thumbnail}
            alt={book.title}
          />
        </div>
        <div className="p-2 w-50">
          <dl className="row">
            <BookWriters
              title="저자"
              writers={book.authors}
            />
            {book.translators.length === 0 ? null : (
              <BookWriters
                title="역자"
                writers={book.translators}
              />
            )}
            <BookPublisher
              publisher={book.publisher}
            />
            <BookYear
              datetime={book.datetime}
            />
          </dl>
        </div>
      </div>
    </div>
  </div>
);

export default BookDescription;
