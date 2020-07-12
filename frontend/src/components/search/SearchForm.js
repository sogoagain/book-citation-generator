import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import './SearchForm.css';

const SearchForm = ({
  onSearch,
  refreshCount,
}) => {
  const EMPTY_INPUT_FIELD_ERROR_MESSAGE = '도서 정보를 입력하세요.';
  const SEARCH_INPUT_PLACEHOLDER_MESSAGE = '어떤 책을 찾으세요?';

  const [keyword, setKeyword] = useState('');

  const onInputChange = (e) => {
    const inputValue = e.target.value;
    setKeyword(inputValue);
  };

  const onReset = () => {
    setKeyword('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (keyword.length === 0) {
      // eslint-disable-next-line no-alert
      alert(EMPTY_INPUT_FIELD_ERROR_MESSAGE);
      return;
    }
    onSearch(keyword);
  };

  const isVisibleResetBtn = () => keyword.length !== 0;

  useEffect(() => {
    if (refreshCount === 0) {
      return;
    }
    setKeyword('');
  }, [refreshCount]);

  return (
    <form className="form-horizontal">
      <div className="form-group">
        <div className="input-group col-md-12">
          <input
            className="form-control"
            type="text"
            placeholder={SEARCH_INPUT_PLACEHOLDER_MESSAGE}
            onChange={onInputChange}
            value={keyword}
          />
          {isVisibleResetBtn() ? (
            <button
              type="reset"
              className="close btn-reset"
              aria-label="Close"
              onClick={onReset}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          ) : null}
          <span className="input-group-append">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={onSubmit}
            >
              <span className="sr-only">검색</span>
              <BsSearch aria-label="Search for books" />
            </button>
          </span>
        </div>
      </div>
    </form>
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  refreshCount: PropTypes.number.isRequired,
};

export default SearchForm;
