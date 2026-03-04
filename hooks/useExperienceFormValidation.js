import { useState } from "react";

export const useExperienceFormValidation = (experienceData, id) => {
  const [errors, setErrors] = useState([]);
  const [touched, setTouched] = useState({});
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

  const validate = (fieldName, value) => {
    const newErrors = errors.filter(e => e.field !== fieldName);
    
    if (fieldName === "job" && !value) {
      newErrors.push({ field: "job", message: "El campo título es obligatorio" });
    }
    if (fieldName === "city" && !value) {
      newErrors.push({ field: "city", message: "El campo ciudad es obligatorio" });
    }
    if (fieldName === "description" && value?.length < 150) {
      newErrors.push({ field: "description", message: "La descripción tiene que tener al menos 150 caracteres" });
    }
    if (fieldName === "startDate" && !value) {
      newErrors.push({ field: "startDate", message: "Añade la fecha de inicio" });
    }
    if (fieldName === "company" && !value) {
      newErrors.push({ field: "company", message: "El campo compañía es obligatorio" });
    }
    
    setErrors(newErrors);
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
    validate(e.target.name, e.target.value);
  };

  const validateAll = () => {
    const allTouched = {
      job: true,
      city: true,
      description: true,
      company: true,
      startDate: true,
      tags: true,
    };
    setTouched(allTouched);
    
    const newErrors = [];
    if (!formData.job) newErrors.push({ field: "job", message: "El campo título es obligatorio" });
    if (!formData.city) newErrors.push({ field: "city", message: "El campo ciudad es obligatorio" });
    if (formData.description?.length < 150) newErrors.push({ field: "description", message: "La descripción tiene que tener al menos 150 caracteres" });
    if (!formData.startDate) newErrors.push({ field: "startDate", message: "Añade la fecha de inicio" });
    if (!formData.company) newErrors.push({ field: "company", message: "El campo compañía es obligatorio" });
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  return { errors, formData, setFormData, handleBlur, touched, validateAll };
};
