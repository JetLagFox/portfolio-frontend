import { useState, useEffect } from "react";

export function validatePostFormData(formData) {
  const errors = [];
  const { slug, title, excerpt, content, img, post_type } = formData;

  if (!slug || slug.trim().length === 0) {
    errors.push({ field: "slug", message: "El slug es obligatorio" });
  }

  if (!title || title.trim().length === 0) {
    errors.push({ field: "title", message: "El campo título es obligatorio" });
  }

  if (!excerpt || excerpt.trim().length === 0) {
    errors.push({ field: "excerpt", message: "El campo descripción es obligatorio" });
  }

  if (!content || content.trim().length < 150) {
    errors.push({ field: "content", message: "El contenido tiene que tener al menos 150 caracteres" });
  }

  if (!img || img.trim().length === 0) {
    errors.push({ field: "img", message: "La URL de la imagen es obligatoria" });
  }

  if (!post_type || post_type.trim().length === 0) {
    errors.push({ field: "post_type", message: "El tipo de post es obligatorio" });
  }

  if (!formData.tags || formData.tags.trim().length === 0) {
    errors.push({ field: "tags", message: "Las etiquetas son obligatorias" });
  }

  return errors;
}

export const usePostFormValidation = (postData) => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    slug: postData?.slug || "",
    title: postData?.title || "",
    excerpt: postData?.excerpt || "",
    content: postData?.content || "",
    img: postData?.img || "",
    post_type: postData?.post_type || "articulo",
    tags: postData?.tags || "",
    published: postData?.published || false,
    hero_style: postData?.hero_style || "compact",
    hero_config: postData?.hero_config || JSON.stringify({ logo: "#d6f31f", title: "#ffffff", meta: "#ffffff", anchor: "#d6f31f" }),
  });

  useEffect(() => {
    if (postData) {
      setFormData({
        slug: postData.slug || "",
        title: postData.title || "",
        excerpt: postData.excerpt || "",
        content: postData.content || "",
        img: postData.img || "",
        post_type: postData.post_type || "articulo",
        tags: postData.tags || "",
        published: postData.published || false,
        hero_style: postData.hero_style || "compact",
        hero_config: postData.hero_config || JSON.stringify({ logo: "#d6f31f", title: "#ffffff", meta: "#ffffff", anchor: "#d6f31f" }),
      });
    }
  }, [postData]);

  return { errors, setErrors, formData, setFormData };
};
