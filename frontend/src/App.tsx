import {BrowserRouter,Route,Routes} from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"
import GoogleLogin from "./pages/GoogleLogin"
import Dashboard from "./components/Dashboard"
import TaskManagement from "./pages/TaskManagement"
import Post from "./pages/Post"
import AllPosts from "./pages/AllPosts"
import LandingPage from "./pages/LandingPage"



function App() {


  return (
    <BrowserRouter>
    <div>
        {/* Declared All Routes Related to WebApp */}
    <Routes>
      <Route path="/" element={<LandingPage/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
      <Route path="/googleLogin" element={<GoogleLogin/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/taskmanagement" element={<TaskManagement/>}></Route>
      <Route path="/post" element={<Post/>}></Route>
      <Route path="/allPosts" element={<AllPosts/>}></Route>
    </Routes>

    </div>
    </BrowserRouter>
  )
}

export default App
