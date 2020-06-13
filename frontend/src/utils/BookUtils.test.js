import BookUtils from './BookUtils';

test('getFormattedWriters', () => {
  // given
  const writers = ['가나다'];

  // when
  const result = BookUtils.getFormattedWriters(writers, 2);

  // then
  expect(result).toBe('가나다');
});

test('getFormattedWritersWithMultiple', () => {
  // given
  const writers = ['가나다', '라마바', '사아자', '차카타', '파하'];

  // when
  const result = BookUtils.getFormattedWriters(writers, 2);

  // then
  expect(result).toBe('가나다, 라마바 외 3명');
});

test('getFormattedWritersWithEmpty', () => {
  // given
  const writers = [];

  // when
  const result = BookUtils.getFormattedWriters(writers, 2);

  // then
  expect(result).toBe('');
});

test('convertISO8601toYear', () => {
  // given
  const iso8601 = '2016-02-28T00:00:00.000+09:00';

  // when
  const year = BookUtils.convertISO8601toYear(iso8601);

  // then
  expect(year).toBe(2016);
});

test('printMLAStyleWith1Authors', () => {
  // given
  const book = {
    authors: [
      '샘 라이트스톤',
    ],
    contents: '『프로그래머로 사는 법』은 소프트웨어 프로그래머로 취업하여 경력을 시작하는 방법부터 창업에 이르기까지의 단계별 경력을 집약한 책이다. IBM에서 20여 년간 프로그래머로 일하며, 수많은 기업과 대학에서 소프트웨어 엔지니어 양성에 힘써 온 샘 라이트스톤의 학술적 소산으로, 경력관리가 필요한 프로그래머들에게 유용한 정보가 담겨 있다. 소프트웨어 분야에서 경력을 쌓기 위해 필요한 기본 구성 요소를 비롯하여 압박 하에서 제대로 일하는 방법, 전문가로서 정점에',
    datetime: '2012-10-04T00:00:00.000+09:00',
    isbn: '897914962X 9788979149623',
    price: 25000,
    publisher: '한빛미디어',
    sale_price: 22500,
    status: '정상판매',
    thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1103540%3Ftimestamp%3D20200429132912',
    title: '프로그래머로 사는 법',
    translators: [
      '서환수',
    ],
    url: 'https://search.daum.net/search?w=bookpage&bookId=1103540&q=%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EB%A1%9C+%EC%82%AC%EB%8A%94+%EB%B2%95',
  };

  // when
  const citation = BookUtils.printMLAStyle(book);

  // then
  const expected = '샘 라이트스톤. 프로그래머로 사는 법. 한빛미디어, 2012.';
  expect(citation).toBe(expected);
});

test('printMLAStyleWith2Authors', () => {
  // given
  const book = {
    authors: [
      '앤드류 헌트',
      '데이비드 토머스',
    ],
    contents: '[실용주의 프로그래머]는 초보를 벗어나고자 하는 프로그래머를 위해 저자들의 오랜 성찰을 통해 정제한 지혜와 구체적인 실천법으로 안내한다. 코딩 가이드라인, 설계에 대한 격언, 프로젝트 관리에 대한 조언, 사람들과의 관계에 대한 지혜, 각 항목별 연습 문제를 제공한다.',
    datetime: '2014-03-28T00:00:00.000+09:00',
    isbn: '8966261035 9788966261031',
    price: 25000,
    publisher: '인사이트',
    sale_price: 22500,
    status: '정상판매',
    thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F927041%3Ftimestamp%3D20200503123609',
    title: '실용주의 프로그래머',
    translators: [
      '김창준',
    ],
    url: 'https://search.daum.net/search?w=bookpage&bookId=927041&q=%EC%8B%A4%EC%9A%A9%EC%A3%BC%EC%9D%98+%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8',
  };

  // when
  const citation = BookUtils.printMLAStyle(book);

  // then
  const expected = '앤드류 헌트, 데이비드 토머스. 실용주의 프로그래머. 인사이트, 2014.';
  expect(citation).toBe(expected);
});

test('printMLAStyleWith3OrMore', () => {
  // given
  const book = {
    authors: [
      '김성완',
      '정재원',
      '이국현',
      '김상천',
      '김용준',
    ],
    contents: '『게임 프로그래머로 산다는 것』은 게임 프로그래머인 저자가 동료로서 선배로서 그들의 진솔한 이야기를 들려준다. 예비 프로그래머라면 앞으로 걸어갈 다양한 길을 간접적으로 경험할 수 있다. 현업 개발자라면 함께 가는 이 길에 대해 공감하고 다시 한번 진지한 고민과 성찰을 해볼 수 있다.',
    datetime: '2016-02-28T00:00:00.000+09:00',
    isbn: '8997924192 9788997924196',
    price: 16000,
    publisher: '로드북',
    sale_price: 14400,
    status: '정상판매',
    thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1499469%3Ftimestamp%3D20200503122419',
    title: '게임 프로그래머로 산다는 것(사람과 프로그래머)',
    translators: [],
    url: 'https://search.daum.net/search?w=bookpage&bookId=1499469&q=%EA%B2%8C%EC%9E%84+%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EB%A1%9C+%EC%82%B0%EB%8B%A4%EB%8A%94+%EA%B2%83%28%EC%82%AC%EB%9E%8C%EA%B3%BC+%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8+5%29',
  };

  // when
  const citation = BookUtils.printMLAStyle(book);

  // then
  const expected = '김성완 외. 게임 프로그래머로 산다는 것(사람과 프로그래머). 로드북, 2016.';
  expect(citation).toBe(expected);
});
