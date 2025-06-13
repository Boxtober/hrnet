import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import "./home.scss";
import Header from "../../components/header/Header";

const Home = () => {
  return (
    <div className="main-container">
      <Header />
      <h2>Create Employee</h2>
      <EmployeeForm />
    </div>
  );
};

export default Home;
