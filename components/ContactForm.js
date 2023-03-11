import React, { useState } from "react";
import FormItem from "../atoms/formItem";

const ContactForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formInputs, setFormInputs] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handlChange = (e) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    const { name, email, message } = formInputs;

    if (name.length == 0 || email.length == 0 || message.length == 0) {
      setSuccess(false);
    } else {
      setSuccess(true);
    }
  };

  return (
    <section className="contact-form">
      <div className="wrapper">
        <h2>Contact form</h2>
        <form onSubmit={handleSubmit}>
          <FormItem
            handlChange={handlChange}
            formInputs={formInputs}
            label="Nombre"
            type="text"
            name="name"
          />
          <FormItem
            handlChange={handlChange}
            formInputs={formInputs}
            label="Correo"
            type="email"
            name="email"
          />

          <FormItem
            handlChange={handlChange}
            formInputs={formInputs}
            label="Mensaje"
            type="textarea"
            name="message"
          />

          <input type="submit" value="Enviar" />
        </form>
        {formSubmitted && !success && <p>Ha habido algún problema</p>}
        {formSubmitted && success && (
          <p>El formulario se ha enviado correctamente</p>
        )}
      </div>
    </section>
  );
};

export default ContactForm;
