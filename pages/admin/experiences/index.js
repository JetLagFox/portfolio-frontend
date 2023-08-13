import React, { useState, useEffect, useContext } from "react";
import { getExperiences } from "../../../api/experience";

import { AdminContext } from "./../../../context/AdminContext";

import AdminLayout from "../../../layouts/admin";

import PaginationWrapper from "../../../layouts/paginationWrapper";
import AdminCard from "../../../components/AdminCard";
import ModalLayout from "../../../layouts/modalWrapper";
import DeleteModal from "../../../components/DeleteModal";

const Experiences = () => {
  const {
    showModal,
    refreshData,
    setRefreshData,
    setBreadcrumbs,
    breadcrumbs,
  } = useContext(AdminContext);
  const [experiences, setExperiences] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getExperiences();
      setExperiences(response.experiences);
      setBreadcrumbs(response.breadcrumbs);
      setRefreshData(false);
    };

    fetchData();
  }, [refreshData === true]);

  return (
    <AdminLayout breadcrumbs={breadcrumbs} title="Experiencias">
      {showModal && (
        <ModalLayout>
          <DeleteModal postType="experiences" />
        </ModalLayout>
      )}
      <PaginationWrapper
        data={experiences}
        setData={setExperiences}
        postType="experiences"
      >
        {experiences?.map((experience, index) => {
          return (
            <React.Fragment key={index}>
              <AdminCard
                title={experience.job}
                description={experience.description}
                postType="experiences"
                published={experience.published}
                id={experience._id}
              />
            </React.Fragment>
          );
        })}
      </PaginationWrapper>
    </AdminLayout>
  );
};

export default Experiences;
