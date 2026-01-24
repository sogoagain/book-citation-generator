import { useState, useMemo } from 'react'
import { BsClipboard, BsCheck2 } from 'react-icons/bs'
import CitationUtils from '../../utils/CitationUtils'
import PageInput from './PageInput.jsx'

const CopyButton = ({ text, label }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      disabled={copied}
      className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
        copied
          ? 'bg-green-50 text-green-700 border border-green-200'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
      }`}
      aria-label={label}
      aria-live='polite'
    >
      {copied ? (
        <>
          <BsCheck2 className='w-3.5 h-3.5' aria-hidden='true' />
          <span>복사됨</span>
        </>
      ) : (
        <>
          <BsClipboard className='w-3.5 h-3.5' aria-hidden='true' />
          <span>복사</span>
        </>
      )}
    </button>
  )
}

const CitationSegments = ({ segments }) => (
  <span>
    {segments.map((segment, i) =>
      segment.italic ? (
        <em key={i}>{segment.text}</em>
      ) : (
        <span key={i}>{segment.text}</span>
      )
    )}
  </span>
)

const CitationPanel = ({ book }) => {
  const [pageInput, setPageInput] = useState('')

  const citation = useMemo(() => {
    return CitationUtils.generateAPA7({
      authors: book.authors,
      translators: book.translators,
      title: book.title,
      publisher: book.publisher,
      datetime: book.datetime,
      pages: pageInput,
    })
  }, [book, pageInput])

  return (
    <div className='mt-3 pt-3 border-t border-slate-100 space-y-3'>
      <div className='bg-slate-50 rounded-lg p-3'>
        <div className='flex items-start justify-between gap-2'>
          <p className='text-sm text-slate-700 leading-relaxed break-all min-w-0 flex-1'>
            <CitationSegments segments={citation.reference} />
          </p>
          <CopyButton
            text={citation.referencePlain}
            label='참고문헌 형식 복사'
          />
        </div>
        <div className='text-xs text-slate-400 mt-1.5'>
          참고문헌 (Reference)
        </div>
      </div>

      <div className='bg-slate-50 rounded-lg p-3 space-y-2.5'>
        <div className='flex items-center justify-between gap-2'>
          <code className='text-sm text-slate-700 break-all min-w-0 flex-1'>
            {citation.inText}
          </code>
          <CopyButton text={citation.inText} label='본문 내 인용 형식 복사' />
        </div>
        <PageInput value={pageInput} onChange={setPageInput} />
        <div className='text-xs text-slate-400'>본문 내 인용 (In-text)</div>
      </div>
    </div>
  )
}

export default CitationPanel
