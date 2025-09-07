import { useForm } from "react-hook-form"
import type { TaskFormData,Project,Employee,Task} from '../../../../../../utils/interfaces'
import type { TaskResponse,TaskDetailResponse,ProjectsResponse,UserResponse} from '../../../../../../utils/interfaces'
import loading from '../../../../../../assets/images/loadpi.gif'

import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { axiosinstant, EMPLOYEIES_URL, PROJECTS_URL, TASKS_URL } from "../../../../../../utils/urls"
export default function TaskData() {
let {register,formState:{errors,isSubmitting},handleSubmit,reset}=useForm<TaskFormData>()
  let [AllProject,setAllProject]=useState<Project[]>([])
    let [AllUser,setAllUser]=useState<Employee[]>([])
    let [AllTasks,setAllTasks]=useState <Task[]>([])
    let [AllTasksDetails,setAllTasksDetais]=useState<TaskDetailResponse>()
  let [isLoading, setIsLoading] = useState(true);
    let navigate=useNavigate()
  const params=useParams()
  let location=useLocation()
  let view=location?.state?.view;
  let text="";
  if(params.id){
    if(view){
      text="View"
    }
    else{
      text="Edit"
    }
  }
else{
  text="fill"
}

//getAlltasks
  let GetAllTasks= async()=>{
    try{
   let res= await axiosinstant.get<TaskResponse>(TASKS_URL.GET_ALLTASKS_MANEGER)
   setAllTasks(res.data.data)
   console.log(res.data.data);
    }
      catch(error:any){
    console.log(error);
      toast.error(error.response.data.message || "Something went wrong!")
  }
  }

  //onsubmit
  let onSubmit= async(data:TaskFormData)=>{
if(params.id){
  const updateTask={
    title:data.title,
description:data.description,
employeeId:Number(data.employeeId),
  }
try{
    let res= await axiosinstant.put(TASKS_URL.UBDATE_TASK(Number(params.id)),updateTask)
    console.log(res);
    toast.success("Project updated successfully!")
    navigate(`/dashboard/tasks-list`)
    GetAllTasks()
    
  }
  catch(error:any){
    console.log(error);
      toast.error(error.response.data.message || "Something went wrong!")
  }
}
else{
    const createTask={
    title:data.title,
description:data.description,
employeeId:Number(data.employeeId),
projectId:Number(data.projectId),
  }
  try{
    let res= await axiosinstant.post(TASKS_URL.CREATE_TASK,createTask)
    console.log(res);
        toast.success("Project created successfully!")
    navigate(`/dashboard/tasks-list`)
    GetAllTasks()
    
  }
  catch(error:any){
    console.log(error);
      toast.error(error.response.data.message || "Something went wrong!")
  }}
}

//get all tasks details
let getDatabyid=async()=>{
  try{
    let res= await axiosinstant.get<TaskDetailResponse>(TASKS_URL.GETTASKBYID(Number(params.id)))
    console.log(res.data);
    setAllTasksDetais(res.data)
    reset({
      title:res?.data?.title,
      description:res?.data?.description,
      employeeId:Number(res?.data?.employee.id),
      projectId:Number(res?.data?.project.id)
    })
  }
  catch(error:any){
    console.log(error);
      toast.error(error.response.data.message || "Something went wrong!")
  }
  finally{
    setIsLoading(false)
  }
}
//GET ALL PROJECT
let GETALLPROJECTS= async()=>{
try{
let res= await axiosinstant.get<ProjectsResponse>(PROJECTS_URL.GETALLPROJECT)
setAllProject(res?.data?.data)
console.log(res.data);
}
  catch(error:any){
    console.log(error);
      toast.error(error.response.data.message || "Something went wrong!")
  }
}
//get allusers
let GETALLUSERS= async()=>{
try{
let res= await axiosinstant.get<UserResponse>(EMPLOYEIES_URL.GETALLUSERS)
setAllUser(res.data.data)
console.log(res.data);

}
  catch(error:any){
    console.log(error);
      toast.error(error.response.data.message || "Something went wrong!")
  }
}

//CANCLE TASK
let canceltask=()=>{
    reset()
    navigate(`/dashboard/tasks-list`)
   }


useEffect(()=>{
GETALLPROJECTS()
GETALLUSERS()
GetAllTasks()
if (params.id)
    getDatabyid();
},[])

  return (
    <>

      <div className="w-100">
        {/* Title */}
        <div className="p-4 text-left rounded-top bg-white shadow-sm w-100">
         <h3 className=" text-primary">{text}<span className=" ms-2 text-black">the task</span></h3>
          <a onClick={() => navigate("/dashboard/tasks-list")}
          style={{cursor:"pointer"}}
          >
          <i className="bi bi-arrow-left-circle-fill mx-2  fs-5 text-primary"></i> View All Tasks
          </a>
          </div>
        </div>
         <div className=" mt-4">
   {isLoading&&params.id&&<div className=" d-flex justify-content-center mt-5 align-items-center">
  <img src={loading}/>
  </div>}
<div className=" d-flex justify-content-center align-items-center">

<form onSubmit={handleSubmit(onSubmit)} 
className="p-4 rounded-3 shadow-sm border-4 border-dark w-75 m-auto mt-5 bg-white"
>
  <div className="mb-3">
  <label className="form-label text-black mb-1 ms-1">Title</label>
  <input type="text" className="form-control  rounded-4  p-2" style={{border:"1px solid rgba(128, 128, 128, 0.493) " }}  placeholder="title"
  {...register("title",{
    required:"this field is required"
  }
  )}
  disabled={view}
  />
   {errors.title && <span className='text-danger'>{errors.title.message}</span>}
</div>
  <div className="mb-3">
  <label className="form-label text-black mb-1 ms-1">Description</label>
  <textarea  className="form-control  rounded-4 p-2"  style={{border:"1px solid rgba(128, 128, 128, 0.493)" }}  placeholder="name"
  {...register("description",{
    required:"this field is required"
  }
  )}
  disabled={view}
  />
   {errors.description&& <span className='text-danger'>{errors.description.message}</span>}
</div>

<div className=" d-flex  g-2 justify-content-between">
  <div className="project col-md-5 " style={{ display: params.id ? 'none' : 'block' }}>
<label className="form-label text-black mb-1 ms-1">Projects</label>
<select className=" form-control p-3  rounded-4 " style={{border:"1px solid rgba(128, 128, 128, 0.493) " }} 
{...register("projectId",{
  required:"this field is required"
}
  
)}
disabled={view}
>
  <option value="">-- choose a project --</option>

  {AllProject?.map((project)=><option value={project.id} key={project.id}>{project.title}</option>)}
</select>
   {errors.projectId&& <span className='text-danger'>{errors.projectId.message}</span>}

</div>

  <div className="users col-md-5  ">
<label className="form-label text-black mb-1 ms-1">Users</label>
<select className=" form-control  rounded-4 p-3" style={{border:"1px solid rgba(128, 128, 128, 0.493) " }} 
{...register("employeeId",{
  required:"this field is required"
}
  
)}
disabled={view}
>
  <option value="">-- choose a user --</option>

  {AllUser?.map((user)=><option value={user.id} key={user.id}>{user.userName}</option>)}
</select>
   {errors.employeeId&& <span className='text-danger'>{errors.employeeId.message}</span>}

</div>

</div>
<div className="d-flex  justify-content-between mt-4">
            <button hidden={view} onClick={canceltask}  type="button"
                         style={{backgroundColor:"#ffffff",color:"black",padding:"10px 20px",border:"1px solid rgba(128, 128, 128, 0.493)",borderRadius:"20px",fontSize:"20px"}}
            >Cancel</button>
            <button  hidden={view} disabled={isSubmitting} className=' ' type="submit"
             style={{backgroundColor:"#EF9B28",color:"white",padding:"10px 20px",border:"none",borderRadius:"20px",fontSize:"20px"}}

            >{isSubmitting?"isSubmitting.........":`${text} Data`} </button>
          </div>

</form>
</div>
</div>


      


    </>
  )
}
