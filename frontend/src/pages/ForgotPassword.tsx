
import axios from "axios";
import { useState } from "react";
import VerifyOtp from "../components/VerifyOtp";

// Reading Base url from env
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h1 className="text-xl font-bold mb-4 text-gray-700">Forgot Password</h1>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={() => handleForgotPassword(email)}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full hover:bg-blue-600 transition"
        >
          Send OTP
        </button>
        <VerifyOtp email={email}></VerifyOtp>
      </div>
    </div>
  );
}

// handling function for Forgot Password Stuff.
async function handleForgotPassword(email: string) {
  const response = await axios.post(
    `${BACKEND_URL}/user/forgot-password`,
    {
      email,
    }
  );
  const responseData = await response.data;
  console.log(responseData);
  alert(responseData.message)
}
