import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

function Button(props) {
  return (
    <button
      className={`Button ${props.theme}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  theme: "default",
  disabled: false,
};

export default React.memo(Button);
