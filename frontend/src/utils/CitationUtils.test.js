import { describe, it, expect } from 'vitest'
import CitationUtils from './CitationUtils'

describe('CitationUtils', () => {
  const sampleBook = {
    authors: ['박응용'],
    title: 'Do it! 점프 투 파이썬',
    publisher: '이지스퍼블리싱',
    datetime: '2023-06-15T00:00:00.000+09:00',
  }

  const multiAuthorBook = {
    authors: ['김철수', '이영희', '박민수'],
    title: '현대 웹 개발의 이해',
    publisher: '테크북스',
    datetime: '2023-05-15T00:00:00Z',
  }

  const englishBook = {
    authors: ['John Smith', 'Jane Doe'],
    title: 'Modern Web Development: A Complete Guide',
    publisher: 'Tech Publishers',
    datetime: '2023-03-20T00:00:00Z',
  }

  const singleAuthorBook = {
    authors: ['이영희'],
    title: 'JavaScript 완전정복',
    publisher: '코딩출판사',
    datetime: '2022-12-01T00:00:00Z',
  }

  describe('formatAuthors', () => {
    describe('APA style', () => {
      it('should format single author correctly', () => {
        const result = CitationUtils.formatAuthors.apa(['박응용'])
        expect(result).toBe('박응용')
      })

      it('should format two authors correctly', () => {
        const result = CitationUtils.formatAuthors.apa(['김철수', '이영희'])
        expect(result).toBe('김철수, 이영희')
      })

      it('should format three or more Korean authors with "등"', () => {
        const result = CitationUtils.formatAuthors.apa([
          '김철수',
          '이영희',
          '박민수',
        ])
        expect(result).toBe('김철수 등')
      })

      it('should format three or more English authors with "et al."', () => {
        const result = CitationUtils.formatAuthors.apa([
          'John Smith',
          'Jane Doe',
          'Bob Johnson',
        ])
        expect(result).toBe('Smith, J., et al.')
      })

      it('should format English authors correctly', () => {
        const result = CitationUtils.formatAuthors.apa([
          'John Smith',
          'Jane Doe',
        ])
        expect(result).toBe('Smith, J., & Doe, J.')
      })
    })

    describe('MLA style', () => {
      it('should format single author correctly', () => {
        const result = CitationUtils.formatAuthors.mla(['박응용'])
        expect(result).toBe('박응용')
      })

      it('should format two Korean authors correctly', () => {
        const result = CitationUtils.formatAuthors.mla(['김철수', '이영희'])
        expect(result).toBe('김철수, 이영희')
      })

      it('should format two English authors correctly', () => {
        const result = CitationUtils.formatAuthors.mla([
          'John Smith',
          'Jane Doe',
        ])
        expect(result).toBe('Smith, John, and Jane Doe')
      })

      it('should use "외" for three or more Korean authors', () => {
        const result = CitationUtils.formatAuthors.mla([
          '김철수',
          '이영희',
          '박민수',
        ])
        expect(result).toBe('김철수 외')
      })

      it('should use "et al." for three or more English authors', () => {
        const result = CitationUtils.formatAuthors.mla([
          'John Smith',
          'Jane Doe',
          'Bob Johnson',
        ])
        expect(result).toBe('Smith, John, et al.')
      })
    })
  })

  describe('extractYear', () => {
    it('should extract year from ISO date', () => {
      const result = CitationUtils.extractYear('2023-05-15T00:00:00Z')
      expect(result).toBe('2023')
    })

    it('should return "날짜 미상" for invalid date', () => {
      const result = CitationUtils.extractYear('invalid-date')
      expect(result).toBe('날짜 미상')
    })

    it('should return "날짜 미상" for null/undefined', () => {
      expect(CitationUtils.extractYear(null)).toBe('날짜 미상')
      expect(CitationUtils.extractYear(undefined)).toBe('날짜 미상')
    })
  })

  describe('Citation formats', () => {
    describe('APA Citation', () => {
      it('should generate correct APA citation for Korean book with bold', () => {
        const result = CitationUtils.getAPACitation(sampleBook)
        expect(result).toBe(
          '박응용. (2023). <strong>Do it! 점프 투 파이썬</strong>. 이지스퍼블리싱.'
        )
      })

      it('should generate correct APA citation for English book', () => {
        const result = CitationUtils.getAPACitation(englishBook)
        expect(result).toBe(
          'Smith, J., & Doe, J. (2023). <em>Modern web development: a complete guide</em>. Tech Publishers.'
        )
      })

      it('should handle missing publisher', () => {
        const bookWithoutPublisher = { ...sampleBook, publisher: null }
        const result = CitationUtils.getAPACitation(bookWithoutPublisher)
        expect(result).toContain('출판사 정보 없음')
      })
    })

    describe('MLA Citation', () => {
      it('should generate correct MLA citation for Korean book with bold', () => {
        const result = CitationUtils.getMLACitation(singleAuthorBook)
        expect(result).toBe(
          '이영희. <strong>JavaScript 완전정복</strong>. 코딩출판사, 2022.'
        )
      })

      it('should generate correct MLA citation for English book', () => {
        const result = CitationUtils.getMLACitation(englishBook)
        expect(result).toBe(
          'Smith, John, and Jane Doe. <em>Modern Web Development: a Complete Guide</em>. Tech Publishers, 2023.'
        )
      })

      it('should handle multiple Korean authors with "외"', () => {
        const result = CitationUtils.getMLACitation(multiAuthorBook)
        expect(result).toContain('김철수 외')
        expect(result).toContain('현대 웹 개발의 이해')
      })
    })
  })

  describe('getAllCitations', () => {
    it('should return APA and MLA citation formats', () => {
      const result = CitationUtils.getAllCitations(sampleBook)

      expect(result).toHaveProperty('apa')
      expect(result).toHaveProperty('mla')

      expect(result.apa).toContain('박응용')
      expect(result.mla).toContain('Do it! 점프 투 파이썬')
    })
  })

  describe('Edge cases', () => {
    it('should handle empty authors array', () => {
      const bookWithoutAuthors = { ...sampleBook, authors: [] }
      const result = CitationUtils.getAllCitations(bookWithoutAuthors)

      expect(result.apa).toContain('작자 미상')
      expect(result.mla).toContain('작자 미상')
    })

    it('should handle missing title', () => {
      const bookWithoutTitle = { ...sampleBook, title: null }
      const result = CitationUtils.getAllCitations(bookWithoutTitle)

      expect(result.apa).toContain('제목 없음')
      expect(result.mla).toContain('제목 없음')
    })
  })
})
