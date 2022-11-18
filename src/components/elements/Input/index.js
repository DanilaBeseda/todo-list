import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

function Input(props) {
  function onChange(e) {
    return props.onChange(e);
  }

  return (
    <input
      className={`Input ${props.theme}`}
      id={props.id}
      value={props.value}
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
      autoFocus={props.focused}
      onChange={onChange}
    />
  );
}

Input.propTypes = {
  theme: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.node,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  type: "text",
};

export default Input;
