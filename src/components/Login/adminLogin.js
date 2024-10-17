import React, { useState } from "react";
import { account } from "../AppWrite/appwriteLoginConfig";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Login</button>
        <button onClick={handleLogout}>Logout</button>
      </form>
    </div>
  );
};

export default AdminLogin;
