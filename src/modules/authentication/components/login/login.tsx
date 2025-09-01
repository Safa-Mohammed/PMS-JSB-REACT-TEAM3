import { axiosinstant, EMPLOYEIES_URL } from "../../../../utils/urls"
import type { LoginData } from "../../../../utils/interfaces"
import { useForm } from "react-hook-form"
import { EMAIL_VALIDATION } from "../../../../utils/validation"
import { useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export default function login() {

  let{register,formState:{errors,isSubmitting},handleSubmit}=useForm()
  let[tokken,setTokken]=useState(null)

let[show,setShow]=useState(true)
let navigate=useNavigate()
let toggleShow=()=>{
  setShow(!show)
}
let onSubmit= async(Login:LoginData)=>{
try{
let res=await  axiosinstant.post(EMPLOYEIES_URL.LOGIN,Login)
navigate('/dashboard')
setTokken(res.data.token);
localStorage.setItem("token",res.data.token)
console.log(res)
}
catch(error){
  toast.error(err?.response?.data?.message || "Something went wrong")
  console.log(error)
}
}

  return (
    <>
 <div className="title">
          <small className=" text-light">welcome to pms</small>
          <h4 style={{color:"rgba(239, 155, 40, 1)"}}>Login</h4>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} >
       <div className="input-group mt-4 rounded-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text rounded-end-0 border-0 py-2 " id="basic-addon1"><i className="fa-solid fa-envelope fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i></span>
                    </div>
                    <input {...register('email',EMAIL_VALIDATION)} type="email" className={`form-control ${errors.email?'is-invalid' : ''} border-0 bg-light shadow-none`} placeholder="email" aria-label="email" aria-describedby="basic-addon1" />
                  </div>
                  {errors.email && <span className='text-danger'>{errors.email.message}</span>}

                   <div className="input-group mt-4 rounded-3">
              <div className="input-group-prepend">
                <span className="input-group-text rounded-end-0 border-0 py-2 " id="basic-addon1"><i className="fa-solid fa-lock fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i></span>
              </div>
              <input {...register('password',{
                required:"this field is required"
              })} type={show?"password":'text'} className={`form-control border-0 bg-light shadow-sm`} placeholder="password" aria-label="password" aria-describedby="basic-addon1" />
              <button  type="button"className="btn btn-light" onClick={toggleShow}>{show?<i className="fa-solid fa-eye"></i>:<i className="fa-solid fa-eye-slash"></i>}</button>
            </div>
 {errors.password && <span className='text-danger'>{errors.password.message}</span>}
  <div className=" text-center">
      <button  className="btn text-light mt-4 rounded-4 mb-4" disabled={isSubmitting}  style={{backgroundColor:"rgba(239, 155, 40, 1)",padding:"7px 180px"}}>{isSubmitting?"isSubmitting............":'Login'}</button>
</div>

 </form>

    </>
  )
}
