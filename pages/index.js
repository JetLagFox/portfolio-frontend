import { useEffect } from "react";

import { getExperiences } from "../api/experience";

import Experience from "../components/Experience";
import ContactForm from "../components/ContactForm";
import Header from "../compositions/Header";
import Hero from "../compositions/Hero";

const Index = ({ data }) => {
  useEffect(() => {
    data.experiences.sort(function (a, b) {
      const dateA = a.startDate;
      var datePartsA = dateA.split("/");
      var dateObjectA = new Date(`
        ${datePartsA[1]}/
        ${datePartsA[0] - 1}/
        ${datePartsA[2]}`);

      const dateB = b.startDate;
      var datePartsB = dateB.split("/");
      var dateObjectB = new Date(`
				${datePartsB[1]}/
				${datePartsB[0] - 1}/
				${datePartsB[2]}`);

      console.log(dateObjectA);

      return dateObjectB.getDate() - dateObjectA.getDate();
    });
  }, []);

  return (
    <>
      <Header />
      <Hero />
      {data && <Experience data={data} />}
      <ContactForm />
    </>
  );
};

export default Index;

Index.getInitialProps = async () => {
  const experiences = await getExperiences();
  return { data: experiences };
};
