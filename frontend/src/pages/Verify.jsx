import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";
import { ChatData } from "../context/ChatContext";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const {btnLoading,verifyUser} = UserData()
  const {fetchChat} = ChatData()
  const naviget = useNavigate()

  const submitOtpForm = (e) => {
    e.preventDefault();
    try {
      verifyUser(Number(otp),naviget,fetchChat);
    } catch (error) {
      toast.error("Somting went wrong");
    }
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={submitOtpForm}
        className="bg-white p-6 rounded shadow-md w-full md:w-[500px]"
      >
        <h2 className="text-2xl mb-4">Verify OTP </h2>
        <div className="mb-4">
          <label htmlFor="otp" className="block text-gray-700 mb-2">
            OTP:
          </label>
          <input
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            id="otp"
            required
            className="border p-2 w-full rounded outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all duration-200 cursor-pointer"
        >
          {btnLoading ? <LoadingSpinner /> : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Verify;
