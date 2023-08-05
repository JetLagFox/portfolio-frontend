import { useState, useEffect } from "react";

import NotificationWrapper from "./NotificationHandler";
import { addExperience } from "../api/experience";

const ExperienceForm = ({ experienceData }) => {
  const [errors, setErrors] = useState([]);
  const [validating, setValidating] = useState(false);
  const [formData, setFormData] = useState({
    job: "" || experienceData?.job,
    city: "" || experienceData?.city,
    country: "España",
    description: "" || experienceData?.description,
    company: "" || experienceData?.company,
    tags: "" || experienceData?.tags,
    startDate: "",
    finishDate: "",
    published: false,
  });

  useEffect(() => {
    setFormData({
      job: experienceData?.job,
      city: experienceData?.city,
      description: experienceData?.description,
      company: experienceData?.company,
      tags: experienceData?.tags,
    });
  }, [experienceData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      job,
      city,
      description,
      company,
      tags,
      startDate,
      finishDate,
    } = formData;

    //validations

    let formErrors = [];

    console.log("job", job);

    if (job.length === 0) {
      formErrors.push("Añade un título adecuado");
    }

    if (city.length === 0) {
      formErrors.push("Añade una ciudad");
    }

    if (description.length < 150) {
      formErrors.push("La descripción tiene que tener al menos 150 caracteres");
    }

    setErrors(formErrors);
    setValidating(false);

    if (formErrors.length === 0) {
      const response = await addExperience(formData);
      console.log("esto es resopnse: ", response);
    }
  };

  return (
    <form onChange={handleChange} onSubmit={handleSubmit} method="post">
      <input
        name="job"
        type="text"
        defaultValue={formData.job}
        placeholder="Título"
      />
      <div className="contact-form--2-column">
        <input
          name="city"
          type="text"
          defaultValue={formData.city}
          placeholder="Ciudad"
        />
        <input
          name="company"
          type="text"
          defaultValue={formData.company}
          placeholder="Empresa"
        />
      </div>
      <textarea
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
        <input name="startDate" type="date" defaultValue={formData.startDate} />
        <input
          name="finishDate"
          type="date"
          defaultValue={formData.finishDate}
        />
      </div>

      <NotificationWrapper validating={validating} errors={errors} />

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
