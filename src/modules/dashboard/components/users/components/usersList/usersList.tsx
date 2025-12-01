import { useEffect, useState } from "react";
import { axiosinstant, EMPLOYEIES_URL } from "../../../../../../utils/urls";
import type {
  UserResponse,
  Employee,
} from "../../../../../../utils/interfaces";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import load from "../../../../../../assets/images/loadpi.gif";
import NoData from "../../../../../shared/components/noData/noData";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UsersList() {
  const [AllUsers, setAllUsers] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterValue, setFilterValue] = useState<string>("");
  const [TotalNumOfPages, setTotalNumOfPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Employee | null>(null);

  const navigate = useNavigate();

  // ✅ Fetch users with toast message
  const GetAllUsers = async (
    pageSize: number,
    pageNumber: number,
    userName: string
  ) => {
    try {
      setLoading(true);
      const res = await axiosinstant.get<UserResponse>(
        EMPLOYEIES_URL.GETALLUSERS,
        {
          params: { pageSize, pageNumber, userName },
        }
      );

      setAllUsers(res.data.data || []);
      const totalPages = res.data.totalNumberOfPages || 1;
      setTotalNumOfPages(Array.from({ length: totalPages }, (_, i) => i + 1));
      setCurrentPage(pageNumber);

      // // ✅ Show toast: first backend message else default
      // if (res.data.message) {
      //   toast.success(res.data.message);
      // } else {
      //   toast.info("Users fetched successfully");
      // }

      console.log("✅ Users fetched:", res.data.data);
    } catch (error: any) {
      console.log("❌ Error fetching users:", error);
      toast.error(error.response?.data?.message || "Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Block / Unblock user
  const handleBlockUser = async () => {
    if (!selectedUser) return;
    try {
      const response = await axiosinstant.put<UserResponse>(
        `${EMPLOYEIES_URL.BLOCKORUNBLOCKUSERS}${selectedUser.id}`
      );

      toast.success(
        response?.data?.message ||
          (selectedUser?.isActivated ? "User blocked" : "User unblocked")
      );

      // Refresh list
      GetAllUsers(10, currentPage, filterValue);
    } catch (error: any) {
      console.log("❌ Error updating user status:", error);
      toast.error(
        error.response?.data?.message || "Failed to update user status"
      );
    } finally {
      setShowModal(false);
    }
  };

  const filterUsers = (e: any) => {
    setFilterValue(e.target.value);
    GetAllUsers(10, 1, e.target.value);
  };

  useEffect(() => {
    GetAllUsers(10, 1, filterValue);
  }, []);

  return (
    <>
      <div className="container">
        <div className="title d-flex align-items-center">
          <h2>Users</h2>
        </div>

        <div className="p-4">
          <input
            type="text"
            placeholder="Search by name"
            className="shadow-lg border-0 p-2 px-5 my-3 w-50 rounded-5"
            onChange={filterUsers}
          />
        </div>

        <Table className="text-center" striped bordered hover responsive>
          <thead>
            <tr>
              <th style={{ backgroundColor: "#315951E5", color: "white" }}>
                UserName
              </th>
              <th style={{ backgroundColor: "#315951E5", color: "white" }}>
                Status
              </th>
              <th style={{ backgroundColor: "#315951E5", color: "white" }}>
                PhoneNumber
              </th>
              <th style={{ backgroundColor: "#315951E5", color: "white" }}>
                DateCreated
              </th>
              <th style={{ backgroundColor: "#315951E5", color: "white" }}>
                Email
              </th>
              <th style={{ backgroundColor: "#315951E5", color: "white" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="text-center">
                  <img src={load} alt="loading......." />
                </td>
              </tr>
            )}

            {!loading && AllUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center">
                  <NoData />
                </td>
              </tr>
            )}

            {!loading &&
              AllUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.userName}</td>
                  <td>
                    {user.isActivated ? (
                      <span className="text-white px-3 py-1 bg-success rounded-4">
                        Active
                      </span>
                    ) : (
                      <span className="text-white px-3 py-1 bg-danger rounded-4">
                        NotActive
                      </span>
                    )}
                  </td>
                  <td>{user.phoneNumber}</td>
                  <td>{new Date(user.creationDate).toLocaleDateString()}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-link p-0"
                        id={`dropDowmMenue-${user.id}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi bi-three-dots"></i>
                      </button>
                      <ul
                        className="dropdown-menu"
                        style={{ padding: "0px", minWidth: "80px" }}
                        aria-labelledby={`dropDowmMenue-${user.id}`}
                      >
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() =>
                              navigate(`/dashboard/user-view/${user.id}`)
                            }
                          >
                            <i className="fas fa-eye me-2"></i> View
                          </button>
                        </li>

                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowModal(true);
                            }}
                          >
                            <i className="fas fa-ban me-2 text-danger"></i>
                            {user.isActivated ? "Block" : "Unblock"}
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        {/* Pagination */}
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            {/* Previous */}
            <li
              className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() =>
                currentPage > 1 && GetAllUsers(10, currentPage - 1, filterValue)
              }
            >
              <span className="page-link">&laquo;</span>
            </li>

            {/* First page */}
            <li
              className={`page-item ${currentPage === 1 ? "active" : ""}`}
              onClick={() => GetAllUsers(10, 1, filterValue)}
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
                onClick={() => GetAllUsers(10, page, filterValue)}
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
                  GetAllUsers(10, TotalNumOfPages.length, filterValue)
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
                GetAllUsers(10, currentPage + 1, filterValue)
              }
            >
              <span className="page-link">&raquo;</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* ✅ Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser &&
            `Are you sure you want to ${
              selectedUser.isActivated ? "block" : "unblock"
            } user "${selectedUser.userName}"?`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant={selectedUser?.isActivated ? "danger" : "success"}
            onClick={handleBlockUser}
          >
            {selectedUser?.isActivated ? "Block" : "Unblock"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
