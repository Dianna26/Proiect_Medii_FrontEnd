import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../navbar/navbar";

const Header = () => {
  return (
    <Fragment>
      <NavBar />
      <Outlet />
    </Fragment>
  );
};

export default Header;
