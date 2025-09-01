import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom"
import { axiosinstant, EMPLOYEIES_URL } from "../../../../utils/urls";
import type { VirifyData} from '../../../../utils/interfaces'
import { toast } from "react-toastify";
export default function verifyAccount() {
  let {state}=useLocation();
  let{register,formState:{errors,isSubmitting},handleSubmit}=useForm({defaultValues:{
    email:state
  }});
let navigate=useNavigate()
  let onSubmit=async(verifyaccount:VirifyData)=>{
try{
let res= await axiosinstant.put(EMPLOYEIES_URL.VIRIFY,verifyaccount)
console.log(res)
toast.success(res.data.message)
navigate("/login")
}
catch(err){
  toast.error(err.response.data.message||"something went wrong")
console.log(err);

}
  }
  return (
    <>
 <div className="title">
          <small className=" text-light">welcome to pms</small>
          <h4 style={{color:"rgba(239, 155, 40, 1)"}}>Verify Account</h4>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group mt-4 rounded-3">
                         <div className="input-group-prepend">
                           <span className="input-group-text rounded-end-0 border-0 py-2 " id="basic-addon1"><i className="fa-solid fa-envelope fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i></span>
                         </div>
                         <input disabled={true} {...register('email')} type="email" className={`form-control ${errors.email?'is-invalid' : ''} border-0 bg-light shadow-none`} placeholder="email" aria-label="email" aria-describedby="basic-addon1" />
                       </div>

                        <div className="input-group mt-4 rounded-3">
                          
              <div className="input-group-prepend">
                <span className="input-group-text rounded-end-0 border-0 py-2 " id="basic-addon1"><i className="fa-solid fa-qrcode fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i></span>
              </div>
              <input {...register('code',{
                required:"this field is required"
              })} 
              type="text" className={`form-control ${errors.code?'is-invalid' : ''} border-0 bg-light shadow-none`} placeholder="code" aria-label="code" aria-describedby="basic-addon1" />
            </div>
            {errors.code && <span className='text-danger'>{errors.code.message}</span>}

 <div className=" text-center">
      <button  className="btn text-light mt-4 rounded-4 mb-4 "  disabled={isSubmitting}  style={{backgroundColor:"rgba(239, 155, 40, 1)",padding:"7px 180px"}}>{isSubmitting?"isSubmitting............":'Save'}</button>
</div>
        </form>



    </>
  )
}
