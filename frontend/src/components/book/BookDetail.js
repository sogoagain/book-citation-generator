import React from 'react';
import './BookDetail.css';
import PropTypes from "prop-types";
import BookDescription from "./BookDescription";

const BookDetail = ({
                        book,
                    }) => {
    const TAG = "[BookDetail]";
    console.log(TAG, 'init');

    return (
        <div className="BookDetail">
            <BookDescription book={book}/>
        </div>
    );
};

BookDetail.propTypes = {
    book: PropTypes.object.isRequired,
};

export default BookDetail;
