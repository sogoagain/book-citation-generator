import React from 'react';
import './SearchResult.css';
import PropTypes from "prop-types";
import Book from "./Book";

const SearchResult = ({
                          dataSource,
                          pagination
                      }) => {
    return (
        <div className="SearchResult">
            {
                dataSource.map((book, index) => {
                    return <Book
                        book={book}
                        key={index}/>
                })
            }
        </div>
    );
};

SearchResult.propTypes = {
    dataSource: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
};

export default SearchResult;
