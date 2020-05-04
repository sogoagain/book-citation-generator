const BookUtils = {};

BookUtils.getFormattedWriters = (writers, mainCount) => {
    const mainWriters = writers.slice(0, mainCount);
    const exceededCount = writers.length - mainCount;

    const formattedWriters = mainWriters.join(", ");

    if (exceededCount >= 1) {
        return `${formattedWriters} 외 ${exceededCount}명`
    }

    return formattedWriters;
};

BookUtils.convertISO8601toYear = (iso8601) => {
    const date = new Date(iso8601);
    return date.getFullYear();
};

export default BookUtils;

