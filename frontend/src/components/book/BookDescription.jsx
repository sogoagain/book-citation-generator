import BookThumbnail from './BookThumbnail.jsx'
import BookWriters from './BookWriters.jsx'
import BookYear from './BookYear.jsx'
import BookPublisher from './BookPublisher.jsx'

const BookDescription = ({ book }) => {
  if (!book) {
    return (
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
        <div className='text-center text-gray-500'>
          도서 정보를 찾을 수 없습니다.
        </div>
      </div>
    )
  }

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
      <div className='bg-gray-50 border-b border-gray-200 px-6 py-4'>
        <h1 className='text-xl font-semibold text-gray-900 text-center leading-tight'>
          {book.title}
        </h1>
      </div>

      <div className='p-6'>
        <div className='flex flex-col lg:flex-row gap-6'>
          <div className='flex-shrink-0 flex justify-center lg:justify-start'>
            <div className='w-48'>
              <BookThumbnail thumbnail={book.thumbnail} alt={book.title} />
            </div>
          </div>

          <div className='flex-1'>
            <dl className='space-y-4'>
              <BookWriters title='저자' writers={book.authors || []} />

              {book.translators && book.translators.length > 0 && (
                <BookWriters title='역자' writers={book.translators} />
              )}

              <BookPublisher publisher={book.publisher} />

              <BookYear datetime={book.datetime} />

              {book.isbn && (
                <div>
                  <dt className='text-sm font-medium text-gray-500 mb-1'>
                    ISBN
                  </dt>
                  <dd className='text-sm text-gray-900'>{book.isbn}</dd>
                </div>
              )}

              {book.contents && (
                <div>
                  <dt className='text-sm font-medium text-gray-500 mb-1'>
                    도서 소개
                  </dt>
                  <dd className='text-sm text-gray-700 leading-relaxed'>
                    {book.contents}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDescription
