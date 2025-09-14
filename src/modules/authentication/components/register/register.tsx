import { useForm } from "react-hook-form";
import { axiosinstant, EMPLOYEIES_URL } from "../../../../utils/urls";
import {
  EMAIL_VALIDATION, USERNAME_VALIDATION,
} from "../../../../utils/validation";
import { useEffect, useRef, useState } from "react";
import type { RegisterFormInputs } from "../../../../utils/interfaces";
import logo from "../../../../assets/images/nofrofile.webp";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  let {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    trigger,
  } = useForm<RegisterFormInputs>();
  let [show, setShow] = useState(true);
  let navigate = useNavigate();
  //ubload img
  let fileInputRef = useRef<HTMLInputElement | null>(null);

  let handleClick = () => {
    fileInputRef.current?.click();
  };

  const [imgPreview, setImgPreview] = useState<string|null>(null);
  let handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
    if (files&&files.length>0) {
     const file=files[0]
      if (file) {
        setImgPreview(URL.createObjectURL(file));
      }
    }
  };

  let toggleShow = () => {
    setShow(!show);
  };

  let appendFormData = (data: RegisterFormInputs) => {
    let formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    if (fileInputRef.current?.files && fileInputRef.current.files.length > 0) {
  formData.append("profileImage", fileInputRef.current.files[0]);
}
    return formData;
  };

  const onsubmit = async (data: RegisterFormInputs) => {
    let employeeData = appendFormData(data);

    try {
      let res = await axiosinstant.post<any>(EMPLOYEIES_URL.REGISTER, employeeData);
      navigate("/verify-account", { state: data.email });
      toast.success(res.data.message);
      console.log(res);
    } catch (err:any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
      console.log(err);
    }
  };

  
  useEffect(() => {
    watch("password");
    if (watch("confirmPassword")) trigger("confirmPassword");
  }, ['password']);

  return (
    <>
      <div className="title">
        <small className="text-light">Welcome to PMS</small>
        <h4 className="heading-underline">Register</h4>
      </div>
      {/**register form */}
      <form onSubmit={handleSubmit(onsubmit)} >
        <div className=" text-center  w-25 m-auto" onClick={handleClick}>
          {imgPreview ? (
            <img
              src={imgPreview}
              className=" rounded-circle"
              style={{ width: "120px" }}
            />
          ) : (
            <img
              src={logo}
              className=" rounded-circle"
              style={{ width: "120px" }}
            />
          )}
          <p className="fw-medium mt-1 " style={{ cursor: "pointer" }}>
            Choose aProfile Picture to upload
          </p>

          <input
            {...register("profileImage")}
            ref={(e) => {
              fileInputRef.current = e;
              register("profileImage").ref(e);
            }}
            onChange={handleFileChange}
            type="file"
            hidden
          />
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mt-4"><label>User Name</label></div>

            <div className="input-group rounded-3">
              <input
                {...register("userName", USERNAME_VALIDATION)}
                type="text"
                className={`form-control ${errors.userName ? "is-invalid" : "" } border-0 bg-light shadow-none`}
                placeholder="Enter your name"
                aria-label="username"
                aria-describedby="basic-addon1"
              />
            </div>
            {errors.userName && (
              <span className="text-danger">{errors.userName.message}</span>
            )}
            <div className="mt-4"><label>Country</label></div>
            <div className="input-group rounded-3">
              <input
                {...register("country", {
                  required: "this field is required",
                })}
                type="text"
                className={`form-control ${errors.country ? "is-invalid" : ""
                  } border-0 bg-light shadow-none`}
                placeholder="Enter your country"
                aria-label="country"
                aria-describedby="basic-addon1"
              />
            </div>
            {errors.country && (
              <span className="text-danger">{errors.country.message}</span>
            )}

            <div className="mt-4"><label>E-mail</label></div>

            <div className="input-group  rounded-3">

              <input
                {...register("email", EMAIL_VALIDATION)}
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""
                  } border-0 bg-light shadow-none`}
                placeholder="Enter your E-mail"
                aria-label="email"
                aria-describedby="basic-addon1"
              />
            </div>
            {errors.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}
          </div>

          <div className="col-md-6">
            <div className="mt-4"><label>Phone Number</label></div>

            <div className="input-group rounded-3">
              <input
                {...register("phoneNumber", {
                  required: "this field is required",
                })}
                type="text"
                className={`form-control ${errors.phoneNumber ? "is-invalid" : ""
                  } border-0 bg-light shadow-none`}
                placeholder="Enter your phone number"
                aria-label="PhoneNumber"
                aria-describedby="basic-addon1"
              />
            </div>
            {errors.phoneNumber && (
              <span className="text-danger">{errors.phoneNumber.message}</span>
            )}
            <div className="mt-4"><label>Password</label></div>

            <div className="input-group rounded-3">
              <input
                {...register("password", {
                  required: "this field is required",
                })}
                type={show ? "password" : "text"}
                className={`form-control border-0 bg-light shadow-sm`}
                placeholder="Enter your Password"
                aria-label="password"
                aria-describedby="basic-addon1"
              />
              <button
                type="button"
                className="btn btn-light"
                onClick={toggleShow}
              >
                {show ? (
                  <i className="fa-solid fa-eye"></i>
                ) : (
                  <i className="fa-solid fa-eye-slash"></i>
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-danger">{errors.password.message}</span>
            )}
            <div className="mt-4"><label>Confirm Password</label></div>

            <div className="input-group rounded-3">
              <input
                {...register("confirmPassword", {
                  required: "this field is required",
                  validate: (confirmPassword) =>
                    confirmPassword === watch("password") ||
                    "Passwords do not match",
                })}
                type={show ? "password" : "text"}
                className={`form-control border-0 bg-light shadow-sm`}
                placeholder="Confirm New Password"
                aria-label="confirmPassword"
                aria-describedby="basic-addon1"
              />
              <button
                type="button"
                className="btn btn-light"
                onClick={toggleShow}
              >
                {show ? (
                  <i className="fa-solid fa-eye"></i>
                ) : (
                  <i className="fa-solid fa-eye-slash"></i>
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-danger">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>
        <div className=" text-center">
          <button
            className="btn text-light mt-4 rounded-4 mb-4 "
            disabled={isSubmitting}
            style={{
              backgroundColor: "rgba(239, 155, 40, 1)",
              padding: "7px 180px",
            }}
          >
            {isSubmitting ? "isSubmitting............" : "Save"}
          </button>
        </div>
      </form>
    </>
  );
}
