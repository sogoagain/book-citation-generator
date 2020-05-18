import React, {useEffect, useState} from 'react';
import './SearchForm.css';
import PropTypes from "prop-types";

const SearchForm = ({
                        onSearch,
                        refreshCount
                    }) => {
    const TAG = "[SearchForm]";
    console.log(TAG, 'init');

    const [keyword, setKeyword] = useState('');

    const onInputChange = (e) => {
        const inputValue = e.target.value;
        setKeyword(inputValue);
    };

    const onReset = (e) => {
        setKeyword('');
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (keyword.length === 0) {
            alert('도서 정보를 입력하세요.');
            return;
        }
        onSearch(keyword);
    };

    const isVisibleResetBtn = () => {
        return keyword.length !== 0;
    };

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
                    <input type="text"
                           placeholder="어떤 책을 찾으세요?"
                           onChange={onInputChange}
                           value={keyword}/>
                </div>
                {isVisibleResetBtn() ? <button type="reset"
                                               className="btn-reset"
                                               onClick={onReset}/> : null}
                <button type="submit"
                        className="btn-submit"
                        onClick={onSubmit}>
                    검색
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
