import { Sidebar as ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useNavigate } from "react-router-dom";

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
    const navigate = useNavigate();

  return (
    <ProSidebar className={className}>
      <Menu>

        <MenuItem onClick={() => navigate("/change-password")}>Change Password</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </ProSidebar>
  );
}
