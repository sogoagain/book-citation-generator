import { useState } from 'react'

const BookThumbnail = ({ thumbnail, title, compact = false }) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  if (!thumbnail || imageError) {
    return (
      <div
        className={`w-full aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg ${compact ? '' : 'shadow-sm border border-gray-200'} flex flex-col items-center justify-center text-gray-400`}
      >
        <div className='text-center px-2'>
          <svg
            className={`${compact ? 'w-6 h-6' : 'w-12 h-12'} mx-auto ${compact ? 'mb-1' : 'mb-2'} text-gray-300`}
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
              clipRule='evenodd'
            />
          </svg>
          {!compact && (
            <>
              <div className='text-sm font-medium text-gray-500'>
                도서 이미지
              </div>
              <div className='text-xs text-gray-400 mt-1'>이미지 없음</div>
            </>
          )}
          {compact && <div className='text-xs text-gray-400'>이미지 없음</div>}
        </div>
      </div>
    )
  }

  return (
    <div className='w-full relative'>
      {!imageLoaded && (
        <div
          className={`w-full aspect-[3/4] bg-gray-100 rounded-lg ${compact ? '' : 'shadow-sm border border-gray-200'} flex items-center justify-center absolute inset-0`}
        >
          <div
            className={`animate-spin rounded-full ${compact ? 'h-4 w-4' : 'h-8 w-8'} border-b-2 border-gray-400`}
          ></div>
        </div>
      )}
      <img
        className={`w-full h-auto max-w-full rounded-lg ${compact ? '' : 'shadow-sm border border-gray-200'} object-cover transition-opacity duration-200 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        src={thumbnail}
        alt={title || '도서 이미지'}
        title={title}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading='lazy'
      />
    </div>
  )
}

export default BookThumbnail
