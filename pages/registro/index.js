import { useState } from "react";
import Link from "next/link";
import { getUserByEmail, getUserByName } from "../../api/user";

import FormNotifier from "../../components/FormNotifier";

const Register = () => {
  const [errors, setErrors] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [checkingValidation, setCheckingValidation] = useState(false);
  const [formData, setFormData] = useState({
    user: "",
    email: "",
    password: "",
    repassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const { user, email, password, repassword } = formData;
    let formErrors = [];

    console.log("formErrors ANTES: ", formErrors);
    console.log("DATOS: ", user, email, password, repassword);

    if (
      password.length === 0 ||
      repassword.length === 0 ||
      user.length === 0 ||
      email.length === 0
    ) {
      formErrors.push("Todos los campos son obligatorios");
      setErrors(formErrors);
    } else {
      if (password !== repassword) {
        formErrors.push("Las contraseñas deben ser iguales");
      }

      console.log(formErrors);

      async function checkEmailandUser() {
        const emailResponse = await getUserByEmail(email);
        const nameResponse = await getUserByName(user);
        console.log("emailResponse", emailResponse);
        console.log("nameResponse", nameResponse);

        if (emailResponse?.user.length > 0) {
          formErrors.push("El correo ya está en uso.");
          setErrors(formErrors);
          console.log("FORM ERRORS email: ", formErrors);
        }

        console.log("NAME: ", nameResponse);

        if (nameResponse?.user.length > 0) {
          formErrors.push("El nombre de usuario ya está en uso.");
          setErrors(formErrors);
          console.log("FORM ERRORS NAME: ", formErrors);
        }

        if (emailResponse?.user && nameResponse?.user) {
          setCheckingValidation(true);
          console.log("FORM AL FINAL: ", formErrors);

          setErrors(formErrors);
        }
      }

      checkEmailandUser();
    }

    console.log("ERRORES AL FINAL: ", formErrors);
  };

  return (
    <section className="register login contact-form">
      <div className="login__wrap">
        <form onSubmit={handleSubmit} method="post">
          <input
            onChange={handleChange}
            type="text"
            name="user"
            placeholder="Nombre de usuario"
            value={formData.user}
          />
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
          />
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
          />
          <input
            onChange={handleChange}
            type="password"
            name="repassword"
            placeholder="Confirma contraseña"
            value={formData.repassword}
          />
          <input type="submit" value="Registrarse" />
        </form>

        <FormNotifier errors={errors} send={formSubmitted} />

        <p style={{ fontSize: "12px", marginTop: "16px", textAlign: "center" }}>
          Si ya tienes una cuenta, puedes iniciar sesión a través de este{" "}
          <Link href="/iniciar-sesion">enlace</Link>.
        </p>
      </div>
    </section>
  );
};

export default Register;
