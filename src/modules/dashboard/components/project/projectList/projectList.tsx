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
import type { Project ,ProjectsResponse } from "../../../../../utils/interfaces";



export default function ProjectList() {
  const navigate = useNavigate();
  const createHref = useHref(`/dashboard/projects-data`);

  const [projects, setProjects] = useState<Project[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [nameValue, setNameValue] = useState("");
  const [noOfPages, setnoOfPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 12;

  const getAllProjects = async (pageNumber: number, pageSize: number ,title:string) => {
    try {
      const response = await axiosinstant.get<ProjectsResponse>(
        PROJECTS_URL.GETALLPROJECT,
        {
          params: { title, pageSize, pageNumber },
        }
      );
      setProjects(response.data.data || []);
      setnoOfPages(
        Array(response.data.totalNumberOfRecords)
          .fill(0)
          .map((_, i) => i + 1)
      );
    } catch (error: any) {
 
      const msg =
        error.response?.data?.message ||
        "Failed to Fetching project. Please try again.";
      toast.error(msg);
    }}
  useEffect(() => {
    getAllProjects(currentPage, pageSize,nameValue);
  }, [currentPage]);


const getNameValue = (input: React.ChangeEvent<HTMLInputElement>) => {
  const value = input.target.value;
  setNameValue(value);

  // Reset to first page when searching
  setCurrentPage(1);

  // Fetch with correct page & size
  getAllProjects(1, pageSize, value);
};


  const getVisiblePages = (current: number, total: number, maxVisible = 10) => {
    const pages = [];
    let start = Math.max(current - Math.floor(maxVisible / 2), 1);
    let end = start + maxVisible - 1;

    if (end > total) {
      end = total;
      start = Math.max(end - maxVisible + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  // delete project
  const handleDelete = async () => {
    if (!selectedProject) return;

    try {
      const res = await axiosinstant.delete(
        PROJECTS_URL.DELETEPROJECT.replace(
          "{id}",
          selectedProject.id.toString()
        ),

      );

      getAllProjects(3, 10, nameValue);
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
      <div className="d-flex justify-content-between bg-primary p-4 shadow-sm bg-transparent ">
        <div>
          <h4 className={styles.tittle}>Projects</h4>
        </div>

        <button
          className={styles.addButton}
          onClick={() => navigate(createHref)}
        >
          Add New Project
        </button>
      </div>

      <div className={`p-4 vh-100 w-100 ${styles.content}`}>
        <input type="text" placeholder="Search by name"  className="shadow-lg border-0 p-2 px-5 my-3 w-50 rounded-5" onChange={getNameValue}/>
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
        <nav aria-label="Page navigation example">
          <ul className="pagination d-flex w-100 justify-content-center p-1">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                &laquo;
              </button>
            </li>

            {getVisiblePages(currentPage, noOfPages.length).map((pageNo) => (
              <li
                key={pageNo}
                className={`page-item ${
                  currentPage === pageNo ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(pageNo)}
                >
                  {pageNo}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === noOfPages.length ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, noOfPages.length))
                }
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
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
          {selectedProject && <DeletePage deleteItem={selectedProject.title} />}
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
