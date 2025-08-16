import { useParams, Navigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { isIsbnMatch } from '../utils/IsbnUtils'
import BookDetailContainer from '../containers/BookDetailContainer.jsx'

const BookDetailPage = () => {
  const { bookId } = useParams()
  const { bookDetail } = useAppStore()

  if (
    !bookDetail.visible ||
    !bookDetail.book ||
    !isIsbnMatch(bookDetail.book.isbn, bookId)
  ) {
    return <Navigate to='/' replace />
  }

  return <BookDetailContainer book={bookDetail.book} />
}

export default BookDetailPage
