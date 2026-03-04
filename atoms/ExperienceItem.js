import { useRef } from "react";
import { useInViewport } from "react-in-viewport";
import PropTypes from "prop-types";
import { fromIntToDate } from "@/functions";

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
  dateStart,
  dateEnd,
  isCurrent,
}) => {
  const myRef = useRef();
  const { enterCount } = useInViewport(
    myRef,
    { threshold: 0.15 },
    { disconnectOnLeave: false }
  );

  const isVisible = enterCount >= 1;

  return (
    <li
      ref={myRef}
      key={keyIndex}
      className={`experience-item ${isVisible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${keyIndex * 0.08}s` }}
      data-date-start={dateStart}
      data-date-end={dateEnd}
      data-current={isCurrent ? "true" : "false"}
    >
      <h3>{job}</h3>
      <div>
        <p className="experience-item__description">{description}</p>
        <div className="experience-item__tags">
          {tags.split(";").map((item, index) => {
            return <span key={index}>#{item}</span>;
          })}
        </div>
      </div>
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
