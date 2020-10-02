import { Book } from '../features/booksSlice';

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
  const { log } = console;
  const url = `http://localhost:4000/service/books?keyword=${keyword}&page=${page}&size=${size}`;

  return fetch(url)
    .then((response) => response.json())
    .catch((err) => log(err));
}
