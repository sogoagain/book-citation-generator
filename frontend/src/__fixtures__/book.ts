import { Book } from '../features/booksSlice';

const book: Book = {
  authors: ['앤드류 헌트', '데이비드 토머스'],
  contents:
    '[실용주의 프로그래머]는 초보를 벗어나고자 하는 프로그래머를 위해 저자들의 오랜 성찰을 통해 정제한 지혜와 구체적인 실천법으로 안내한다. 코딩 가이드라인, 설계에 대한 격언, 프로젝트 관리에 대한 조언, 사람들과의 관계에 대한 지혜, 각 항목별 연습 문제를 제공한다.',
  datetime: '2014-03-28T00:00:00.000+09:00',
  isbn: '8966261035 9788966261031',
  price: 25000,
  publisher: '인사이트',
  sale_price: 22500,
  status: '정상판매',
  thumbnail:
    'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F927041%3Ftimestamp%3D20200503123609',
  title: '실용주의 프로그래머',
  translators: ['김창준'],
  url:
    'https://search.daum.net/search?w=bookpage&bookId=927041&q=%EC%8B%A4%EC%9A%A9%EC%A3%BC%EC%9D%98+%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8',
};

export default book;
