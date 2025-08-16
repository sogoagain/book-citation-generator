import BookThumbnail from './BookThumbnail.jsx'

const BookItem = ({ tabIndex, book, onClick }) => {
  const handleClick = () => {
    onClick(book)
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick(book)
    }
  }

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role='button'
      tabIndex={tabIndex}
      className='bg-white rounded-lg border border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 focus:outline-none cursor-pointer p-4 transition-all duration-200'
      aria-label={`${book.title} 도서 상세 정보 보기`}
    >
      <div className='flex gap-4'>
        <div className='flex-shrink-0'>
          <div className='w-16 h-20 sm:w-20 sm:h-26 rounded overflow-hidden'>
            <BookThumbnail
              thumbnail={book.thumbnail}
              title={book.title}
              compact={true}
            />
          </div>
        </div>

        <div className='flex-1 min-w-0'>
          <h3
            className='font-semibold text-slate-900 text-sm sm:text-base mb-2'
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {book.title}
          </h3>

          <div className='space-y-1 text-xs sm:text-sm text-slate-600'>
            {book.authors && book.authors.length > 0 && (
              <div className='truncate'>
                {book.authors.slice(0, 2).join(', ')}
                {book.authors.length > 2 && ` 외 ${book.authors.length - 2}명`}
              </div>
            )}

            <div className='flex items-center gap-2 text-slate-500'>
              {book.publisher && (
                <span className='truncate'>{book.publisher}</span>
              )}
              {book.publisher && book.datetime && <span>·</span>}
              {book.datetime && (
                <span>{new Date(book.datetime).getFullYear()}</span>
              )}
            </div>

            {book.translators && book.translators.length > 0 && (
              <div className='text-slate-500 truncate'>
                번역: {book.translators.slice(0, 1).join(', ')}
                {book.translators.length > 1 &&
                  ` 외 ${book.translators.length - 1}명`}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookItem
