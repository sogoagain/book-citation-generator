import React, {useRef} from 'react';
import './BookCitation.css';
import PropTypes from "prop-types";
import BookUtils from "../../utils/BookUtils";

const BookCitation = ({
                          book,
                      }) => {
    const TAG = "[BookCitation]";
    console.log(TAG, 'init');

    const inputRef = useRef();

    const getMLAStyle = () => {
        return BookUtils.printMLAStyle(book);
    };

    const onCopy = (e) => {
        inputRef.current.select();
        inputRef.current.setSelectionRange(0, 99999);
        document.execCommand("copy");
        e.target.focus();
        alert("출처 표기법을 복사했습니다.");
    };

    return (
        <div className="BookCitation">
            <label className="BookCitation-label" form="MLA">MLA</label>
            <input className="BookCitation-Text" type="text" id="MLA" ref={inputRef} value={getMLAStyle()} disabled/>
            {
                document.queryCommandSupported('copy') &&
                <button type="button" onClick={onCopy}>복사</button>
            }
        </div>
    );
};

BookCitation.propTypes = {
    book: PropTypes.object.isRequired,
};

export default BookCitation;