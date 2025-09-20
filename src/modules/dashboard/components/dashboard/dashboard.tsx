import styles from "./dashboard.module.css";
import { useAuthContext } from "../../../../context/AuthContext";
import TaskCountChart from "../../../shared/components/TaskCountChart/TaskCountChart";
import UserActiveChart from "../../../shared/components/UserActiveChart/UserActiveChart";

export default function Dashboard() {
  
  let { userData } = useAuthContext();


  return (
    <>
      <div className="p-4">
        <div className={styles.heroSection}>
          <div className={styles.textContainer}>
            <h2 className={styles.title}>
              <span className={styles.first}>Welcome</span>{" "}
              <span className={styles.second}>{userData?.userName}</span>
            </h2>
            <h3 className={styles.subtitle}>
              You can add project and assign tasks to your team
            </h3>
          </div>
        </div>
      </div>


 <div className="container mt-3">
        <div className="row">
        <div className=" col-md-6 ">
        <div className="d-inline-block ps-3 mb-4">
  <div style={{ borderLeft: "4px solid orange", paddingLeft: "10px" }}>
    <h4 className="fw-bold mb-1">Tasks</h4>
    <p style={{ color: "gray", margin: 0 }}>State of Users Tasks</p>
      </div>
          </div>
          <TaskCountChart/>
        </div>



<div className=" col-md-6 ">
        <div className="d-inline-block ps-3 mb-4">
  <div style={{ borderLeft: "4px solid orange", paddingLeft: "10px" }}>
    <h4 className="fw-bold mb-1">Users</h4>
    <p style={{ color: "gray", margin: 0 }}>State of Users acivation</p>
      </div>
          </div>
          <UserActiveChart/>
        </div>

        
        </div>
      </div>
    </>
  );
}
