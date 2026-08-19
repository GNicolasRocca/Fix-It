import Nav_bar from "./components/Navbar/Navbar";
import Home from "./views/Home/Home";
import { Login } from "./views/Login/Login";
import MisTurnos from "./views/MisTurnos";
import { Register } from "./views/Register/Register";
import { CreateTurn } from "./views/Appointment/appointment_schedule";
import { Route, Routes } from "react-router-dom";

function App(){
  return (
    <>
      <Nav_bar />

      <Routes>
        <Route path="/home" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/appointment/schedule" element={<CreateTurn />} />
        <Route path="/mis-turnos" element={<MisTurnos />} />
      </Routes>
    </>
  )
}

export default App;