import axios from "axios"

 export const BASEURL=`https://upskilling-egypt.com:3003/api/v1/`

export let axiosinstant= axios.create({  
baseURL:BASEURL,

})

//EMPLOYES URLS
export const EMPLOYEIES_URL={
    REGISTER:`Users/Register`,
    VIRIFY:`Users/verify`,
    LOGIN:`Users/Login`,
    CHANGEPASSWORD:`Users/ChangePassword`
}

 