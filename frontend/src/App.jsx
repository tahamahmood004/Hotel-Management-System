import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Reservations from "./pages/Reservations";
import Invoice from "./pages/Invoice";
import Users from "./pages/Users";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/invoices/:id" element={<Invoice />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
