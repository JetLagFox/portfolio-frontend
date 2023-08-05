import { useState } from "react";
import sha256 from "crypto-js/sha256";

const Login = () => {
  const [formData, setFormData] = useState({
    user: null,
    password: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //comprobaciones
    console.log("formData", formData);

    //iniciar sesión
  };

  return (
    <section className="login contact-form">
      <div className="login__wrap">
        <form onSubmit={handleSubmit} method="post">
          <input
            onChange={handleChange}
            type="text"
            name="user"
            placeholder="Usuario"
            value={formData.user}
          />
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
          />
          <input name="submit" type="submit" value="Iniciar sesión" />
        </form>
      </div>
    </section>
  );
};

export default Login;
