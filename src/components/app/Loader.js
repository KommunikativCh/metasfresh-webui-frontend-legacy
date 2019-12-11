import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

/**
 * @file Fnct component.
 * @module Loader
 */
const Loader = (props) => {
  const { loaderType } = props;

  return (
    <div
      className={
        loaderType
          ? 'd-flex justify-content-center'
          : 'order-list-loader text-center'
      }
    >
      {!loaderType && (
        <CSSTransition
          classNames="rotate"
          timeout={{ exit: 1000, enter: 1000 }}
        >
          <div className="rotate icon-rotate">
            <i className="meta-icon-settings" />
          </div>
        </CSSTransition>
      )}
      {loaderType && loaderType === 'bootstrap' && (
        <div className="spinner-border text-success" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};

Loader.propTypes = {
  loaderType: PropTypes.string,
};

Loader.defaultProps = {
  loaderType: null,
};

export default Loader;
