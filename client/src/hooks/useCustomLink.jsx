import { Link, useMatch, useResolvedPath } from "react-router-dom";

const useCustomLink = ({ children, to, ...props }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });
  const activeClassName = "active nav-link";
  return (
    <Link
      className={match ? activeClassName : "nav-link link-dark"}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
};
export default useCustomLink;
