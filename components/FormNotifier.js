import PropTypes from "prop-types";
import classNames from "classnames";

const FormNotifier = ({ errors, send }) => {
  if (!send) {
    return null;
  }

  return (
    <div
      className={classNames({
        "form-notifier": true,
        "notifier--error": errors.length > 0,
      })}
    >
      {errors.length > 0 ? (
        <ul>
          {errors.map((error, index) => {
            return <li key={index}>{error}</li>;
          })}
        </ul>
      ) : (
        <p>El formulario se envió satisfactoriamente</p>
      )}
    </div>
  );
};

export default FormNotifier;

FormNotifier.propTypes = {
  error: PropTypes.array,
};
