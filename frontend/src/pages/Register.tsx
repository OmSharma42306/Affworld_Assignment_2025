import { useState } from "react"
import axios from "axios";
export default function Register(){
    const[name,setName] = useState<string>("");
    const[email,setEmail] = useState<string>("");
    const[password,setPassword] = useState<string>("");
    return <div>
        <h1 className="bg-red-400">Register Page</h1>

        <input type="text" name="name" placeholder="Name" onChange={(e)=>{
            setName(e.target.value)
            console.log(name)
        }} />
        <br />
        <input type="email" name="email" placeholder="Email" onChange={(e)=>{
            setEmail(e.target.value)
            console.log(email)
        }} />
        <br />
        <input type="password" name="password" placeholder="Password" onChange={(e)=>{
            setPassword(e.target.value)
            console.log(password)
        }} />
        <br />

        <button onClick={()=>{
            handleRegister(name,email,password)
        }}>Register</button>


    </div>
}

async function handleRegister(name:string,email:string,password:string){
    console.log("Name is :",name)
    console.log("Name is :",email)
    console.log("Name is :",password)
    const responce = await axios.post("http://localhost:3000/api/v1/user/signup",{
        name,
        email,
        password
    })
    const responceData = await responce.data;
    console.log(responceData);
}