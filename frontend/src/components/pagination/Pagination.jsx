const Pagination = ({ pagination, onChange }) => {
  const { page, size, total } = pagination
  const totalPages = Math.ceil(total / size)
  const isFirstPage = page <= 1
  const isLastPage = page >= totalPages

  const getSelectablePages = () => {
    const pages = []
    const start = Math.max(1, page - 2)
    const end = Math.min(totalPages, page + 2)
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <nav aria-label='Page navigation' className='flex justify-center'>
      <div className='flex items-center space-x-1'>
        <button
          type='button'
          onClick={() => onChange(page - 1)}
          disabled={isFirstPage}
          className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            isFirstPage
              ? 'text-slate-300 cursor-not-allowed'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {'<'}
        </button>

        {getSelectablePages().map(p => (
          <button
            key={p}
            type='button'
            onClick={() => onChange(p)}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              page === p
                ? 'text-white bg-indigo-600'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {p}
          </button>
        ))}

        <button
          type='button'
          onClick={() => onChange(page + 1)}
          disabled={isLastPage}
          className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            isLastPage
              ? 'text-slate-300 cursor-not-allowed'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {'>'}
        </button>
      </div>
    </nav>
  )
}

export default Pagination
