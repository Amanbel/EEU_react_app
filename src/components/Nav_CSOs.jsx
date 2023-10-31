import React, { useContext } from "react";
import Logo from "../assets/Logo.png";
import { Appcontext } from "../context";
import { Link } from "react-router-dom";

export default function Nav_cso() {
  const { lightArray, handleLight, EntityReg } = useContext(Appcontext);

  const C_ind_0 = lightArray[0]
    ? { background: "#fea348", color: "white", borderRadius: "10px 10px 0 0" }
    : {};
  const C_ind_1 = lightArray[1]
    ? { background: "#fea348", color: "white", borderRadius: "10px 10px 0 0" }
    : {};
  // const C_ind_2 = lightArray[2]
  //   ? { background: "#fea348", color: "white", borderRadius: "10px 10px 0 0" }
  //   : {};
  // const C_ind_3 = lightArray[3]
  //   ? {
  //       background: "#fea348",
  //       color: "white",
  //       borderRadius: "10px 10px 0 0",
  //     }
  //   : {};
  const revertDataSch = {
    userId: null,
    res_id: "",
    photo: "",
    serial_no: "",
    house_no: "",
    wereda: "",
    zone: "",
  };
  const revertDataSignup = {
    cust_id: null,
    first_name: "",
    last_name: "",
    Entity: EntityReg,
    Phone: "",
    Email: "",
    password: "",
  };
  const revertDataLogin = {
    User: "customer",
    Email: "",
    password: "",
  };
  const revertStatus = {
    status: 2,
    message: "unsuccessful",
  };
  return (
    <div>
      <nav className="Customer_nav">
        <img alt="Logo" src={Logo} />
        <h2>
          Ethiopia Electric Utility<br></br> Power Line Managment
        </h2>
        <ul className="nav_links">
          <li style={C_ind_0} onClick={() => handleLight(0)}>
            <Link to="/customer list" style={C_ind_0}>
              Customers
            </Link>
          </li>
          <li style={C_ind_1} onClick={() => handleLight(1)}>
            <Link to="/cso_to_tech" style={C_ind_1}>
              Send
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
        {/*or log in depending on the log value*/}
      </nav>
    </div>
  );
}
