import React from 'react';
import PropTypes from 'prop-types';
import './MainHeader.css';

export const HeaderMode = {
  NORMAL: {
    headerStyle: {},
    containerStyle: {},
  },
  MINIMUM: {
    headerStyle: {
      height: 88,
    },
    containerStyle: {
      paddingTop: 24,
    },
  },
};

export const MainHeader = ({
  text,
  mode,
  onClick,
}) => {
  const onHeaderClick = () => {
    onClick();
  };

  return (
    <div className="MainHeader">
      <header
        className="Header"
        style={mode.headerStyle}
      >
        <div
          className="Header-Container"
          style={mode.containerStyle}
        >
          <div
            className="Header-Text"
            onClick={onHeaderClick}
            onKeyDown={onHeaderClick}
            role="button"
            tabIndex="0"
          >
            <h1>{text}</h1>
          </div>
        </div>
      </header>
    </div>
  );
};

MainHeader.propTypes = {
  text: PropTypes.string.isRequired,
  mode: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onClick: PropTypes.func.isRequired,
};
