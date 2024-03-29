import axios from "axios";

const BACKEND_URL = `https://6.react.pages.academy/wtw`;
const REQUEST_TIMEOUT = 5000;

const HttpCode = {
  UNAUTHORIZED: 401,
  SERVER_ERROR: 500
};

export const createAPI = (onUnauthorized, onServerError) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {response} = err;

    if (!response) {
      throw err;
    }

    if (response.status === HttpCode.UNAUTHORIZED) {
      onUnauthorized();

      // Бросаем ошибку, потому что нам важно прервать цепочку промисов после запроса авторизации.
      // Запрос авторизации — это особый случай и важно дать понять приложению, что запрос был неудачным.
      throw err;
    }

    if (response.status === HttpCode.SERVER_ERROR) {
      onServerError();

      // Бросаем ошибку, потому что нам важно прервать цепочку промисов после запроса авторизации.
      // Запрос авторизации — это особый случай и важно дать понять приложению, что запрос был неудачным.
      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
