import { useState } from 'react'
import { BsClipboard, BsCheck2, BsBook } from 'react-icons/bs'

const CITATION_STYLES = [
  {
    id: 'apa',
    name: 'APA',
    fullName: 'American Psychological Association (7th Edition)',
    description: '심리학, 교육학, 사회과학 분야의 표준',
    color: 'emerald',
    icon: <BsBook className='w-4 h-4' />,
    bgGradient: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'mla',
    name: 'MLA',
    fullName: 'Modern Language Association (9th Edition)',
    description: '문학, 언어학, 인문학 분야의 표준',
    color: 'blue',
    icon: <BsBook className='w-4 h-4' />,
    bgGradient: 'from-blue-500 to-indigo-500',
  },
]

const CitationSelector = ({ citations }) => {
  const [selectedStyle, setSelectedStyle] = useState('apa')
  const [copiedStyle, setCopiedStyle] = useState(null)

  const stripHtmlTags = html => {
    const temp = document.createElement('div')
    temp.innerHTML = html
    return temp.textContent || temp.innerText || ''
  }

  const handleCopy = async (style, citation) => {
    const plainTextCitation = stripHtmlTags(citation)

    try {
      await navigator.clipboard.writeText(plainTextCitation)
      setCopiedStyle(style)

      setTimeout(() => {
        setCopiedStyle(null)
      }, 2000)
    } catch (error) {
      const textArea = document.createElement('textarea')
      textArea.value = plainTextCitation
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)

      setCopiedStyle(style)
      setTimeout(() => setCopiedStyle(null), 2000)
    }
  }

  const selectedStyleInfo = CITATION_STYLES.find(s => s.id === selectedStyle)
  const selectedCitation = citations[selectedStyle]

  return (
    <section className='space-y-8' aria-label='학술 출처 표기법 선택 및 복사'>
      <div className='bg-white rounded-xl p-1 shadow-sm border border-slate-200'>
        <div
          className='grid grid-cols-2 gap-1'
          role='tablist'
          aria-label='출처 표기법 스타일 선택'
        >
          {CITATION_STYLES.map(style => {
            const isSelected = selectedStyle === style.id
            return (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`p-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                role='tab'
                aria-selected={isSelected}
                aria-controls={`citation-panel-${style.id}`}
                aria-label={`${style.fullName} 선택`}
              >
                <div className='flex flex-col items-center gap-1'>
                  <span className='font-medium text-sm'>{style.name}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className='bg-slate-100 rounded-lg p-4 border border-slate-200'>
        <h3 className='font-bold text-slate-900 mb-1'>
          {selectedStyleInfo.fullName}
        </h3>
        <p className='text-slate-600 text-sm'>
          {selectedStyleInfo.description}
        </p>
      </div>

      <div
        className='bg-white rounded-lg shadow-sm border border-slate-200'
        role='tabpanel'
        id={`citation-panel-${selectedStyle}`}
        aria-labelledby={`tab-${selectedStyle}`}
      >
        <div className='p-4'>
          <div className='flex items-center justify-between mb-4'>
            <h4 className='font-bold text-slate-900'>
              {selectedStyleInfo.name} 인용 형식
            </h4>
            <button
              onClick={() => handleCopy(selectedStyle, selectedCitation)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
                copiedStyle === selectedStyle
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
              disabled={copiedStyle === selectedStyle}
              aria-label={`${selectedStyleInfo.name} 인용 형식을 클립보드에 복사`}
              aria-live='polite'
            >
              {copiedStyle === selectedStyle ? (
                <>
                  <BsCheck2 className='w-4 h-4' aria-hidden='true' />
                  복사 완료!
                </>
              ) : (
                <>
                  <BsClipboard className='w-4 h-4' aria-hidden='true' />
                  복사
                </>
              )}
            </button>
          </div>

          <div className='bg-slate-50 border border-slate-200 rounded-lg p-4'>
            <div
              className='font-mono text-slate-800 leading-relaxed break-words text-sm'
              dangerouslySetInnerHTML={{ __html: selectedCitation }}
              aria-label={`${selectedStyleInfo.name} 형식으로 생성된 인용문`}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CitationSelector
