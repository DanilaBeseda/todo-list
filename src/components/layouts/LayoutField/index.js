import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

/**
 * layout для инпутов
 * @param {object} props
 * @param {string} props.label - label для инпута
 * @param {object} props.input - Input компонент
 * @returns {JSX.Element}
 */
function LayoutField({ label, input }) {
  return (
    <div className="LayoutField">
      <label className="LayoutField__label" htmlFor={label}>
        {label}
      </label>
      <div className="LayoutField__input">{input}</div>
    </div>
  );
}

LayoutField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.node.isRequired,
};

export default LayoutField;
