import React, { useState } from 'react';

const ContactForm = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formInputs, setFormInputs] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handlChange = (e) => {
        setFormInputs({...formInputs, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true)

        const { name, email, message } = formInputs;

        if (name.length == 0 || email.length == 0 || message.length == 0) {
            setSuccess(false);
        } else {
            setSuccess(true);
        }
    }

    return(
        <div className='wrapper'>
            <section className='contact-form'>
                <h2>Contact form</h2>
                <form onSubmit={handleSubmit}>
                    <input onChange={handlChange} name="name" type="text" value={formInputs.name} placeholder="Tu nombre..." />
                    <input onChange={handlChange} name='email' type="email" value={formInputs.email} placeholder="Tu correo..." />
                    <textarea onChange={handlChange} name="message" value={formInputs.message} placeholder="Tu mensaje..." />
                    <input type="submit" value="Enviar" />
                </form>
                { formSubmitted && !success  && <p>Ha habido algún problema</p>}
                { formSubmitted && success && <p>El formulario se ha enviado correctamente</p>}
            </section>
        </div>
    )
}

export default ContactForm;