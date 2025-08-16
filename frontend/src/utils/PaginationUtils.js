const PaginationUtils = {
  getTotalPages: ({ total, size }) => Math.ceil(total / size),
  getSelectablePageRange: ({ total, size, page }) => {
    const totalPage = PaginationUtils.getTotalPages({ total, size })

    if (totalPage < 5) {
      return {
        start: 1,
        end: totalPage,
      }
    }

    if (page <= 2) {
      return {
        start: 1,
        end: 5,
      }
    }

    if (totalPage - page < 2) {
      return {
        start: totalPage - 4,
        end: totalPage,
      }
    }

    return {
      start: page - 2,
      end: page + 2,
    }
  },
  getSelectablePages: pagination => {
    const { start, end } = PaginationUtils.getSelectablePageRange(pagination)
    const size = end - start + 1
    return [...Array(size).keys()].map(i => i + start)
  },
  isFirstPage: pagination => pagination.page === 1,
  isLastPage: pagination =>
    pagination.page === PaginationUtils.getTotalPages(pagination),
}

export default PaginationUtils
