const FormItem = ({ handlChange, formInputs, name, type, label }) => {
  return (
    <div className="contact-form__input-wrapper">
      {type === "textarea" ? (
        <textarea onChange={handlChange} name={name} value={formInputs[name]} />
      ) : (
        <input
          onChange={handlChange}
          name={name}
          type={type}
          value={formInputs[name]}
        />
      )}
      <span
        onClick={() => setClickedLabel(true)}
        className={formInputs[name]?.length > 0 ? "input--value" : undefined}
      >
        {label}
      </span>
    </div>
  );
};

export default FormItem;
