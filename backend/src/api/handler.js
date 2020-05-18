'use strict';

const BookRepository = require('../repository/BookRepository');

module.exports.getBooks = async event => {
    const keyword = event.queryStringParameters.keyword;
    const page = event.queryStringParameters.page;
    const size = event.queryStringParameters.size;
    const pagination = {
        page: page,
        size: size,
    };

    const books = await BookRepository.findByKeywordAndPagination(keyword, pagination);

    return {
        statusCode: 200,
        body: JSON.stringify(books)
    };
};