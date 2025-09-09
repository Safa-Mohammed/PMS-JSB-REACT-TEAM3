import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../../context/AuthContext";
import { axiosinstant, PROJECTS_URL } from "../../../../../utils/urls";
import Table from "react-bootstrap/Table";
import styles from "./projectList.module.css";
import { toast } from "react-toastify";
import NoData from "../../../../shared/components/noData/noData";
import { useHref, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DeletePage from "../../../../shared/components/DeleteConfirmation/deleteConfrimation";
import load from "../../../../../assets/images/loadpi.gif"; // Loading gif
import type {
  Project,
  ProjectsResponse,
} from "../../../../../utils/interfaces";

export default function ProjectList() {
  const navigate = useNavigate();
  const createHref = useHref(`/dashboard/projects-data`);
  let { userData } = useAuthContext();
  console.log(userData);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [nameValue, setNameValue] = useState("");
  const [TotalNumOfPages, setTotalNumOfPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 12;

  const getAllProjects = async (
    pageNumber: number,
    pageSize: number,
    title: string
  ) => {
    try {
      setLoading(true);

      // Choose endpoint based on role
       const endpoint =
      userData?.userGroup === "Manager" || userData?.userGroup === "superAdmin"
        ? PROJECTS_URL.GETALLPROJECT_MANAGER
        : PROJECTS_URL.GETALLPROJECT_EMPLOYEE;

    const response = await axiosinstant.get<ProjectsResponse>(endpoint, {
      params: { title, pageSize, pageNumber },
    });

      setProjects(response.data.data || []);

      const totalPages =
        Math.ceil(response.data.totalNumberOfRecords / pageSize) || 1;
      setTotalNumOfPages(Array.from({ length: totalPages }, (_, i) => i + 1));
      setCurrentPage(pageNumber);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProjects(currentPage, pageSize, nameValue);
  }, [currentPage]);

  const getNameValue = (input: React.ChangeEvent<HTMLInputElement>) => {
    const value = input.target.value;
    setNameValue(value);
    setCurrentPage(1);
    getAllProjects(1, pageSize, value);
  };

  const handleDelete = async () => {
    if (!selectedProject) return;
    try {
      setLoading(true);
      const res = await axiosinstant.delete<ProjectsResponse>(
        PROJECTS_URL.DELETEPROJECT.replace(
          "{id}",
          selectedProject.id.toString()
        )
      );
      getAllProjects(currentPage, pageSize, nameValue);
      setShowDeleteModal(false);
      setSelectedProject(null);
      toast.success(res.data?.message || "Project deleted successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between bg-primary p-4 shadow-sm bg-transparent">
        <h4 className={styles.tittle}>Projects</h4>

        {userData?.userGroup === "Manager" && (
          <button
            className={styles.addButton}
            onClick={() => navigate(createHref)}
          >
            Add New Project
          </button>
        )}
      </div>

      <div className={`p-4 vh-100 w-100 ${styles.content}`}>
        <input
          type="text"
          placeholder="Search by name"
          className="shadow-lg border-0 p-2 px-5 my-3 w-50 rounded-5"
          onChange={getNameValue}
        />

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
            {loading && (
              <tr>
                <td colSpan={5} className="text-center">
                  <img src={load} alt="loading..." />
                </td>
              </tr>
            )}

            {!loading && projects.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-muted py-4">
                  <NoData />
                </td>
              </tr>
            )}

            {!loading &&
              projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td>{new Date(project.creationDate).toLocaleDateString()}</td>
                  <td>
                    {new Date(project.modificationDate).toLocaleDateString()}
                  </td>
                  <td>
                    <div className={styles.actionDropdown}>
                      <button
                        className={styles.actionButton}
                        type="button"
                        id={`dropdownMenu-${project.id}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi bi-three-dots"></i>
                      </button>
                      <ul
                        className={`dropdown-menu ${styles.dropdownMenu}`}
                        aria-labelledby={`dropdownMenu-${project.id}`}
                      >
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() =>
                              navigate(
                                `/dashboard/projects-data/view/${project.id}`
                              )
                            }
                          >
                            View
                          </button>
                        </li>
                        <li>
                          {userData?.userGroup === "Manager" && (
                           <button
                            className="dropdown-item"
                            onClick={() =>
                              navigate(
                                `/dashboard/projects-data/edit/${project.id}`
                              )
                            }
                          >
                            Edit
                          </button>
                          )}
                          
                        </li>
                        <li>
                          {userData?.userGroup === "Manager" && (
                            <button
                              className="dropdown-item text-danger"
                              onClick={() => {
                                setSelectedProject(project);
                                setShowDeleteModal(true);
                              }}
                            >
                              Delete
                            </button>
                          )}
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        {/* Pagination like UsersList */}
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            {/* Previous */}
            <li
              className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() =>
                currentPage > 1 &&
                getAllProjects(currentPage - 1, pageSize, nameValue)
              }
            >
              <span className="page-link">&laquo;</span>
            </li>

            {/* First page */}
            <li
              className={`page-item ${currentPage === 1 ? "active" : ""}`}
              onClick={() => getAllProjects(1, pageSize, nameValue)}
              style={{ cursor: "pointer" }}
            >
              <span className="page-link">1</span>
            </li>

            {/* Ellipsis before current set */}
            {currentPage > 3 && (
              <li className="page-item disabled">
                <span className="page-link">…</span>
              </li>
            )}

            {/* Pages around current page */}
            {TotalNumOfPages.filter(
              (page) =>
                page !== 1 &&
                page !== TotalNumOfPages.length &&
                page >= currentPage &&
                page <= currentPage + 2
            ).map((page) => (
              <li
                key={page}
                className={`page-item ${currentPage === page ? "active" : ""}`}
                onClick={() => getAllProjects(page, pageSize, nameValue)}
                style={{ cursor: "pointer" }}
              >
                <span className="page-link">{page}</span>
              </li>
            ))}

            {/* Ellipsis after current set */}
            {currentPage + 2 < TotalNumOfPages.length && (
              <li className="page-item disabled">
                <span className="page-link">…</span>
              </li>
            )}

            {/* Last page */}
            {TotalNumOfPages.length > 1 && (
              <li
                className={`page-item ${
                  currentPage === TotalNumOfPages.length ? "active" : ""
                }`}
                onClick={() =>
                  getAllProjects(TotalNumOfPages.length, pageSize, nameValue)
                }
                style={{ cursor: "pointer" }}
              >
                <span className="page-link">{TotalNumOfPages.length}</span>
              </li>
            )}

            {/* Next */}
            <li
              className={`page-item ${
                currentPage === TotalNumOfPages.length ? "disabled" : ""
              }`}
              onClick={() =>
                currentPage < TotalNumOfPages.length &&
                getAllProjects(currentPage + 1, pageSize, nameValue)
              }
            >
              <span className="page-link">&raquo;</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Delete Modal */}
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
