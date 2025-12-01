import { useForm } from "react-hook-form";
import { EMAIL_VALIDATION } from "../../../../utils/validation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ForgetPasswordData {
  email: string;
}

interface ForgetPasswordResponse {
  message: string;
}

export default function ForgetPassword() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ForgetPasswordData>();

  const navigate = useNavigate();

  const onSubmit = async (data: ForgetPasswordData) => {
    try {
      // Send a POST request to the API with the email
      const res = await axios.post<ForgetPasswordResponse>(
        "https://upskilling-egypt.com:3003/api/v1/Users/Reset/Request",
        { email: data.email }
      );

      // Show a success toast with the API message
      toast.success(res.data.message || "Verification code sent to your email!");

      // Navigate to the reset-password page after success
      navigate("/reset-password");
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
  <h4 className="heading-underline">Forget Password</h4>
</div>

      {/* Form with email input*/}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4"><label>E-mail</label></div>
        <div className="input-group rounded-3">

          <input
            {...register("email", EMAIL_VALIDATION)}
            type="email"
            className={`form-control ${
              errors.email ? "is-invalid" : ""
            } border-0 bg-light shadow-none`}
            placeholder="Enter your E-mail"
            aria-label="email"
            aria-describedby="basic-addon1"
          />
        </div>
        {/* Show validation error message */}
        {errors.email && (
          <span className="text-danger">
            {errors.email.message as string}
          </span>
        )}

        {/* Button is now named Verify instead of Login */}
        <div className=" text-center">
          <button
            className="btn text-light mt-4 rounded-4 mb- w-100"
            disabled={isSubmitting}
            style={{
              backgroundColor: "rgba(239, 155, 40, 1)",
              // padding: "7px 180px",
            }}
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </button>
        </div>
      </form>
    </>
  );
}
