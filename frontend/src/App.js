import React, { useState } from 'react';
import MainHeader from './components/layout/MainHeader';
import SearchComponent from './components/search/SearchComponent';
import BookDetail from './components/book/BookDetail';
import Footer from './components/layout/Footer';

const HeaderMode = {
  NORMAL: {
    marginTop: '160px',
  },
  MINIMUM: {
    marginTop: '16px',
  },
};

const App = () => {
  const MAIN_TITLE = '도서 출처 표기 생성기';

  const [layout, setLayout] = useState({
    headerMode: HeaderMode.NORMAL,
    bookDetail: {
      visible: false,
      book: {},
    },
  });
  const [refreshCount, setRefreshCount] = useState(0);

  const onSubmit = () => {
    setLayout({
      ...layout,
      headerMode: HeaderMode.MINIMUM,
      bookDetail: {
        ...layout.bookDetail,
        visible: false,
      },
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
      },
    });
  };

  const onBookDetail = (book) => {
    setLayout({
      ...layout,
      bookDetail: {
        ...layout.bookDetail,
        book,
        visible: true,
      },
    });
  };

  return (
    <>
      <header
        className="container"
        style={layout.headerMode}
      >
        <MainHeader
          text={MAIN_TITLE}
          mode={layout.headerMode}
          onClick={onHeaderClick}
        />
      </header>
      <section>
        <>
          {
            layout.bookDetail.visible
              ? <BookDetail book={layout.bookDetail.book} />
              : (
                <SearchComponent
                  refreshCount={refreshCount}
                  onSubmit={onSubmit}
                  onDetail={onBookDetail}
                />
              )
          }
        </>
      </section>
      <Footer />
    </>
  );
};

export default React.memo(App);
