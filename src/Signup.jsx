import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Appcontext } from "./context";

export default function Signup() {
  const { EntityReg, handleSignSubmit, handleChangeSign, handleCon, conNum } =
    useContext(Appcontext);
  return (
    <div className="log_back">
      <div className="linear_back">
        <div className="log_form_cont">
          <h2>Sign up</h2>
          <form className="log_form sign_form" onSubmit={handleSignSubmit}>
            <select name="Entity" onChange={handleChangeSign}>
              <option value="Ind">Individual</option>
              <option value="Org">Organization</option>
              <option value="Comp">Company</option>
              <option value="Gov">Government</option>
            </select>
            <input
              type="text"
              name="first_name"
              placeholder={EntityReg == "Ind" ? "First Name" : "Name"}
              onChange={handleChangeSign}
            />
            {EntityReg == "Ind" && (
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                onChange={handleChangeSign}
              />
            )}
            <input
              type="number"
              name="Phone"
              placeholder="Phone Number"
              onChange={handleChangeSign}
            />
            <input
              type="email"
              name="Email"
              placeholder="Email Address"
              onChange={handleChangeSign}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChangeSign}
            />
            <input
              type="password"
              name="Confpassword"
              placeholder="Confirm Password"
              onChange={handleCon}
            />
            {conNum == 2 && <h3>please fill out all Required information</h3>}
            {conNum == 0 && <h3>Please confirm password</h3>};
            <button>Sign up</button>
            <h4>Or</h4>
            <button type="button">
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                Log in
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
