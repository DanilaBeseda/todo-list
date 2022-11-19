import React, { useState } from "react";
import Input from "../../elements/Input";
import LayoutField from "../../layouts/LayoutField";
import Button from "../../elements/Button";
import PropTypes from "prop-types";

import "./styles.scss";

/**
 * Форма для редактирования
 * @param {object} props
 * @param {object} props.item - todo item
 * @param {function} props.onSubmit - отправить форму
 * @param {function} props.onCancel - отменить изменения в форме
 * @returns {JSX.Element}
 */
function TodoItemForm(props) {
  const [item, setItem] = useState(props.item);

  function onSubmit(e) {
    e.preventDefault();
    props.onSubmit(item);
  }

  function onChange(e) {
    const target = e.target;
    /** Для файлов */
    if (target.type === "file" && target.value) {
      setItem({ ...item, [target.name]: target.files[0] });
      return;
    }
    setItem({ ...item, [target.name]: target.value });
  }

  return (
    <form className="TodoItemForm" onSubmit={onSubmit}>
      <LayoutField
        label={"title"}
        input={
          <Input
            id="title"
            value={item.title}
            name="title"
            onChange={onChange}
          />
        }
      />
      <LayoutField
        label={"description"}
        input={
          <Input
            id="description"
            value={item.description}
            name="description"
            onChange={onChange}
          />
        }
      />
      <LayoutField
        label={"expiration"}
        input={
          <Input
            id="expiration"
            value={item.expiration}
            name="expiration"
            type="time"
            onChange={onChange}
          />
        }
      />
      <LayoutField
        label={"file"}
        input={<Input id="file" name="file" type="file" onChange={onChange} />}
      />
      <Button theme="small green" type="submit">
        Accept
      </Button>
      <Button theme="small red" type="button" onClick={props.onCancel}>
        Cancel
      </Button>
    </form>
  );
}

TodoItemForm.propTypes = {
  item: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default TodoItemForm;
