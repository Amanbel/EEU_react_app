import React, { useContext } from "react";
import Logo from "../assets/Logo.png";
import { Appcontext } from "../context";
import { Link } from "react-router-dom";

export default function Nav() {
  const {
    lightArray,
    handleLight,
    setLogin,
    setSignup,
    setCustInfo,
    EntityReg,
    setRes,
  } = useContext(Appcontext);

  const ind_0 = lightArray[0]
    ? { background: "#fea348", color: "white", borderRadius: "10px 10px 0 0" }
    : {};
  const ind_1 = lightArray[1]
    ? { background: "#fea348", color: "white", borderRadius: "10px 10px 0 0" }
    : {};
  const ind_2 = lightArray[2]
    ? { background: "#fea348", color: "white", borderRadius: "10px 10px 0 0" }
    : {};
  const ind_3 = lightArray[3]
    ? {
        background: "#fea348",
        color: "white",
        borderRadius: "10px 10px 0 0",
      }
    : {};

  return (
    <nav className="Customer_nav">
      <img alt="Logo" src={Logo} />
      <h2>
        Ethiopia Electric Utility<br></br> Power Line Managment
      </h2>
      <ul className="nav_links">
        <li style={ind_0} onClick={() => handleLight(0)}>
          <Link to="/home" style={ind_0}>
            Home
          </Link>
        </li>
        <li style={ind_1} onClick={() => handleLight(1)}>
          <Link to="/status" style={ind_1}>
            Status
          </Link>
        </li>
        <li style={ind_2} onClick={() => handleLight(2)}>
          <Link to="/mail" style={ind_2}>
            Mail
          </Link>
        </li>
        <li style={ind_3} onClick={() => handleLight(3)}>
          <Link to="/schedule" style={ind_3}>
            Schedule Appointment
          </Link>
        </li>
      </ul>
      <button>
        <Link
          to="/"
          style={{ textDecoration: "none", color: "black" }}
          onClick={() => {
            setCustInfo(revertDataSch);
            setLogin(revertDataLogin);
            setSignup(revertDataSignup);
            setRes(revertStatus);
          }}
        >
          Log out
        </Link>
      </button>
    </nav>
  );
}
