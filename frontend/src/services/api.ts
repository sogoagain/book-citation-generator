import { Book } from '../features/booksSlice';
import book from '../__fixtures__/book';

export interface BooksParams {
  keyword: string;
  page: number;
  size: number;
}

export interface Meta {
  is_end: boolean;
  pageable_count: number;
  total_count: number;
}

export interface BooksResponse {
  documents: Array<Book>;
  meta: Meta;
}

export async function fetchBooks({
  keyword = '',
  page = 1,
  size = 5,
}: BooksParams): Promise<BooksResponse> {
  const url = `${process.env.API_SERVER_URL}/books`;
  const params = new URLSearchParams({
    keyword,
    page,
    size,
  } as any);

  const response = await fetch(`${url}?${params}`);
  const books = response.json();
  return books;
}
