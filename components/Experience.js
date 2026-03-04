import { useEffect, useState, useRef } from "react";
import { useInViewport } from "react-in-viewport";
import Script from "next/script";

import ExperienceItem from "@atoms/ExperienceItem";
import TagItem from "@atoms/TagItem";

const checkFilter = (experience, filters) => {
  let experienceFiltered = false;
  filters.map((filter) => {
    if (experience.tags.indexOf(filter) > -1) {
      experienceFiltered = true;
    }
  });
  return experienceFiltered;
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  return `${date.getDate()} de ${months[date.getMonth()]}, ${date.getFullYear()}`;
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
      item?.tags?.split(";").map((tag) => {
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
    
    setTimeout(() => {
      if (window.initTimeline) {
        window.initTimeline();
      }
    }, 100);
  }, [filterBy]);

  const handleSelection = (item) => {
    filterBy?.indexOf(item) > -1
      ? setFilterBy((oldArray) => oldArray.filter((key) => key !== item))
      : setFilterBy((oldArray) => [...oldArray, item]);
  };

  return (
    <section className="experience" id="experiencia">
      <Script src="/experience-timeline.js" strategy="afterInteractive" />
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
          id="experienceWrap"
          className={`experience__wrap ${
            enterCount >= 1 && "experience__wrap--fade-in"
          }`}
          ref={myRef}
        >
          <div id="experienceRail" className="experience-rail">
            <div id="railFill" className="rail-fill"></div>
          </div>
          {experiences?.map((item, index) => {
            const isCurrent = !item.finishdate;
            return (
              <ExperienceItem
                job={item.job}
                city={item.city}
                country={item.country}
                startDate={item.startdate}
                finishDate={item.finishdate}
                description={item.description}
                company={item.company}
                keyIndex={index}
                tags={item.tags}
                dateStart={formatDate(item.startdate)}
                dateEnd={isCurrent ? "Actualmente" : formatDate(item.finishdate)}
                isCurrent={isCurrent}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Experience;
