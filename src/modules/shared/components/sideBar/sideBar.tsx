import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../../../context/AuthContext";
import { useState } from "react";
import styles from './sidebar.module.css';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthContext();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const ToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={styles.sidebarContainer}>
      <ProSidebar collapsed={isCollapsed}>
        <Menu>
          <div className={styles.iconSidebar} onClick={ToggleCollapse}>
            <i className="fa fa-angle-left fs-3"></i>
          </div>

          <MenuItem
            icon={<i className="fa fa-home"></i>}
            onClick={() => navigate("/dashboard")}
            active={isActive("/dashboard")}
          >
            Home
          </MenuItem>

          <MenuItem
            icon={<i className="fa fa-users"></i>}
            onClick={() => navigate("/dashboard/users-list")}
            active={isActive("/dashboard/users-list")}
          >
            Users
          </MenuItem>

          <MenuItem
            icon={<i className="fa fa-clipboard-list"></i>}
            onClick={() => navigate("/dashboard/projects-list")}
            active={isActive("/dashboard/projects-list")}
          >
            Projects
          </MenuItem>

          <MenuItem
            icon={<i className="fa fa-tasks"></i>}
            onClick={() => navigate("/dashboard/tasks-list")}
            active={isActive("/dashboard/tasks-list")}
          >
            Tasks
          </MenuItem>

          <MenuItem
            icon={<i className="fa fa-key"></i>}
            onClick={() => navigate("/change-password")}
            active={isActive("/change-password")}
          >
            Change Password
          </MenuItem>

          <MenuItem
            icon={<i className="fa fa-sign-out-alt"></i>}
            onClick={handleLogout}
          >
            Logout
          </MenuItem>
        </Menu>
      </ProSidebar>
    </div>
  );
}
