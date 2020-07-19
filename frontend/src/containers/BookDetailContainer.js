import React, { useRef } from 'react';

import { useSelector } from 'react-redux';

import BookDescription from '../components/book/BookDescription';
import BookCitation from '../components/book/BookCitation';

import BookUtils from '../utils/BookUtils';

const BookDetailContainer = () => {
  const { book } = useSelector((state) => state);
  const inputRef = useRef();
  const citation = BookUtils.getMLACitationNotation(book);

  const handleCopy = (e) => {
    inputRef.current.focus();
    inputRef.current.select();
    inputRef.current.setSelectionRange(0, 99999);
    document.execCommand('copy');
    e.target.focus();
    // eslint-disable-next-line no-alert
    alert('출처 표기법을 복사했습니다.');
  };

  return (
    <div>
      <BookDescription
        book={book}
      />
      <BookCitation
        label="MLA"
        citation={citation}
        onCopy={handleCopy}
        copyable={document.queryCommandSupported('copy')}
        inputRef={inputRef}
      />
    </div>
  );
};

export default BookDetailContainer;
