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