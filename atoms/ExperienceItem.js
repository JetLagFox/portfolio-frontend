import { useRef } from "react";
import { useInViewport } from "react-in-viewport";
import PropTypes from "prop-types";
import { fromIntToDate } from "../functions";

const ExperienceItem = ({
  job,
  city,
  country,
  startDate,
  finishDate,
  description,
  company,
  keyIndex,
  tags,
}) => {
  const myRef = useRef();
  const { inViewport, enterCount, leaveCount } = useInViewport(
    myRef,
    {},
    { disconnectOnLeave: false }
  );

  return (
    <li
      ref={myRef}
      key={keyIndex}
      className={`experience-item ${
        enterCount >= 1 ? "experience-item--inviewport" : ""
      }`}
    >
      <h3>{job}</h3>
      <div>
        <p className="experience-item__description">{description}</p>
        <div className="experience-item__tags">
          {tags.map((item, index) => {
            return <span key={index}>#{item}</span>;
          })}
        </div>
      </div>
      <p className="experience-item__date date--desktop">
        <span className={`${!finishDate && "date--actual-job"}`}>
          {finishDate
            ? finishDate?.substr(0, 2) +
              " de " +
              fromIntToDate(finishDate?.substr(3, 2)) +
              ", " +
              finishDate?.substr(6, 4)
            : "Actualmente"}
        </span>
        <span>
          {startDate?.substr(0, 2) +
            " de " +
            fromIntToDate(startDate?.substr(3, 2)) +
            ", " +
            startDate?.substr(6, 4)}
        </span>
      </p>
    </li>
  );
};

export default ExperienceItem;

ExperienceItem.propTypes = {
  job: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  startDate: PropTypes.string,
  finishDate: PropTypes.string,
  description: PropTypes.string,
  company: PropTypes.string,
  key: PropTypes.number,
  tags: PropTypes.array,
};
