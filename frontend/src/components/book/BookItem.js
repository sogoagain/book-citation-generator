import React from 'react';
import './BookItem.css';
import PropTypes from "prop-types";
import BookDescription from "./BookDescription";

const BookItem = ({
                      book,
                      onClick,
                  }) => {

    const onBookClick = (e) => {
        onClick(book);
    };

    return (
        <div
            className="Book"
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

export default BookItem;
