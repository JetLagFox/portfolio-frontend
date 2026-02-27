import AdminLayout from "@layouts/admin";
import PostForm from "@components/PostForm";

const pageBreadcrumbs = [
  {
    href: "/admin",
    title: "Admin",
  },
  {
    href: "/admin/articulos",
    title: "Artículos",
  },
  {
    title: "Nuevo artículo",
  },
];

const newPosts = () => {
    return (
        <AdminLayout breadcrumbs={pageBreadcrumbs} title="Crear nuevo artículo">
            <PostForm />
        </AdminLayout>
    );
};

export default newPosts;