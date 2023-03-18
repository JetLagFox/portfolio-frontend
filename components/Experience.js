import { useEffect, useState, useRef } from "react";
import { useInViewport } from "react-in-viewport";

import ExperienceItem from "./../atoms/ExperienceItem";
import TagItem from "../atoms/TagItem";

const checkFilter = (experience, filters) => {
  let experienceFiltered = false;
  filters.map((filter) => {
    if (experience.tags.indexOf(filter) > -1) {
      experienceFiltered = true;
    }
  });
  return experienceFiltered;
};

const Experience = ({ data }) => {
  const myRef = useRef();
  const [filterBy, setFilterBy] = useState([]);
  const [tagsArray, setTagsArray] = useState([]);
  const [experiences, setExperiences] = useState();
  const { inViewport, enterCount, leaveCount } = useInViewport(
    myRef,
    {},
    { disconnectOnLeave: false }
  );

  useEffect(() => {
    const customArray = [];

    data?.experiences?.map((item) => {
      item.tags.split(";").map((tag) => {
        customArray.indexOf(tag) == -1 && customArray.push(tag);
      });
    });

    setTagsArray(customArray);
    setExperiences(data.experiences);
  }, [data]);

  useEffect(() => {
    if (filterBy?.length > 0) {
      setExperiences(
        data.experiences.filter((experience) =>
          checkFilter(experience, filterBy)
        )
      );
    } else {
      setExperiences(data.experiences);
    }
  }, [filterBy]);

  const handleSelection = (item) => {
    filterBy?.indexOf(item) > -1
      ? setFilterBy((oldArray) => oldArray.filter((key) => key !== item))
      : setFilterBy((oldArray) => [...oldArray, item]);
  };

  return (
    <section className="experience">
      <div className="wrapper">
        <h2>Experiencia Laboral</h2>
        <p>
          {tagsArray.map((item, index) => {
            return (
              <TagItem
                key={index}
                tag={item}
                handleSelection={handleSelection}
              />
            );
          })}
        </p>
        <ul
          className={`experience__wrap ${
            enterCount >= 1 && "experience__wrap--fade-in"
          }`}
          ref={myRef}
        >
          {experiences?.map((item, index) => {
            console.log(index);
            return (
              <ExperienceItem
                job={item.job}
                city={item.city}
                country={item.country}
                startDate={item.startDate}
                finishDate={item.finishDate}
                description={item.description}
                company={item.company}
                keyIndex={index}
                tags={item.tags}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Experience;
