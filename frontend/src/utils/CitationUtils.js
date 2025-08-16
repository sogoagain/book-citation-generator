const CitationUtils = {
  formatAuthors: {
    apa: authors => {
      if (!authors || authors.length === 0) return '작자 미상'

      const formatSingleAuthor = author => {
        if (!author) return '작자 미상'
        const koreanRegex = /[가-힣]/
        if (koreanRegex.test(author)) {
          return author
        }
        const parts = author.trim().split(/\s+/)
        if (parts.length === 1) return parts[0]
        const lastName = parts[parts.length - 1]
        const initials = parts
          .slice(0, -1)
          .map(name => name.charAt(0).toUpperCase() + '.')
          .join(' ')
        return `${lastName}, ${initials}`
      }

      const formattedAuthors = authors.map(formatSingleAuthor)
      const hasKoreanAuthors = authors.some(author => /[가-힣]/.test(author))

      if (formattedAuthors.length === 1) {
        return formattedAuthors[0]
      }

      if (formattedAuthors.length === 2) {
        if (hasKoreanAuthors) {
          return `${formattedAuthors[0]}, ${formattedAuthors[1]}`
        }
        return `${formattedAuthors[0]}, & ${formattedAuthors[1]}`
      }

      if (formattedAuthors.length >= 3) {
        if (hasKoreanAuthors) {
          return `${formattedAuthors[0]} 등`
        }
        return `${formattedAuthors[0]}, et al.`
      }

      if (hasKoreanAuthors) {
        return formattedAuthors.join(', ')
      }

      return (
        formattedAuthors.slice(0, -1).join(', ') +
        ', & ' +
        formattedAuthors[formattedAuthors.length - 1]
      )
    },

    mla: authors => {
      if (!authors || authors.length === 0) return '작자 미상'

      const formatFirstAuthor = author => {
        if (!author) return '작자 미상'
        const koreanRegex = /[가-힣]/
        if (koreanRegex.test(author)) {
          return author
        }
        const parts = author.trim().split(/\s+/)
        if (parts.length === 1) return parts[0]
        const lastName = parts[parts.length - 1]
        const firstName = parts.slice(0, -1).join(' ')
        return `${lastName}, ${firstName}`
      }

      const hasKoreanAuthors = authors.some(author => /[가-힣]/.test(author))

      if (authors.length === 1) {
        return formatFirstAuthor(authors[0])
      }

      if (authors.length === 2) {
        if (hasKoreanAuthors) {
          return `${formatFirstAuthor(authors[0])}, ${authors[1]}`
        }
        return `${formatFirstAuthor(authors[0])}, and ${authors[1]}`
      }

      if (authors.length >= 3) {
        if (hasKoreanAuthors) {
          return `${formatFirstAuthor(authors[0])} 외`
        }
        return `${formatFirstAuthor(authors[0])}, et al.`
      }

      return `${formatFirstAuthor(authors[0])}, et al.`
    },
  },

  extractYear: datetime => {
    if (!datetime) return '날짜 미상'
    try {
      const year = new Date(datetime).getFullYear()
      return isNaN(year) ? '날짜 미상' : year.toString()
    } catch {
      return '날짜 미상'
    }
  },

  formatTitleAPA: title => {
    if (!title) return '제목 없음'
    return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()
  },

  formatTitleMLA: title => {
    if (!title) return '제목 없음'
    const koreanRegex = /[가-힣]/
    if (koreanRegex.test(title)) {
      return title
    }

    const words = title.split(' ')
    const articles = ['a', 'an', 'the']
    const prepositions = ['as', 'at', 'by', 'in', 'of', 'on', 'to', 'up', 'for']
    const conjunctions = ['and', 'or', 'but', 'nor', 'yet', 'so']
    const lowercaseWords = [...articles, ...prepositions, ...conjunctions]

    return words
      .map((word, index) => {
        const cleanWord = word.toLowerCase()
        if (index === 0 || index === words.length - 1) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        }
        if (lowercaseWords.includes(cleanWord) && word.length <= 4) {
          return cleanWord
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
      .join(' ')
  },

  getAPACitation: ({ authors, title, publisher, datetime }) => {
    const formattedAuthors = CitationUtils.formatAuthors.apa(authors)
    const year = CitationUtils.extractYear(datetime)
    const formattedTitle = CitationUtils.formatTitleAPA(title)
    const hasKoreanContent =
      /[가-힣]/.test(title) || authors?.some(author => /[가-힣]/.test(author))

    if (hasKoreanContent) {
      return `${formattedAuthors}. (${year}). <strong>${formattedTitle}</strong>. ${publisher || '출판사 정보 없음'}.`
    }

    return `${formattedAuthors} (${year}). <em>${formattedTitle}</em>. ${publisher || 'Publisher not available'}.`
  },

  getMLACitation: ({ authors, title, publisher, datetime }) => {
    const formattedAuthors = CitationUtils.formatAuthors.mla(authors)
    const year = CitationUtils.extractYear(datetime)
    const formattedTitle = CitationUtils.formatTitleMLA(title)
    const hasKoreanContent =
      /[가-힣]/.test(title) || authors?.some(author => /[가-힣]/.test(author))

    if (hasKoreanContent) {
      return `${formattedAuthors}. <strong>${formattedTitle}</strong>. ${publisher || '출판지 미상'}, ${year}.`
    }

    return `${formattedAuthors}. <em>${formattedTitle}</em>. ${publisher || 'N.p.'}, ${year}.`
  },

  getAllCitations: bookData => {
    return {
      apa: CitationUtils.getAPACitation(bookData),
      mla: CitationUtils.getMLACitation(bookData),
    }
  },
}

export default CitationUtils
