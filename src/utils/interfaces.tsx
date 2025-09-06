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
}
export interface ProjectForm {
  title: string;
  description: string;
}

export interface ProjectResponse {
  title: string;
  description: string;
}
