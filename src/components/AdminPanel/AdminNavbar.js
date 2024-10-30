import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { account } from "../AppWrite/appwriteLoginConfig";

import "./AdminNavbar.css"; // External CSS file for styling
import { FaHome } from "react-icons/fa";
import Cookies from "js-cookie";
const AdminNavbar = () => {
  let navigate = useNavigate();
  const handleLogout = async () => {
    var result = window.confirm("Are you sure you want to logout");
    if (result) {
      try {
        await account.deleteSession("current");
        console.log("Logged out successfully");
        Cookies.remove("loginStatus");

        navigate("/admin/login");
        // Redirect to login page
      } catch (err) {
        console.error("Logout failed", err);
      }
    }
  };
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
        <button
          onClick={handleLogout}
          className="admin-navbar-item text-light "
        >
          Logout
        </button>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
