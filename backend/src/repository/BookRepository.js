import fetch from 'node-fetch'

const findByKeywordAndPagination = async (keyword, pagination) => {
  try {
    const query = encodeURIComponent(keyword)
    const { page = 1, size = 10 } = pagination

    if (!process.env.KAKAO_API_KEY) {
      throw new Error('Missing required environment variable: KAKAO_API_KEY')
    }

    const requestURL = `https://dapi.kakao.com/v3/search/book?query=${query}&page=${page}&size=${size}`

    const response = await fetch(requestURL, {
      method: 'GET',
      headers: {
        Authorization: process.env.KAKAO_API_KEY,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Kakao API error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching books:', error)
    throw error
  }
}

const BookRepository = {
  findByKeywordAndPagination,
}

export default BookRepository
