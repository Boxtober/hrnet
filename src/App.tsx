import "./App.css";
import Home from "./pages/home/Home";
import Employees from "./pages/employees/Employees";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/employees" element={<Employees />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
