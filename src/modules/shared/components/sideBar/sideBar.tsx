import { Sidebar as ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../context/AuthContext"; // import your context

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
    const navigate = useNavigate();
    const { logout } = useAuthContext(); // get logout function from context

  const handleLogout = () => {
    logout();           // remove token and clear user data
    navigate("/login"); // redirect to login page
  };

  return (
    <ProSidebar className={className}>
      <Menu>
        <MenuItem onClick={() => navigate("/dashboard/users-list")}>Users</MenuItem>
        <MenuItem onClick={() => navigate("/dashboard/projects-list")}>Projects</MenuItem>
                <MenuItem onClick={() => navigate("/dashboard/tasks-list")}>Tasks</MenuItem>

        <MenuItem onClick={() => navigate("/change-password")}>Change Password</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </ProSidebar>
  );
}