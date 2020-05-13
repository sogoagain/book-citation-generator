const fetch = require('node-fetch');

const findByKeywordAndPage = async (keyword, page) => {
    const query = encodeURI(keyword);
    const size = 5;
    const requestURL = `https://dapi.kakao.com/v3/search/book?query=${query}&page=${page}&size=${size}`;

    return await fetch(requestURL, {
        method: 'GET',
        headers: {
            'Authorization': process.env.KEY_KAKAO,
        },
    }).then(response => response.json())
        .catch(err => console.log(err));
};

module.exports = {
    findByKeywordAndPage: findByKeywordAndPage
};