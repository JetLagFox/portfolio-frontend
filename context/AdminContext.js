import { createContext, useState } from "react";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [refreshData, setRefreshData] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState(null);

  const context = {
    showModal,
    setShowModal,
    deleteId,
    setDeleteId,
    refreshData,
    setRefreshData,
    breadcrumbs,
    setBreadcrumbs,
  };

  return (
    <AdminContext.Provider value={context}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
