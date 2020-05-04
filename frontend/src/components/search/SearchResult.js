import React from 'react';
import './SearchResult.css';
import PropTypes from "prop-types";
import BookItem from "../book/BookItem";

const SearchResult = ({
                          dataSource,
                          pagination,
                          onDetail,
                      }) => {

    const onBookClick = (book) => {
        onDetail(book);
    };

    return (
        <div className="SearchResult">
            {
                dataSource.map((book, index) => {
                    return <BookItem
                        book={book}
                        key={index}
                        onClick={onBookClick}
                    />
                })
            }
        </div>
    );
};

SearchResult.propTypes = {
    dataSource: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    onDetail: PropTypes.func.isRequired,
};

export default SearchResult;
