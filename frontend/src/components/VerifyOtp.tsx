import axios from "axios";
import { useState } from "react"
import NewPassword from "./NewPassword";
export default function VerifyOtp({email}:any){
    const [otp,setOtp] = useState<string>("");
    const [isVerified,setIsVerified] = useState<boolean>(false);

    const handleVerifyOtp = async(otp:string,email:string) =>{
        try{
            const responce = await axios.post("http://localhost:3000/api/v1/user/verify-otp",{
                email,
                otp
            })
            const responceJson = await responce.data;
            console.log(responceJson);
            if(responceJson.status === "Success"){
                console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
                setIsVerified(true);
            }else{
                alert('Invalid OTP')
            }
        }catch(error){
            console.error(error)
            alert("Error Verifying OTP")
        }
    }

    return(
        <div>
      {isVerified ? (
        <NewPassword email={email} /> // Render NewPassword if OTP is verified
      ) : (
        <div>
          <input
            type="text"
            name="otp"
            placeholder="Enter Otp"
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
          <button
            onClick={() => {
              handleVerifyOtp(otp, email);
            }}
          >
            Verify Otp
          </button>
        </div>
      )}
    </div>
   
   
   
   
   
    )
    // ) <div>
        
    //     <input type="text" name="otp"placeholder="Enter Otp" onChange={(e)=>{
    //         setOtp(e.target.value);
    //     }}/>
    //     <button onClick={()=>{
    //         handleVerifyOtp(otp,email)
    //     }}>Verify Otp</button>

    // </div>
}

// async function handleVerifyOtp(otp:string,email:string){
    
    
//}