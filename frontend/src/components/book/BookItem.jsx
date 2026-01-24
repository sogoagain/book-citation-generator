import { BsChevronDown } from 'react-icons/bs'
import BookThumbnail from './BookThumbnail.jsx'
import CitationPanel from '../citation/CitationPanel.jsx'

const BookItem = ({ book, expanded, onToggle }) => {
  const handleClick = () => {
    onToggle(book)
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onToggle(book)
    }
  }

  return (
    <div
      className={`bg-white rounded-lg border transition-all duration-200 ${
        expanded
          ? 'border-indigo-200 ring-1 ring-indigo-100'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role='button'
        tabIndex={0}
        className='p-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/40 rounded-lg'
        aria-expanded={expanded}
        aria-label={`${book.title} 인용 생성`}
      >
        <div className='flex gap-3'>
          <div className='flex-shrink-0'>
            <div className='w-12 h-16 sm:w-14 sm:h-[72px] rounded overflow-hidden'>
              <BookThumbnail
                thumbnail={book.thumbnail}
                title={book.title}
                compact={true}
              />
            </div>
          </div>

          <div className='flex-1 min-w-0'>
            <h3 className='font-medium text-slate-900 text-sm leading-snug line-clamp-2'>
              {book.title}
            </h3>
            <div className='mt-1 text-xs text-slate-500 space-y-0.5'>
              {book.authors && book.authors.length > 0 && (
                <div className='truncate'>{book.authors.join(', ')}</div>
              )}
              <div className='flex items-center gap-1.5'>
                {book.publisher && (
                  <span className='truncate'>{book.publisher}</span>
                )}
                {book.publisher && book.datetime && (
                  <span className='text-slate-300'>·</span>
                )}
                {book.datetime && (
                  <span>{String(book.datetime).slice(0, 4)}</span>
                )}
              </div>
              {book.translators && book.translators.length > 0 && (
                <div className='text-slate-400 truncate'>
                  역: {book.translators.join(', ')}
                </div>
              )}
            </div>
          </div>

          <div className='flex-shrink-0 self-center'>
            <BsChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                expanded ? 'rotate-180' : ''
              }`}
              aria-hidden='true'
            />
          </div>
        </div>
      </div>

      {expanded && (
        <div className='px-4 pb-4'>
          <CitationPanel book={book} />
        </div>
      )}
    </div>
  )
}

export default BookItem
