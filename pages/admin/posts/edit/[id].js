import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { getPostById } from "@api/post";

import AdminLayout from "@layouts/admin";
import PostForm from "@components/PostForm";
import Loader from "@components/Loader";

const pageBreadcrumbs = [
  { href: "/admin", title: "Admin" },
  { href: "/admin/posts", title: "Artículos" },
  { title: "Editando artículo" },
];

const EditPost = () => {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    if (router.query.id) {
      setPostId(router.query.id);
    }
  }, [router.query.id]);

  useEffect(() => {
    if (!postId) return;

    async function fetchPost() {
      const response = await getPostById(postId);
      if (response.post) {
        setPost(response.post);
      }
      setLoading(false);
    }

    fetchPost();
  }, [postId]);

  if (loading) return <Loader />;

  return (
    <AdminLayout breadcrumbs={pageBreadcrumbs} title="Editando artículo">
      <PostForm postData={post} id={postId} />
    </AdminLayout>
  );
};

export default EditPost;
