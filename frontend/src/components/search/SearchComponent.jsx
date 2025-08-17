import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { useBooks } from '../../hooks/useBooks'
import { getPrimaryIsbn } from '../../utils/IsbnUtils'
import SearchForm from './SearchForm.jsx'
import SearchResult from './SearchResult.jsx'

const SearchComponent = ({ refreshCount, onSubmit }) => {
  const navigate = useNavigate()
  const [urlSearchParams, setUrlSearchParams] = useSearchParams()
  const { showBookDetail } = useAppStore()

  const keyword = urlSearchParams.get('keyword') || ''
  const page = parseInt(urlSearchParams.get('page') || '1', 10)
  const size = 10

  const hasSearched = useMemo(() => !!keyword, [keyword])

  const {
    data: booksData,
    isLoading,
    isError,
    error,
  } = useBooks(hasSearched ? keyword : '', page, size)

  const handleSearch = keyword => {
    const newParams = new URLSearchParams()
    newParams.set('keyword', keyword)
    newParams.set('page', '1')
    setUrlSearchParams(newParams)
    onSubmit()
  }

  const handlePageChange = page => {
    const newParams = new URLSearchParams(urlSearchParams)
    newParams.set('page', page.toString())
    setUrlSearchParams(newParams)
  }

  const handleBookDetail = book => {
    showBookDetail(book)
    const bookId = getPrimaryIsbn(book.isbn) || book.isbn
    navigate(`/book/${bookId}`, { state: { book } })
  }

  return (
    <div className='space-y-6'>
      <SearchForm
        onSearch={handleSearch}
        refreshCount={refreshCount}
        initialKeyword={keyword}
      />

      {hasSearched && (
        <div className='mt-6'>
          {isLoading && (
            <div className='flex justify-center items-center py-8'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600'></div>
              <span className='ml-2 text-gray-600'>
                도서를 검색 중입니다...
              </span>
            </div>
          )}

          {isError && (
            <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
              <div className='text-red-800'>
                <h3 className='font-medium'>검색 중 오류가 발생했습니다</h3>
                <p className='text-sm mt-1'>
                  {error?.message ||
                    '네트워크 연결을 확인하고 다시 시도해주세요.'}
                </p>
              </div>
            </div>
          )}

          {booksData && !isLoading && !isError && (
            <SearchResult
              dataSource={booksData.documents || []}
              pagination={{
                page: page,
                size: size,
                total: booksData.meta?.total_count || 0,
              }}
              onDetail={handleBookDetail}
              onChange={handlePageChange}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default SearchComponent
