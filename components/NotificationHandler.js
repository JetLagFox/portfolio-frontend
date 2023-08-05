import PropTypes from "prop-types";

import HashLoader from "react-spinners/HashLoader";

const NotificationWrapper = ({ validating, errors }) => {
  if (validating) {
    return null;
  }

  return (
    <div
      className={`notification-wrapper notification--${
        errors?.length > 0 ? "error" : "success"
      }`}
    >
      {validating && (
        <>
          <HashLoader
            color="#ffffff"
            loading="true"
            size={30}
            aria-label="Loading Spinner"
            data-testid="HashLoader"
          />
          <p>Validando formulario...</p>
        </>
      )}
      {!validating &&
        errors?.length > 0 &&
        errors.map((error, index) => {
          return <p key={index}>{error}</p>;
        })}

      {errors?.length === 0 && <p>Formulario enviado satisfactoriamente</p>}
    </div>
  );
};

export default NotificationWrapper;

NotificationWrapper.propTypes = {
  validating: PropTypes.bool,
  errors: PropTypes.array,
};
