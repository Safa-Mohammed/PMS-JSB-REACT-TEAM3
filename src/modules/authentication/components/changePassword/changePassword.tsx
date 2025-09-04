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
<<<<<<< HEAD

=======
>>>>>>> 039291319b97fc4b7be0529824d760e572ada27f
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const newPasswordValue = watch("newPassword", "");

  const onSubmit = async (data: ChangePasswordForm) => {
<<<<<<< HEAD
=======
   

    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }

>>>>>>> 039291319b97fc4b7be0529824d760e572ada27f
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
<<<<<<< HEAD
      toast.error(error?.response?.data?.message || "Failed to change password");
=======
      toast.error(error.response?.data?.message || "Failed to change password");
>>>>>>> 039291319b97fc4b7be0529824d760e572ada27f
    } finally {
      setLoading(false);
    }
  };
<<<<<<< HEAD

  const renderPasswordInput = (
    label: string,
    name: keyof ChangePasswordForm,
    show: boolean,
    toggleShow: () => void,
    validation?: any
  ) => (
    <div className="mb-3 w-100 mt-4">
      <label htmlFor={name} className="input-label fw-semibold">{label}</label>
      <div className="input-group mt-2">
        <input
          id={name}
          {...register(name, validation)}
          type={show ? "text" : "password"}
          className={`form-control ${errors[name] ? "is-invalid" : ""}`}
          placeholder={label}
        />
        <button
          type="button"
          className="btn btn-light"
          onClick={toggleShow}
          aria-label={show ? "Hide password" : "Show password"}
        >
          <i className={`fa-solid ${show ? "fa-eye" : "fa-eye-slash"}`}></i>
        </button>
      </div>
      {errors[name] && (
        <span className="text-danger">{errors[name]?.message as string}</span>
      )}
    </div>
  );
=======
>>>>>>> 039291319b97fc4b7be0529824d760e572ada27f

  return (
    <>
      <div className="title">
<<<<<<< HEAD
        <small className="text-light">Welcome to PMS</small>
        <h4 className="heading-underline">Change Password</h4>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {renderPasswordInput("Old Password", "oldPassword", showOldPassword, () => setShowOldPassword(!showOldPassword), PASSWORD_VALIDATION)}

        {renderPasswordInput("New Password", "newPassword", showNewPassword, () => setShowNewPassword(!showNewPassword), PASSWORD_VALIDATION)}

        {renderPasswordInput(
          "Confirm New Password",
          "confirmNewPassword",
          showConfirmPassword,
          () => setShowConfirmPassword(!showConfirmPassword),
          {
            required: "Confirm password is required",
            validate: (value: string) => value === newPasswordValue || "Passwords do not match",
          }
        )}

        <div className="text-center">
          <button
            type="submit"
            className="btn text-light mt-4 rounded-4 mb-4"
            style={{ backgroundColor: "rgba(239, 155, 40, 1)", padding: "7px 180px" }}
            disabled={loading}
          >
            {loading ? "Changing..." : "Save"}
          </button>
        </div>
=======
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
>>>>>>> 039291319b97fc4b7be0529824d760e572ada27f
      </form>

      <ToastContainer />
    </>
  );
}
