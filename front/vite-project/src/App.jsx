import Nav_bar from "./components/Navbar/Navbar";
import Home from "./views/Home/Home";
import { Login } from "./views/Login/Login";
import MisTurnos from "./views/MisTurnos";
import { Register } from "./views/Register/Register";
import { CreateTurn } from "./views/Appointment/appointment_schedule";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Nav_bar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/appointment/schedule" element={<CreateTurn />} />
          <Route path="/mis-turnos" element={<MisTurnos />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;