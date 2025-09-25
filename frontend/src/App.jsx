import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Reservations from "./pages/Reservations";
import Invoice from "./pages/Invoice";
import Users from "./pages/Users";
import Housekeeping from "./pages/Housekeeping";
import Maintenance from "./pages/Maintenance";
import Layout from "./components/Layout";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <Dashboard />} />
          <Route
            path="/rooms"
            element={
              <Layout>
                <Rooms />
              </Layout>
            }
          />
          <Route
            path="/reservations"
            element={
              <Layout>
                <Reservations />
              </Layout>
            }
          />
          <Route
            path="/invoices/:id"
            element={
              <Layout>
                <Invoice />
              </Layout>
            }
          />
          <Route
            path="/users"
            element={
              <Layout>
                <Users />
              </Layout>
            }
          />
          <Route
            path="/housekeeping"
            element={
              <Layout>
                <Housekeeping />
              </Layout>
            }
          />
          <Route
            path="/maintenance"
            element={
              <Layout>
                <Maintenance />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
