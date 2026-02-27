import { useState, useEffect } from "react";

export const usePostFormValidation = (postData, formSend) => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    title: postData?.title || "",
    excerpt: postData?.excerpt || "",
    content: postData?.content || "",
    tags: postData?.tags || "",
    published: postData?.published || false,
  });

  useEffect(() => {
    if (postData) {
      setFormData({
        title: postData?.title,
        excerpt: postData?.excerpt,
        content: postData?.content,
        tags: postData?.tags,
        published: postData?.published,
      });
    }
  }, [postData]);

  useEffect(() => {
    if (formSend) {
      setErrors([]);

      const { title, excerpt, content, tags } = formData;

      if (title?.length === 0) {
        setErrors((prev) => [...prev, { field: "title", message: "El campo título es obligatorio" }]);
      }

      if (excerpt?.length === 0) {
        setErrors((prev) => [...prev, { field: "excerpt", message: "El campo descripción es obligatorio" }]);
      }

      if (content?.length < 150) {
        setErrors((prev) => [
          ...prev,
          { field: "content", message: "El contenido tiene que tener al menos 150 caracteres" },
        ]);
      }
    }
  }, [formData]);

  return { errors, formData, setFormData };
};
