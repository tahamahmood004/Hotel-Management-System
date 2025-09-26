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
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rooms"
            element={
              <ProtectedRoute roles={["admin", "receptionist"]}>
                <Layout>
                  <Rooms />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reservations"
            element={
              <ProtectedRoute roles={["admin", "receptionist", "guest"]}>
                <Layout>
                  <Reservations />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoices/:id"
            element={
              <ProtectedRoute roles={["admin", "receptionist"]}>
                <Layout>
                  <Invoice />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute roles={["admin"]}>
                <Layout>
                  <Users />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/housekeeping"
            element={
              <ProtectedRoute roles={["admin", "receptionist"]}>
                <Layout>
                  <Housekeeping />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/maintenance"
            element={
              <ProtectedRoute roles={["admin", "receptionist"]}>
                <Layout>
                  <Maintenance />
                </Layout>
              </ProtectedRoute>
            }
          />
          {/* Default route */}
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
