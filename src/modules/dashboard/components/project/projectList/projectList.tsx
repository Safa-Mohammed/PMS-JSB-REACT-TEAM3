import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosinstant, PROJECTS_URL } from "../../../../../utils/urls";
import Table from "react-bootstrap/Table";  

interface Project {
  id: number;
  title: string;
  description: string; // Added description based on your response
  creationDate: string;
  modificationDate: string;
  // Add other fields you see in the response if needed
}

interface ProjectsResponse {
  projects: Project[];
  totalCount: number;
  data:any;
}

export default function ProjectList() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [hasError, setHasError] = useState(false);

  const getAllProjects = async () => {
    try {
      setHasError(false);
      const token = localStorage.getItem("token");  
      const response = await axiosinstant.get<ProjectsResponse>(PROJECTS_URL.GETALLPROJECT, {
        headers: { Authorization: `Bearer ${token}` },
        params: { title: "", pageSize: 10, pageNumber: 1 },
      });
      console.log("API response:", response.data);

setProjects(response.data.data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setHasError(true);
      setProjects([]);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <>
      <div className="title d-flex justify-content-between p-2 align-items-center">
        <div className="description p-2">
          <h4 className="m-0 fs-5">Projects</h4>
        </div>
        <button
          className="btn btn-success me-2 rounded-5 px-4 py-2"
          onClick={() => navigate("/dashboard/projects-data")}
        >
          Add New Project
        </button>
      </div>

      <div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date Created</th>
              <th>Last Modified</th>
              <th>Actions</th>
            </tr>
          </thead>
       
          <tbody>
            {hasError || projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-muted py-4">
                  No data available
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td>{new Date(project.creationDate).toLocaleDateString()}</td>
                  <td>{new Date(project.modificationDate).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-sm">
                      <i className="fas fa-edit"></i>  
                    </button>
                    <button className="btn btn-sm ">
                      <i className="fas fa-trash"></i>  
                    </button>
                    <button className="btn btn-sm ">
                      <i className="fas fa-eye"></i>  
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}