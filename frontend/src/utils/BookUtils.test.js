import BookUtils from './BookUtils';

describe('BookUtils', () => {
  describe('getFormattedWriters', () => {
    const mainWritersCount = 1;
    let writers;

    context('when the number of main writers has not been exceeded', () => {
      beforeEach(() => {
        writers = ['임작가'];
      });

      it('return writers as it is', () => {
        const result = BookUtils.getFormattedWriters(writers, mainWritersCount);

        expect(result).toBe('임작가');
      });
    });

    context('hen the number of main writers has been exceeded', () => {
      beforeEach(() => {
        writers = ['임작가', '김작가'];
      });

      it('return shorten the list of writers', () => {
        const result = BookUtils.getFormattedWriters(writers, mainWritersCount);

        expect(result).toBe('임작가 외 1명');
      });
    });
  });

  describe('extractYearFromISO08601', () => {
    it('returns year', () => {
      const iso8601 = '2016-02-28T00:00:00.000+09:00';

      const year = BookUtils.extractYearFromISO08601(iso8601);

      expect(year).toBe(2016);
    });
  });

  describe('getMLACitationNotation', () => {
    let book;

    context('with 1 authors', () => {
      beforeEach(() => {
        book = {
          authors: [
            '샘 라이트스톤',
          ],
          datetime: '2012-10-04T00:00:00.000+09:00',
          publisher: '한빛미디어',
          title: '프로그래머로 사는 법',
          translators: [
            '서환수',
          ],
        };
      });

      it('returns citation notation', () => {
        const citation = BookUtils.getMLACitationNotation(book);

        expect(citation).toBe('샘 라이트스톤. 프로그래머로 사는 법. 한빛미디어, 2012.');
      });
    });

    context('with 2 authors', () => {
      beforeEach(() => {
        book = {
          authors: [
            '앤드류 헌트',
            '데이비드 토머스',
          ],
          datetime: '2014-03-28T00:00:00.000+09:00',
          publisher: '인사이트',
          status: '정상판매',
          title: '실용주의 프로그래머',
          translators: [
            '김창준',
          ],
        };
      });

      it('returns citation notation', () => {
        const citation = BookUtils.getMLACitationNotation(book);

        expect(citation).toBe('앤드류 헌트, 데이비드 토머스. 실용주의 프로그래머. 인사이트, 2014.');
      });
    });

    context('with 3 or more authors', () => {
      beforeEach(() => {
        book = {
          authors: [
            '김성완',
            '정재원',
            '이국현',
            '김상천',
            '김용준',
          ],
          datetime: '2016-02-28T00:00:00.000+09:00',
          publisher: '로드북',
          title: '게임 프로그래머로 산다는 것(사람과 프로그래머)',
          translators: [],
        };
      });

      it('returns citation notation', () => {
        const citation = BookUtils.getMLACitationNotation(book);

        expect(citation).toBe('김성완 외. 게임 프로그래머로 산다는 것(사람과 프로그래머). 로드북, 2016.');
      });
    });
  });
});
