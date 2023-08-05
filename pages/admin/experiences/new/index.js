import AdminLayout from "../../../../layouts/admin";
import ExperienceForm from "../../../../components/ExperienceForm";

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
    title: "Nueva experiencia",
  },
];

const NewExperience = () => {
  return (
    <AdminLayout breadcrumbs={pageBreadcrumbs} title="Crear nueva experiencia">
      <ExperienceForm />
    </AdminLayout>
  );
};

export default NewExperience;
