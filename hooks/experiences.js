import { useQuery } from "react-query";
import { getExperiences, getExperienceById, getExperienceByTitle } from "../api/experience";

const key = "experiences";

export default function useExperiences(page) {
  return useQuery([key, page], () => getExperiences(page));
}

export function useExperienceById(slug) {
  return useQuery([key], () => getExperienceById(slug), {
    enabled: !!slug, //sólo hace la petición cuando slug no sea null o undefined
  });
}

export function useExperienceByTitle(search, page) {
  return useQuery(["experiences_filtered", search], () => getExperienceByTitle(search, page), {
    enabled: !!search && search.length > 0,
    staleTime: Infinity,
  });
}
