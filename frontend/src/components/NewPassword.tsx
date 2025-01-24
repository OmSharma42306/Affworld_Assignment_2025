import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export default function NewPassword({ email }: any) {
  const [firstPassword, setFirstPassword] = useState<string>("");
  const [secondPassword, setSecondPassword] = useState<string>("");
  const navigate = useNavigate();

  async function handleResetPassword(
    firstPassword: string,
    secondPassword: string,
    email: string
  ) {
    if (firstPassword !== secondPassword) {
      alert("Passwords do not match!");
      return;
    }

    const response = await axios.post(
      `${BACKEND_URL}/user/reset-password`,
      {
        email,
        firstPassword,
      }
    );
    const responseJson = await response.data;
    if (responseJson.status === "Success") {
      alert("Password Reset Successfully!");
      navigate("/login");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h1 className="text-xl font-bold mb-4 text-gray-700">Reset Password</h1>
        <input
          type="password"
          placeholder="Enter New Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setFirstPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Retype New Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setSecondPassword(e.target.value)}
        />
        <button
          onClick={() => handleResetPassword(firstPassword, secondPassword, email)}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full hover:bg-blue-600 transition"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
