import React from 'react';
import PropTypes from 'prop-types';
import BookItem from '../book/BookItem';
import Pagination from '../pagination/Pagination';

const SearchResult = ({
  dataSource,
  pagination,
  onDetail,
  onChange,
}) => {
  const onBookClick = (book) => {
    onDetail(book);
  };

  const onPaginationChange = (page) => {
    onChange(page);
  };

  return (
    <div className="SearchResult">
      {
        dataSource.map((book) => (
          <BookItem
            book={book}
            key={book.isbn}
            onClick={onBookClick}
          />
        ))
      }
      <Pagination
        pagination={pagination}
        onChange={onPaginationChange}
      />
    </div>
  );
};

SearchResult.propTypes = {
  dataSource: PropTypes.oneOfType([PropTypes.array]).isRequired,
  pagination: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onDetail: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchResult;
