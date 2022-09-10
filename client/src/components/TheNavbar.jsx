import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import useToast from "../hooks/useToast";
import { BoxArrowRight } from "react-bootstrap-icons";

const TheNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    useToast("See you soon!", true);
    dispatch(logout());
    navigate("/signin", { replace: true });
  };
  return (
    <nav
      className="navbar navbar-expand-lg bg-light py-2"
      style={{ marginLeft: 280, borderBottom: "1px solid #ccc", height: 70 }}
    >
      <div className="container-fluid">
        <div className="d-flex align-items-center w-100 justify-content-end">
          <div className="d-flex align-items-center">
            <div className="nav-item dropdown me-5">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown link
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
            <button
              className="btn btn-primary d-flex align-items-center me-4"
              onClick={logoutHandler}
            >
              Logout <BoxArrowRight className="ms-2 " />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TheNavbar;
