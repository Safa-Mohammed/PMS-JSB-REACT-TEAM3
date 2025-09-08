import { useEffect, useState } from "react";
import { axiosinstant, EMPLOYEIES_URL } from "../../../../../../utils/urls"
import type {UserResponse,Employee} from '../../../../../../utils/interfaces'
 import Table from "react-bootstrap/Table";
import load from '../../../../../../assets/images/loadpi.gif'
import NoData from "../../../../../shared/components/noData/noData";
import { useNavigate } from "react-router-dom";
export default function UsersList() {
  let [AllUsers, setAllUsers] = useState<Employee[]>([]);
  let[loading,setLoading]=useState(true)
  let navigate=useNavigate()
  let[filterValue,setFilterValue]=useState<string>("")
  let GetAllUsers= async(pageSize:number,pageNumber:number,userName:string)=>{
    try{
    let res= await axiosinstant.get<UserResponse>(EMPLOYEIES_URL.GETALLUSERS,{
      params:{
        pageSize,
        pageNumber,
        userName
      }
    })
   setAllUsers(res.data.data)
    console.log(res.data);
    
    }
    catch(error){
     console.log(error);
     
    }
    finally{
      setLoading(false)
    }
  }

  let filterUsers=(e:any)=>{
   setFilterValue(e.target.value)
  GetAllUsers(10,1,e.target.value)
  }
  useEffect(()=>{
   GetAllUsers(10,1,filterValue)
  },[])
  return (
    <>
    <div className="container">
 <div className="title d-flex  align-items-center">
  <h2>Users</h2>
 </div>

 <div className="p-4">
  <input type="text" placeholder="Search by name"  className="shadow-lg border-0 p-2 px-5 my-3 w-50 rounded-5" onChange={filterUsers} />
   </div>
 
     <Table className=" text-center" striped bordered hover responsive>
        <thead >
          <tr >
            <th  style={{backgroundColor:"#315951E5",color:"white"}} scope="col">UserName</th>
            <th style={{backgroundColor:"#315951E5",color:"white"}}  scope="col">Statues</th>
            <th style={{backgroundColor:"#315951E5",color:"white"}} scope="col">PhoneNumber</th>
            <th style={{backgroundColor:"#315951E5",color:"white"}} scope="col">DateCreated</th>
            <th style={{backgroundColor:"#315951E5",color:"white"}} scope="col">Email</th>
            <th  style={{backgroundColor:"#315951E5",color:"white"}} scope="col">Action</th>
          </tr>
        </thead>
         <tbody>
         {loading&&<tr>
          <td colSpan={6} className=" text-center">
            <div className=" d-flex justify-content-center align-items-center">
              <img src={load} alt="loading......." />
            </div>
          </td>
          </tr>}

          {!loading&&AllUsers.length===0&&<tr>
          <td colSpan={6} className=" text-center">
            <div className=" d-flex justify-content-center align-items-center">
             <NoData/>
            </div>
          </td>
          </tr>}

           {AllUsers?.map((user)=><tr>
            <td>{user.userName}</td>

           <td>
            {user.isActivated?<span className=" text-white px-3 py-1 bg-success rounded-4"> Active</span>:
            <span className=" text-white px-3 py-1 bg-danger rounded-4"> NotActive</span>
            }</td>

           <td>{user.phoneNumber}</td>
          <td> {new Date(user.creationDate).toLocaleDateString()}</td>
         <td>{user.email}</td>
          
          <td>
            <div className=" dropdown">
            <button 
            type="button"
             className="btn btn-link p-0"
            id={`dropDowmMenue-${user.id}`}
           data-bs-toggle="dropdown"
           aria-expanded="false" >
           <i className="bi bi-three-dots"></i>
            </button>
              <ul
                className="dropdown-menu"
                style={{ padding: " 0px", minWidth: "80px" }}
                 aria-labelledby={`dropDowmMenue-${user.id}`}
                    >
                     <li>
                        <button
                          className="dropdown-item"
                          onClick={() =>
                            navigate(`/dashboard/user-view`)
                          }
                        >
                          <i className="fas fa-eye me-2"></i> View
                        </button>
                      </li>
                       <li>
                        <button className="dropdown-item">
                          <i className="fas fa-trash me-2 text-danger"></i>
                          Delete
                        </button>
                      </li>


                    </ul>
            </div>
          </td>
    



           </tr>)}
         </tbody>
      
        </Table>
        </div>
    </>
  )
}
