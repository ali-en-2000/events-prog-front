import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
    // const defaultUrl = "http://192.168.1.106:6060/api/";
    const defaultUrl = "http://eventbackend-001-site1.anytempurl.com/api";



  let savedBaseUrl;
  if (typeof window !== "undefined") {
    savedBaseUrl = localStorage.getItem("baseURL");
  }

  let api = axios.create({
    baseURL: savedBaseUrl || defaultUrl,
  });

  api.interceptors.request.use(
    (config) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = "Bearer " + token;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          setTimeout(() => {
            window.location.href = '/login';
          }, 2500);          
        }
      }
      return Promise.reject(error);
    }
  );

  return {
    provide: {
      axios: api,
    },
  };
});
