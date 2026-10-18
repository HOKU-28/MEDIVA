import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/customer/Home";
import DoctorList from "./pages/customer/DoctorList";
import DoctorDetail from "./pages/customer/DoctorDetail";
import Booking from "./pages/customer/Booking";
import Chat from "./pages/customer/Chat";
import History from "./pages/customer/History";
import Profile from "./pages/customer/Profile";

import DoctorLayout from "./layouts/DoctorLayout";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorSchedule from "./pages/doctor/DoctorSchedule";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import PatientDetail from "./pages/doctor/PatientDetail";
import DoctorProfile from "./pages/doctor/DoctorProfile";

function CustomerShell() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename="/MEDIVA">
      <Routes>
        <Route element={<CustomerShell />}>
          <Route path="/" element={<Home />} />
          <Route path="/dokter" element={<DoctorList />} />
          <Route path="/dokter/:id" element={<DoctorDetail />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/riwayat" element={<History />} />
          <Route path="/profil" element={<Profile />} />
        </Route>

        {/* Chat page tanpa Navbar (full screen) */}
        <Route path="/konsultasi/:doctorId" element={<Chat />} />

        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<DoctorDashboard />} />
          <Route path="jadwal" element={<DoctorSchedule />} />
          <Route path="appointment" element={<DoctorAppointments />} />
          <Route path="appointment/:id" element={<PatientDetail />} />
          <Route path="profil" element={<DoctorProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
