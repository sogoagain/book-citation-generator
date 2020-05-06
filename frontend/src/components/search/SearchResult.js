import React from 'react';
import './SearchResult.css';
import PropTypes from "prop-types";
import BookItem from "../book/BookItem";
import PaginationUtils from "../../utils/PaginationUtils";

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
            <div className="Pagination">
                <button type="button" className="Prev-Btn">&lt;</button>
                {
                    PaginationUtils.getPrintedPages(pagination).map((page, index) => {
                        return <button type="button" className="Page" key={index}>{page}</button>
                    })
                }
                <button type="button" className="Next-Btn">&gt;</button>
            </div>
        </div>
    );
};

SearchResult.propTypes = {
    dataSource: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    onDetail: PropTypes.func.isRequired,
};

export default SearchResult;
