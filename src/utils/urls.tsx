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
    GETALLUSERS:`Users/`,
    USERS_COUNT:`Users/count`

};

// PROJECTS URLS
export const PROJECTS_URL = {
  GETALLPROJECTEEE:'Project/manager',
  GETALLPROJECT: `/Project`,
  CREATEPROJECT: `/Project`,
  DELETEPROJECT: `/Project/{id}`,
  UPDATEPROJECT: `/Project/{id}`,
  VIEWPROJECT: `/Project/{id}`,
};
//TASKS URL
export const TASKS_URL={
    GET_ALLTASKS_MANEGER:`Task/manager`,
    CREATE_TASK:`Task`,
    GETALLPROJECTS:`Project/manager`,
   UBDATE_TASK:(id:number)=>`Task/${id}`,
   GETTASKBYID:(id:number)=>`Task/${id}`,
  DELETE_TASK:(id:number)=>`Task/${id}`,
  GETTASKSCOUNT:`Task/count`

}
