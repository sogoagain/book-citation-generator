import mockData from './mockBookData';

export default {
    list(query) {
        return new Promise(res => {
            setTimeout(() => {
                res(mockData)
            }, 200)
        });
    }
}