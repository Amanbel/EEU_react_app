import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Appcontext } from "./context";

export default function Login() {
  const navigate = useNavigate();
  const {
    nav_switch,
    handleNav,
    // handleSession,
    handleLight,
    handleLogSubmit,
    handleLogin,
    resdata,
    routing,
    ErrStyle,
    // setNav,
  } = useContext(Appcontext);

  const stylz = resdata["status"] != 1 ? {} : { border: "1px solid red" };
  // const linkRef = resdata["route"] == 0 ? routing : "";
  // console.log(linkRef);
  return (
    <div className="log_back">
      <div className="linear_back">
        <div className="log_form_cont">
          <h2>Log in</h2>
          <form className="log_form" onSubmit={handleLogSubmit}>
            <select name="User" onChange={handleLogin} /*value={nav_switch}*/>
              <option value="customer">Customer</option>
              <option value="estimator">Estimator</option>
              <option value="cso">CSO</option>
              <option value="technicians">Technician</option>
              <option value="Admin">Admin</option>
            </select>
            <input
              type="email"
              name="Email"
              placeholder="Email Address"
              onChange={handleLogin}
              style={stylz}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleLogin}
              style={stylz}
            />
            {/* <button>Log in</button> */}
            {resdata["status"] == 1 && (
              <h3 style={{ color: "red" }}>Wrong Email/Password</h3>
            )}

            {/* <Link
              to={resdata["route"]}
              style={{
                textDecoration: "none",
                color: "black",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            > */}
            <button
              onClick={
                /*resdata["status"] == 0*/() => {navigate("/home")}
              }
            >
              Log in
            </button>
            {/* </Link> */}
            <h4>Or</h4>
            <button type="button">
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "black" }}
              >
                Sign up
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
