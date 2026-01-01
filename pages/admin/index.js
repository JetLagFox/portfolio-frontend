import Link from "next/link";
import { IconBook, IconArticle, IconMicroscope } from "@tabler/icons-react";

import AdminLayout from "../../layouts/admin";

const adminRoutes = [
  { title: "Experiencias", url: "/admin/experiences", icon: IconBook },
  { title: "Posts", url: "/admin/posts", icon: IconArticle },
  { title: "Proyectos", url: "/admin/projects", icon: IconMicroscope },
];

const AdminMain = ({ adminRoutes }) => {
  return (
    <div className="admin-main">
      {adminRoutes.map((item, index) => {
        const IconSvg = item.icon;
        return (
          <Link key={index} href={item.url}>
            <a>
              <IconSvg color="white" />
              {item.title}
            </a>
          </Link>
        );
      })}
    </div>
  );
};

const Admin = () => {
  return (
    <AdminLayout title="Dashboard">
      <AdminMain adminRoutes={adminRoutes} />
    </AdminLayout>
  );
};

export default Admin;
