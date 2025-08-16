import BookUtils from '../../utils/BookUtils'

const BookWriters = ({ title, writers }) => {
  if (!writers || writers.length === 0) {
    return (
      <div>
        <dt className='text-sm font-medium text-gray-500 mb-1'>{title}</dt>
        <dd className='text-sm text-gray-400'>정보 없음</dd>
      </div>
    )
  }

  return (
    <div>
      <dt className='text-sm font-medium text-gray-500 mb-1'>{title}</dt>
      <dd className='text-sm text-gray-900'>
        {BookUtils.getFormattedWriters(writers, 2)}
      </dd>
    </div>
  )
}

export default BookWriters
