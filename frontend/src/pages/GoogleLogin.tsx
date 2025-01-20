export default function GoogleLogin(){
    const handleLogin = () =>{
        window.location.href = 'http://localhost:3000/api/v1/auth/google'
    }
    return <div>
        <button onClick={handleLogin}>Login With Google</button>
    </div>
}