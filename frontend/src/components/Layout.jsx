import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "240px", padding: "1rem", width: "100%" }}>
        {children}
      </div>
    </div>
  );
}
