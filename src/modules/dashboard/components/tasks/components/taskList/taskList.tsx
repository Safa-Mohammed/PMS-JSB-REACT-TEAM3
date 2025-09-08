import { useEffect, useState } from "react";
import { axiosinstant, TASKS_URL } from "../../../../../../utils/urls";
import type {Task, TaskResponse}from '../../../../../../utils/interfaces'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import load from '../../../../../../assets/images/loadpi.gif'
import NoData from "../../../../../shared/components/noData/noData";
import Table from "react-bootstrap/Table";
import '../../../../../../App.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import imgGril from "../../../../../../assets/images/Gril.png";

export default function TaskList() {
  let [loading, setLoading] = useState(false);
  let [TotalNumOfBages, setTotalNumOfBages] = useState<number[]>([]);
  let[currentBage,setCurrentBage]=useState<number>(1)
  let [AllTasks, setAllTasks] = useState<Task[]>([]);
  let [filterValue, setFiterValue] = useState<string>("");
  let[DeleteId,setID]=useState(0)
  let navigate = useNavigate();

//modal
 const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id:number) => {
    setID(id)
    setShow(true);
  }

//GETALLTASKS
   let GetAllTasks = async (
    pageSize: number,
    pageNumber: number,
    title: string
  ) => {
    try {
      setLoading(true);
      let res = await axiosinstant.get<TaskResponse>(TASKS_URL.GET_ALLTASKS_MANEGER, {
        params: {
          title,
          pageSize,
          pageNumber,
        },
      });
      let x = res?.data?.totalNumberOfPages;
      setTotalNumOfBages(Array.from({ length: x }, (_, i) => i + 1));
      setCurrentBage(pageNumber)
      setAllTasks(res?.data?.data);
      console.log(res.data);
      
    } catch (error:any) {
      toast.error( error.response?.data?.message || "Failed to Fetching project. Please try again.")
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  //deleateTask

  let deleateTask= async()=>{
    try{
    let res=await  axiosinstant.delete(TASKS_URL.DELETE_TASK(DeleteId))
    GetAllTasks(8,currentBage,filterValue)
    toast("Task item deleted Successfully")
     handleClose()
      console.log(res);
      
    }
    catch(error:any){
      console.log(error);
   toast.error( error?.response?.data?.message || "Failed to Fetching project. Please try again.")

      
    }
  }
//  filter task
    let filterTasks = (e:any) => {
    let valueName = e.target.value;
    setFiterValue(valueName);
    GetAllTasks(8, 1, e.target.value);
  };


    useEffect(() => {
    GetAllTasks(8, 1, filterValue);
  }, []);

  return (
    <>
<div className="title mt-4 d-flex justify-content-between align-items-center px-2">
        <h2>Tasks</h2>
        <button
          className="btn rounded-5 text-light py-2 px-2 me-2"
          onClick={() => navigate(`/dashboard/newTask`)}
          style={{ backgroundColor: "rgba(239, 155, 40, 1)" }}
        >
          <span className="mx-2">
            <i className="fa-solid fa-plus"></i>
          </span>
          Add new task
        </button>
      </div>

      <div className="p-4 w-100 vh-100">
            <input type="text" placeholder="Search by title"  className="shadow-lg border-0 p-2 px-5 my-3 w-50 rounded-5" onChange={filterTasks}/>
            
            <Table className=" text-center" striped bordered hover responsive>
        <thead >
          <tr >
            <th style={{backgroundColor:"#315951E5",color:"white"}}>#</th>
            <th  style={{backgroundColor:"#315951E5",color:"white"}} scope="col">Title</th>
            <th style={{backgroundColor:"#315951E5",color:"white"}}  scope="col">Statues</th>
            <th style={{backgroundColor:"#315951E5",color:"white"}} scope="col">User</th>
            <th style={{backgroundColor:"#315951E5",color:"white"}} scope="col">Project</th>
            <th style={{backgroundColor:"#315951E5",color:"white"}} scope="col">DateCreated</th>
            <th  style={{backgroundColor:"#315951E5",color:"white"}} scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td className="text-center" colSpan={7}>
                <div className="d-flex justify-content-center align-items-center">
                  <img src={load} alt="loading......." />
                </div>
              </td>
            </tr>
          )}

          {!loading && AllTasks.length === 0 && (
            <tr>
              <td className="text-center" colSpan={7}>
                <div className="d-flex justify-content-center align-items-center">
                 <NoData/>
                </div>
              </td>
            </tr>
          )}

          {!loading &&
            AllTasks?.map((taskdetails) => (
              <tr key={taskdetails.id} className="p-2">
                <td>{taskdetails.id}</td>
                <td>{taskdetails.title}</td>
                <td>{taskdetails.status}</td>
                <td>{taskdetails.employee.userName}</td>
                <td>{taskdetails.project.title}</td>
                <td>
                  {new Date(taskdetails.creationDate).toLocaleDateString()}
                </td>
                <td>
                  <div className="dropdown">
                    <button
                      type="button"
                      className="btn btn-link p-0"
                      id={`dropDowmMenue-${taskdetails.id}`}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="bi bi-three-dots"></i>
                    </button>
                    <ul
                      className="dropdown-menu"
                      style={{ padding: "0px", minWidth: "100px" }}
                      aria-labelledby={`dropDowmMenue-${taskdetails.id}`}
                    >
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() =>
                            navigate(`/dashboard/ViewTask/${taskdetails.id}`, {
                              state: { view: true },
                            })
                          }
                        >
                          <i className="fas fa-eye me-2"></i> View
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() =>
                            navigate(`/dashboard/EditTask/${taskdetails.id}`)
                          }
                        >
                          <i className="fas fa-edit me-2 text-warning"></i> Edit
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={()=>handleShow(taskdetails.id)}>
                          <i className="fas fa-trash me-2 text-danger"></i>
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
{/**pagination */}

 <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li
              className={`page-item ${currentBage === 1 ? "disabled" : ""}`}
              onClick={() => currentBage > 1 && GetAllTasks(8, currentBage - 1,filterValue)}
            >
          <span aria-hidden="true">&laquo;</span>
            </li>

              
            <li
              className={`page-item ${currentBage === 1? "active" : ""}`}
              onClick={() =>  GetAllTasks(8, 1,filterValue)}
              style={{cursor:"pointer"}}
            >
              <span className="page-link">1</span>
            </li>

             {currentBage > 4 && (
              <li className="page-item disabled">
                <span className="page-link">…</span>
              </li>
            )}

             {TotalNumOfBages.filter(
              (page) =>
                page !== 1 &&
                page !== TotalNumOfBages.length &&
                page >= currentBage - 2 &&
                page <= currentBage + 2
            ).map((page) => (
              <li
                key={page}
                className={`page-item ${currentBage === page ? "active" : ""}`}
                onClick={() => GetAllTasks(8, page,filterValue)}
                 style={{cursor:"pointer"}}
              >
                <span className="page-link">{page}</span>
              </li>
            ))}
         
           {currentBage < TotalNumOfBages.length - 3 && (
              <li className="page-item disabled">
                <span className="page-link">…</span>
                
              </li>
            )}


            {TotalNumOfBages.length > 1 && (
              <li
                className={`page-item ${currentBage === TotalNumOfBages.length ? "active" : ""}`}
                onClick={() => GetAllTasks(8, TotalNumOfBages.length,filterValue)}
                style={{cursor:"pointer"}}
              >
                <span className="page-link">{TotalNumOfBages.length}</span>
              </li>
            )}

          <li
              className={`page-item ${currentBage ===TotalNumOfBages.length ? "disabled" : ""}`}
              onClick={() => currentBage <TotalNumOfBages.length && GetAllTasks(8, currentBage+1,filterValue)}
            >
          <span aria-hidden="true">&raquo;</span>
            </li>
        </ul>
      </nav>


{/**modal */}
 <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
      <img src={imgGril} className="w-50 mb-3" alt="Delete Illustration" />
      <h4 className="mb-3">Delete This Item?</h4>
      <p className="mb-4">
        Are you sure you want to delete this item? If you are sure just click
        on delete it.
      </p>
    </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-danger text-light" onClick={deleateTask}>
           Delete
          </Button>
          <Button className="btn btn-secondary text-light" onClick={handleClose}>
           cancle
          </Button>
        </Modal.Footer>
      </Modal>
      </div>

    </>
  )
}
