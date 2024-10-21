import React, { useState } from "react";
import { account } from "../AppWrite/appwriteLoginConfig";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "./adminLogin.css"; // Create a CSS file to include your styles
import bgImg from "../../img/section/section.jpg";
import logo from "../../img/logo.svg";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  let navigate = useNavigate();
  // Admin credentials (for validation)
  // const adminEmail = "lakkakulababblu@gmail.com";

  // Check if the user is already logged in
  useEffect(() => {
    account.get().then(
      (response) => {
        console.log("Already logged in:", response);
      },
      (error) => {
        console.log("Not logged in", error);
      }
    );
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    // if (email !== adminEmail) {
    //   setError("Invalid admin credentials");
    //   return;
    // }

    try {
      // Log in with email and password
      await account.createEmailPasswordSession(email, password);
      console.log("Admin logged in successfully");
      navigate("/admin/createmovie");
      // Redirect to admin dashboard or some other page
    } catch (err) {
      // Display specific error message from Appwrite
      setError(`Login failed: ${err.message}`);
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      console.log("Logged out successfully");
      // Redirect to login page
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  return (
    <div
      className="sign section--bg bg_img"
      style={{ backgroundImage: `url${bgImg}` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sign__content">
              {/* Authorization form */}
              <form onSubmit={handleLogin} className="sign__form">
                <a href="index.html" className="sign__logo">
                  <img src={logo} alt="Logo" />
                </a>

                <div className="sign__group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="sign__input"
                    placeholder="Email"
                  />
                </div>

                <div className="sign__group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="sign__input"
                    placeholder="Password"
                  />
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type="submit" className="sign__btn">
                  Log in
                </button>

                <span className="sign__text">
                  Want to logout{" "}
                  <a onClick={handleLogout} className="lgOut">
                    Logout
                  </a>
                </span>
              </form>
              {/* End authorization form */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
