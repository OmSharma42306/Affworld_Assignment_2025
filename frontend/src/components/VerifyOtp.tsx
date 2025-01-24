import axios from "axios";
import { useState } from "react";
import NewPassword from "./NewPassword";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export default function VerifyOtp({ email }: any) {
  const [otp, setOtp] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const handleVerifyOtp = async (otp: string, email: string) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/verify-otp`,
        {
          email,
          otp,
        }
      );
      const responseJson = await response.data;
      if (responseJson.status === "Success") {
        setIsVerified(true);
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      alert("Error Verifying OTP");
    }
  };

  return (
    <div className="mt-6">
      {isVerified ? (
        <NewPassword email={email} />
      ) : (
        <div className="flex flex-col">
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            onClick={() => handleVerifyOtp(otp, email)}
            className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition"
          >
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
}
