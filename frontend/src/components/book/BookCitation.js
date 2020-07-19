import React from 'react';

import { AiOutlineCopy } from 'react-icons/ai';

const BookCitation = ({
  label, citation, onCopy, copyable, inputRef,
}) => (
  <div className="container">
    <div className="input-group col-md-12">
      <div className="input-group-prepend">
        <label className="input-group-text" htmlFor={`book-citation-${label}`}>{label}</label>
      </div>
      <input
        className="form-control"
        type="text"
        id={`book-citation-${label}`}
        ref={inputRef}
        value={citation}
        onChange={() => {}}
        aria-disabled
      />
      <span className="input-group-append">
        {
          copyable && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={onCopy}
            >
              <AiOutlineCopy />
              <span className="sr-only">복사</span>
            </button>
          )
        }
      </span>
    </div>
  </div>
);

export default BookCitation;
