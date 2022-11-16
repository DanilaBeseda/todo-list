import React from "react";
import PropTypes from "prop-types";

function Input(props) {
  return (
    <input
      className="Input"
      id={props.id}
      value={props.value}
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
      autoFocus={props.focused}
      onChange={props.onChange}
    />
  );
}

Input.propTypes = {
  id: PropTypes.string,
  value: PropTypes.node.isRequired,
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
