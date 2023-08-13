import React, { useState, useEffect, useContext } from "react";

import { AdminContext } from "../../../context/AdminContext";

import { getPosts } from "../../../api/post";

import AdminLayout from "../../../layouts/admin";
import ModalLayout from "../../../layouts/modalWrapper";
import PaginationWrapper from "../../../layouts/paginationWrapper";

import AdminCard from "../../../components/AdminCard";
import DeleteModal from "../../../components/DeleteModal";

const Posts = () => {
  const {
    setBreadcrumbs,
    breadcrumbs,
    showModal,
    refreshData,
    setRefreshData,
  } = useContext(AdminContext);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function getPostsData() {
      const postsResponse = await getPosts();
      if (postsResponse.status === 200) {
        setPosts(postsResponse.posts);
        setBreadcrumbs(postsResponse.breadcrumbs);
        setRefreshData(false);
      }
    }
    getPostsData();
  }, [refreshData === true]);

  return (
    <AdminLayout breadcrumbs={breadcrumbs} title="Artículos">
      {showModal && (
        <ModalLayout>
          <DeleteModal postType="posts" />
        </ModalLayout>
      )}
      <PaginationWrapper data={posts} setData={setPosts} postType="posts">
        {posts?.map((post, index) => {
          return (
            <React.Fragment key={index}>
              <AdminCard
                title={post.title}
                description={post.excerpt}
                postType="posts"
                published={post.published}
                id={post._id}
                img={post.img}
              />
            </React.Fragment>
          );
        })}
      </PaginationWrapper>
    </AdminLayout>
  );
};

export default Posts;
