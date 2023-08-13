import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

import CrossIcon from "../svg/Cross";

const ModalLayout = ({ children }) => {
  const { setShowModal } = useContext(AdminContext);

  return (
    <div className="modal">
      <div className="modal__wrap">
        <span className="close-modal" onClick={() => setShowModal(false)}>
          <CrossIcon />
        </span>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
