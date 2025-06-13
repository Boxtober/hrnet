import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Home from "./pages/home/Home";
import Employees from "./pages/employees/Employees";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/employees" element={<Employees />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Provider>
  );
};

export default App;
