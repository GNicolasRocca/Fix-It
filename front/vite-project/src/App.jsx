import Nav_bar from "./components/Navbar/Navbar";
import Home from "./views/Home/Home";
import { Login } from "./views/Account/Login";
import MyAppointments from "./views/Appointment/MyAppointments";
import { Register } from "./views/Account/Register";
import { ScheduleAppointment } from "./views/Appointment/AppointmentSchedule";
import { Navigate, Route, Routes } from "react-router-dom";
import { AboutUs } from "./views/About-us/AboutUs";

function App() {
  return (
    <div className="app">
      <Nav_bar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/register" element={<Register />} />
          <Route path="/appointments/schedule" element={<ScheduleAppointment />} />
          <Route path="/appointments/my-appointments" element={<MyAppointments />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;