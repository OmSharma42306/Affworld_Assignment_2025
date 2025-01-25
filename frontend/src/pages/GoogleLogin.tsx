import {auth,googleProvider} from "../firebase"
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const GOOGLELOGIN_URL = import.meta.env.VITE_GOOGLE_LOGIN_URL
const GoogleLogin = () =>{
    const navigate = useNavigate(); 
    const handleGoogleLogin = async() =>{
        try{
            const result = await signInWithPopup(auth,googleProvider);
            const user = result.user;
            console.log("Name:", user.displayName); // User's name
            console.log("Email:", user.email); // User's email
            console.log("Photo URL:", user.photoURL); // User's profile picture
            const token = await user.getIdToken();
            // send the token to your backend for verification
            const responce = await axios.post(`${GOOGLELOGIN_URL}`,{
                token
            });
            if(responce.data.message === "Authenticated"){
                console.log("user authenticated!")
                console.log(responce)
                localStorage.setItem("token",token)
                alert("Login Successful!");
                navigate("/dashboard")
            }else{
                console.error("Authentication Failed!")
            }
        }catch(error){
            console.error("Error During Google Login,",error);
        }
    }

    return <button
    type="button"
    onClick={handleGoogleLogin}
    
    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    
    Sign in with Google
  </button>
    
}

export default GoogleLogin;