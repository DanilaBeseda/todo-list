import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

/**
 * layout для страниц
 * @param {object} props
 * @param {JSX.Element} props.header - header страницы
 * @param {React.ReactNode} props.children - контент страницы
 * @returns {JSX.Element}
 */
function LayoutPage({ header, children }) {
  return (
    <div className="Layout">
      <div className="Layout__header">{header}</div>
      <div className="Layout__content">{children}</div>
    </div>
  );
}

LayoutPage.propTypes = {
  header: PropTypes.node,
  children: PropTypes.node,
};

export default LayoutPage;
