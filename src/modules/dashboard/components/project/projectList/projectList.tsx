import { useEffect, useState } from "react";
import { axiosinstant, PROJECTS_URL } from "../../../../../utils/urls";
import Table from "react-bootstrap/Table";
import styles from "./projectList.module.css";
import { toast } from "react-toastify";
import NoData from "../../../../shared/components/noData/noData";
import { useHref, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DeletePage from "../../../../shared/components/DeleteConfirmation/deleteConfrimation";  

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

export default function ProjectList() {
  const navigate = useNavigate();
  const createHref = useHref(`/dashboard/projects-data`);

  const [projects, setProjects] = useState<Project[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
      setProjects(response.data.data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  // delete project
  const handleDelete = async () => {
    if (!selectedProject) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axiosinstant.delete(
        PROJECTS_URL.DELETEPROJECT.replace("{id}", selectedProject.id.toString()),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      getAllProjects();
      setShowDeleteModal(false);
      setSelectedProject(null);

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
      <div className="d-flex justify-content-between bg-primary p-4 shadow-sm bg-transparent">
        <div>
          <h4 className={styles.tittle}>Projects</h4>
        </div>

        <button className={styles.addButton} onClick={() => navigate(createHref)}>
          Add New Project
        </button>
      </div>

      <div className={`p-4 vh-100 ${styles.content}`}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className={styles.headTable}>Title</th>
              <th className={styles.headTable}>Description</th>
              <th className={styles.headTable}>Date Created</th>
              <th className={styles.headTable}>Last Modified</th>
              <th className={styles.headTable}>Actions</th>
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
                    <button
                      className="btn btn-sm"
                      onClick={() =>
                        navigate(`/dashboard/projects-data/edit/${project.id}`)
                      }
                    >
                      <i className="fas fa-edit"></i>
                    </button>

                    <button
                      className="btn btn-sm ms-1"
                      onClick={() =>
                        navigate(`/dashboard/projects-data/view/${project.id}`)
                      }
                    >
                      <i className="fas fa-eye"></i>
                    </button>

                    {/* Delete with modal confirm */}
                    <button
                      className="btn btn-sm ms-1"
                      onClick={() => {
                        setSelectedProject(project);
                        setShowDeleteModal(true);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Delete Confirmation Modal */}
{/* Delete Confirmation Modal */}
<Modal
  show={showDeleteModal}
  onHide={() => setShowDeleteModal(false)}
  centered
>
  <Modal.Header closeButton>
    <Modal.Title>Confirm Delete</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    {selectedProject && (
      <DeletePage deleteItem={selectedProject.title} />
    )}
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
      Cancel
    </Button>
    <Button variant="danger" onClick={handleDelete}>
      Delete
    </Button>
  </Modal.Footer>
</Modal>

    </>
  );
}