import React from 'react';
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
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={isFirstPage() ? 'page-item disabled' : 'page-item'}>
          <button
            type="button"
            className="page-link"
            onClick={onPrevBtnClick}
            disabled={isFirstPage()}
          >
            {LEFT_ANGLE_BRACKET}
          </button>
        </li>
        {
          PaginationUtils.getSelectablePages(pagination).map((page) => {
            let pageBtnStyle = 'page-item';
            if (pagination.page === page) {
              pageBtnStyle = 'page-item active';
            }
            return (
              <li
                className={pageBtnStyle}
                key={page}
              >
                <button
                  type="button"
                  className="page-link"
                  onClick={onPageClick}
                  value={page}
                >
                  {page}
                </button>
              </li>
            );
          })
        }
        <li className={isLastPage() ? 'page-item disabled' : 'page-item'}>
          <button
            type="button"
            className="page-link"
            onClick={onNextBtnClick}
            disabled={isLastPage()}
          >
            {RIGHT_ANGLE_BRACKET}
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  pagination: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Pagination;
