import React from 'react';
import './Pagination.css';
import PropTypes from "prop-types";
import PaginationUtils from "../../utils/PaginationUtils";

const Pagination = ({
                        pagination,
                        onChange,
                    }) => {
    const TAG = "[Pagination]";
    console.log(TAG, 'init');

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

    const isFirstPage = () => {
        return PaginationUtils.isFirstPage(pagination);
    };

    const isLastPage = () => {
        return PaginationUtils.isLastPage(pagination);
    };

    return (
        <div className="Pagination">
            <button type="button" className="Prev-Btn" onClick={onPrevBtnClick} disabled={isFirstPage()}>&lt;</button>
            {
                PaginationUtils.getPrintedPages(pagination).map((page, index) => {
                    let pageBtnStyle = "Page";
                    if (pagination.page === page) {
                        pageBtnStyle = "Selected-Page";
                    }
                    return <button type="button" className={pageBtnStyle} key={index} onClick={onPageClick}
                                   value={page}>{page}</button>
                })
            }
            <button type="button" className="Next-Btn" onClick={onNextBtnClick} disabled={isLastPage()}>&gt;</button>
        </div>
    );
};

Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Pagination;
