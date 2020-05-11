import React from 'react';
import './BookItem.css';
import PropTypes from "prop-types";
import BookDescription from "./BookDescription";

const BookItem = ({
                      book,
                      onClick,
                  }) => {
    const TAG = "[BookItem]";
    console.log(TAG, 'init');

    const onBookClick = (e) => {
        onClick(book);
    };

    return (
        <div
            className="BookItem"
            onClick={onBookClick}
        >
            <BookDescription book={book}/>
        </div>
    );
};

BookItem.propTypes = {
    book: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default React.memo(BookItem);
