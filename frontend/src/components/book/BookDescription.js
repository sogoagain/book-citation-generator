import React from 'react';
import PropTypes from "prop-types";
import BookThumbnail from "./BookThumbnail";
import BookWriters from "./BookWriters";
import BookYear from "./BookYear";
import BookPublisher from "./BookPublisher";

const BookDescription = ({
                             book,
                         }) => {
    return (
        <div className="BookDescription">
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
                        <BookPublisher publisher={book.publisher}/>
                    </div>
                    <div>
                        <BookYear datetime={book.datetime}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

BookDescription.propTypes = {
    book: PropTypes.object.isRequired,
};

export default BookDescription;
