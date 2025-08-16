import BookItem from '../book/BookItem.jsx'
import Pagination from '../pagination/Pagination.jsx'

const SearchResult = ({ dataSource, pagination, onDetail, onChange }) => {
  const handleBookClick = book => {
    onDetail(book)
  }

  const handlePaginationChange = page => {
    onChange(page)
  }

  if (!dataSource || dataSource.length === 0) {
    return (
      <div className='text-center py-8' role='status' aria-live='polite'>
        <div className='text-gray-500'>
          <p className='text-lg font-medium'>검색 결과가 없습니다</p>
          <p className='text-sm mt-1'>다른 키워드로 검색해보세요.</p>
        </div>
      </div>
    )
  }

  return (
    <section className='space-y-6' aria-label='검색 결과'>
      <div className='mb-4'>
        <h2 className='text-base font-medium text-gray-900'>
          검색 결과 {pagination.total}개
        </h2>
      </div>

      <ul className='space-y-3' role='list' aria-label='도서 목록'>
        {dataSource.map((book, index) => (
          <li key={book.isbn || `book-${index}`}>
            <BookItem book={book} onClick={handleBookClick} tabIndex={0} />
          </li>
        ))}
      </ul>

      {pagination.total > pagination.size && (
        <nav
          className='flex justify-center mt-8'
          aria-label='검색 결과 페이지네이션'
        >
          <Pagination
            pagination={pagination}
            onChange={handlePaginationChange}
          />
        </nav>
      )}
    </section>
  )
}

export default SearchResult
