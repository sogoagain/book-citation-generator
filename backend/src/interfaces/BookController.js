import BookRepository from '../repository/BookRepository.js'

const respond = (statusCode, body) => ({
  headers: {
    'Access-Control-Allow-Origin': process.env.FRONT_DOMAIN,
    'Content-Type': 'application/json',
  },
  statusCode,
  body: JSON.stringify(body, null, 2),
})

const getBooks = async event => {
  try {
    const { keyword, page = 1, size = 10 } = event.queryStringParameters || {}

    if (!keyword) {
      return respond(400, { error: 'keyword parameter is required' })
    }

    const books = await BookRepository.findByKeywordAndPagination(keyword, {
      page,
      size,
    })
    return respond(200, books)
  } catch (error) {
    console.error('Error in getBooks:', error)
    return respond(500, { error: 'Internal server error' })
  }
}

export default getBooks
