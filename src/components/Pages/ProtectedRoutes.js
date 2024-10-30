import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutes = () => {
  const [loginStatus, setLoginStatus] = useState(null); // Initial state as null to indicate loading

  useEffect(() => {
    // Retrieve login status from the cookie
    const statuse = Cookies.get("loginStatus");
    console.log("stus", statuse);
    setLoginStatus(statuse === "loggedIn"); // Set loginStatus to true if cookie value is "loggedIn"
  }, []);

  if (loginStatus === null) {
    // Optional: Add a loading state or spinner here if needed
    return null; // or a loading indicator
  }

  console.log("statuslog", loginStatus);
  return loginStatus ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default ProtectedRoutes;
