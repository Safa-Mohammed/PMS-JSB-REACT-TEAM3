// import { jwtDecode } from "jwt-decode";
// import { createContext, type ReactNode } from "react";
 

// //1-create varable returm context ,null becuse is not rutrn any data
// export const AuthContext =createContext(null)

// interface authContextProviderprobs{
//     children:ReactNode
// }

// //create fn and must create interface ,that any thing in code acpt it ,inside fn write what want to do and provide in app 
// export default function authContextProvider({children}:authContextProviderprobs){
// function getlogedUserData(){
//  let encodeToken=localStorage.getItem("token");
//   let deCodeData=jwtDecode(encodeToken);
//   setLoginData(deCodeData); //update depen of user
//       console.log(deCodeData)
// }
// }