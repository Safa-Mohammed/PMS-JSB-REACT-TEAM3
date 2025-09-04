import { axiosinstant, EMPLOYEIES_URL } from "../../../../utils/urls";
import type { LoginData } from "../../../../utils/interfaces";
import { useForm } from "react-hook-form";
import { EMAIL_VALIDATION } from "../../../../utils/validation";
import { useState } from "react";
import { toast } from "react-toastify";
<<<<<<< HEAD
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../../../context/AuthContext";
=======
import { useNavigate } from "react-router-dom";
>>>>>>> 039291319b97fc4b7be0529824d760e572ada27f

export default function login() {
  let {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
<<<<<<< HEAD
  } = useForm<LoginData>();
=======
  } = useForm();
>>>>>>> 039291319b97fc4b7be0529824d760e572ada27f
  let [tokken, setTokken] = useState(null);

  let [show, setShow] = useState(true);
  let navigate = useNavigate();
<<<<<<< HEAD
  const { saveUserData } = useAuthContext();
=======
>>>>>>> 039291319b97fc4b7be0529824d760e572ada27f
  let toggleShow = () => {
    setShow(!show);
  };
  let onSubmit = async (Login: LoginData) => {
    try {
      let res = await axiosinstant.post(EMPLOYEIES_URL.LOGIN, Login);
<<<<<<< HEAD
       toast.success("Login successful!");
      navigate("/dashboard");
      setTokken(res.data.token);
      localStorage.setItem("token", res.data.token);
      saveUserData();
     
=======
      navigate("/dashboard");
      setTokken(res.data.token);
      localStorage.setItem("token", res.data.token);
>>>>>>> 039291319b97fc4b7be0529824d760e572ada27f
      console.log(res);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  return (
    <>
      <div className="title">
<<<<<<< HEAD
        <small className="text-light">Welcome to PMS</small>
        <h4 className="heading-underline">Login</h4>
=======
        <small className=" text-light">welcome to pms</small>
        <h4 style={{ color: "rgba(239, 155, 40, 1)" }}>Login</h4>
>>>>>>> 039291319b97fc4b7be0529824d760e572ada27f
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mt-4 rounded-3">
<<<<<<< HEAD
          {/* <div className="input-group-prepend">
=======
          <div className="input-group-prepend">
>>>>>>> 039291319b97fc4b7be0529824d760e572ada27f
            <span
              className="input-group-text rounded-end-0 border-0 py-2 "
              id="basic-addon1"
            >
              <i className="fa-solid fa-envelope fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i>
            </span>
<<<<<<< HEAD
          </div> */}
          <div className="  w-100">
            <label htmlFor="email" className="input-label">
              E-mail
            </label>
            <input
              {...register("email", EMAIL_VALIDATION)}
              id="email"
              type="email"
              className={`form-control ${
                errors.email ? "is-invalid" : ""
              } border-0 bg-light shadow-none`}
              placeholder="Enter your E-mail"
              aria-label="email"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        {errors.email && (
          <span className="text-danger">{errors.email.message as string}</span>
        )}

        {/* <div className="input-group mt-4 rounded-3"> */}
        {/* <div className="input-group-prepend">
            <span
              className="input-group-text rounded-end-0 border-0 py-2 "
              id="basic-addon1"
            >
             </span>
          </div> */}

        <div className="mb-3 w-100">
          {/* Label for password field */}
          <label htmlFor="password" className="input-label   fw-semibold pt-4 ">
            Password
          </label>

          <div className="input-group mt-2">
            <input
              id="password"
              {...register("password", {
                required: "This field is required",
              })}
              type={show ? "text" : "password"} // toggle between password and text
              className="form-control "
              placeholder="Enter your password"
              aria-label="password"
            />

            <button
              type="button"
              className="btn btn-light"
              onClick={toggleShow}
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? (
                <i className="fa-solid fa-eye"></i>
              ) : (
                <i className="fa-solid fa-eye-slash"></i>
              )}
            </button>
          </div>

          {/* Validation error message */}
          {errors.password && (
            <span className="text-danger">
              {errors.password.message as string}
            </span>
          )}
=======
          </div>
          <input
            {...register("email", EMAIL_VALIDATION)}
            type="email"
            className={`form-control ${
              errors.email ? "is-invalid" : ""
            } border-0 bg-light shadow-none`}
            placeholder="email"
            aria-label="email"
            aria-describedby="basic-addon1"
          />
>>>>>>> 039291319b97fc4b7be0529824d760e572ada27f
        </div>
 {errors.email && <span className='text-danger'>{errors.email.message as string}</span>}

<<<<<<< HEAD
        <div className="d-flex justify-content-between mt-2">
          <small>
            <Link to="/register" className="text-white text-decoration-none">
              Register Now ?
            </Link>
          </small>
          <small>
            <Link
              to="/forget-password"
              className="text-white text-decoration-none"
            >
              Forget Password ?
            </Link>
          </small>
        </div>

=======

        <div className="input-group mt-4 rounded-3">
          <div className="input-group-prepend">
            <span
              className="input-group-text rounded-end-0 border-0 py-2 "
              id="basic-addon1"
            >
              <i className="fa-solid fa-lock fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i>
            </span>
          </div>
          <input
            {...register("password", {
              required: "this field is required",
            })}
            type={show ? "password" : "text"}
            className={`form-control border-0 bg-light shadow-sm`}
            placeholder="password"
            aria-label="password"
            aria-describedby="basic-addon1"
          />
          <button type="button" className="btn btn-light" onClick={toggleShow}>
            {show ? (
              <i className="fa-solid fa-eye"></i>
            ) : (
              <i className="fa-solid fa-eye-slash"></i>
            )}
          </button>
        </div>
        {errors.password && (
          <span className="text-danger">{errors.password.message as string}</span>
        )}
>>>>>>> 039291319b97fc4b7be0529824d760e572ada27f
        <div className=" text-center">
          <button
            className="btn text-light mt-4 rounded-4 mb-4"
            disabled={isSubmitting}
            style={{
              backgroundColor: "rgba(239, 155, 40, 1)",
              padding: "7px 180px",
            }}
          >
            {isSubmitting ? "isSubmitting............" : "Login"}
          </button>
        </div>
      </form>
    </>
  );
}
