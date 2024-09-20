import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate phone number format
    if (!/^01[3-9]\d{8}$/.test(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    try {
      const response = await axios.post("/api/login", { phone, password });
      if (response.data.token) {
        localStorage.setItem("jwtToken", response.data.token);
        navigate("/");
      }
    } catch (err) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

        <input
          type="text"
          placeholder="Phone (e.g. 017xxxxxxxx)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        {error && <p className="text-red-500 mt-[-5px]">{error}</p>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <p>
          Not a account?{" "}
          <Link to={"/signup"} className="text-[#0000FF]">
            Create account
          </Link>
        </p>
        <button type="submit" className="bg-primary text-white p-2 w-full mt-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
