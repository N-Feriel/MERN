export default function NavItem({ href, isActive, children }) {
  return (
    <li>
      <a
        href={href}
        className={`block px-4 py-2 text-lg rounded-md ${
          isActive ? "bg-blue-100 text-blue-900" : ""
        }`}
      >
        {children}
      </a>
    </li>
  );
}
