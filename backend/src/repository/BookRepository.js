const fetch = require('node-fetch');

const findByKeywordAndPagination = async (keyword, pagination) => {
    const query = encodeURI(keyword);
    const requestURL = `${process.env.API_KAKAO}?query=${query}&page=${pagination.page}&size=${pagination.size}`;

    return await fetch(requestURL, {
        method: 'GET',
        headers: {
            'Authorization': process.env.KEY_KAKAO,
        },
    }).then(response => response.json())
        .catch(err => console.log(err));
};

module.exports = {
    findByKeywordAndPagination: findByKeywordAndPagination
};