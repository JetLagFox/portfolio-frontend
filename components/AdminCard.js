import { useContext } from "react";
import Link from "next/link";
import PropTypes from "prop-types";

import { AdminContext } from "./../context/AdminContext";

import Pencil from "./../svg/Pencil";
import Delete from "./../svg/Delete";

const AdminCard = ({ title, description, published, id, postType, img = null }) => {
  const { setShowModal, setDeleteId } = useContext(AdminContext);

  return (
    <div className="admin-card__wrap">
      {img && <img src={img} />}
      <div className="admin-card__content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="admin-card__actions">
        <p className="admin-card__publish-status">
          {published ? "Publicado" : "Borrador"}
          <span className={`publish-status--${published ? "published" : "draft"}`}></span>
        </p>
        <span
          onClick={() => {
            setDeleteId(id);
            setShowModal(true);
          }}
        >
          <Delete />
        </span>
        <Link href={`/admin/${postType}/edit/${id}`}>
          <a>
            <Pencil />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default AdminCard;

AdminCard.proptypes = {
  title: PropTypes.String,
  description: PropTypes.String,
  published: PropTypes.boolean,
  id: PropTypes.String,
  postType: PropTypes.String,
  img: PropTypes.String,
};
