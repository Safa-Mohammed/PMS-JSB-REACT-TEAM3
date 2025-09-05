import { useEffect, useState } from "react";
import { axiosinstant, PROJECTS_URL } from "../../../../../utils/urls";
import Table from "react-bootstrap/Table";
 import Modal from "react-bootstrap/Modal";
 import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import NoData from "../../../../shared/components/noData/noData";

interface Project {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
}

interface ProjectsResponse {
  projects: Project[];
  totalCount: number;
  data: any;
}

interface CreateProjectRequest {
  title: string;
  description: string;
}

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Form fields for new project
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const getAllProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosinstant.get<ProjectsResponse>(
        PROJECTS_URL.GETALLPROJECT,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { title: "", pageSize: 10, pageNumber: 1 },
        }
      );
      console.log("API response:", response.data);
      setProjects(response.data.data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  //create new project
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem("token");
      const newProject: CreateProjectRequest = {
        title,
        description,
      };

      const res = await axiosinstant.post(
        PROJECTS_URL.CREATEPROJECT,
        newProject,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      getAllProjects();
      handleClose();

      toast.success(res.data?.message || "Project created successfully!");
    } catch (error: any) {
      console.error("Error creating project:", error);

      const msg =
        error.response?.data?.message ||
        "Failed to create project. Please try again.";
      toast.error(msg);
    }
  };

  //delete project
  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");

      // طلب حذف المشروع
      const res = await axiosinstant.delete(
        PROJECTS_URL.DELETEPROJECT.replace("{id}", id.toString()),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      getAllProjects();

      toast.success(res.data?.message || "Project deleted successfully!");
    } catch (error: any) {
      console.error("Error deleting project:", error);

      const msg =
        error.response?.data?.message ||
        "Failed to delete project. Please try again.";
      toast.error(msg);
    }
  };

  return (
    <>
      <div className="title d-flex justify-content-between p-2 align-items-center">
        <div className="description p-2">
          <h4 className="m-0 fs-5">Projects</h4>
        </div>
        <button
          className="btn btn-success me-2 rounded-5 px-4 py-2"
          onClick={handleShow}
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
            {projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-muted py-4">
                  <NoData />
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td>{new Date(project.creationDate).toLocaleDateString()}</td>
                  <td>
                    {new Date(project.modificationDate).toLocaleDateString()}
                  </td>
                  <td>
                    <button className="btn btn-sm">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-danger ms-1"
                      onClick={() => handleDelete(project.id)}
                    >
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
       <Modal  >
  <Modal.Header  >
    <Modal.Title  >Create New Project</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <Form>
      <Form.Group  >
        <Form.Label  >Title</Form.Label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter project title"
          
        />
      </Form.Group>

      <Form.Group >
        <Form.Label  >Description</Form.Label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter project description"
           
        />
      </Form.Group>
    </Form>
  </Modal.Body>

  <Modal.Footer>
    <button onClick={handleClose}  >
      Close
    </button>
    <button onClick={handleCreate}  >
      Save Project
    </button>
  </Modal.Footer>
</Modal>

      </div>
    </>
  );
}
