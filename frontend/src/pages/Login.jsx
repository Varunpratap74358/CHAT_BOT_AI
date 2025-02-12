import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { loginUser, btnLoading,isAuth } = UserData();
  const submitLoginForm = (e) => {
    e.preventDefault();
    try {
      loginUser(email, navigate);
    } catch (error) {
      toast.error("Somting went wrong");
    }
  };

 
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={submitLoginForm}
        className="bg-white p-6 rounded shadow-md w-full md:w-[500px]"
      >
        <h2 className="text-2xl mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            required
            className="border p-2 w-full rounded outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          disabled={btnLoading}
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all duration-200 cursor-pointer"
        >
          {btnLoading ? <LoadingSpinner /> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
