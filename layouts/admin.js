import { useRouter } from "next/router";

import BreadCrumbs from "../components/BreadCrumbs";
import { useState, useEffect } from "react";

const AdminLayout = ({ children, breadcrumbs, title }) => {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState(router.pathname);

  useEffect(() => {
    // Listener para el evento de cambio de ruta
    const handleRouteChange = (url) => {
      setCurrentPath(url);
    };

    // Escucha el evento de cambio de ruta
    router.events.on("routeChangeComplete", handleRouteChange);

    // Limpia el listener al desmontar el componente
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <header className="header-admin">
        <span>Egoi</span>
        <img src="" />
      </header>
      <section className="admin-wrapper">
        <div className="wrapper">
          <BreadCrumbs breadcrumbs={breadcrumbs} />
          <h1>{title}</h1>
          {children}
        </div>
      </section>
    </>
  );
};

export default AdminLayout;
