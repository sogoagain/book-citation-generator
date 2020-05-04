import React, {useState} from 'react';
import './App.css';
import SearchForm from "./components/SearchForm";
import {HeaderMode, MainHeader} from "./components/MainHeader";
import SearchResult from "./components/SearchResult";
import BookModel from "./models/BookModel";

const App = () => {

    const [headerMode, setHeaderMode] = useState(HeaderMode.NORMAL);
    const [result, setResult] = useState({
        books: [],
        pagination: {
            page: 1,
            size: 5,
            total: 0,
        }
    });

    const onSearch = async (keyword) => {
        const response = await BookModel.list(keyword);

        setHeaderMode(HeaderMode.MINIMUM);
        setResult({
            books: response.documents,
            pagination: {
                ...result.pagination,
                total: response.meta.total_count,
            }
        });
    };

    return (
        <div className="App">
            <div className="Page-Container">
                <MainHeader
                    text={"도서 출처 표기 생성기"}
                    mode={headerMode}
                />
                <section>
                    <SearchForm onSearch={onSearch}/>
                </section>
                <section>
                    <SearchResult
                        dataSource={result.books}
                        pagination={result.pagination}
                    />
                </section>
            </div>
        </div>
    );
};

export default App;
