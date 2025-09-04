import { Sidebar as ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { useAuthContext } from "../../../../context/AuthContext"; // import your context
=======
>>>>>>> 039291319b97fc4b7be0529824d760e572ada27f

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
    const navigate = useNavigate();
<<<<<<< HEAD
    const { logout } = useAuthContext(); // get logout function from context

  const handleLogout = () => {
    logout();           // remove token and clear user data
    navigate("/login"); // redirect to login page
  };
=======
>>>>>>> 039291319b97fc4b7be0529824d760e572ada27f

  return (
    <ProSidebar className={className}>
      <Menu>
<<<<<<< HEAD
        <MenuItem onClick={() => navigate("/dashboard/users-list")}>Users</MenuItem>
        <MenuItem onClick={() => navigate("/dashboard/projects-list")}>Projects</MenuItem>
                <MenuItem onClick={() => navigate("/dashboard/tasks-list")}>Tasks</MenuItem>

        <MenuItem onClick={() => navigate("/change-password")}>Change Password</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
=======

        <MenuItem onClick={() => navigate("/change-password")}>Change Password</MenuItem>
        <MenuItem>Logout</MenuItem>
>>>>>>> 039291319b97fc4b7be0529824d760e572ada27f
      </Menu>
    </ProSidebar>
  );
}
