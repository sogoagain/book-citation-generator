const PaginationUtils = {
  getTotalPages: (pagination) => Math.ceil(pagination.total / pagination.size),
  getPrintedPageIndex(pagination) {
    const totalPage = this.getTotalPages(pagination);

    if (totalPage < 5) {
      return {
        start: 1,
        end: totalPage,
      };
    }

    if (pagination.page <= 2) {
      return {
        start: 1,
        end: 5,
      };
    }

    if ((totalPage - pagination.page) < 2) {
      return {
        start: totalPage - 4,
        end: totalPage,
      };
    }

    return {
      start: pagination.page - 2,
      end: pagination.page + 2,
    };
  },
  getPrintedPages(pagination) {
    const printedPageIndex = this.getPrintedPageIndex(pagination);
    const size = printedPageIndex.end - printedPageIndex.start + 1;
    return [...Array(size).keys()].map((i) => i + printedPageIndex.start);
  },
  isFirstPage: (pagination) => pagination.page === 1,
  isLastPage(pagination) { return pagination.page === this.getTotalPages(pagination); },
};

export default PaginationUtils;
