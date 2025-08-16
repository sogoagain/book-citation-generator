import { useEffect, useState } from 'react'
import { BsSearch, BsX } from 'react-icons/bs'

const SearchForm = ({ onSearch, refreshCount, initialKeyword = '' }) => {
  const [keyword, setKeyword] = useState(initialKeyword)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = e => {
    const inputValue = e.target.value
    setKeyword(inputValue)
    if (error) setError('')
  }

  const handleReset = () => {
    setKeyword('')
    setError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (keyword.trim().length === 0) {
      setError('검색할 도서 정보를 입력해주세요')
      return
    }

    setError('')
    setIsLoading(true)

    try {
      await onSearch(keyword.trim())
    } finally {
      setIsLoading(false)
    }
  }

  const isVisibleResetBtn = keyword.length !== 0

  useEffect(() => {
    if (refreshCount === 0) return
    setKeyword('')
    setError('')
    setIsLoading(false)
  }, [refreshCount])

  useEffect(() => {
    setKeyword(initialKeyword)
  }, [initialKeyword])

  return (
    <div className='max-w-2xl mx-auto'>
      <div className='bg-white rounded-xl shadow-sm border border-slate-200 p-6'>
        <form onSubmit={handleSubmit} role='search' aria-label='도서 검색'>
          <div className='relative'>
            <label htmlFor='search-input' className='sr-only'>
              도서 제목, 저자명, 출판사명으로 검색
            </label>
            <div className='relative flex items-center'>
              <div className='relative flex-1'>
                <input
                  id='search-input'
                  type='text'
                  className={`w-full px-4 py-3 pr-16 text-base bg-white border-2 rounded-lg focus:outline-none transition-all duration-200 placeholder-slate-400 ${
                    error
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                  }`}
                  placeholder='도서 검색'
                  onChange={handleInputChange}
                  value={keyword}
                  disabled={isLoading}
                  aria-invalid={error ? 'true' : 'false'}
                  aria-describedby={error ? 'search-error' : 'search-help'}
                />

                {isVisibleResetBtn && !isLoading && (
                  <button
                    type='button'
                    onClick={handleReset}
                    className='absolute right-12 top-1/2 transform -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors duration-200 rounded-full hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40'
                    aria-label='검색어 지우기'
                  >
                    <BsX className='w-4 h-4' />
                  </button>
                )}

                {isLoading && (
                  <div
                    className='absolute right-12 top-1/2 transform -translate-y-1/2'
                    aria-live='polite'
                    aria-label='검색 중'
                  >
                    <div className='w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin'></div>
                  </div>
                )}
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className='ml-3 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium'
                aria-label='도서 검색 실행'
              >
                <BsSearch className='w-4 h-4' aria-hidden='true' />
                <span className='hidden sm:inline'>검색</span>
              </button>
            </div>

            <div id='search-help' className='sr-only'>
              도서 제목, 저자명, 출판사명으로 검색할 수 있습니다
            </div>

            {error && (
              <div
                id='search-error'
                className='mt-2 text-sm text-red-600'
                role='alert'
                aria-live='polite'
              >
                {error}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default SearchForm
