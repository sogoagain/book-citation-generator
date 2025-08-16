import { useMemo } from 'react'
import { useAppStore } from '../store/useAppStore'
import BookDescription from '../components/book/BookDescription.jsx'
import CitationSelector from '../components/book/CitationSelector.jsx'
import CitationUtils from '../utils/CitationUtils'

const BookDetailContainer = ({ book: propBook }) => {
  const { bookDetail } = useAppStore()

  const book = propBook || bookDetail.book

  const citations = useMemo(() => {
    if (!book || !book.authors || !book.title) {
      return {
        apa: '도서 정보가 없습니다.',
        mla: '도서 정보가 없습니다.',
        chicago: '도서 정보가 없습니다.',
        harvard: '도서 정보가 없습니다.',
        ieee: '도서 정보가 없습니다.',
      }
    }

    return CitationUtils.getAllCitations({
      authors: book.authors,
      title: book.title,
      publisher: book.publisher,
      datetime: book.datetime,
    })
  }, [book])

  if (!book) {
    return (
      <div className='flex items-center justify-center p-8'>
        <div className='text-gray-500'>도서 정보를 불러올 수 없습니다.</div>
      </div>
    )
  }

  return (
    <div className='max-w-4xl mx-auto space-y-6'>
      <BookDescription book={book} />

      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
        <h2 className='text-lg font-semibold text-gray-900 mb-4'>
          학술 출처 표기법
        </h2>
        <CitationSelector citations={citations} />
      </div>
    </div>
  )
}

export default BookDetailContainer
