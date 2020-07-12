import React from 'react';
import PropTypes from 'prop-types';

const MainHeader = ({
  text,
  onClick,
}) => {
  const onHeaderClick = () => {
    onClick();
  };

  return (
    <div
      className="row bg-light py-2 mb-3 rounded"
      onClick={onHeaderClick}
      onKeyDown={onHeaderClick}
      role="link"
      tabIndex="0"
    >
      <div className="col-md-12">
        <h3 className="text-center">{text}</h3>
      </div>
    </div>
  );
};

MainHeader.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MainHeader;
