import { useState } from 'react'
import { BsSearch, BsX } from 'react-icons/bs'

const SearchForm = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('')
  const [error, setError] = useState('')

  const handleInputChange = e => {
    setKeyword(e.target.value)
    if (error) setError('')
  }

  const handleReset = () => {
    setKeyword('')
    setError('')
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (keyword.trim().length === 0) {
      setError('검색할 도서 정보를 입력해주세요')
      return
    }
    setError('')
    onSearch(keyword.trim())
  }

  return (
    <form onSubmit={handleSubmit} role='search' aria-label='도서 검색'>
      <div className='relative flex items-center'>
        <div className='relative flex-1'>
          <label htmlFor='search-input' className='sr-only'>
            도서 제목, 저자명, 출판사명으로 검색
          </label>
          <input
            id='search-input'
            type='text'
            className={`w-full px-4 py-3 pr-10 text-base bg-white border-2 rounded-lg focus:outline-none transition-colors placeholder-slate-400 ${
              error
                ? 'border-red-300 focus:border-red-400'
                : 'border-slate-200 focus:border-indigo-500'
            }`}
            placeholder='도서 제목, 저자, 출판사'
            onChange={handleInputChange}
            value={keyword}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? 'search-error' : undefined}
          />
          {keyword && (
            <button
              type='button'
              onClick={handleReset}
              className='absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500/40'
              aria-label='검색어 지우기'
            >
              <BsX className='w-4 h-4' />
            </button>
          )}
        </div>
        <button
          type='submit'
          className='ml-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-colors font-medium flex items-center gap-1.5'
          aria-label='검색'
        >
          <BsSearch className='w-4 h-4' aria-hidden='true' />
          <span className='hidden sm:inline text-sm'>검색</span>
        </button>
      </div>
      {error && (
        <p id='search-error' className='mt-2 text-sm text-red-600' role='alert'>
          {error}
        </p>
      )}
    </form>
  )
}

export default SearchForm
