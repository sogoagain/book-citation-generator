import { BooksResponse, fetchBooks } from './api';

import BOOKS from '../__fixtures__/books';
import META from '../__fixtures__/meta';

describe('api', () => {
  const mockFetch = (data: BooksResponse) => {
    global.fetch = jest.fn().mockResolvedValue({
      async json() {
        return data;
      },
      ok: true,
    });
  };

  describe('getchBooks', () => {
    beforeEach(() => {
      mockFetch({
        documents: BOOKS,
        meta: META,
      });
    });

    it('fetch books', async () => {
      const response = await fetchBooks({ keyword: '', page: 1, size: 5 });

      expect(response.documents).toEqual(BOOKS);
      expect(response.meta).toEqual(META);
    });
  });
});
