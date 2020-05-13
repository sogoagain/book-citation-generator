import BookRepository from '../../src/repository/BookRepository';
import env from '../../config/env';
import fetch from 'node-fetch'

jest.mock('node-fetch', () => jest.fn())

if (process.env.MODE !== 'service') {
    process.env = Object.assign(process.env, {
        KEY_KAKAO: env.api.key_kakao
    });
}

const mockData = {
    documents: [
        {
            authors: ['공대규'],
            contents: '4차 산업혁명의 주인공은 프로그래머! 상상을 현실로 만들어주는 컴퓨터 프로그래머의 세계를 탐색한다!  이 책은 4차산업혁명시대를 이끌어갈 주인공인 컴퓨터 프로그래머가 되고 싶어 하는 이들을 위해 쓰인 것이다. 프로그램언어란 무엇인지, 코딩교육은 어떻게 이루어지는지, 프로그래머가 되려면 어떤 과정을 거쳐야 하는지, 프로그래머들은 실제로 무슨 일을 하는지 등을 자세하게 소개한다. 또한 더 나아가 각종 소프트웨어 회사의 종류와 사업형태, 앞으로 프로그래머가',
            datetime: '2018-02-26T00:00:00.000+09:00',
            isbn: '1159253153 9791159253157',
            price: 14000,
            publisher: '들녘',
            sale_price: 12600,
            status: '정상판매',
            thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1590243%3Ftimestamp%3D20200417160213',
            title: '프로그래머(푸른들녘 미래탐색 15)',
            translators: [],
            url: 'https://search.daum.net/search?w=bookpage&bookId=1590243&q=%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%28%ED%91%B8%EB%A5%B8%EB%93%A4%EB%85%98+%EB%AF%B8%EB%9E%98%ED%83%90%EC%83%89+15%29'
        },
        {
            authors: ['샘 라이트스톤'],
            contents: '『프로그래머로 사는 법』은 소프트웨어 프로그래머로 취업하여 경력을 시작하는 방법부터 창업에 이르기까지의 단계별 경력을 집약한 책이다. IBM에서 20여 년간 프로그래머로 일하며, 수많은 기업과 대학에서 소프트웨어 엔지니어 양성에 힘써 온 샘 라이트스톤의 학술적 소산으로, 경력관리가 필요한 프로그래머들에게 유용한 정보가 담겨 있다. 소프트웨어 분야에서 경력을 쌓기 위해 필요한 기본 구성 요소를 비롯하여 압박 하에서 제대로 일하는 방법, 전문가로서 정점에',
            datetime: '2012-10-04T00:00:00.000+09:00',
            isbn: '897914962X 9788979149623',
            price: 25000,
            publisher: '한빛미디어',
            sale_price: 22500,
            status: '정상판매',
            thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1103540%3Ftimestamp%3D20200513134504',
            title: '프로그래머로 사는 법',
            translators: ['서환수'],
            url: 'https://search.daum.net/search?w=bookpage&bookId=1103540&q=%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EB%A1%9C+%EC%82%AC%EB%8A%94+%EB%B2%95'
        }
    ],
    meta: {is_end: false, pageable_count: 30, total_count: 30}
};

test('findByKeywordAndPage', async () => {
    // given
    const keyword = '프로그래머';
    const page = 1;
    const mockResponse = Promise.resolve({
        ok: true,
        status,
        json: () => {
            return mockData
        }
    });
    fetch.mockImplementation(() => mockResponse);

    // when
    const books = await BookRepository.findByKeywordAndPage(keyword, page);

    // then
    expect(books.documents.length).toBe(2);
    expect(books.meta.is_end).toBeFalsy();
    expect(books.meta.pageable_count).toBe(30);
});