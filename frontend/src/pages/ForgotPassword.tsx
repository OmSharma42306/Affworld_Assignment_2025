import axios from "axios"
import { useState } from "react"
import VerifyOtp from "../components/VerifyOtp"


export default function ForgotPassword(){
    
    const [email,setEmail] = useState<string>("")
    
    return <div>
        hi i am from forgot password.
        <br />
        <input type="email" name="email" placeholder="Email" onChange={(e)=>{
            setEmail(e.target.value)
        }} />

        <button onClick={()=>{handleForgotPassword(email)}}>Send Otp</button>
        <VerifyOtp email={email}></VerifyOtp>
    </div>
}

async function handleForgotPassword(email:string){
    const responce = await axios.post("http://localhost:3000/api/v1/user/forgot-password",{
        email,
    })
    const responceData = await responce.data;
    console.log(responceData);

    }
    


