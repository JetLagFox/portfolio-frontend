import React, { useState } from "react";
import FormItem from "../atoms/formItem";

const ContactForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formInputs, setFormInputs] = useState({
    name: "",
    email: "",
    message: "",
    subject: "",
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
    <section className="contact-form" id="contacto">
      <div className="wrapper">
        <div className="contact-form__wrap contact-form__left-column">
          <h2>Contact form</h2>
          <p className="show-custom-tag">
            Lorem Ipsum es simplemente el texto de relleno de las imprentas y
            archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar
            de las industrias desde el año 1500
          </p>
          <form onSubmit={handleSubmit}>
            <div className="contact-form--2-column">
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
            </div>

            <FormItem
              handlChange={handlChange}
              formInputs={formInputs}
              label="Asunto"
              type="text"
              name="subject"
            />

            <FormItem
              handlChange={handlChange}
              formInputs={formInputs}
              label="Mensaje"
              type="textarea"
              name="message"
            />

            <input type="submit" value="¡Contacta conmigo!" />
          </form>
          {formSubmitted && !success && <p>Ha habido algún problema</p>}
          {formSubmitted && success && (
            <p>El formulario se ha enviado correctamente</p>
          )}
        </div>
        <div className="contact-form__wrap contact-form__right-column"></div>
      </div>
    </section>
  );
};

export default ContactForm;
