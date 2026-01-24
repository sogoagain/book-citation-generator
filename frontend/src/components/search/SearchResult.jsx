import { useState } from 'react'
import BookItem from '../book/BookItem.jsx'
import Pagination from '../pagination/Pagination.jsx'

const SearchResult = ({ dataSource, pagination, onChange }) => {
  const [expandedIsbn, setExpandedIsbn] = useState(null)

  const handleToggle = book => {
    const bookId = book.isbn || book.title
    setExpandedIsbn(prev => (prev === bookId ? null : bookId))
  }

  if (!dataSource || dataSource.length === 0) {
    return (
      <div className='text-center py-8' role='status' aria-live='polite'>
        <div className='text-slate-500'>
          <p className='text-base font-medium'>검색 결과가 없습니다</p>
          <p className='text-sm mt-1'>다른 키워드로 검색해보세요.</p>
        </div>
      </div>
    )
  }

  return (
    <section className='space-y-4' aria-label='검색 결과'>
      <h2 className='text-sm text-slate-500'>
        {pagination.total.toLocaleString()}건
      </h2>

      <ul className='space-y-2' role='list' aria-label='도서 목록'>
        {dataSource.map((book, index) => {
          const bookId = book.isbn || book.title
          return (
            <li key={book.isbn || `book-${index}`}>
              <BookItem
                book={book}
                expanded={expandedIsbn === bookId}
                onToggle={handleToggle}
              />
            </li>
          )
        })}
      </ul>

      {pagination.total > pagination.size && (
        <nav
          className='flex justify-center mt-6'
          aria-label='검색 결과 페이지네이션'
        >
          <Pagination pagination={pagination} onChange={onChange} />
        </nav>
      )}
    </section>
  )
}

export default SearchResult
