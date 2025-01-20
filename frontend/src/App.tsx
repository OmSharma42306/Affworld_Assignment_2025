import {BrowserRouter,Route,Routes} from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"

function App() {


  return (
    <BrowserRouter>
    <div>
    <Routes>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
    </Routes>

    </div>
    </BrowserRouter>
  )
}

export default App
