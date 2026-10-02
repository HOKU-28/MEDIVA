import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/customer/Home";
import DoctorList from "./pages/customer/DoctorList";
import DoctorDetail from "./pages/customer/DoctorDetail";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dokter" element={<DoctorList />} />
        <Route path="/dokter/:id" element={<DoctorDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;