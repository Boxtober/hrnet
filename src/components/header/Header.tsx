import React from "react";
import "./header.scss";
import { Link, useLocation } from "react-router-dom";
// import { ArrowBackIcon } from "@chakra-ui/icons";

const Header = () => {
  const location = useLocation();

  return (
    <div className="header-container">
      <div className="header">
        <h1 className="sr-only">HRnet</h1>
      </div>
      <div className="link-create">
        {location.pathname === "/" ? (
          <Link to="/employees">
            {/* <ArrowBackIcon style={{ marginRight: "0.5rem" }} /> */}
            View Current Employees
          </Link>
        ) : location.pathname === "/employees" ? (
          <Link to="/">
            {/* <ArrowBackIcon style={{ marginRight: "0.5rem" }} /> */}
            Home
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
