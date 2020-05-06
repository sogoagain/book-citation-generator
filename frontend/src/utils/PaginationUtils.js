const PaginationUtils = {};

PaginationUtils.getTotalPages = function (pagination) {
    return Math.ceil(pagination.total / pagination.size);
};

PaginationUtils.getPrintedPageIndex = function (pagination) {
    const totalPage = this.getTotalPages(pagination);

    if (totalPage < 5) {
        return {
            start: 1,
            end: totalPage,
        }
    }

    if (pagination.page < 2) {
        return {
            start: 1,
            end: 5,
        }
    }

    if ((totalPage - pagination.page) < 2) {
        return {
            start: totalPage - 4,
            end: totalPage,
        }
    }

    return {
        start: pagination.page - 2,
        end: pagination.page + 2,
    }
};

PaginationUtils.getPrintedPages = function (pagination) {
    const printedPageIndex = this.getPrintedPageIndex(pagination);
    const printedPages = [];

    for (let i = printedPageIndex.start; i <= printedPageIndex.end; i++) {
        printedPages.push(i);
    }

    return printedPages;
};

export default PaginationUtils;

