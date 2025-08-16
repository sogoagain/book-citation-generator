import PaginationUtils from '../../utils/PaginationUtils'

const Pagination = ({ pagination, onChange }) => {
  const LEFT_ANGLE_BRACKET = '<'
  const RIGHT_ANGLE_BRACKET = '>'

  const onPrevBtnClick = () => {
    const page = pagination.page - 1
    onChange(page)
  }

  const onNextBtnClick = () => {
    const page = pagination.page + 1
    onChange(page)
  }

  const onPageClick = e => {
    const page = parseInt(e.target.value, 10)
    onChange(page)
  }

  const isFirstPage = () => PaginationUtils.isFirstPage(pagination)

  const isLastPage = () => PaginationUtils.isLastPage(pagination)

  return (
    <nav aria-label='Page navigation' className='flex justify-center'>
      <div className='flex items-center space-x-1'>
        <button
          type='button'
          onClick={onPrevBtnClick}
          disabled={isFirstPage()}
          className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            isFirstPage()
              ? 'text-gray-400 cursor-not-allowed bg-gray-100'
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          {LEFT_ANGLE_BRACKET}
        </button>

        {PaginationUtils.getSelectablePages(pagination).map(page => (
          <button
            key={page}
            type='button'
            onClick={onPageClick}
            value={page}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              pagination.page === page
                ? 'text-white bg-indigo-600 border border-indigo-600'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type='button'
          onClick={onNextBtnClick}
          disabled={isLastPage()}
          className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            isLastPage()
              ? 'text-gray-400 cursor-not-allowed bg-gray-100'
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          {RIGHT_ANGLE_BRACKET}
        </button>
      </div>
    </nav>
  )
}

export default Pagination
