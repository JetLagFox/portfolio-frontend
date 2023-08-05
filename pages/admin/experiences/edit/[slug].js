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
    const experienceId = "63de6fea981ed486a85fa2a3";
    console.log("ME CAGL EN TO: ", router.query);

    const fetchData = async () => {
      const response = await getExperienceById(experienceId);
      console.log("response: ", response);
      setData(response.experience);
    };

    fetchData();
  }, [router.pathname]);

  return (
    <AdminLayout breadcrumbs={pageBreadcrumbs} title="Editando experiencia">
      <ExperienceForm experienceData={data} />
    </AdminLayout>
  );
};

export default EditExperience;
