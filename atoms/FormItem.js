const FormItem = ({ handlChange, formInputs, name, type, label }) => {
  return (
    <>
      {type === "textarea" ? (
        <textarea
          onChange={handlChange}
          name={name}
          value={formInputs[name]}
          placeholder={label}
        />
      ) : (
        <input
          onChange={handlChange}
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
