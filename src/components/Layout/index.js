import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

function Layout({ header, children }) {
  return (
    <div className="Layout">
      <div className="Layout__header">{header}</div>
      <div className="Layout__content">{children}</div>
    </div>
  );
}

Layout.propTypes = {
  header: PropTypes.node,
  children: PropTypes.node,
};

export default Layout;
