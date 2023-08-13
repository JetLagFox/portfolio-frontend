import { useState, useEffect } from "react";
import Link from "next/link";
import { getUserByEmail, getUserByName, postUser } from "../../api/user";

import customTransitions from "./../../utils/customTransitions";

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

  useEffect(() => {
    customTransitions();
  }, []);

  useEffect(() => {
    if (errors.length === 0 && checkingValidation) {
      async function createUser() {
        const apiResponse = await postUser(formData);
        console.log(apiResponse);
      }

      createUser();
    }
  }, [errors, checkingValidation]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setErrors([]);

    const { user, email, password, repassword } = formData;

    if (
      password.length === 0 ||
      repassword.length === 0 ||
      user.length === 0 ||
      email.length === 0
    ) {
      setErrors((prev) => [
        ...prev,
        {
          field: "",
          message: "Todos los campos son obligatorios",
        },
      ]);
    } else {
      if (password !== repassword) {
        setErrors((prev) => [
          ...prev,
          {
            field: "password",
            message: "Las contraseñas deben ser iguales",
          },
        ]);
      }

      async function checkEmailandUser() {
        const emailResponse = await getUserByEmail(email);
        const nameResponse = await getUserByName(user);

        if (emailResponse?.user.length > 0) {
          setErrors((prev) => [
            ...prev,
            {
              field: "email",
              message: "El correo ya está en uso",
            },
          ]);
        }

        if (nameResponse?.user.length > 0) {
          setErrors((prev) => [
            ...prev,
            {
              field: "email",
              message: "El nombre de usuario ya está en uso",
            },
          ]);
        }

        if (emailResponse?.user && nameResponse?.user) {
          setCheckingValidation(true);
        }
      }

      checkEmailandUser();
    }
  };

  return (
    <section className="register login contact-form">
      <div className="login__wrap">
        <form onSubmit={handleSubmit} method="post">
          <input
            className={
              errors.some((error) => error.field === "user") && "input--error"
            }
            onChange={handleChange}
            type="text"
            name="user"
            placeholder="Nombre de usuario"
            value={formData.user}
          />
          <input
            className={
              errors.some((error) => error.field === "email") && "input--error"
            }
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
          />
          <input
            className={
              errors.some((error) => error.field === "password") &&
              "input--error"
            }
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
