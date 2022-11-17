import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";
import Button from "../elements/Button";

function TodoItem({ theme, item, onEdit, onRemove }) {
  return (
    <div className={`TodoItem ${theme}`}>
      <div className="TodoItem__title">{item.title}</div>
      <div className="TodoItem__description">{item.description}</div>
      <div className="TodoItem__expiration">{item.expiration}</div>
      <div className="TodoItem__file">{item.file}</div>

      {!item.isComplete && (
        <Button theme="small" onClick={() => onEdit(item)}>
          Edit
        </Button>
      )}
      <Button theme="small red" onClick={() => onRemove(item.id)}>
        Remove
      </Button>
    </div>
  );
}

TodoItem.propTypes = {
  theme: PropTypes.string,
  item: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

TodoItem.defaulProps = {
  theme: "default",
};

export default TodoItem;
