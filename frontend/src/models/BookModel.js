export default {
    list(params = {
        keyword: '',
        page: 1,
        size: 5,
    }) {
        const url = `${process.env.REACT_APP_ORIGIN}${process.env.REACT_APP_BOOK_END_POINT}?keyword=${params.keyword}&page=${params.page}&size=${params.size}`;

        return fetch(url)
            .then(response => response.json())
            .catch(err => console.log(err));
    }
}