import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosinstant, EMPLOYEIES_URL } from "../../../../utils/urls";
import { AuthContext } from "../../../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PASSWORD_VALIDATION } from "../../../../utils/validation";
import "react-toastify/dist/ReactToastify.css";
import "./changePassword.css";

type ChangePasswordForm = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export default function ChangePassword() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ChangePasswordForm>();
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext must be used inside AuthContextProvider");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const newPasswordValue = watch("newPassword", "");

  const onSubmit = async (data: ChangePasswordForm) => {
   

    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axiosinstant.put(
        EMPLOYEIES_URL.CHANGEPASSWORD,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Password changed successfully! Please log in again.");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="title">
        <p>welcome to PMS</p>
        <h3 className="heading-underline">Change Password</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="pt-5">

        {/* Old Password */}
        <div className="mb-3 position-relative">
          <label>Old Password</label>
          <input
            {...register("oldPassword", PASSWORD_VALIDATION)}
            type={showOldPassword ? "text" : "password"}
            className="form-control input-with-icon"
            placeholder="Enter your Old Password"
          />
          <span
            className="eye-icon"
            onClick={() => setShowOldPassword(!showOldPassword)}
          >
            <i className={showOldPassword ? "fa fa-eye" : "fa fa-eye-slash"}></i>
          </span>
          {errors.oldPassword && (
            <small className="text-danger">{errors.oldPassword.message}</small>
          )}
        </div>

        {/* New Password */}
        <div className="mb-3 position-relative">
          <label>New Password</label>
          <input
            {...register("newPassword", PASSWORD_VALIDATION)}
            type={showNewPassword ? "text" : "password"}
            className="form-control input-with-icon"
            placeholder="Enter your New Password"
          />
          <span
            className="eye-icon"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            <i className={showNewPassword ? "fa fa-eye" : "fa fa-eye-slash"}></i>
          </span>
          {errors.newPassword && (
            <small className="text-danger">{errors.newPassword.message}</small>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="mb-4 position-relative">
          <label>Confirm New Password</label>
          <input
            {...register("confirmNewPassword", {
              required: "Confirm password is required",
              validate: (value) => value === newPasswordValue || "Passwords do not match",
            })}
            type={showConfirmPassword ? "text" : "password"}
            className="form-control input-with-icon"
            placeholder="Confirm New Password"
          />
          <span
            className="eye-icon"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <i className={showConfirmPassword ? "fa fa-eye" : "fa fa-eye-slash"}></i>
          </span>
          {errors.confirmNewPassword && (
            <small className="text-danger">{errors.confirmNewPassword.message}</small>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-success w-100 rounded-5"
          disabled={loading}
        >
          {loading ? "Changing..." : "Save"}
        </button>
      </form>

      <ToastContainer />
    </>
  );
}
