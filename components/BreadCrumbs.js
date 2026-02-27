import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const BreadCrumbs = ({ breadcrumbs = [] }) => {
  return (
    <nav className="breadcrumbs">
      {breadcrumbs.map((item, index) => (
        <React.Fragment key={index}>
          {item.href ? (
            <Link href={item.href}>{item.title}</Link>
          ) : (
            <span>{item.title}</span>
          )}
          <span className="breadcrumbs__separator">></span>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadCrumbs;

BreadCrumbs.propTypes = {
  breadcrumbs: PropTypes.array,
};
