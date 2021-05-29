export default function Nav({ children }) {
  return (
    <nav className="p-4 hidden lg:inline-block">
      <ul className="flex space-x-2">{children}</ul>
    </nav>
  );
}
