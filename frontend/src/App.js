import React, {useState} from 'react';
import './App.css';
import {HeaderMode, MainHeader} from "./components/header/MainHeader";
import SearchComponent from "./components/search/SearchComponent";
import BookDetail from "./components/book/BookDetail";

const App = () => {

    const [headerMode, setHeaderMode] = useState(HeaderMode.NORMAL);
    const [refreshCount, setRefreshCount] = useState(0);
    const [bookDetail, setBookDetail] = useState({
        visible: false,
        book: {},
    });

    const onSubmit = () => {
        setHeaderMode(HeaderMode.MINIMUM);
        setBookDetail({
            ...bookDetail,
            visible: false,
        });
    };

    const onHeaderClick = () => {
        setRefreshCount(refreshCount + 1);
        setHeaderMode(HeaderMode.NORMAL);
        setBookDetail({
            ...bookDetail,
            visible: false,
        });
    };

    const onBookDetail = (book) => {
        setBookDetail({
            visible: true,
            book: book,
        });
    };

    return (
        <div className="App">
            <div className="Page-Container">
                <MainHeader
                    text={"도서 출처 표기 생성기"}
                    mode={headerMode}
                    onClick={onHeaderClick}
                />
                <section>
                    {
                        bookDetail.visible ?
                            <BookDetail book={bookDetail.book}/>
                            :
                            <SearchComponent
                                refreshCount={refreshCount}
                                onSubmit={onSubmit}
                                onDetail={onBookDetail}
                            />
                    }

                </section>
            </div>
        </div>
    );
};

export default App;
