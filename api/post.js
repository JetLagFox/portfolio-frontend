const BASE_URI = process.env.NEXT_PUBLIC_BASE_API_URL;

export function getPostBySlug(slug) {
  const uri = `${BASE_URI}/post/${slug}`;

  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(uri, params)
    .then((response) => response.json())
    .then((response) => {
      if (!response.post) {
        return {
          status: response.code,
          message: response.message,
        };
      }

      return {
        status: response.code,
        post: response.post,
      };
    })
    .catch((err) => {
      return {
        status: err.code,
        message: err.message,
      };
    });
}

export async function getPostsPaginated(page) {
  const uri = `${BASE_URI}/posts/${page}`;

  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(uri, params);
  return await response.json();
}

export async function getPostsByTitle(title, page) {
  const uri = `${BASE_URI}/search-post/${title}/${page}`;

  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(uri, params);
  return await response.json();
}

export function getPosts() {
  const uri = `${BASE_URI}/posts/`;

  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(uri, params)
    .then((response) => response.json())
    .then((response) => {
      if (!response.posts) {
        return {
          status: response?.code,
          message: response?.message,
        };
      }

      return {
        status: response.code,
        posts: response?.posts,
      };
    })
    .catch((err) => {
      if (err) {
        return {
          status: err.code,
          message: err.message,
        };
      }
    });
}

export function deletePost(id) {
  const uri = `${BASE_URI}/delete-post/${id}`;

  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(uri, params)
    .then((response) => response.json())
    .then((response) => {
      if (response.code === 404) {
        return {
          status: response.code,
          message: "Algo salió mal",
        };
      }

      return {
        status: response.code,
        message: "Experiencia borrada",
      };
    })
    .catch((err) => {
      return {
        status: err.code,
        message: err.message,
      };
    });
}

export function updatePost(id, postData) {
  const uri = `${BASE_URI}/update-post/${id}`;

  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  };

  return fetch(uri, params)
    .then((response) => response.json())
    .then((response) => {
      if (response.code === 404) {
        return {
          status: response.code,
          message: "Algo salió mal",
        };
      }

      return {
        status: response.code,
        message: "Post actualizado correctamente",
      };
    })
    .catch((err) => {
      return {
        status: err.code,
        message: err.message,
      };
    });
}

export function addPost(postData) {
  const uri = `${BASE_URI}/add-post/`;

  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  };

  return fetch(uri, params)
    .then((response) => response.json())
    .then((response) => {
      if (response.code === 404) {
        return {
          status: response.code,
          message: "Algo salió mal",
        };
      }

      return {
        status: response.code,
        message: "Post añadido correctamente",
      };
    })
    .catch((err) => {
      return {
        status: err.code,
        message: err.message,
      };
    });
}