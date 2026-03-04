import { useState, useRef } from "react";
import { useMutation } from "react-query";
import Loader from "@components/Loader";
import MarkdownEditor from "@components/MarkdownEditor";

import { usePostFormValidation, validatePostFormData } from "@hooks/usePostFormValidation";
import { addPost, updatePost } from "@api/post";

import FormNotifier from "@components/FormNotifier";
import FormSuccess from "@components/FormSuccess";

const BASE_URI = process.env.NEXT_PUBLIC_BASE_URL;

const DEFAULT_HERO_CONFIG = { logo: "#d6f31f", title: "#ffffff", meta: "#ffffff", anchor: "#d6f31f" };

function parseHeroConfig(raw) {
  try { return { ...DEFAULT_HERO_CONFIG, ...JSON.parse(raw) }; } catch { return DEFAULT_HERO_CONFIG; }
}

const PostForm = ({ postData, id = null }) => {
  const { errors, setErrors, formData, setFormData } = usePostFormValidation(postData);
  const [responseStatus, setResponseStatus] = useState(null);
  const [savedPost, setSavedPost] = useState(null);
  const [uploading, setUploading] = useState(false);
  const publishedRef = useRef(false);

  const heroConfig = parseHeroConfig(formData.hero_config);

  const handleHeroConfigChange = (key, value) => {
    const updated = { ...parseHeroConfig(formData.hero_config), [key]: value };
    setFormData((prev) => ({ ...prev, hero_config: JSON.stringify(updated) }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append("image", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const json = await res.json();
      if (json.url) setFormData((prev) => ({ ...prev, img: json.url }));
    } catch {
      // upload failed silently — user can still enter URL manually
    } finally {
      setUploading(false);
    }
  };

  const { mutate, isLoading } = useMutation(
    (data) => (id ? updatePost(id, data) : addPost(data)),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          setSavedPost(data.post || null);
          setResponseStatus(200);
        } else {
          setResponseStatus(data.status || 500);
        }
      },
      onError: () => setResponseStatus(500),
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData, published: publishedRef.current };
    const validationErrors = validatePostFormData(data);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    setResponseStatus(null);
    mutate(data);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (responseStatus === 200) {
    const previewUrl = savedPost?.post_type && savedPost?.slug
      ? `/${savedPost.post_type}/${savedPost.slug}`
      : null;

    return (
      <FormSuccess
        message="Artículo guardado correctamente"
        backHref="/admin/posts"
        backLabel="Ver posts"
        previewHref={previewUrl}
        previewLabel="Ver artículo"
      />
    );
  }

  const hasError = (field) => errors.some((e) => e.field === field);

  return (
    <form onSubmit={handleSubmit} method="post">
      {responseStatus && responseStatus !== 200 && (
        <div className="form-notifier notifier--error">
          <p>Error {responseStatus}: no se pudo guardar el artículo. Revisa todos los campos.</p>
        </div>
      )}

      <div className="input--slug">
        <span>{BASE_URI}/{formData.post_type || "articulo"}/</span>
        <input
          onChange={handleChange}
          className={hasError("slug") ? "input--error" : ""}
          name="slug"
          type="text"
          defaultValue={formData.slug}
          placeholder="slug-del-articulo"
        />
      </div>

      <input
        onChange={handleChange}
        className={hasError("title") ? "input--error" : ""}
        name="title"
        type="text"
        defaultValue={formData.title}
        placeholder="Título"
      />

      <textarea
        onChange={handleChange}
        className={hasError("excerpt") ? "input--error" : ""}
        name="excerpt"
        defaultValue={formData.excerpt}
        placeholder="Descripción / extracto"
      />

      <div className={hasError("content") ? "input--error" : ""}>
        <MarkdownEditor
          value={formData.content}
          onChange={(markdown) => setFormData({ ...formData, content: markdown })}
        />
      </div>

      <div className="input--img-group">
        <input
          onChange={handleChange}
          className={hasError("img") ? "input--error" : ""}
          name="img"
          type="text"
          value={formData.img}
          placeholder="URL de la imagen de portada"
        />
        <label className={`img-upload-btn${uploading ? " img-upload-btn--loading" : ""}`}>
          <input
            type="file"
            accept="image/*,.webp"
            onChange={handleImageUpload}
            disabled={uploading}
            hidden
          />
          {uploading ? "Subiendo..." : "Subir imagen"}
        </label>
      </div>
      {formData.img && (
        <img src={formData.img} alt="preview" className="img-preview" />
      )}

      <select
        onChange={handleChange}
        className={hasError("post_type") ? "input--error" : ""}
        name="post_type"
        value={formData.post_type || "articulo"}
      >
        <option value="articulo">Artículo</option>
        <option value="tutorial">Tutorial</option>
      </select>

      <input
        onChange={handleChange}
        className={hasError("tags") ? "input--error" : ""}
        name="tags"
        type="text"
        defaultValue={formData.tags}
        placeholder="Etiquetas (separadas por comas)"
      />

      {/* Hero style selector */}
      <div className="hero-selector">
        <p className="hero-selector__label">Estilo del hero</p>
        <div className="hero-selector__options">
          <label className={`hero-option${formData.hero_style === "compact" ? " hero-option--active" : ""}`}>
            <input
              type="radio"
              name="hero_style"
              value="compact"
              checked={formData.hero_style === "compact"}
              onChange={handleChange}
            />
            <span className="hero-option__preview hero-option__preview--compact" />
            <span className="hero-option__name">Compact</span>
            <span className="hero-option__desc">Imagen 16:9 dentro del artículo</span>
          </label>
          <label className={`hero-option${formData.hero_style === "extended" ? " hero-option--active" : ""}`}>
            <input
              type="radio"
              name="hero_style"
              value="extended"
              checked={formData.hero_style === "extended"}
              onChange={handleChange}
            />
            <span className="hero-option__preview hero-option__preview--extended" />
            <span className="hero-option__name">Extended</span>
            <span className="hero-option__desc">Hero a pantalla completa con header superpuesto</span>
          </label>
        </div>

        {formData.hero_style === "extended" && (
          <div className="hero-colors">
            <p className="hero-colors__label">Colores del hero</p>
            <div className="hero-colors__grid">
              <label className="hero-color-field">
                <span>Logo / borde</span>
                <input
                  type="color"
                  value={heroConfig.logo}
                  onChange={(e) => handleHeroConfigChange("logo", e.target.value)}
                />
                <span className="hero-color-field__hex">{heroConfig.logo}</span>
              </label>
              <label className="hero-color-field">
                <span>Título</span>
                <input
                  type="color"
                  value={heroConfig.title}
                  onChange={(e) => handleHeroConfigChange("title", e.target.value)}
                />
                <span className="hero-color-field__hex">{heroConfig.title}</span>
              </label>
              <label className="hero-color-field">
                <span>Meta / fecha</span>
                <input
                  type="color"
                  value={heroConfig.meta}
                  onChange={(e) => handleHeroConfigChange("meta", e.target.value)}
                />
                <span className="hero-color-field__hex">{heroConfig.meta}</span>
              </label>
              <label className="hero-color-field">
                <span>Botón ancla</span>
                <input
                  type="color"
                  value={heroConfig.anchor}
                  onChange={(e) => handleHeroConfigChange("anchor", e.target.value)}
                />
                <span className="hero-color-field__hex">{heroConfig.anchor}</span>
              </label>
            </div>
          </div>
        )}
      </div>

      <FormNotifier errors={errors} />

      <div className="form-actions">
        <input
          type="submit"
          value="Guardar borrador"
          onClick={() => { publishedRef.current = false; }}
        />
        <input
          type="submit"
          value={postData ? "Actualizar artículo" : "Publicar artículo"}
          onClick={() => { publishedRef.current = true; }}
        />
      </div>
    </form>
  );
};

export default PostForm;
