import Link from "next/link";

// Circle circumference: 2 * π * 40 ≈ 251.3
// Checkmark path length ≈ 62 (from (28,50)→(42,64)→(72,34))

const FormSuccess = ({ message, backHref, backLabel, previewHref, previewLabel }) => {
  return (
    <div className="form-success">
      <div className="form-success__icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="var(--color-las-palmas)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="251.3"
            strokeDashoffset="251.3"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="251.3;0"
              dur="0.6s"
              begin="0.1s"
              fill="freeze"
              calcMode="spline"
              keySplines="0.4 0 0.2 1"
              keyTimes="0;1"
            />
          </circle>
          <polyline
            points="28,50 42,64 72,34"
            fill="none"
            stroke="var(--color-las-palmas)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="70"
            strokeDashoffset="70"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="70;0"
              dur="0.35s"
              begin="0.7s"
              fill="freeze"
              calcMode="spline"
              keySplines="0.4 0 0.2 1"
              keyTimes="0;1"
            />
          </polyline>
        </svg>
      </div>

      <p className="form-success__message">{message}</p>

      <div className="form-success__actions">
        <Link href={backHref}>
          <a className="form-success__btn">{backLabel}</a>
        </Link>
        {previewHref && (
          <Link href={previewHref}>
            <a className="form-success__btn form-success__btn--preview" target="_blank" rel="noreferrer">
              {previewLabel || "Ver artículo"}
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default FormSuccess;
