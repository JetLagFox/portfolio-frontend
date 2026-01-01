import PropTypes from "prop-types";
import classNames from "classnames";

const FormNotifier = ({ errors }) => {
  if (errors?.length === 0) return;

  return (
    <div
      className={classNames({
        "form-notifier": true,
        "notifier--error": errors.length > 0,
      })}
    >
      {errors.length > 0 && (
        <ul>
          {errors.map((error, index) => {
            return <li key={index}>{error.message}</li>;
          })}
        </ul>
      )}
    </div>
  );
};

export default FormNotifier;

FormNotifier.propTypes = {
  error: PropTypes.array,
};
