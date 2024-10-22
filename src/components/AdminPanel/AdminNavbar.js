import React from "react";
import { Link } from "react-router-dom";
import "./AdminNavbar.css"; // External CSS file for styling
import { FaHome } from "react-icons/fa";
const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <ul className="admin-navbar-menu">
        <li className="admin-navbar-item">
          <Link to="/" className="admin-navbar-link">
            <FaHome />
          </Link>
        </li>
        <li className="admin-navbar-item">
          <Link to="/admin/createmovie" className="admin-navbar-link">
            Create Movie
          </Link>
        </li>
        <li className="admin-navbar-item">
          <Link to="/admin/updatemovie" className="admin-navbar-link">
            Update Movie
          </Link>
        </li>
        <li className="admin-navbar-item">
          <Link to="/admin/createwebseries" className="admin-navbar-link">
            Create Webseries
          </Link>
        </li>
        <li className="admin-navbar-item">
          <Link to="/admin/updatewebseries" className="admin-navbar-link">
            Update Webseries
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
