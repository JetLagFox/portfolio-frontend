import { useState } from "react";
import { useMutation } from "react-query";
import { useExperienceFormValidation } from "../hooks/useExperienceFormValidation";
import GridLoader from "react-spinners/GridLoader";

import { addExperience, updateExperience } from "../api/experience";

import FormNotifier from "./FormNotifier";
import SuccessIcon from "../svg/Success";
import Link from "next/link";

const ExperienceForm = ({ experienceData, id = null }) => {
  const { errors, formData, setFormData } = useExperienceFormValidation(experienceData, id);
  const [responseStatus, setResponseStatus] = useState(null);
  const { mutate, isLoading, isError } = useMutation(
    id ? () => updateExperience(id, formData) : () => addExperience(formData),
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
          <input
            onChange={handleChange}
            onBlur={handleChange}
            className={errors.some((error) => error.field === "job") ? "input--error" : ""}
            name="job"
            type="text"
            defaultValue={formData.job}
            placeholder="Título"
            disabled={isLoading}
          />
          <div className="contact-form--2-column">
            <input
              onChange={handleChange}
              onBlur={handleChange}
              className={errors.some((error) => error.field === "city") ? "input--error" : ""}
              name="city"
              type="text"
              defaultValue={formData.city}
              placeholder="Ciudad"
              disabled={isLoading}
            />
            <input
              onChange={handleChange}
              onBlur={handleChange}
              className={errors.some((error) => error.field === "company") ? "input--error" : ""}
              name="company"
              type="text"
              defaultValue={formData.company}
              placeholder="Empresa"
              disabled={isLoading}
            />
          </div>
          <textarea
            onChange={handleChange}
            onBlur={handleChange}
            className={errors.some((error) => error.field === "description") ? "input--error" : ""}
            name="description"
            defaultValue={formData.description}
            placeholder="Descripción"
            disabled={isLoading}
          />
          <input
            onChange={handleChange}
            onBlur={handleChange}
            name="tags"
            type="text"
            defaultValue={formData.tags}
            placeholder="Etiquetas"
          />
          <div className="contact-form--2-column">
            <input
              onChange={handleChange}
              onBlur={handleChange}
              className={errors.some((error) => error.field === "startDate") ? "input--error" : ""}
              name="startDate"
              type="date"
              defaultValue={formData.startDate}
              disabled={isLoading}
            />
            <input
              onChange={handleChange}
              onBlur={handleChange}
              name="finishDate"
              type="date"
              defaultValue={formData.finishDate}
              disabled={isLoading}
            />
          </div>

          <FormNotifier errors={errors} />

          <div className="form-actions">
            <input
              onClick={() => {
                setFormData({ ...formData, published: false });
              }}
              type="submit"
              value="Guardar Experiencia"
            />
            <input
              onClick={() => {
                setFormData({ ...formData, published: true });
              }}
              type="submit"
              value={isLoading ? "Registrando..." : experienceData ? "Actualizar Experiencia" : "Registrar Experiencia"}
            />
          </div>
        </form>
      )}
      {isLoading && <p>Analizando....</p>}
    </>
  );
};

export default ExperienceForm;
