import Link from "next/link";

const Header = () => {
  return (
    <header className="header">
      <div className="wrapper">
        <p>Título</p>
        <div className="header__menu">
          <Link href="#experiencia">
            <a>Experiencia</a>
          </Link>
          <Link href="#contacto">
            <a>Contacto</a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
