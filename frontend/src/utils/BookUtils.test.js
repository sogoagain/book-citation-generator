import BookUtils from './BookUtils';

test('getFormattedWriters', () => {
    // given
    const writers = ['가나다'];

    // when
    const result = BookUtils.getFormattedWriters(writers, 2);

    // then
    expect(result).toBe("가나다");
});

test('getFormattedWritersWithMultiple', () => {
    // given
    const writers = ['가나다', '라마바', '사아자', '차카타', '파하'];

    // when
    const result = BookUtils.getFormattedWriters(writers, 2);

    // then
    expect(result).toBe("가나다, 라마바 외 3명");
});

test('getFormattedWritersWithEmpty', () => {
    // given
    const writers = [];

    // when
    const result = BookUtils.getFormattedWriters(writers, 2);

    // then
    expect(result).toBe("");
});

test('convertISO8601toYear', () => {
    // given
    const iso8601 = '2016-02-28T00:00:00.000+09:00';

    // when
    const year = BookUtils.convertISO8601toYear(iso8601);

    // then
    expect(year).toBe(2016);
});
