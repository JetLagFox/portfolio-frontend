import { useEffect } from "react";

import { getExperiences } from "@api/experience";
import { getLatestPublishedPosts } from "@api/post";

import Experience from "@components/Experience";
import ContactForm from "@components/ContactForm";
import Articles from "@components/Articles";
import Header from "@compositions/Header";
import Hero from "@compositions/Hero";
import NeuralBackground from "@compositions/NeuralBackground";

const Index = ({ data, posts }) => {
  useEffect(() => {
    if (data?.experiences) {
      data.experiences.sort(function (a, b) {
        const dateA = a.startdate;
        const dateB = b.startdate;

        if (!dateA || !dateB) return 0;

        const dateObjectA = new Date(dateA);
        const dateObjectB = new Date(dateB);

        return dateObjectB - dateObjectA;
      });
    }
  }, []);

  return (
    <>
      <NeuralBackground />
      <Header />
      <Hero />
      {data && <Experience data={data} />}
      <Articles posts={posts} />
      <ContactForm />
    </>
  );
};

export default Index;

Index.getInitialProps = async () => {
  const [experiences, postsResponse] = await Promise.all([
    getExperiences(),
    getLatestPublishedPosts(),
  ]);
  return { data: experiences, posts: postsResponse.posts || [] };
};
