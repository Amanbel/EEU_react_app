import React, { useContext } from "react";
import Logo from "../assets/Logo.png";
import { Appcontext } from "../context";
import { Link } from "react-router-dom";

export default function Nav_Est() {
  const { EntityReg, fetchData } = useContext(Appcontext);

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

  // console.log(E_ind_0, ind_1, C_ind_2);
  return (
    <div>
      <nav className="Customer_nav">
        <img alt="Logo" src={Logo} />
        <h2>
          Ethiopia Electric Utility<br></br> Power Line Managment
        </h2>
        <ul className="nav_links">
          <li
            style={{
              background: "#fea348",
              color: "white",
              borderRadius: "10px 10px 0 0",
            }}
          >
            <Link
              to="/requests"
              style={{
                background: "#fea348",
                color: "white",
                borderRadius: "10px 10px 0 0",
              }}
              onClick={fetchData}
            >
              Requests
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
    </div>
  );
}
