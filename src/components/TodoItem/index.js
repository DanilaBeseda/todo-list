import React from "react";
import PropTypes from "prop-types";
import Button from "../elements/Button";

import "./styles.scss";

function TodoItem({ theme, item, onEdit, onRemove, onComplete, disableBtns }) {
  return (
    <div className={`TodoItem ${theme}`}>
      <Button
        theme="small"
        disabled={item.isComplete || disableBtns}
        onClick={() => onComplete(item.id)}
      >
        Complete
      </Button>
      <div className="TodoItem__title">{item.title}</div>
      <div className="TodoItem__description">{item.description}</div>
      <div className="TodoItem__expiration">{item.expiration}</div>
      <div className="TodoItem__file">
        {item.file && (
          <a href={item.file.url} download>
            {item.file.name}
          </a>
        )}
      </div>
      <Button
        theme="small"
        disabled={item.isComplete || disableBtns}
        onClick={() => onEdit(item.id)}
      >
        Edit
      </Button>

      <Button
        theme="small red"
        disabled={disableBtns}
        onClick={() => onRemove(item.id)}
      >
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
  onComplete: PropTypes.func.isRequired,
  disableBtns: PropTypes.bool.isRequired,
};

TodoItem.defaulProps = {
  theme: "default",
};

export default TodoItem;
