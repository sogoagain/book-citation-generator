import BookUtils from '../../utils/BookUtils'

const BookYear = ({ datetime }) => (
  <div>
    <dt className='text-sm font-medium text-gray-500 mb-1'>출판연도</dt>
    <dd className='text-sm text-gray-900'>
      {datetime ? BookUtils.extractYearFromISO08601(datetime) : '정보 없음'}
    </dd>
  </div>
)

export default BookYear
