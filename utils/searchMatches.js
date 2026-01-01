export default function searchMatches(postType, item, search) {
  if (postType === "experiences") {
    return item.job.toLowerCase().includes(search?.toLowerCase());
  } else if (postType === "posts") {
    return item.title.toLowerCase().includes(search?.toLowerCase());
  } else if (postType === "users") {
    return item.name.toLowerCase().includes(search?.toLowerCase());
  }

  return false;
}
