import React from 'react';
import PropTypes from "prop-types";
import BookItem from "../book/BookItem";
import Pagination from "../pagination/Pagination";

const SearchResult = ({
                          dataSource,
                          pagination,
                          onDetail,
                      }) => {
    const TAG = "[SearchResult]";
    console.log(TAG, 'init');

    const onBookClick = (book) => {
        onDetail(book);
    };

    const onPaginationChange = () => {
        console.log('onPaginationChange');
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
            <Pagination pagination={pagination} onChange={onPaginationChange}/>
        </div>
    );
};

SearchResult.propTypes = {
    dataSource: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    onDetail: PropTypes.func.isRequired,
};

export default SearchResult;
