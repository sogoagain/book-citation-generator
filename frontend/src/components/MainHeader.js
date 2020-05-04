import React from 'react';
import PropTypes from 'prop-types';
import './MainHeader.css';

export const HeaderMode = {
    NORMAL: {
        headerStyle: {},
        containerStyle: {}
    },
    MINIMUM: {
        headerStyle: {
            height: 112,
        },
        containerStyle: {
            paddingTop: 48,
        }
    }
};

export const MainHeader = ({
                               text,
                               mode
                           }) => {
    return (
        <div className="MainHeader">
            <header className="Header"
                    style={mode.headerStyle}>
                <div className="Header-Container"
                     style={mode.containerStyle}>
                    <h1>{text}</h1>
                </div>
            </header>
        </div>
    );
};

MainHeader.propTypes = {
    text: PropTypes.string.isRequired,
    mode: PropTypes.object.isRequired,
};
