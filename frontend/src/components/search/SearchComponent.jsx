import { useState } from 'react'
import { useBooks } from '../../hooks/useBooks'
import SearchForm from './SearchForm.jsx'
import SearchResult from './SearchResult.jsx'

const SearchComponent = () => {
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const size = 10

  const {
    data: booksData,
    isLoading,
    isError,
    error,
  } = useBooks(keyword, page, size)

  const handleSearch = newKeyword => {
    setKeyword(newKeyword)
    setPage(1)
  }

  const handlePageChange = newPage => {
    setPage(newPage)
  }

  return (
    <div className='space-y-6'>
      <SearchForm onSearch={handleSearch} />

      {keyword && (
        <div>
          {isLoading && (
            <div
              className='flex justify-center items-center py-8'
              aria-live='polite'
            >
              <div className='animate-spin rounded-full h-6 w-6 border-2 border-slate-200 border-t-indigo-600'></div>
              <span className='ml-2 text-sm text-slate-500'>검색 중...</span>
            </div>
          )}

          {isError && (
            <div className='bg-red-50 border border-red-100 rounded-lg p-4'>
              <p className='text-sm text-red-700'>
                {error?.message ||
                  '네트워크 연결을 확인하고 다시 시도해주세요.'}
              </p>
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
              onChange={handlePageChange}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default SearchComponent
