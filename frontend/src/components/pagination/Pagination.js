import React from 'react';
import './Pagination.css';
import PropTypes from 'prop-types';
import PaginationUtils from '../../utils/PaginationUtils';

const Pagination = ({
  pagination,
  onChange,
}) => {
  const LEFT_ANGLE_BRACKET = '<';
  const RIGHT_ANGLE_BRACKET = '>';

  const onPrevBtnClick = () => {
    const page = pagination.page - 1;
    onChange(page);
  };

  const onNextBtnClick = () => {
    const page = pagination.page + 1;
    onChange(page);
  };

  const onPageClick = (e) => {
    const page = parseInt(e.target.value, 10);
    onChange(page);
  };

  const isFirstPage = () => PaginationUtils.isFirstPage(pagination);

  const isLastPage = () => PaginationUtils.isLastPage(pagination);

  return (
    <div className="Pagination">
      <button
        type="button"
        className="Prev-Btn"
        onClick={onPrevBtnClick}
        disabled={isFirstPage()}
      >
        {LEFT_ANGLE_BRACKET}
      </button>
      {
        PaginationUtils.getPrintedPages(pagination).map((page) => {
          let pageBtnStyle = 'Page';
          if (pagination.page === page) {
            pageBtnStyle = 'Selected-Page';
          }
          return (
            <button
              type="button"
              className={pageBtnStyle}
              key={page}
              onClick={onPageClick}
              value={page}
            >
              {page}
            </button>
          );
        })
      }
      <button
        type="button"
        className="Next-Btn"
        onClick={onNextBtnClick}
        disabled={isLastPage()}
      >
        {RIGHT_ANGLE_BRACKET}
      </button>
    </div>
  );
};

Pagination.propTypes = {
  pagination: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Pagination;
