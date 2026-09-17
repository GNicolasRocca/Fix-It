import Nav_bar from "./components/Navbar/Navbar";
import Home from "./views/Home/Home";
import { Login } from "./views/Account/Login";
import MyAppointments from "./views/Appointment/MyAppointments";
import { Register } from "./views/Account/Register";
import { ScheduleAppointment } from "./views/Appointment/AppointmentSchedule";
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
          <Route path="/appointment-schedule" element={<ScheduleAppointment />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;