const BASE_URI = process.env.BASE_API_URL;
const BASE_WP_URI = process.env.BASE_WP_API_URL;

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

export function getWPexperiences() {
  const uri = `${BASE_WP_URI}/wp-json/wp/v2/experiences`;

  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(uri, params)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log("response: ", response);
      if (response) {
        return {
          status: 200,
          experiences: response,
        };
      }

      return {
        status: 404,
        message: "Hubo un problema al cargar las experiencias",
      };
    });
}
