import React, {useEffect, useState} from 'react';
import SearchForm from "./SearchForm";
import SearchResult from "./SearchResult";
import BookModel from "../../models/BookModel";
import PropTypes from "prop-types";

const SearchComponent = ({
                             refreshCount,
                             onSubmit,
                             onDetail,
                         }) => {
    const TAG = "[SearchComponent]";
    console.log(TAG, 'init');

    const [result, setResult] = useState({
        books: [],
        pagination: {
            page: 1,
            size: 5,
            total: 0,
        },
        isSearched: false,
    });

    const onSearch = async (keyword) => {
        const response = await BookModel.list(keyword);

        setResult({
            ...result,
            books: response.documents,
            pagination: {
                ...result.pagination,
                total: response.meta.total_count,
            },
            isSearched: true,
        });

        onSubmit();
    };

    const onBookDetail = (book) => {
        onDetail(book);
    };

    const onResultChange = (page) => {
        setResult({
            ...result,
            pagination: {
                ...result.pagination,
                page: page,
            }
        })
    };

    useEffect(() => {
        if (refreshCount === 0) {
            return;
        }
        setResult({
            books: [],
            pagination: {
                page: 1,
                size: 5,
                total: 0,
            },
            isSearched: false,
        });
    }, [refreshCount]);

    return (
        <div className="SearchComponent">
            <SearchForm
                onSearch={onSearch}
                refreshCount={refreshCount}
            />
            {
                result.isSearched ?
                    <SearchResult
                        dataSource={result.books}
                        pagination={result.pagination}
                        onDetail={onBookDetail}
                        onChange={onResultChange}
                    /> :
                    null
            }
        </div>
    );
};

SearchComponent.propTypes = {
    refreshCount: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onDetail: PropTypes.func.isRequired,
};

export default SearchComponent;
