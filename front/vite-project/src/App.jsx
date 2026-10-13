import Nav_bar from "./components/Navbar/Navbar";
import Home from "./views/Home/Home";
import { Login } from "./views/Account/Login";
import { DeleteAccount } from "./views/Account/DeleteAccount";
import UserProfile from "./views/Account/UserProfile";
import EditAccount from "./views/Account/EditAccount";
import MyAppointments from "./views/Appointment/MyAppointments";
import OccupiedAppointments from "./views/Appointment/OccupiedAppointments";
import { Register } from "./views/Account/Register";
import { ScheduleAppointment } from "./views/Appointment/AppointmentSchedule";
import { Navigate, Route, Routes } from "react-router-dom";
import { AboutUs } from "./views/About-us/AboutUs";

import AdminRoute from "./components/Auth/AdminRoute";
import { AdminUsers, AdminUserDetail } from "./views/Admin/AdminUsers";

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
          <Route path="/users/delete" element={<DeleteAccount />} />
          <Route path="/users/user" element={<UserProfile />} />
          <Route path="/users/edit" element={<EditAccount />} />
          <Route path="/appointments/schedule" element={<ScheduleAppointment />} />
          <Route path="/appointments/my-appointments" element={<MyAppointments />} />
          <Route path="/appointments" element={<OccupiedAppointments />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminUsers />} />
            <Route path="/admin/users/:id" element={<AdminUserDetail />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
