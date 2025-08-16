const BookPublisher = ({ publisher }) => (
  <div>
    <dt className='text-sm font-medium text-gray-500 mb-1'>출판사</dt>
    <dd className='text-sm text-gray-900'>{publisher || '정보 없음'}</dd>
  </div>
)

export default BookPublisher
