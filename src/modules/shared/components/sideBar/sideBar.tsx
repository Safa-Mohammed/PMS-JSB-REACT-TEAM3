// Sidebar.tsx
type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  return (
    <p className={`sidebar ${className ?? ""}`}>
      Sidebarcontent
    </p>
  );
}
