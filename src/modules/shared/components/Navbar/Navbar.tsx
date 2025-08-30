// Header.tsx
type NavbarProps = {
  className?: string;
};

export default function Header({ className }: NavbarProps) {
  return (
    <header className={`header ${className ?? ""}`}>
navbar    </header>
  );
}
