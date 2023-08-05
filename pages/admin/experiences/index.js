import { useState, useEffect } from "react";
import { getExperiences } from "../../../api/experience";

import AdminLayout from "../../../layouts/admin";

import PaginationWrapper from "../../../layouts/paginationWrapper";
import AdminCard from "../../../components/AdminCard";

const pageBreadcrumbs = [
  {
    href: "/admin",
    title: "Admin",
  },
  {
    title: "Experiencias",
  },
];

const Experiences = () => {
  const [experiences, setExperiences] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getExperiences();
      console.log("response", response);
      setExperiences(response.experiences);
    };

    fetchData();
  }, []);

  return (
    <AdminLayout breadcrumbs={pageBreadcrumbs} title="Experiencias">
      <PaginationWrapper>
        {experiences?.map((experience) => {
          return <AdminCard experience={experience} />;
        })}
      </PaginationWrapper>
    </AdminLayout>
  );
};

export default Experiences;
