import React, {useState} from 'react';
import './App.css';
import {HeaderMode, MainHeader} from "./components/header/MainHeader";
import SearchComponent from "./components/search/SearchComponent";
import BookDetail from "./components/book/BookDetail";

const App = () => {
    const TAG = "[App]";
    const MAIN_TITLE = "도서 출처 표기 생성기";
    console.log(TAG, 'init');

    const [layout, setLayout] = useState({
        headerMode: HeaderMode.NORMAL,
        bookDetail: {
            visible: false,
            book: {},
        }
    });
    const [refreshCount, setRefreshCount] = useState(0);

    const onSubmit = () => {
        setLayout({
            ...layout,
            headerMode: HeaderMode.MINIMUM,
            bookDetail: {
                ...layout.bookDetail,
                visible: false,
            }
        });
    };

    const onHeaderClick = () => {
        setRefreshCount(refreshCount + 1);
        setLayout({
            ...layout,
            headerMode: HeaderMode.NORMAL,
            bookDetail: {
                ...layout.bookDetail,
                visible: false,
            }
        });
    };

    const onBookDetail = (book) => {
        setLayout({
            ...layout,
            bookDetail: {
                ...layout.bookDetail,
                book: book,
                visible: true,
            }
        });
    };

    return (
        <div className="App">
            <div className="Page-Container">
                <MainHeader
                    text={MAIN_TITLE}
                    mode={layout.headerMode}
                    onClick={onHeaderClick}
                />
                <section>
                    {
                        layout.bookDetail.visible ?
                            <BookDetail book={layout.bookDetail.book}/> :
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

export default React.memo(App);
