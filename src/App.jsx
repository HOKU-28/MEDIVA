import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/customer/Home";
import DoctorList from "./pages/customer/DoctorList";
import DoctorDetail from "./pages/customer/DoctorDetail";
import Booking from "./pages/customer/Booking";
import Chat from "./pages/customer/Chat";
import History from "./pages/customer/History";
import Profile from "./pages/customer/Profile";
import Blogs from "./pages/customer/Blogs";
import BlogDetail from "./pages/customer/BlogDetail";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import DoctorLayout from "./layouts/DoctorLayout";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorSchedule from "./pages/doctor/DoctorSchedule";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import PatientDetail from "./pages/doctor/PatientDetail";
import DoctorProfile from "./pages/doctor/DoctorProfile";

import { AppointmentProvider } from "./Context/AppointmentContext";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDoctors from "./pages/admin/AdminDoctors";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminServices from "./pages/admin/AdminServices";

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
    <AuthProvider>
      <AppointmentProvider>
        <BrowserRouter basename="/MEDIVA">
          <Routes>
            <Route element={<CustomerShell />}>
              <Route path="/" element={<Home />} />
              <Route path="/dokter" element={<DoctorList />} />
              <Route path="/dokter/:id" element={<DoctorDetail />} />
              <Route path="/booking/:id" element={<Booking />} />
              <Route path="/riwayat" element={<History />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:slug" element={<BlogDetail />} />
              <Route
                element={
                  <ProtectedRoute
                    allowedRoles={["customer"]}
                  />
                }
              >
                <Route path="/profil" element={<Profile />} />
              </Route>
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/konsultasi/:doctorId" element={<Chat />} />

            <Route
              path="/doctor"
              element={
                <ProtectedRoute
                  allowedRoles={["doctor"]}
                />
              }
            >
              <Route element={<DoctorLayout />}>
                <Route index element={<DoctorDashboard />} />
                <Route path="jadwal" element={<DoctorSchedule />} />
                <Route path="appointment" element={<DoctorAppointments />} />
                <Route path="appointment/:id" element={<PatientDetail />} />
                <Route path="profil" element={<DoctorProfile />} />
              </Route>
            </Route>

            <Route
              path="/admin"
              element={
                <ProtectedRoute
                  allowedRoles={["admin"]}
                />
              }
            >
              <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="doctors" element={<AdminDoctors />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="services" element={<AdminServices />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AppointmentProvider>
    </AuthProvider>
  );
}

export default App;
