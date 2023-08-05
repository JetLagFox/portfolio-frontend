import Link from "next/link";
import PropTypes from "prop-types";

const BreadCrumbs = ({ breadcrumbs }) => {
  return (
    <nav className="breadcrumbs">
      {breadcrumbs?.map((item, index) => {
        return (
          <>
            {item.href ? (
              <>
                <Link href={item?.href}>{item?.title}</Link>
                <span className="breadcrumbs__separator">></span>
              </>
            ) : (
              <span>{item?.title}</span>
            )}
          </>
        );
      })}
    </nav>
  );
};

export default BreadCrumbs;

BreadCrumbs.propTypes = {
  breadcrumbs: PropTypes.shape({
    title: PropTypes.string,
  }),
};
