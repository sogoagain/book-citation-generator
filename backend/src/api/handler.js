'use strict';

const BookRepository = require('../repository/BookRepository');

module.exports.getBooks = async event => {
    const keyword = event.queryStringParameters.keyword;
    const page = event.queryStringParameters.page;

    const books = await BookRepository.findByKeywordAndPage(keyword, page);

    return {
        statusCode: 200,
        body: JSON.stringify(books)
    };
};
