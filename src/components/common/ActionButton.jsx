// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

// The ActionButton component is a reusable button component.
export default function ActionButton({ title, onClick, disabled, fullWidth }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${
        fullWidth ? "w-full" : ""
      } mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {title}
    </button>
  );
}

ActionButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

ActionButton.defaultProps = {
  disabled: false,
  fullWidth: false,
};
