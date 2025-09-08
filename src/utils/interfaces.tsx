import type { ReactNode } from "react";

export interface RegisterFormInputs {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  profileImage?: File;
}
export interface VirifyData{
  email:string,
code:string
}
export interface LoginData{
  email:string,
  password:string
}

//protect route
export interface ProtectedRouteProps {
  children?: ReactNode;
}

//authcontext
 export interface User {
  userId: number;         
  roles: string[];         
  userName: string;        
  userEmail: string;       
  userGroup: string;      
  iat: number;             
  exp: number; 
}
export interface AuthContextType {
  userData: User | null;              
  isAuthenticated: boolean;           
  saveUserData: () => void;           
  logout: () => void;  
                 
}

export interface AuthContextProviderProps {
  children: ReactNode;
}

//project page 
export interface Project {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
}

export interface ProjectsResponse {
  projects: Project[];
  totalCount: number;
  data: any;
  totalNumberOfRecords: number;
  message?: string;
}
export interface ProjectForm {
  title: string;
  description: string;
}

export interface ProjectResponse {
  title: string;
  description: string;
    message?: string;
}
 export interface Employee {
  country:string,
  creationDate: string,
  email:string
  id:number,
  imagePath:string|null
  isActivated:boolean
  isVerified:boolean,
  modificationDate:string
 password:string
 phoneNumber:string
userName:string
verificationCode:string

}

 export interface Manager {
  country:string,
  creationDate: string,
  email:string
  id:number,
  imagePath:string|null
  isActivated:boolean
  isVerified:boolean,
  modificationDate:string
 password:string
 phoneNumber:string
userName:string
verificationCode:string

}


 export interface Project {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
  manager:Manager
}
export interface Task {
  id:number;
  title: string;
  description: string;
  status: string;
  creationDate: string;
  modificationDate: string;
  employee: Employee;
  project: Project;
}
export interface TaskResponse {
 data:Task[];
  pageNumber:number;
pageSize:number;
totalNumberOfRecords: number;
totalNumberOfPages:number

}
export interface TaskFormData{
title:string|null,
description:string|null,
employeeId:number|0,
projectId:number|0
}

export interface TaskDetailResponse{
    creationDate: string;
      description: string;
  employee: Employee;
  id:number;
  modificationDate: string;
  project: Project;
  status: string;
  title: string;


}
export interface UserResponse{
  data:Employee[],
   pageNumber:number;
pageSize:number;
totalNumberOfRecords: number;
totalNumberOfPages:number;
message?: string;
}
export interface EmployyRes{
    pageNumber:number;
pageSize:number;
data:any
}
 export interface countRes{
toDo:number,
inProgress:number,
done:number
}

 export interface UsrecountRes{
activatedEmployeeCount:number,
deactivatedEmployeeCount:number
}
