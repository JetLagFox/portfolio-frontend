import { useState } from "react";
import { useMutation } from "react-query";
import GridLoader from "react-spinners/GridLoader";

import { useExperienceFormValidation } from "@hooks/useExperienceFormValidation";
import { addExperience, updateExperience } from "@api/experience";

import FormNotifier from "@components/FormNotifier";
import FormSuccess from "@components/FormSuccess";

const ExperienceForm = ({ experienceData, id = null }) => {
  const { errors, formData, setFormData, handleBlur, touched, validateAll } = useExperienceFormValidation(experienceData, id);
  const [responseStatus, setResponseStatus] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const { mutate, isLoading, isError } = useMutation(
    id ? () => updateExperience(id, formData) : () => addExperience(formData),
    {
      onSuccess: (data) => {
        console.log(data);
        if (data.status === 200) {
          setResponseStatus(200);
          setResponseMessage(data.message);
        } else {
          setResponseStatus(data.status || 500);
          setResponseMessage(data.message || "Error al guardar");
        }
      },
      onError: (err) => {
        console.log("Error: ", err);
        setResponseStatus(500);
        setResponseMessage("Error de conexión");
      },
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateAll();

    if (isValid) {
      if (id) {
        mutate({ id, formData });
      } else {
        mutate({ formData });
      }
    }
  };

  if (responseStatus === 200) {
    return (
      <FormSuccess
        message={responseMessage || "Experiencia guardada correctamente"}
        backHref="/admin/experiencias"
        backLabel="Ver experiencias"
      />
    );
  }

  return (
    <>
      {!isLoading && (
        <form onSubmit={handleSubmit} method="post">
          {responseStatus && responseStatus !== 200 && (
            <div className="form-notifier notifier--error">
              <p>Error {responseStatus}: {responseMessage || "no se pudo guardar la experiencia"}.</p>
            </div>
          )}
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.some((error) => error.field === "job") && touched.job ? "input--error" : ""}
            name="job"
            type="text"
            defaultValue={formData.job}
            placeholder="Título"
            disabled={isLoading}
          />
          <div className="contact-form--2-column">
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.some((error) => error.field === "city") && touched.city ? "input--error" : ""}
              name="city"
              type="text"
              defaultValue={formData.city}
              placeholder="Ciudad"
              disabled={isLoading}
            />
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.some((error) => error.field === "company") && touched.company ? "input--error" : ""}
              name="company"
              type="text"
              defaultValue={formData.company}
              placeholder="Empresa"
              disabled={isLoading}
            />
          </div>
          <textarea
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.some((error) => error.field === "description") && touched.description ? "input--error" : ""}
            name="description"
            defaultValue={formData.description}
            placeholder="Descripción"
            disabled={isLoading}
          />
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            name="tags"
            type="text"
            defaultValue={formData.tags}
            placeholder="Etiquetas"
          />
          <div className="contact-form--2-column">
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.some((error) => error.field === "startDate") && touched.startDate ? "input--error" : ""}
              name="startDate"
              type="date"
              defaultValue={formData.startDate}
              disabled={isLoading}
            />
            <input
              onChange={handleChange}
              onBlur={handleBlur}
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
