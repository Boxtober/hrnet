import React from "react";
import "./employees.scss";
import EmployeesTable from "../../components/employeesTable/EmployeesTable";
import Header from "../../components/header/Header";

const Employees = () => {
  return (
    <div className="main-container">
      <Header />
      <h2>Current Employees</h2>
      <EmployeesTable></EmployeesTable>
    </div>
  );
};

export default Employees;
