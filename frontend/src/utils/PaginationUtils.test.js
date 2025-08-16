import { describe, it, expect, beforeEach } from 'vitest'
import PaginationUtils from './PaginationUtils'

describe('PaginationUtils', () => {
  describe('getTotalPages', () => {
    it('returns total page', () => {
      const pagination = {
        page: 3,
        size: 5,
        total: 123,
      }

      const totalPages = PaginationUtils.getTotalPages(pagination)

      expect(totalPages).toBe(25)
    })
  })

  describe('getSelectablePageRange', () => {
    let pagination

    describe('with left bound', () => {
      beforeEach(() => {
        pagination = {
          page: 3,
          size: 5,
          total: 123,
        }
      })

      it('returns the range starting with the first page', () => {
        const selectablePageRange =
          PaginationUtils.getSelectablePageRange(pagination)

        expect(selectablePageRange).toStrictEqual({
          start: 1,
          end: 5,
        })
      })
    })

    describe('with middle bound', () => {
      beforeEach(() => {
        pagination = {
          page: 12,
          size: 5,
          total: 123,
        }
      })

      it('returns the range starting with the middle page', () => {
        const selectablePageRange =
          PaginationUtils.getSelectablePageRange(pagination)

        expect(selectablePageRange).toStrictEqual({
          start: 10,
          end: 14,
        })
      })
    })

    describe('with right bound', () => {
      beforeEach(() => {
        pagination = {
          page: 24,
          size: 5,
          total: 123,
        }
      })

      it('returns th range ending with the last page', () => {
        const selectablePageRange =
          PaginationUtils.getSelectablePageRange(pagination)

        expect(selectablePageRange).toStrictEqual({
          start: 21,
          end: 25,
        })
      })
    })
  })

  describe('getSelectablePages', () => {
    let pagination

    describe('when the middle page is selected', () => {
      beforeEach(() => {
        pagination = {
          page: 12,
          size: 5,
          total: 123,
        }
      })

      it('returns the pages starting with the middle page', () => {
        const printedPages = PaginationUtils.getSelectablePages(pagination)

        expect(printedPages).toStrictEqual([10, 11, 12, 13, 14])
      })
    })

    describe('when the total number of pages is less than 5', () => {
      beforeEach(() => {
        pagination = {
          page: 1,
          size: 5,
          total: 12,
        }
      })

      it('returns the total number of pages', () => {
        const printedPages = PaginationUtils.getSelectablePages(pagination)

        expect(printedPages).toStrictEqual([1, 2, 3])
      })
    })

    describe('when the selected page is less than 3', () => {
      beforeEach(() => {
        pagination = {
          page: 2,
          size: 5,
          total: 762,
        }
      })

      it('returns pages 1 through 5', () => {
        const printedPages = PaginationUtils.getSelectablePages(pagination)

        expect(printedPages).toStrictEqual([1, 2, 3, 4, 5])
      })
    })
  })

  describe('isFirstPage', () => {
    let pagination

    describe('with first page', () => {
      beforeEach(() => {
        pagination = {
          page: 1,
          size: 5,
          total: 762,
        }
      })

      it('returns true', () => {
        const isFirstPage = PaginationUtils.isFirstPage(pagination)

        expect(isFirstPage).toBeTruthy()
      })
    })

    describe('with not first page', () => {
      beforeEach(() => {
        pagination = {
          page: 2,
          size: 5,
          total: 762,
        }
      })

      it('returns false', () => {
        const isFirstPage = PaginationUtils.isFirstPage(pagination)

        expect(isFirstPage).toBeFalsy()
      })
    })
  })

  describe('isLastPage', () => {
    let pagination

    describe('with last page', () => {
      beforeEach(() => {
        pagination = {
          page: 2,
          size: 5,
          total: 10,
        }
      })

      it('returns true', () => {
        const isFirstPage = PaginationUtils.isLastPage(pagination)

        expect(isFirstPage).toBeTruthy()
      })
    })

    describe('with not last page', () => {
      beforeEach(() => {
        pagination = {
          page: 1,
          size: 5,
          total: 10,
        }
      })

      it('returns false', () => {
        const isFirstPage = PaginationUtils.isLastPage(pagination)

        expect(isFirstPage).toBeFalsy()
      })
    })
  })
})
