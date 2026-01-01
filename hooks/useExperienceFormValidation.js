import { useState, useEffect } from "react";

export const useExperienceFormValidation = (experienceData, id) => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    job: experienceData?.job || "",
    city: experienceData?.city || "",
    country: "España",
    description: experienceData?.description || "",
    company: experienceData?.company || "",
    tags: experienceData?.tags || "",
    startDate: experienceData?.startDate?.split("T")[0] || "",
    finishDate: experienceData?.finishDate?.split("T")[0] || "",
    published: experienceData?.published || false,
  });

  useEffect(() => {
    if (experienceData) {
      setFormData({
        job: experienceData?.job,
        city: experienceData?.city,
        description: experienceData?.description,
        company: experienceData?.company,
        tags: experienceData?.tags,
        startDate: experienceData?.startDate?.split("T")[0],
        finishDate: experienceData?.finishDate?.split("T")[0],
        published: experienceData?.published,
      });
    }
  }, [experienceData]);

  useEffect(() => {
    setErrors([]);

    const { job, city, description, company, tags, startDate, finishDate } = formData;

    if (job?.length === 0) {
      setErrors((prev) => [...prev, { field: "job", message: "El campo título es obligatorio" }]);
    }

    if (city?.length === 0) {
      setErrors((prev) => [...prev, { field: "city", message: "El campo ciudad es obligatorio" }]);
    }

    if (description?.length < 150) {
      setErrors((prev) => [
        ...prev,
        { field: "description", message: "La descripción tiene que tener al menos 150 caracteres" },
      ]);
    }

    if (startDate?.length === 0) {
      setErrors((prev) => [...prev, { field: "startDate", message: "Añade la fecha de inicio" }]);
    }

    if (company?.length === 0) {
      setErrors((prev) => [...prev, { field: "company", message: "El campo compañía es obligatorio" }]);
    }
  }, [formData]);

  return { errors, formData, setFormData };
};
