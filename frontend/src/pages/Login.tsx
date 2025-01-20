import { useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
export default function Login(){
    const [email,setEmail] =  useState<string>("");
    const [password,setPassword] = useState<string>("");
    return <div>
        
        <h1>Login Page</h1>
        <input type="email`" name="email" placeholder="Email" onChange={(e)=>{
            setEmail(e.target.value)
        }} />
        <br />
        <input type="password" name="password" placeholder="Password" onChange={(e)=>{
            setPassword(e.target.value)
        }} />
        <br />

        <button onClick={()=>handleLogin(email,password)}>Login</button>
        
        {/* <button onClick={()=>handleForgetPassword(email)}>Forgot Password</button> */}
        <Link to="/forgot-password">Forgot Password</Link>
    </div>
}

async function handleLogin(email:string,password:string){
    console.log(email);
    console.log(password);
    const response = await axios.post("http://localhost:3000/api/v1/user/login",{
        email,
        password
    })
    const responceJson = await response.data
    console.log(responceJson)
    localStorage.setItem('token',responceJson.token);
    console.log("Token ",responceJson.token)

}

