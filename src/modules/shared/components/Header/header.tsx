// Header.tsx
type HeaderProps = {
  className?: string;
};

export default function Header({ className }: HeaderProps) {
  return (
    <header className={`header ${className ?? ""}`}>
      Header content
    </header>
  );
}
