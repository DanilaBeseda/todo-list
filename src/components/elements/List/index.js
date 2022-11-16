import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

function List({ items, renderItem }) {
  return (
    <ul className="List">
      {items.map((item) => (
        <li key={item.id} className="List__item">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderItem: PropTypes.func.isRequired,
};

export default List;
