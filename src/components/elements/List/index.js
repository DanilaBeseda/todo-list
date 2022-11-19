import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

/**
 * Глупый компонент - List
 * @param {object} this.props
 * @param {object} this.props.items - список todo айтемов
 * @param {function} this.props.renderItem - рендер пропс
 * @returns {JSX.Element}
 */
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
