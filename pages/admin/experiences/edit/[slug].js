import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useExperienceById } from "@hooks/experiences";

import AdminLayout from "@layouts/admin";
import ExperienceForm from "@components/ExperienceForm";

const pageBreadcrumbs = [
  {
    href: "/admin",
    title: "Admin",
  },
  {
    href: "/admin/experiences",
    title: "Experiencias",
  },
  {
    title: "Editando experiencia",
  },
];

const EditExperience = () => {
  const router = useRouter();
  const [experienceId, setExperienceId] = useState(null);
  const { data, isLoading, isError } = useExperienceById(experienceId);

  useEffect(() => {
    console.log("ESTO ES SLUG, ", router.query.slug);
    if (router.query.slug) {
      setExperienceId(router.query.slug);
    }
  }, [router.query.slug]);

  useEffect(() => {
    console.log("ESTO ES DATA: ", data);
  }, [data]);

  return (
    <>
      {isLoading && <h1>Cargando...</h1>}

      {isError && <h1>Hubo algún error</h1>}

      {!isError && !isLoading && (
        <AdminLayout breadcrumbs={pageBreadcrumbs} title="Editando experiencia">
          <ExperienceForm experienceData={data?.experience} id={experienceId} />
        </AdminLayout>
      )}
    </>
  );
};

export default EditExperience;
