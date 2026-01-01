const BASE_URI = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getExperiences() {
  const uri = `${BASE_URI}/experiences/`;

  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(uri, params);
  return await response.json();
}

export async function getExperiencesPaginated(page) {
  const uri = `${BASE_URI}/experiences/${page}`;

  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(uri, params);
  return await response.json();
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

export async function getExperienceById(id) {
  const uri = `${BASE_URI}/experience/${id}`;

  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(uri, params);
  return await response.json();
}

export async function getExperienceByTitle(search, page) {
  const uri = `${BASE_URI}/search-experiences/${search}/${page}`;

  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(uri, params);
  return await response.json();
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

export async function updateExperience(id, data) {
  const uri = `${BASE_URI}/update-experience/${id}`;

  const params = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const response = await fetch(uri, params);
  return await response.json();
}
