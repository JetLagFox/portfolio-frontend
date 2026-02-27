import { useState } from "react";
import { useMutation } from "react-query";
import GridLoader from "react-spinners/GridLoader";
import MarkdownEditor from '@components/MarkdownEditor';

import { usePostFormValidation } from "@hooks/usePostFormValidation";
import { addPost, updatePost } from "@api/post";

import FormNotifier from "@components/FormNotifier";
import SuccessIcon from "@svg/Success";
import Link from "next/link";

const BASE_URI = process.env.NEXT_PUBLIC_BASE_URL;

const PostForm = ({ postData, id = null }) => {
	const [formSend, setFormSend] = useState(false);
  const { errors, formData, setFormData } = usePostFormValidation(postData, formSend);
  const [responseStatus, setResponseStatus] = useState(null);
  const { mutate, isLoading, isError } = useMutation(
    id ? () => updatePost(id, formData) : () => addPost(formData),
    {
      onSuccess: (data) => {
        console.log(data);
        setResponseStatus(200);
      },
      onError: (err) => {
        console.log("Error: ", err);
        setResponseStatus(500);
      },
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.length === 0) {
      if (id) {
        mutate({ id, formData });
      } else {
        mutate({ formData });
      }
    }
  };

  return (
    <>
      {!isLoading && (
        <form onSubmit={handleSubmit} method="post">
          {(responseStatus === 200 || isLoading) && (
            <div className="form-layer">
              {responseStatus === 200 ? (
                <div>
                  <SuccessIcon />
                  <p style={{ marginTop: "20px" }}>Formulario enviado correctamente</p>
                  <Link href="/admin/experiencias">
                    <a className="primary-button">Ver Experiencias</a>
                  </Link>
                </div>
              ) : (
                <GridLoader color="#36d7b7" />
              )}
            </div>
          )}
					<div className="input--slug">
						<span>{BASE_URI}/articulo/</span>
						<input
							onChange={handleChange}
							onBlur={handleChange}
							className={errors.some((error) => error.field === "slug") ? "input--error" : ""}
							name="slug"
							type="text"
							defaultValue={formData.slug}
							placeholder="Slug"
							disabled={isLoading}
						/>
					</div>
          <input
            onChange={handleChange}
            onBlur={handleChange}
            className={errors.some((error) => error.field === "title") ? "input--error" : ""}
            name="title"
            type="text"
            defaultValue={formData.title}
            placeholder="Título"
            disabled={isLoading}
          />
          <textarea
            onChange={handleChange}
            onBlur={handleChange}
            className={errors.some((error) => error.field === "excerpt") ? "input--error" : ""}
            name="excerpt"
            defaultValue={formData.excerpt}
            placeholder="Descripción"
            disabled={isLoading}
          />
          <div className={errors.some((error) => error.field === 'content') ? 'input--error' : ''}>
						<MarkdownEditor
							value={formData.content && ''}
							onChange={(markdown) =>
								setFormData({
									...formData,
									content: markdown
								})
							}
						/>
					</div>
          <input
            onChange={handleChange}
            onBlur={handleChange}
            name="tags"
            type="text"
            defaultValue={formData.tags}
            placeholder="Etiquetas"
          />

          <FormNotifier errors={errors} />

          <div className="form-actions">
            <input
              onClick={() => {
                setFormData({ ...formData, published: false });
								setFormSend(true);
              }}
              type="submit"
              value="Guardar Artículo"
            />
            <input
              onClick={() => {
                setFormData({ ...formData, published: true });
								setFormSend(true);
              }}
              type="submit"
              value={isLoading ? "Registrando..." : postData ? "Actualizar Artículo" : "Registrar Artículo"}
            />
          </div>
        </form>
      )}
      {isLoading && <p>Analizando....</p>}
    </>
  );
};

export default PostForm;
