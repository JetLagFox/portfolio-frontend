const BASE_URI = process.env.NEXT_PUBLIC_BASE_API_URL;

export function getUserByEmail(email) {
  const uri = `${BASE_URI}/user-by-email/${email}`;

  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(uri, params)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.user) {
        return {
          status: response.code,
          user: response.user,
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

export function getUserByName(email) {
  const uri = `${BASE_URI}/user-by-name/${email}`;

  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(uri, params)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.user) {
        return {
          status: response.status,
          user: response.user,
        };
      }

      return {
        status: response.status,
        user: response.message,
      };
    })
    .catch((err) => {
      return {
        status: err.code,
        message: err.message,
      };
    });
}
