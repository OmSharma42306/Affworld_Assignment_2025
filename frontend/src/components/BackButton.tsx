import { useNavigate } from "react-router-dom"

export default function BackButton(){
    const navigate = useNavigate();
    const handleClick = () =>{
        navigate("/dashboard")
    }
    return <button onClick={handleClick}>
        Back 
    </button>
}