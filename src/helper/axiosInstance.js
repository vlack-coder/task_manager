import axios from "axios";

let headers = {};
const taskUrl = "https://stage.api.sloovi.com";

const axiosInstance = axios.create({
  baseURL: taskUrl,
  headers,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTg0OTMwOTUsIm5iZiI6MTY1ODQ5MzA5NSwianRpIjoiZGJhYjY5ZTItNGM2Mi00Y2FlLWEzNDktZWE1OWEwNjJjYmFiIiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1bmRhciBQaWNoYWkiLCJlbWFpbCI6InNtaXRod2lsbHMxOTg5QGdtYWlsLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzRlZTRjZjY3YWQ0NzRhMjc5ODhiYzBhZmI4NGNmNDcyIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9jZjk0Yjc0YmQ0MWI0NjZiYjE4NWJkNGQ2NzRmMDMyYj9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.dC0Q4Foka6nGvsgAbxW97dCzw6gZbP999JTPRt6iASY";

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return new Promise((resolve, reject) => {
      resolve(response);
    });
  },
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    return new Promise((resolve, reject) => {
      const response = error?.response;
      console.log(`axiusresponse`, response);

      switch (error.response?.status) {
        case 409:
          reject({ message: response?.data.message, status: response?.status });
          break;
        case 401:
          reject({ message: response?.data.message, status: response?.status });
          break;

        case 0:
          reject({ message: response?.data.message, status: response?.status });
          break;
        case 400:
          reject(response?.data.message);
          break;
        case 404:
          reject("Not found");
          break;
        case 406:
          reject({
            message: response?.data.message,
            status: response?.status,
          });
          break;
        case 500:
          reject({ message: response?.data.message, status: response?.status });
          break;
        default:
          console.log(`axiusresponse`, response);
          reject(response);
      }
    });
  }
);

export default axiosInstance;
