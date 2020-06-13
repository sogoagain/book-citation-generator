import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineCopy } from 'react-icons/ai';
import BookUtils from '../../utils/BookUtils';

const BookCitation = ({
  book,
}) => {
  const MLA_LABEL = 'MLA';

  const [citation] = useState({
    MLA: BookUtils.printMLAStyle(book),
  });
  const inputRef = useRef(null);

  const onCopy = (e) => {
    inputRef.current.focus();
    inputRef.current.select();
    inputRef.current.setSelectionRange(0, 99999);
    document.execCommand('copy');
    e.target.focus();
    // eslint-disable-next-line no-alert
    alert('출처 표기법을 복사했습니다.');
  };

  return (
    <div className="input-group col-md-12">
      <div className="input-group-prepend">
        <span className="input-group-text">{MLA_LABEL}</span>
      </div>
      <input
        className="form-control"
        type="text"
        id="MLA"
        ref={inputRef}
        onChange={() => {
        }}
        value={citation.MLA}
        aria-disabled
      />
      <span className="input-group-append">
        {
          document.queryCommandSupported('copy')
                && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onCopy}
                  >
                    <AiOutlineCopy />
                  </button>
                )
        }
      </span>
    </div>
  );
};

BookCitation.propTypes = {
  book: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default BookCitation;
