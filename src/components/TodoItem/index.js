import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

function TodoItem({ item }) {
  return (
    <div className="TodoItem">
      <div className="TodoItem__title">{item.title}</div>
      <div className="TodoItem__description">{item.description}</div>
      <div className="TodoItem__expiration">{item.expiration}</div>
      <div className="TodoItem__file">{item.file}</div>
    </div>
  );
}

TodoItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default TodoItem;
