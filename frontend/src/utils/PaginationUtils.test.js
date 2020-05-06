import PaginationUtils from './PaginationUtils';

test('getTotalPages', () => {
    // given
    const pagination = {
        page: 3,
        size: 5,
        total: 123
    };

    // when
    const totalPages = PaginationUtils.getTotalPages(pagination);

    // then
    expect(totalPages).toBe(25);
});

test('getPrintedPageIndexWithLeftBound', () => {
    // given
    const pagination = {
        page: 3,
        size: 5,
        total: 123
    };

    // when
    const printedPageIndex = PaginationUtils.getPrintedPageIndex(pagination);

    // then
    expect(printedPageIndex).toStrictEqual({
        start: 1,
        end: 5
    });
});

test('getPrintedPageIndexWithNormal', () => {
    // given
    const pagination = {
        page: 12,
        size: 5,
        total: 123
    };

    // when
    const printedPageIndex = PaginationUtils.getPrintedPageIndex(pagination);

    // then
    expect(printedPageIndex).toStrictEqual({
        start: 10,
        end: 14,
    });
});

test('getPrintedPageIndexWithRightBound', () => {
    // given
    const pagination = {
        page: 24,
        size: 5,
        total: 123
    };

    // when
    const printedPageIndex = PaginationUtils.getPrintedPageIndex(pagination);

    // then
    expect(printedPageIndex).toStrictEqual({
        start: 21,
        end: 25,
    });
});

test('getPrintedPages', () => {
    // given
    const pagination = {
        page: 12,
        size: 5,
        total: 123
    };

    // when
    const printedPages = PaginationUtils.getPrintedPages(pagination);

    // then
    expect(printedPages).toStrictEqual([10, 11, 12, 13, 14]);
});

test('getPrintedPagesWithLess5', () => {
    // given
    const pagination = {
        page: 1,
        size: 5,
        total: 12
    };

    // when
    const printedPages = PaginationUtils.getPrintedPages(pagination);

    // then
    expect(printedPages).toStrictEqual([1, 2, 3]);
});