import { useAuthContext } from "../../../../context/AuthContext";
import navlogo from '../../../../assets/images/authlogo.svg';
import pic from '../../../../assets/images/pic.png'
export default function Header() {
  let { userData } = useAuthContext();

  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        
        {/* Logo + System Name */}
        <div className="d-flex align-items-center">
          <img src={navlogo} alt="logo" style={{ width: "170px", height: "40px" }} />
        </div>

        {/* Right side: Notification + User */}
        <div className="d-flex align-items-center gap-3">
          {/* Notification Icon from bootstrap-icons */}
          <i className="bi bi-bell text-warning fs-5"></i>

          {/* User Info */}
          <div className="d-flex align-items-center">
            <img
              src={pic}
              alt="user"
              className="rounded-circle"
              style={{ width: "40px", height: "40px" }}
            />
            <div className="ms-2">
              <div className="fw-bold">{userData?.userGroup || "Upskilling"}</div>
              <div className="text-muted small">{userData?.userEmail}</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
