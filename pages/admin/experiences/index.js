import React, { useState, useEffect, useContext } from "react";

import { AdminContext } from "@context/AdminContext";
import { getExperiencesPaginated, getExperienceByTitle } from "@api/experience";

import AdminLayout from "@layouts/admin";
import PaginationWrapper from "@layouts/paginationWrapper";
import ModalLayout from "@layouts/modalWrapper";
import AdminCard from "@components/AdminCard";
import DeleteModal from "@components/DeleteModal";
import Loader from "@components/Loader";

const postType = "experiences";

const Experiences = () => {
  const { showModal } = useContext(AdminContext);
  const [search, setSearch] = useState(null);
  const [posts, setPosts] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getData() {
      const response = await getExperiencesPaginated(page);
      setPosts(response);
    }

    async function getFilteredData() {
      const response = await getExperienceByTitle(search, page);
      setPosts(response);
    }

    search?.length > 0 ? getFilteredData() : getData();
  }, [page, search]);

  return (
    <>
      {posts && (
        <AdminLayout breadcrumbs={posts?.breadcrumbs} title="Experiencias">
          {showModal && (
            <ModalLayout>
              <DeleteModal postType={postType} />
            </ModalLayout>
          )}
          <PaginationWrapper
            search={search}
            setSearch={setSearch}
            setPage={setPage}
            hashNextPage={posts?.experiences?.hasNextPage}
            hashPrevPage={posts?.experiences?.hasPrevPage}
            adminLink="/admin/experiences/new"
          >
            {!posts && <Loader />}
            {posts?.experiences?.docs.length > 0 ? (
              posts?.experiences?.docs?.map((experience, index) => {
                return (
                  <React.Fragment key={index}>
                    <AdminCard
                      title={experience.job}
                      description={experience.description}
                      postType={postType}
                      published={experience.published}
                      id={experience._id}
                    />
                  </React.Fragment>
                );
              })
            ) : (
              <p>No hay resultados que mostrar</p>
            )}
          </PaginationWrapper>
        </AdminLayout>
      )}
    </>
  );
};

export default Experiences;
