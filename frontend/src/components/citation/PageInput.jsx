import CitationUtils from '../../utils/CitationUtils'

const PageInput = ({ value, onChange }) => {
  const parsed = CitationUtils.parsePages(value)
  const preview = CitationUtils.formatPages(parsed)

  return (
    <div className='flex items-center gap-2 pt-1 border-t border-slate-200'>
      <label
        htmlFor='page-input'
        className='text-xs text-slate-500 whitespace-nowrap'
      >
        페이지
      </label>
      <input
        id='page-input'
        type='text'
        className='w-28 px-2 py-1 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400'
        placeholder='42 또는 42-45'
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label='인용 페이지 번호 입력'
      />
      {preview && (
        <span
          className='text-xs font-medium text-indigo-500'
          aria-live='polite'
        >
          → {preview}
        </span>
      )}
    </div>
  )
}

export default PageInput
