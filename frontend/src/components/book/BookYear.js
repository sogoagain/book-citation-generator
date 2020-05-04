import React from 'react';
import BookUtils from "../../utils/BookUtils";

const BookYear = ({datetime}) => {
    return (
        <span>{BookUtils.convertISO8601toYear(datetime)}</span>
    );
};

export default BookYear;