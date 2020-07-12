const BookUtils = {
  getFormattedWriters: (writers, mainWritersCount) => {
    const mainWriters = writers.slice(0, mainWritersCount).join(', ');
    const exceededCount = writers.length - mainWritersCount;

    if (exceededCount >= 1) {
      return `${mainWriters} 외 ${exceededCount}명`;
    }

    return mainWriters;
  },

  extractYearFromISO08601: (iso8601) => new Date(iso8601).getFullYear(),

  getFormattedMLAStyleAuthors: (writers) => {
    if (writers.length <= 2) {
      return writers.join(', ');
    }

    return `${writers[0]} 외`;
  },

  getMLACitationNotation: ({
    authors, title, publisher, datetime,
  }) => `${BookUtils.getFormattedMLAStyleAuthors(authors)}. ${title}. ${publisher}, ${BookUtils.extractYearFromISO08601(datetime)}.`,
};

export default BookUtils;
