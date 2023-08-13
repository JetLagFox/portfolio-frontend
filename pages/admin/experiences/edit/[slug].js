import AdminLayout from "../../../../layouts/admin";
import { getExperienceById } from "../../../../api/experience";
import ExperienceForm from "../../../../components/ExperienceForm";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

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
  const [data, setData] = useState(null);

  useEffect(() => {
    const experienceId = router.query.slug;

    const fetchData = async () => {
      const response = await getExperienceById(experienceId);
      setData(response.experience);
    };

    fetchData();
  }, [router.pathname, router.query]);

  return (
    <AdminLayout breadcrumbs={pageBreadcrumbs} title="Editando experiencia">
      <ExperienceForm experienceData={data} />
    </AdminLayout>
  );
};

export default EditExperience;
