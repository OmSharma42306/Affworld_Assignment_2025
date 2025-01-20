import { useState } from "react"
import axios from "axios";
export default function NewPassword({email}:any){
    const [firstPassword,setFirstPassword] = useState<string>("");
    const [secondPassword,setSecondPassword] = useState<string>("");

    return <div>
        <input type="password" placeholder="Enter New Password" onChange={(e)=>{
            setFirstPassword(e.target.value)
        }} />
        <br />

        <input type="password" placeholder="Retype the Password" onChange={(e)=>{
            setSecondPassword(e.target.value);
        }}/>
        <br />
        <button onClick={()=>{
            handleResetPassword(firstPassword,secondPassword,email);
        }}>Reset</button>
    </div>
}


async function handleResetPassword(firstPassword:string,secondPassword:string,email:string){
    if(firstPassword !== secondPassword){
        alert("Passwords do not Match!")
        return;
    }

    const responce = await axios.post("http://localhost:3000/api/v1/user/reset-password",{
        email,
        firstPassword
    })

    const responceJson = await responce.data;
    if(responceJson.status === "Success"){
        alert("Password Reset Successfully!");
    }
    return;

}