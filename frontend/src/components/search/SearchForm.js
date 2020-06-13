import React, { useEffect, useState } from 'react';
import './SearchForm.css';
import PropTypes from 'prop-types';

const SearchForm = ({
  onSearch,
  refreshCount,
}) => {
  const EMPTY_INPUT_FIELD_ERROR_MESSAGE = '도서 정보를 입력하세요.';
  const SEARCH_INPUT_PLACEHOLDER_MESSAGE = '어떤 책을 찾으세요?';
  const SEARCH_BUTTON_TEXT = '검색';

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
    <div className="SearchForm">
      <form className="Form">
        <div className="Search-Input-Wrap">
          <input
            type="text"
            placeholder={SEARCH_INPUT_PLACEHOLDER_MESSAGE}
            onChange={onInputChange}
            value={keyword}
          />
        </div>
        {isVisibleResetBtn() ? (
          <button
            type="reset"
            className="btn-reset"
            onClick={onReset}
          >
            X
          </button>
        ) : null}
        <button
          type="submit"
          className="btn-submit"
          onClick={onSubmit}
        >
          {SEARCH_BUTTON_TEXT}
        </button>
      </form>
    </div>
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  refreshCount: PropTypes.number.isRequired,
};

export default SearchForm;
