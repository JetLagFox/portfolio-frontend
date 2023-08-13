import { useState, useEffect } from "react";

import { addExperience } from "../api/experience";

import FormNotifier from "./FormNotifier";

const ExperienceForm = ({ experienceData }) => {
  const [errors, setErrors] = useState([]);
  const [validating, setValidating] = useState(false);
  const [formData, setFormData] = useState({
    job: experienceData?.job || "",
    city: experienceData?.city || "",
    country: "España",
    description: experienceData?.description || "",
    company: experienceData?.company || "",
    tags: experienceData?.tags || "",
    startDate: "",
    finishDate: "",
    published: false,
  });

  useEffect(() => {
    if (experienceData) {
      setFormData({
        job: experienceData?.job,
        city: experienceData?.city,
        description: experienceData?.description,
        company: experienceData?.company,
        tags: experienceData?.tags,
      });
    }
  }, [experienceData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidating(true);
    setErrors([]);

    const {
      job,
      city,
      description,
      company,
      tags,
      startDate,
      finishDate,
    } = formData;

    if (job?.length === 0) {
      setErrors((prev) => [
        ...prev,
        { field: "job", message: "El campo título es obligatorio" },
      ]);
    }

    if (city?.length === 0) {
      setErrors((prev) => [
        ...prev,
        { field: "city", message: "El campo ciudad es obligatorio" },
      ]);
    }

    if (description?.length < 150) {
      setErrors((prev) => [
        ...prev,
        {
          field: "description",
          message: "La descripción tiene que tener al menos 150 caracteres",
        },
      ]);
    }

    if (startDate?.length === 0) {
      setErrors((prev) => [
        ...prev,
        { field: "startDate", message: "Añade la fecha de inicio" },
      ]);
    }

    if (company?.length === 0) {
      setErrors((prev) => [
        ...prev,
        { field: "company", message: "El campo compañía es obligatorio" },
      ]);
    }

    if (errors.length === 0) {
      const response = await addExperience(formData);
      console.log("esto es resopnse: ", response);
    }
  };

  return (
    <form onChange={handleChange} onSubmit={handleSubmit} method="post">
      <input
        className={
          errors.some((error) => error.field === "job") && "input--error"
        }
        name="job"
        type="text"
        defaultValue={formData.job}
        placeholder="Título"
      />
      <div className="contact-form--2-column">
        <input
          className={
            errors.some((error) => error.field === "city") && "input--error"
          }
          name="city"
          type="text"
          defaultValue={formData.city}
          placeholder="Ciudad"
        />
        <input
          className={
            errors.some((error) => error.field === "company") && "input--error"
          }
          name="company"
          type="text"
          defaultValue={formData.company}
          placeholder="Empresa"
        />
      </div>
      <textarea
        className={
          errors.some((error) => error.field === "description") &&
          "input--error"
        }
        name="description"
        defaultValue={formData.description}
        placeholder="Descripción"
      />
      <input
        name="tags"
        type="text"
        defaultValue={formData.tags}
        placeholder="Etiquetas"
      />
      <div className="contact-form--2-column">
        <input
          className={
            errors.some((error) => error.field === "startDate") &&
            "input--error"
          }
          name="startDate"
          type="date"
          defaultValue={formData.startDate}
        />
        <input
          name="finishDate"
          type="date"
          defaultValue={formData.finishDate}
        />
      </div>

      <FormNotifier send={validating} errors={errors} />

      <div className="form-actions">
        <input
          onClick={() => {
            setFormData({ ...formData, published: false });
            setValidating(true);
          }}
          type="submit"
          value="Guardar Experiencia"
        />
        <input
          onClick={() => {
            setFormData({ ...formData, published: true });
            setValidating(true);
          }}
          type="submit"
          value="Registrar Experiencia"
        />
      </div>
    </form>
  );
};

export default ExperienceForm;
