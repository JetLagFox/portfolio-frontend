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
          breadcrumbs: response.breadcrumbs,
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

  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(uri, params)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.experience) {
        return {
          status: response.code,
          experience: response.experience,
          breadcrumbs: response.breadcrumbs,
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

export function deleteExperience(id) {
  const uri = `${BASE_URI}/delete-experience/${id}`;

  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(uri, params)
    .then((response) => response.json())
    .then((response) => {
      if (response.code === 404) {
        return {
          status: response.code,
          message: "Algo salió mal",
        };
      }

      return {
        status: response.code,
        message: "Experiencia borrada",
      };
    })
    .catch((err) => {
      return {
        status: err.code,
        message: err.message,
      };
    });
}
