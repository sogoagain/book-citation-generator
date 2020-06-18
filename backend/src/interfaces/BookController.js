const BookRepository = require('../repository/BookRepository');

const respond = (statusCode, body) => ({
  headers: { 'Access-Control-Allow-Origin': process.env.FRONT_DOMAIN },
  statusCode,
  body: JSON.stringify(body, null, 2),
});

const getBooks = async (event) => {
  const { keyword, page, size } = event.queryStringParameters;
  const books = await BookRepository.findByKeywordAndPagination(keyword, { page, size });
  return respond(200, books);
};

module.exports = { getBooks };
