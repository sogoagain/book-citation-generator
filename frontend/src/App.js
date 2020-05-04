import React, {useEffect, useState} from 'react';
import './App.css';
import SearchForm from "./components/SearchForm";
import {HeaderMode, MainHeader} from "./components/MainHeader";
import SearchResult from "./components/SearchResult";
import BookModel from "./models/BookModel";

const App = () => {

    const [headerMode, setHeaderMode] = useState(HeaderMode.NORMAL);
    const [searchResult, setSearchResult] = useState({});

    const onSearch = async (keyword) => {
        const response = await BookModel.list(keyword);
        setSearchResult(response);
    };

    const onFocus = () => {
        setHeaderMode(HeaderMode.MINIMUM);
    };

    useEffect(() => {
    }, [searchResult]);

    return (
        <div className="App">
            <div className="Page-Container">
                <MainHeader
                    text={"도서출처표시기"}
                    mode={headerMode}
                />
                <section>
                    <SearchForm onSearch={onSearch}
                                onFocus={onFocus}/>
                </section>
                <section>
                    <SearchResult/>
                </section>
            </div>
        </div>
    );
};

export default App;
