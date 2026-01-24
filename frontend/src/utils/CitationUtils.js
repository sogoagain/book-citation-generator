const CitationUtils = {
  isKorean: text => /[가-힣]/.test(text || ''),

  parsePages: input => {
    if (!input || !input.trim()) return null
    const cleaned = input.trim()
    const rangeMatch = cleaned.match(/^(\d+)\s*[-~–—]+\s*(\d+)$/)
    if (rangeMatch) {
      return { type: 'range', start: rangeMatch[1], end: rangeMatch[2] }
    }
    const singleMatch = cleaned.match(/^(\d+)$/)
    if (singleMatch) {
      return { type: 'single', page: singleMatch[1] }
    }
    return null
  },

  formatPages: parsed => {
    if (!parsed) return ''
    if (parsed.type === 'single') return `p. ${parsed.page}`
    return `pp. ${parsed.start}-${parsed.end}`
  },

  extractYear: datetime => {
    if (!datetime) return '날짜 미상'
    const match = String(datetime).match(/^(\d{4})/)
    return match ? match[1] : '날짜 미상'
  },

  formatSingleAuthorReference: author => {
    if (!author) return '작자 미상'
    if (CitationUtils.isKorean(author)) return author
    const parts = author.trim().split(/\s+/)
    if (parts.length === 1) return parts[0]
    const lastName = parts[parts.length - 1]
    const initials = parts
      .slice(0, -1)
      .map(name => name.charAt(0).toUpperCase() + '.')
      .join(' ')
    return `${lastName}, ${initials}`
  },

  formatAuthorsReference: authors => {
    if (!authors || authors.length === 0) return '작자 미상'

    const isKorean = authors.some(a => CitationUtils.isKorean(a))
    const formatted = authors.map(CitationUtils.formatSingleAuthorReference)

    if (formatted.length === 1) {
      return formatted[0]
    }

    if (formatted.length === 2) {
      return isKorean
        ? `${formatted[0]}, ${formatted[1]}`
        : `${formatted[0]}, & ${formatted[1]}`
    }

    if (formatted.length <= 20) {
      const allButLast = formatted.slice(0, -1).join(', ')
      const last = formatted[formatted.length - 1]
      return isKorean ? `${allButLast}, ${last}` : `${allButLast}, & ${last}`
    }

    const first19 = formatted.slice(0, 19).join(', ')
    const last = formatted[formatted.length - 1]
    return `${first19}, ... ${last}`
  },

  formatAuthorsInText: authors => {
    if (!authors || authors.length === 0) return '작자 미상'

    const isKorean = authors.some(a => CitationUtils.isKorean(a))

    const getLastName = author => {
      if (CitationUtils.isKorean(author)) return author
      const parts = author.trim().split(/\s+/)
      return parts[parts.length - 1]
    }

    if (authors.length === 1) {
      return getLastName(authors[0])
    }

    if (authors.length === 2) {
      const a1 = getLastName(authors[0])
      const a2 = getLastName(authors[1])
      return isKorean ? `${a1}, ${a2}` : `${a1} & ${a2}`
    }

    const first = getLastName(authors[0])
    return isKorean ? `${first} 등` : `${first} et al.`
  },

  formatTitle: title => {
    if (!title) return '제목 없음'
    return title
  },

  formatTranslators: (translators, isKorean) => {
    if (!translators || translators.length === 0) return null
    if (isKorean) {
      return `(${translators.join(', ')} 역)`
    }
    const formatted = translators.map(t => {
      const parts = t.trim().split(/\s+/)
      if (parts.length === 1) return parts[0]
      const initials = parts
        .slice(0, -1)
        .map(name => name.charAt(0).toUpperCase() + '.')
        .join(' ')
      const lastName = parts[parts.length - 1]
      return `${initials} ${lastName}`
    })
    if (formatted.length === 1) {
      return `(${formatted[0]}, Trans.)`
    }
    return `(${formatted.join(' & ')}, Trans.)`
  },

  generateReference: ({ authors, translators, title, publisher, datetime }) => {
    const isKorean =
      authors?.some(a => CitationUtils.isKorean(a)) ||
      CitationUtils.isKorean(title)

    const formattedAuthors = CitationUtils.formatAuthorsReference(authors)
    const year = CitationUtils.extractYear(datetime)
    const formattedTitle = CitationUtils.formatTitle(title)
    const translatorStr = CitationUtils.formatTranslators(translators, isKorean)
    const pub =
      publisher || (isKorean ? '출판사 정보 없음' : 'Publisher not available')

    const segments = []
    segments.push({ text: `${formattedAuthors}`, italic: false })
    segments.push({
      text: isKorean ? `. (${year}). ` : ` (${year}). `,
      italic: false,
    })
    segments.push({ text: formattedTitle, italic: true })
    if (translatorStr) {
      segments.push({ text: ` ${translatorStr}`, italic: false })
    }
    segments.push({ text: `. ${pub}.`, italic: false })

    return segments
  },

  generateInText: ({ authors, datetime, pages }) => {
    const authorText = CitationUtils.formatAuthorsInText(authors)
    const year = CitationUtils.extractYear(datetime)
    const parsed = CitationUtils.parsePages(pages)
    const pageStr = CitationUtils.formatPages(parsed)

    if (pageStr) {
      return `(${authorText}, ${year}, ${pageStr})`
    }
    return `(${authorText}, ${year})`
  },

  segmentsToPlainText: segments => {
    return segments.map(s => s.text).join('')
  },

  generateAPA7: ({
    authors,
    translators,
    title,
    publisher,
    datetime,
    pages,
  }) => {
    const reference = CitationUtils.generateReference({
      authors,
      translators,
      title,
      publisher,
      datetime,
    })
    const referencePlain = CitationUtils.segmentsToPlainText(reference)
    const inText = CitationUtils.generateInText({ authors, datetime, pages })

    return { reference, referencePlain, inText }
  },
}

export default CitationUtils
