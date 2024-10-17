import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="d-flex gap-3 m-2">
      <Link to="/admin/createmovie">/admin/createmovie</Link>
      <Link to="/admin/updatemovie">admin/updatemovie</Link>
      <Link to="/admin/createwebseries">admin/createwebseries</Link>
      <Link to="/admin/updatewebseries">admin/updatewebseries</Link>
    </div>
  );
};

export default Navbar;
