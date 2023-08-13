import { useState, useEffect } from "react";
import { getPostBySlug } from "../../api/post";

import Header from "../../compositions/Header";

const Post = () => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const slug = window.location.href.split("/")[
      window.location.href.split("/").length - 1
    ];
    console.log(slug);

    async function getPost() {
      const response = await getPostBySlug(slug);
      setPost(response.post[0]);
    }

    getPost();
  }, []);

  if (!post) {
    return <h1>Cargando...</h1>;
  }

  return (
    <>
      <Header />
      <section>
        <div className="wrapper">
          <h1>{post?.title}</h1>
          <img src={post?.img} />
        </div>
      </section>
    </>
  );
};

export default Post;
