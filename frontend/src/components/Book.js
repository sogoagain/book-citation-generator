import React from 'react';
import './Book.css';
import PropTypes from "prop-types";
import BookUtils from "../utils/BookUtils";

const BookThumbnail = ({thumbnail, title}) => {
    return (
        <img className="Book-Thumbnail" src={thumbnail} alt={title} title={title}/>
    );
};

const BookWriters = ({writers}) => {
    return (
        <span className="Book-Writers">{BookUtils.getFormattedWriters(writers, 2)}</span>
    );
};

const Book = ({
                  book,
                  onClick
              }) => {

    const onBookClick = (e) => {
        onClick(book);
    };

    return (
        <div
            className="Book"
            onClick={onBookClick}
        >
            <div className="Book-Title">
                <h2>{book.title}</h2>
            </div>
            <div className="Flex-Container">
                <div className="Flex-Thumbnail">
                    <BookThumbnail
                        thumbnail={book.thumbnail}
                        alt={book.title}/>
                </div>
                <div className="Flex-Description">
                    <div>
                        <BookWriters writers={book.authors}/>
                    </div>
                    <div>
                        <BookWriters writers={book.translators}/>
                    </div>
                    <div>
                        <span>{book.publisher}</span>
                    </div>
                    <div>
                        <span>{BookUtils.convertISO8601toYear(book.datetime)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Book;
