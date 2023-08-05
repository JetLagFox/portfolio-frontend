const BASE_URI = process.env.NEXT_PUBLIC_BASE_API_URL;

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

export function addExperience(data) {
  const uri = `${BASE_URI}/add-experience`;

  console.log(uri);

  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(uri, params)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.experience) {
        return {
          status: 200,
          message: "Datos guardados correctamente",
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

export function getExperienceById(id) {
  const uri = `${BASE_URI}/experiences/${id}`;

  console.log("URIIIII", uri);

  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(uri, params)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log("REPONSSSE: ", response);
      if (response.experience) {
        return {
          status: response.code,
          experience: response.experience,
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
        error: err.message,
      };
    });
}
