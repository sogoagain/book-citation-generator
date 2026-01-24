import { describe, it, expect } from 'vitest'
import CitationUtils from './CitationUtils'

describe('CitationUtils - APA 7th Edition', () => {
  describe('isKorean', () => {
    it('한글 포함 시 true', () => {
      expect(CitationUtils.isKorean('김영하')).toBe(true)
    })

    it('영문만 있을 시 false', () => {
      expect(CitationUtils.isKorean('John Smith')).toBe(false)
    })

    it('빈 문자열은 false', () => {
      expect(CitationUtils.isKorean('')).toBe(false)
    })

    it('null/undefined는 false', () => {
      expect(CitationUtils.isKorean(null)).toBe(false)
      expect(CitationUtils.isKorean(undefined)).toBe(false)
    })
  })

  describe('parsePages', () => {
    it('단일 페이지를 파싱한다', () => {
      expect(CitationUtils.parsePages('42')).toEqual({
        type: 'single',
        page: '42',
      })
    })

    it('범위 페이지를 파싱한다 (하이픈)', () => {
      expect(CitationUtils.parsePages('42-45')).toEqual({
        type: 'range',
        start: '42',
        end: '45',
      })
    })

    it('범위 페이지를 파싱한다 (물결표)', () => {
      expect(CitationUtils.parsePages('42~45')).toEqual({
        type: 'range',
        start: '42',
        end: '45',
      })
    })

    it('범위 페이지를 파싱한다 (en dash)', () => {
      expect(CitationUtils.parsePages('42–45')).toEqual({
        type: 'range',
        start: '42',
        end: '45',
      })
    })

    it('공백이 포함된 범위를 파싱한다', () => {
      expect(CitationUtils.parsePages('42 - 45')).toEqual({
        type: 'range',
        start: '42',
        end: '45',
      })
    })

    it('빈 값은 null', () => {
      expect(CitationUtils.parsePages('')).toBeNull()
      expect(CitationUtils.parsePages(null)).toBeNull()
      expect(CitationUtils.parsePages(undefined)).toBeNull()
    })

    it('유효하지 않은 입력은 null', () => {
      expect(CitationUtils.parsePages('abc')).toBeNull()
      expect(CitationUtils.parsePages('42-')).toBeNull()
    })
  })

  describe('formatPages', () => {
    it('단일 페이지를 p. 형식으로', () => {
      expect(CitationUtils.formatPages({ type: 'single', page: '42' })).toBe(
        'p. 42'
      )
    })

    it('범위를 pp. 형식으로', () => {
      expect(
        CitationUtils.formatPages({ type: 'range', start: '42', end: '45' })
      ).toBe('pp. 42-45')
    })

    it('null은 빈 문자열', () => {
      expect(CitationUtils.formatPages(null)).toBe('')
    })
  })

  describe('extractYear', () => {
    it('ISO 8601 날짜에서 연도 추출', () => {
      expect(CitationUtils.extractYear('2023-05-15T00:00:00.000+09:00')).toBe(
        '2023'
      )
    })

    it('날짜 없으면 날짜 미상', () => {
      expect(CitationUtils.extractYear(null)).toBe('날짜 미상')
      expect(CitationUtils.extractYear('')).toBe('날짜 미상')
    })

    it('유효하지 않은 날짜는 날짜 미상', () => {
      expect(CitationUtils.extractYear('invalid')).toBe('날짜 미상')
    })
  })

  describe('formatSingleAuthorReference', () => {
    it('한국어 저자는 그대로', () => {
      expect(CitationUtils.formatSingleAuthorReference('김영하')).toBe('김영하')
    })

    it('영문 저자를 LastName, Initials 형식으로', () => {
      expect(CitationUtils.formatSingleAuthorReference('John Smith')).toBe(
        'Smith, J.'
      )
    })

    it('영문 저자 중간 이름 포함', () => {
      expect(
        CitationUtils.formatSingleAuthorReference('John Michael Smith')
      ).toBe('Smith, J. M.')
    })

    it('단일 이름은 그대로', () => {
      expect(CitationUtils.formatSingleAuthorReference('Madonna')).toBe(
        'Madonna'
      )
    })

    it('빈 값은 작자 미상', () => {
      expect(CitationUtils.formatSingleAuthorReference(null)).toBe('작자 미상')
    })
  })

  describe('formatAuthorsReference', () => {
    it('저자 없으면 작자 미상', () => {
      expect(CitationUtils.formatAuthorsReference([])).toBe('작자 미상')
      expect(CitationUtils.formatAuthorsReference(null)).toBe('작자 미상')
    })

    it('한국어 단일 저자', () => {
      expect(CitationUtils.formatAuthorsReference(['김영하'])).toBe('김영하')
    })

    it('영문 단일 저자', () => {
      expect(CitationUtils.formatAuthorsReference(['John Smith'])).toBe(
        'Smith, J.'
      )
    })

    it('한국어 2인 저자', () => {
      expect(CitationUtils.formatAuthorsReference(['김영하', '박민수'])).toBe(
        '김영하, 박민수'
      )
    })

    it('영문 2인 저자 (& 사용)', () => {
      expect(
        CitationUtils.formatAuthorsReference(['John Smith', 'Jane Doe'])
      ).toBe('Smith, J., & Doe, J.')
    })

    it('한국어 3인 저자 (모두 나열)', () => {
      expect(
        CitationUtils.formatAuthorsReference(['김영하', '박민수', '이철수'])
      ).toBe('김영하, 박민수, 이철수')
    })

    it('영문 3인 저자 (모두 나열, & 사용)', () => {
      expect(
        CitationUtils.formatAuthorsReference([
          'John Smith',
          'Jane Doe',
          'Bob Wilson',
        ])
      ).toBe('Smith, J., Doe, J., & Wilson, B.')
    })

    it('21인 이상은 처음 19명 + ... + 마지막', () => {
      const authors = Array.from(
        { length: 22 },
        (_, i) => `Author${i + 1} Name`
      )
      const result = CitationUtils.formatAuthorsReference(authors)
      expect(result).toContain('...')
      expect(result).toContain('Name, A.')
    })
  })

  describe('formatAuthorsInText', () => {
    it('저자 없으면 작자 미상', () => {
      expect(CitationUtils.formatAuthorsInText([])).toBe('작자 미상')
    })

    it('한국어 1인 저자', () => {
      expect(CitationUtils.formatAuthorsInText(['김영하'])).toBe('김영하')
    })

    it('영문 1인 저자 (성만 표기)', () => {
      expect(CitationUtils.formatAuthorsInText(['John Smith'])).toBe('Smith')
    })

    it('한국어 2인 저자', () => {
      expect(CitationUtils.formatAuthorsInText(['김영하', '박민수'])).toBe(
        '김영하, 박민수'
      )
    })

    it('영문 2인 저자 (& 사용)', () => {
      expect(
        CitationUtils.formatAuthorsInText(['John Smith', 'Jane Doe'])
      ).toBe('Smith & Doe')
    })

    it('한국어 3인 이상 (등 사용)', () => {
      expect(
        CitationUtils.formatAuthorsInText(['김영하', '박민수', '이철수'])
      ).toBe('김영하 등')
    })

    it('영문 3인 이상 (et al. 사용)', () => {
      expect(
        CitationUtils.formatAuthorsInText([
          'John Smith',
          'Jane Doe',
          'Bob Wilson',
        ])
      ).toBe('Smith et al.')
    })
  })

  describe('formatTitle', () => {
    it('한국어 제목은 그대로', () => {
      expect(CitationUtils.formatTitle('살인자의 기억법')).toBe(
        '살인자의 기억법'
      )
    })

    it('영문 제목은 그대로 유지', () => {
      expect(
        CitationUtils.formatTitle('The Great Gatsby and Other Stories')
      ).toBe('The Great Gatsby and Other Stories')
    })

    it('고유명사가 포함된 제목도 변환 없이 유지', () => {
      expect(
        CitationUtils.formatTitle('Learning Python: The Complete Guide')
      ).toBe('Learning Python: The Complete Guide')
    })

    it('빈 제목은 제목 없음', () => {
      expect(CitationUtils.formatTitle(null)).toBe('제목 없음')
      expect(CitationUtils.formatTitle('')).toBe('제목 없음')
    })
  })

  describe('formatTranslators', () => {
    it('역자 없으면 null', () => {
      expect(CitationUtils.formatTranslators([], true)).toBeNull()
      expect(CitationUtils.formatTranslators(null, true)).toBeNull()
    })

    it('한국어 단일 역자', () => {
      expect(CitationUtils.formatTranslators(['홍길동'], true)).toBe(
        '(홍길동 역)'
      )
    })

    it('한국어 복수 역자', () => {
      expect(CitationUtils.formatTranslators(['홍길동', '김영수'], true)).toBe(
        '(홍길동, 김영수 역)'
      )
    })

    it('영문 단일 역자', () => {
      expect(CitationUtils.formatTranslators(['John Smith'], false)).toBe(
        '(J. Smith, Trans.)'
      )
    })

    it('영문 복수 역자', () => {
      expect(
        CitationUtils.formatTranslators(['John Smith', 'Jane Doe'], false)
      ).toBe('(J. Smith & J. Doe, Trans.)')
    })
  })

  describe('generateReference', () => {
    it('한국어 기본 참고문헌', () => {
      const segments = CitationUtils.generateReference({
        authors: ['김영하'],
        title: '살인자의 기억법',
        publisher: '문학동네',
        datetime: '2013-05-15T00:00:00.000+09:00',
      })

      const plain = CitationUtils.segmentsToPlainText(segments)
      expect(plain).toBe('김영하. (2013). 살인자의 기억법. 문학동네.')
      expect(segments.find(s => s.text === '살인자의 기억법').italic).toBe(true)
    })

    it('영문 기본 참고문헌', () => {
      const segments = CitationUtils.generateReference({
        authors: ['John Smith'],
        title: 'The Art of Programming',
        publisher: 'Academic Press',
        datetime: '2020-01-01T00:00:00.000Z',
      })

      const plain = CitationUtils.segmentsToPlainText(segments)
      expect(plain).toBe(
        'Smith, J. (2020). The Art of Programming. Academic Press.'
      )
      expect(segments.find(s => s.italic).text).toBe('The Art of Programming')
    })

    it('한국어 번역서', () => {
      const segments = CitationUtils.generateReference({
        authors: ['무라카미 하루키'],
        translators: ['양억관'],
        title: '노르웨이의 숲',
        publisher: '문학사상',
        datetime: '2000-01-01T00:00:00.000+09:00',
      })

      const plain = CitationUtils.segmentsToPlainText(segments)
      expect(plain).toBe(
        '무라카미 하루키. (2000). 노르웨이의 숲 (양억관 역). 문학사상.'
      )
    })

    it('영문 번역서', () => {
      const segments = CitationUtils.generateReference({
        authors: ['Albert Camus'],
        translators: ['Matthew Ward'],
        title: 'The Stranger',
        publisher: 'Vintage Books',
        datetime: '1989-01-01T00:00:00.000Z',
      })

      const plain = CitationUtils.segmentsToPlainText(segments)
      expect(plain).toBe(
        'Camus, A. (1989). The Stranger (M. Ward, Trans.). Vintage Books.'
      )
    })

    it('출판사 없으면 기본 메시지', () => {
      const segments = CitationUtils.generateReference({
        authors: ['김영하'],
        title: '테스트 제목',
        publisher: '',
        datetime: '2020-01-01T00:00:00.000+09:00',
      })

      const plain = CitationUtils.segmentsToPlainText(segments)
      expect(plain).toContain('출판사 정보 없음')
    })
  })

  describe('generateInText', () => {
    it('기본 본문 내 인용 (페이지 없음)', () => {
      expect(
        CitationUtils.generateInText({
          authors: ['김영하'],
          datetime: '2013-05-15T00:00:00.000+09:00',
          pages: '',
        })
      ).toBe('(김영하, 2013)')
    })

    it('단일 페이지 포함', () => {
      expect(
        CitationUtils.generateInText({
          authors: ['John Smith'],
          datetime: '2020-01-01T00:00:00.000Z',
          pages: '42',
        })
      ).toBe('(Smith, 2020, p. 42)')
    })

    it('페이지 범위 포함', () => {
      expect(
        CitationUtils.generateInText({
          authors: ['John Smith'],
          datetime: '2020-01-01T00:00:00.000Z',
          pages: '42-45',
        })
      ).toBe('(Smith, 2020, pp. 42-45)')
    })

    it('2인 저자 본문 내 인용', () => {
      expect(
        CitationUtils.generateInText({
          authors: ['John Smith', 'Jane Doe'],
          datetime: '2020-01-01T00:00:00.000Z',
          pages: '',
        })
      ).toBe('(Smith & Doe, 2020)')
    })

    it('3인 이상 et al.', () => {
      expect(
        CitationUtils.generateInText({
          authors: ['John Smith', 'Jane Doe', 'Bob Wilson'],
          datetime: '2020-01-01T00:00:00.000Z',
          pages: '',
        })
      ).toBe('(Smith et al., 2020)')
    })
  })

  describe('generateAPA7', () => {
    it('참고문헌과 본문 내 인용을 모두 생성', () => {
      const result = CitationUtils.generateAPA7({
        authors: ['김영하'],
        title: '살인자의 기억법',
        publisher: '문학동네',
        datetime: '2013-05-15T00:00:00.000+09:00',
        pages: '42',
      })

      expect(result.reference).toBeInstanceOf(Array)
      expect(result.referencePlain).toBe(
        '김영하. (2013). 살인자의 기억법. 문학동네.'
      )
      expect(result.inText).toBe('(김영하, 2013, p. 42)')
    })

    it('번역서 + 페이지 범위', () => {
      const result = CitationUtils.generateAPA7({
        authors: ['무라카미 하루키'],
        translators: ['양억관'],
        title: '노르웨이의 숲',
        publisher: '문학사상',
        datetime: '2000-01-01T00:00:00.000+09:00',
        pages: '100-105',
      })

      expect(result.referencePlain).toBe(
        '무라카미 하루키. (2000). 노르웨이의 숲 (양억관 역). 문학사상.'
      )
      expect(result.inText).toBe('(무라카미 하루키, 2000, pp. 100-105)')
    })

    it('페이지 없이 생성', () => {
      const result = CitationUtils.generateAPA7({
        authors: ['John Smith'],
        title: 'A Book Title',
        publisher: 'Publisher',
        datetime: '2020-01-01T00:00:00.000Z',
        pages: '',
      })

      expect(result.inText).toBe('(Smith, 2020)')
    })
  })
})
