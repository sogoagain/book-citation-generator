const BookUtils = {};

BookUtils.getFormattedWriters = (writers, mainCount) => {
  const mainWriters = writers.slice(0, mainCount);
  const exceededCount = writers.length - mainCount;

  const formattedWriters = mainWriters.join(', ');

  if (exceededCount >= 1) {
    return `${formattedWriters} 외 ${exceededCount}명`;
  }

  return formattedWriters;
};

BookUtils.extractYearFromISO08601 = (iso8601) => {
  const date = new Date(iso8601);
  return date.getFullYear();
};

BookUtils.getFormattedMLAStyleAuthors = (writers) => {
  if (writers.length <= 2) {
    return writers.join(', ');
  }

  const firstWriter = writers[0];
  return `${firstWriter} 외`;
};

BookUtils.getMLACitationNotation = (book) => {
  const writer = BookUtils.getFormattedMLAStyleAuthors(book.authors);
  const { title } = book;
  const { publisher } = book;
  const dateYear = new Date(book.datetime).getFullYear();

  return `${writer}. ${title}. ${publisher}, ${dateYear}.`;
};

export default BookUtils;
