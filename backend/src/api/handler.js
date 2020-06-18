const BookRepository = require('../repository/BookRepository');

module.exports.getBooks = async (event) => {
  const { keyword } = event.queryStringParameters;
  const { page } = event.queryStringParameters;
  const { size } = event.queryStringParameters;
  const pagination = {
    page,
    size,
  };

  const books = await BookRepository.findByKeywordAndPagination(keyword, pagination);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': process.env.FRONT_DOMAIN,
    },
    body: JSON.stringify(books),
  };
};
