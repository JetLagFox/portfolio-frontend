import { useQuery } from "react-query";
import { getExperiences, getExperienceById, getExperienceByTitle, getExperiencesPaginated } from "@api/experience";

const key = "experiences";

export default function useExperiences() {
  return useQuery([key], () => getExperiences());
}

export function useExperienceById(slug) {
  return useQuery([key, slug], () => getExperienceById(slug), {
    enabled: !!slug, //sólo hace la petición cuando slug no sea null o undefined
  });
}

export function useExperienceByTitle(search, page) {
  return useQuery([key, search], () => getExperienceByTitle(search, page), {
    enabled: !!search && search.length > 0,
    staleTime: Infinity,
  });
}
