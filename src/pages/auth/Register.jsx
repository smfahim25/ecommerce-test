import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!/^01[3-9]\d{8}$/.test(phone)) {
      setError("Please enter a valid Bangladeshi phone number.");
      return;
    }

    try {
      const response = await axios.post("/api/register", { phone, password });
      if (response.data.success) {
        navigate("/login");
      }
    } catch (err) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

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
          Already account?{" "}
          <Link to={"/login"} className="text-[#0000FF]">
            Login
          </Link>
        </p>
        <button type="submit" className="bg-primary text-white p-2 w-full mt-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
