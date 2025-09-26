import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuestHome from "./pages/GuestHome";
import GuestRoomDetails from "./pages/GuestRoomDetails";
// import GuestReservations from "./pages/GuestReservations";
import GuestLogin from "./pages/GuestLogin";
import GuestRegister from "./pages/GuestRegister";
import About from "./pages/About";
import Feedback from "./pages/Feedback";

// Components
import NavigationBar from "./components/Navbar";
import Footer from "./components/Footer";
function App() {
  return (
    <BrowserRouter>
      <NavigationBar />

      <Routes>
        <Route path="/" element={<GuestHome />} />
        <Route path="/room/:id" element={<GuestRoomDetails />} />
        {/* <Route path="/reservations" element={<GuestReservations />} /> */}
        <Route path="/login" element={<GuestLogin />} />
        <Route path="/register" element={<GuestRegister />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/feedback" element={<Feedback />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
