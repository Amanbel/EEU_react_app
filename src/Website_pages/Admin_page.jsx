import React, { useContext } from "react";
import { Appcontext } from "../context";
import { useNavigate } from "react-router-dom";
import Nav_Admin from "../components/Nav_Admin";
import Footer from "../components/footer";

export default function Admin() {
  const { handleAdminSubmit, handleEmpChange, adminError } =
    useContext(Appcontext);
  const navigate = useNavigate();

  function toList() {
    navigate("/Administrator");
  }

  return (
    <div>
      <Nav_Admin />
      <div className="admin_cont">
        <h1>Add Employees</h1>
        <form className="admin_form" onSubmit={handleAdminSubmit}>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            onChange={handleEmpChange}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            onChange={handleEmpChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleEmpChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleEmpChange}
          />
          <select name="Emp_type" onChange={handleEmpChange}>
            <option value="cso">Customer Service Operator</option>
            <option value="estimator">Estimator</option>
            <option value="technicians">Technician Group</option>
          </select>
          {adminError != 0 && (
            <h3 style={{ color: "red" }}>Employee email already exists</h3>
          )}
          <button>Save</button>
          <button type="button" style={{ color: "red" }} onClick={toList}>
            Cancel
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
