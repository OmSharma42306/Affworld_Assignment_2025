import {BrowserRouter,Route,Routes} from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"
import GoogleLogin from "./pages/GoogleLogin"
import Dashboard from "./components/Dashboard"
import TaskManagement from "./pages/TaskManagement"
function App() {


  return (
    <BrowserRouter>
    <div>
    
    <Routes>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
      <Route path="/googleLogin" element={<GoogleLogin/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/taskmanagement" element={<TaskManagement/>}></Route>
    </Routes>

    </div>
    </BrowserRouter>
  )
}

export default App
