import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosinstant, EMPLOYEIES_URL } from "../../../../utils/urls";
import type { VirifyData } from "../../../../utils/interfaces";
import { toast } from "react-toastify";
export default function verifyAccount() {
  let { state } = useLocation();
  let {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<VirifyData>({
    defaultValues: {
      email: state,
    },
  });
  let navigate = useNavigate();
  let onSubmit = async (verifyaccount: VirifyData) => {
    try {
      let res = await axiosinstant.put(EMPLOYEIES_URL.VIRIFY, verifyaccount);
      console.log(res);
      toast.success(res.data.message);
      navigate("/login");
    } catch (err:any) {
      toast.error(err.response.data.message || "something went wrong");
      console.log(err);
    }
  };
  return (
    <>
           <div className="title">
  <small className="text-light">Welcome to PMS</small>
  <h4 className="heading-underline">Verify Account</h4>
</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4">
          <label htmlFor="">E-mail</label>
        </div>

        <div className="input-group  rounded-3">
          <input
            disabled={true}
            {...register("email")}
            type="email"
            className={`form-control ${
              errors.email ? "is-invalid" : ""
            } border-0 bg-light shadow-none`}
            placeholder="Enter Your Email"
            aria-label="email"
            aria-describedby="basic-addon1"
          />
        </div>
<div className="mt-4">
          <label htmlFor="">E-mail</label>
        </div>
        <div className="input-group rounded-3">
          <input
            {...register("code", {
              required: "this field is required",
            })}
            type="text"
            className={`form-control ${
              errors.code ? "is-invalid" : ""
            } border-0 bg-light shadow-none`}
            placeholder="Enter Verification"
            aria-label="code"
            aria-describedby="basic-addon1"
          />
        </div>
        {errors.code && (
          <span className="text-danger">{errors.code.message}</span>
        )}

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
