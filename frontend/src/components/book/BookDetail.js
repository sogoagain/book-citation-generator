import React from 'react';
import './BookDetail.css';
import PropTypes from "prop-types";
import BookDescription from "./BookDescription";

const BookDetail = ({
                        book,
                    }) => {

    return (
        <div className="BookCitation">
            <BookDescription book={book}/>
        </div>
    );
};

BookDetail.propTypes = {
    book: PropTypes.object.isRequired,
};

export default BookDetail;
