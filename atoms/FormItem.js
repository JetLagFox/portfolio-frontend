const FormItem = ({ handleChange, formInputs, name, type, label }) => {
  return (
    <>
      {type === "textarea" ? (
        <textarea
          onChange={handleChange}
          name={name}
          value={formInputs[name]}
          placeholder={label}
        />
      ) : (
        <input
          onChange={handleChange}
          name={name}
          type={type}
          value={formInputs[name]}
          placeholder={label}
        />
      )}
    </>
  );
};

export default FormItem;
