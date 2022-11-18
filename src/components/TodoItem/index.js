import React from "react";
import PropTypes from "prop-types";
import Button from "../elements/Button";

import "./styles.scss";

function TodoItem({ theme, item, onEdit, onRemove, disableBtn }) {
  return (
    <div className={`TodoItem ${theme}`}>
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
        disabled={item.isComplete || disableBtn}
        onClick={() => onEdit(item)}
      >
        Edit
      </Button>

      <Button
        theme="small red"
        disabled={disableBtn}
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
  disableBtn: PropTypes.bool.isRequired,
};

TodoItem.defaulProps = {
  theme: "default",
};

export default TodoItem;
