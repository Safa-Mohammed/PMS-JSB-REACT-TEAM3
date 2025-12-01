import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ResetPasswordData {
  email: string;
  password: string;
  confirmPassword: string;
  seed: string; // OTP
}

interface ResetPasswordResponse {
  message: string;
}

export default function ResetPassword() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ResetPasswordData>();

  const navigate = useNavigate();

  const onSubmit = async (data: ResetPasswordData) => {
    try {
      // Send POST request to reset password API
      const res = await axios.post<ResetPasswordResponse>(
        "https://upskilling-egypt.com:3003/api/v1/Users/Reset",
        data
      );

      // Show a success toast with the API message
      toast.success(res.data.message || "Password reset successfully!");

      // Navigate to login page after successful reset
      navigate("/login");
    } catch (error: any) {
      // Show an error toast if something goes wrong
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.error(error);
    }
  };

  return (
    <>
      {/* Title section */}
     <div className="title">
  <small className="text-light">Welcome to PMS</small>
  <h4 className="heading-underline">Reset Password</h4>
</div>


      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Input */}
                <div className="mt-4"><label>E-mail</label></div>

        <div className="input-group  rounded-3">
          
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""} border-0 bg-light shadow-none`}
            placeholder="Enter your email"
          />
        </div>
        {/* Show email validation error */}
        {errors.email && <span className="text-danger">{errors.email.message}</span>}

        {/* OTP / Seed Input */}
                <div className="mt-4"><label>OTP Verification</label></div>

        <div className="input-group  rounded-3">
          
          <input
            {...register("seed", { required: "OTP is required" })}
            type="text"
            className={`form-control ${errors.seed ? "is-invalid" : ""} border-0 bg-light shadow-none`}
            placeholder="Enter OTP"
          />
        </div>
        {/* Show OTP validation error */}
        {errors.seed && <span className="text-danger">{errors.seed.message}</span>}

        {/* New Password Input */}
                <div className="mt-4"><label>New Password</label></div>

        <div className="input-group  rounded-3">
         
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""} border-0 bg-light shadow-none`}
            placeholder="New Password"
          />
        </div>
        {/* Show password validation error */}
        {errors.password && <span className="text-danger">{errors.password.message}</span>}

        {/* Confirm Password Input */}
                <div className="mt-4"><label>Confirm Password</label></div>

        <div className="input-group  rounded-3">
          
          <input
            {...register("confirmPassword", { required: "Confirm password is required" })}
            type="password"
            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""} border-0 bg-light shadow-none`}
            placeholder="Confirm Password"
          />
        </div>
        {/* Show confirm password validation error */}
        {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}

        {/* Submit Button */}
        <div className="text-center">
          <button
            className="btn text-light mt-4 rounded-4 mb-4 w-100"
            disabled={isSubmitting}
            style={{
              backgroundColor: "rgba(239, 155, 40, 1)",
              // padding: "7px 150px",
            }}
          >
            {isSubmitting ? "Resetting..." : "Save"}
          </button>
        </div>
      </form>
    </>
  );
}
