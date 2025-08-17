import { useParams, Navigate, useLocation } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { isIsbnMatch } from '../utils/IsbnUtils'
import BookDetailContainer from '../containers/BookDetailContainer.jsx'
import { useEffect } from 'react'

const BookDetailPage = () => {
  const { bookId } = useParams()
  const { bookDetail, showBookDetail } = useAppStore()
  const location = useLocation()

  useEffect(() => {
    if (location.state?.book && !bookDetail.visible) {
      showBookDetail(location.state.book)
    }
  }, [location.state, bookDetail.visible, showBookDetail])

  if (
    bookDetail.visible &&
    bookDetail.book &&
    isIsbnMatch(bookDetail.book.isbn, bookId)
  ) {
    return <BookDetailContainer book={bookDetail.book} />
  }

  if (location.state?.book && isIsbnMatch(location.state.book.isbn, bookId)) {
    return <BookDetailContainer book={location.state.book} />
  }
  return <Navigate to='/' replace />
}

export default BookDetailPage
