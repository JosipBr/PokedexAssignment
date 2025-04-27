import { Link, Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

export default function App() {
  return (
    <div className="container">
      <Navbar />
      <Outlet />{" "}
    </div>
  );
}
