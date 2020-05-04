import React, {useEffect, useState} from 'react';
import './SearchForm.css';
import PropTypes from "prop-types";

const SearchForm = ({
                        onSearch,
                        refreshCount
                    }) => {

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
        onSearch(keyword);
    };

    const isVisibleResetBtn = () => {
        return keyword.length !== 0;
    };

    useEffect(() => {
        setKeyword('');
    }, [refreshCount]);

    return (
        <div className="SearchForm">
            <form className="Form">
                <div className="Search-Input-Wrap">
                    <input type="text"
                           placeholder="도서 정보를 입력하세요."
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
