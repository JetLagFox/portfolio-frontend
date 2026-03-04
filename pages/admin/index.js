import Link from "next/link";
import { IconBook, IconArticle, IconMicroscope } from "@tabler/icons-react";

import AdminLayout from "@layouts/admin";

const adminRoutes = [
  {
    title: "Experiencias",
    url: "/admin/experiences",
    icon: IconBook,
    htmlTag: "section",
    description: "Gestiona tu historial profesional, empresas y tecnologías asociadas a cada etapa.",
  },
  {
    title: "Posts",
    url: "/admin/posts",
    icon: IconArticle,
    htmlTag: "article",
    description: "Artículos, tutoriales y reflexiones del blog. Crea, edita o elimina entradas.",
  },
  {
    title: "Proyectos",
    url: "/admin/projects",
    icon: IconMicroscope,
    htmlTag: "div",
    description: "Portfolio de proyectos personales y profesionales. Muestra lo que has construido.",
  },
];

const DashItem = ({ item }) => {
  const Icon = item.icon;
  return (
    <div className="dash-item">
      <span className="dash-item__tag">{`<${item.htmlTag}>`}</span>
      <Link href={item.url}>
        <a className="dash-item__card">
          <div className="dash-item__icon">
            <Icon size={38} strokeWidth={1.5} />
          </div>
          <div className="dash-item__content">
            <h2 className="dash-item__title">{item.title}</h2>
            <p className="dash-item__desc">{item.description}</p>
          </div>
          <span className="dash-item__arrow">&#8594;</span>
        </a>
      </Link>
      <span className="dash-item__tag">{`</${item.htmlTag}>`}</span>
    </div>
  );
};

const Admin = () => {
  return (
    <AdminLayout title="Dashboard">
      <div className="admin-dashboard">
        <p className="admin-dashboard__intro">
          Panel de control del portfolio. Gestiona el contenido desde aquí.
        </p>
        <div className="admin-dashboard__list">
          {adminRoutes.map((item, index) => (
            <DashItem key={index} item={item} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;
