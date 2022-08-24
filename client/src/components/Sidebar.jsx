import React from "react";
import { BootstrapFill, HouseDoor, PeopleFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import CustomLink from "../hooks/useCustomLink";

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light vh-100"
      style={{ width: 280, marginTop: -54 }}
    >
      <Link
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
      >
        <BootstrapFill width={40} height={32} className="me-2" />
        <span className="fs-4">Sidebar</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <CustomLink to="/">
            <HouseDoor
              width={16}
              height={16}
              className="me-2"
              style={{ verticalAlign: "-0.125em" }}
            />
            Home
          </CustomLink>
        </li>
        <li>
          <CustomLink to="/users">
            <PeopleFill
              width={16}
              height={16}
              className="me-2"
              style={{ verticalAlign: "-0.125em" }}
            />
            Users
          </CustomLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
