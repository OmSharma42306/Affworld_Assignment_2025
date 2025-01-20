import React, { useEffect, useState } from "react";
import axios from "axios";


export default function Dashboard(){
    const [user,setUser] = useState(null);

    useEffect(()=>{
        axios.get('http://localhost:3000/api/current_user',{withCredentials:true}).then((responce)=>{
            setUser(responce.data);
        }).catch((error)=>{
            console.error(error)
            setUser(null)
        })
    },[])
    
    const handleLogout = () => {
        window.location.href = 'http://localhost:3000/api/logout'
    }
    
    return(
        <div>
            {user ? (
                <>
                 <h1>Welcome, {user}</h1>
                 <button onClick={handleLogout}>Logout</button>
                </>
            ):(
                <h1>Please Login</h1>
            )}
    </div>
    )
     
}