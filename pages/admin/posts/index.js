import React, { useState, useEffect, useContext } from "react";

import { AdminContext } from "@context/AdminContext";

import { getPostsPaginated, getPostsByTitle } from "@api/post";

import AdminLayout from "@layouts/admin";
import ModalLayout from "@layouts/modalWrapper";
import PaginationWrapper from "@layouts/paginationWrapper";

import AdminCard from "@components/AdminCard";
import DeleteModal from "@components/DeleteModal";
import Loader from "@components/Loader";

const postType = "posts";

const Posts = () => {
  const { showModal } = useContext(AdminContext);
  const [posts, setPosts] = useState(null);
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getData() {
      const response = await getPostsPaginated(page);
      setPosts(response);
    }

    async function getFilteredData() {
      const response = await getPostsByTitle(search, page);
      setPosts(response);
    }

    search?.length > 0 ? getFilteredData() : getData();
  }, [page, search]);

  return (
    <AdminLayout breadcrumbs={posts?.breadcrumbs} title="Artículos">
      {showModal && (
        <ModalLayout>
          <DeleteModal postType={postType} />
        </ModalLayout>
      )}
      <PaginationWrapper
        search={search}
        setSearch={setSearch}
        setPage={setPage}
        hashNextPage={posts?.posts?.hasNextPage}
        hashPrevPage={posts?.posts?.hasPrevPage}
        adminLink="/admin/posts/new"
      >
        {!posts && <Loader />}
        {posts?.posts?.docs?.map((post, index) => {
          return (
            <React.Fragment key={index}>
              <AdminCard
                title={post.title}
                description={post.excerpt}
                postType={postType}
                published={post.published}
                id={post.id}
                img={post.img}
                previewUrl={post.post_type && post.slug ? `/${post.post_type}/${post.slug}` : null}
              />
            </React.Fragment>
          );
        })}
      </PaginationWrapper>
    </AdminLayout>
  );
};

export default Posts;
