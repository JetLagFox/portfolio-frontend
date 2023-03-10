const BASE_URI = process.env.BASE_API_URL;

export function getExperiences() {
  const uri = `${BASE_URI}/experiences`;

  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(uri, params)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.experiences) {
        return {
          status: response.code,
          experiences: response.experiences,
        };
      }

      return {
        status: response.code,
        message: response.message,
      };
    })
    .catch((err) => {
      return {
        status: err.code,
        message: err.message,
      };
    });
}
