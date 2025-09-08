// src/modules/dashboard/components/users/components/usersView/usersView.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosinstant, EMPLOYEIES_URL } from "../../../../../../utils/urls";
import type { Employee } from "../../../../../../utils/interfaces";
import { toast } from "react-toastify";
import loadingImg from "../../../../../../assets/images/loadpi.gif";

export default function UsersView() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUserById = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await axiosinstant.get<Employee>(
        `${EMPLOYEIES_URL.GETALLUSERS}${id}`
      );
      setUser(res.data);
      console.log("User data:", res.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch user");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      getUserById(params.id);
    }
  }, [params.id]);

  return (
    <div className="container mt-4">
      <div className="p-4 text-left rounded-top bg-white shadow-sm">
        <h3 className="text-primary">View User</h3>
      </div>

      {isLoading && (
        <div className="d-flex justify-content-center mt-5 align-items-center">
          <img src={loadingImg} alt="loading..." />
        </div>
      )}

      {!isLoading && user && (
        <form className="p-4 rounded-3 shadow-sm border w-75 m-auto mt-5 bg-white ">
          <div className="mb-3">
            <label className="form-label fs-4">User Name</label>
            <input
              type="text"
              className="form-control"
              value={user.userName}
              disabled
            />
          </div>

          <div className="mb-3 fs-4">
            <label className="form-label">Email</label>
            <input type="text" className="form-control" value={user.email} disabled />
          </div>

          <div className="mb-3 fs-4">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              value={user.phoneNumber}
              disabled
            />
          </div>

          <div className="mb-3 fs-4">
            <label className="form-label">Status</label>
            <input
              type="text"
              className="form-control"
              value={user.isActivated ? "Active" : "Not Active"}
              disabled
            />
          </div>

          <div className="mb-3">
            <label className="form-label fs-4">Date Created</label>
            <input
              type="text"
              className="form-control"
              value={new Date(user.creationDate).toLocaleDateString()}
              disabled
            />
          </div>
           <button
          className="btn   btn-success"
          onClick={() => navigate("/dashboard/users-list")}
        >
          <i className="bi bi-arrow-left-circle-fill fs-5 text-white"></i>{" "}
          Back to Users
        </button>
        </form>
      )}
    </div>
  );
}
