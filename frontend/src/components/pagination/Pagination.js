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
        console.log('onPrevBtnClick');
    };

    const onNextBtnClick = () => {
        console.log('onNextBtnClick');
    };

    const onPageClick = () => {
        console.log('onPageClick');
    };

    const isFirstPage = () => {
        return pagination.page === 1;
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
                    return <button type="button" className={pageBtnStyle} key={index} onClick={onPageClick}>{page}</button>
                })
            }
            <button type="button" className="Next-Btn" onClick={onNextBtnClick}>&gt;</button>
        </div>
    );
};

Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Pagination;
