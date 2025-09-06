import axios from "axios";

export const BASEURL = `https://upskilling-egypt.com:3003/api/v1/`;

 export const HEADERS = {
  Authorization: localStorage.getItem("token"),
  "Content-Type": "application/json",  
};

//  axiosinstant  
export let axiosinstant = axios.create({
  baseURL: BASEURL,
  headers: HEADERS,
});

// EMPLOYEES URLS
export const EMPLOYEIES_URL = {
  REGISTER: `Users/Register`,
  VIRIFY: `Users/verify`,
  LOGIN: `Users/Login`,
  CHANGEPASSWORD: `Users/ChangePassword`,
};

// PROJECTS URLS
export const PROJECTS_URL = {
  GETALLPROJECT: `/Project`,
  CREATEPROJECT: `/Project`,
  DELETEPROJECT: `/Project/{id}`,
};
