import axios from "axios";

export const BASEURL = `https://upskilling-egypt.com:3003/api/v1/`;

// axios instance
export const axiosinstant = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add token dynamically
axiosinstant.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Ensure headers object exists
    if (!config.headers) {
      config.headers = {};
    }

    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// EMPLOYEES URLS
export const EMPLOYEIES_URL = {
  REGISTER: `Users/Register`,
  VIRIFY: `Users/verify`,
  LOGIN: `Users/Login`,
  CHANGEPASSWORD: `Users/ChangePassword`,
  GETALLUSERS: `Users/`,
  BLOCKORUNBLOCKUSERS: `Users/`,
  USERS_COUNT: `Users/count`,
};

// PROJECTS URLS
export const PROJECTS_URL = {
  GETALLPROJECT_MANAGER: `/Project/manager`,
  GETALLPROJECT_EMPLOYEE: `/Project/employee`,
  CREATEPROJECT: `/Project`,
  DELETEPROJECT: `/Project/{id}`,
  UPDATEPROJECT: `/Project/{id}`,
  VIEWPROJECT: `/Project/{id}`,
};

// TASKS URLS
export const TASKS_URL = {
  GET_ALLTASKS_MANEGER: `Task/manager`,
  CREATE_TASK: `Task`,
  GETALLPROJECTS: `Project/manager`,
  UBDATE_TASK: (id: number) => `Task/${id}`,
  GETTASKBYID: (id: number) => `Task/${id}`,
  DELETE_TASK: (id: number) => `Task/${id}`,
  GETTASKSCOUNT: `Task/count`,
};
