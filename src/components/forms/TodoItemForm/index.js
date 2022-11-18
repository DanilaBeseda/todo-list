import React, { useState } from "react";
import Input from "../../elements/Input";
import LayoutField from "../../layouts/LayoutField";
import Button from "../../elements/Button";
import PropTypes from "prop-types";

function TodoItemForm(props) {
  const [item, setItem] = useState(props.item);

  function onSubmit(e) {
    e.preventDefault();
    props.onSubmit(item);
  }

  function onChange(e) {
    /** Для файлов */
    if (e.target.type === "file") {
      setItem({ ...item, [e.target.name]: e.target.files[0] });
      return;
    }
    setItem({ ...item, [e.target.name]: e.target.value });
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
      <LayoutField
        input={
          <Button theme="small green" type="submit">
            Принять
          </Button>
        }
      />
      <LayoutField
        input={
          <Button theme="small red" type="button" onClick={props.onCancel}>
            Отменить
          </Button>
        }
      />
    </form>
  );
}

TodoItemForm.propTypes = {
  item: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default TodoItemForm;
