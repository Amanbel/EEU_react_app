import React from "react";
import { Appcontext } from "../context";
import { Link } from "react-router-dom";

export default function Cust_forTech(props) {
  return (
    <Link to={props.anqour} className="link_list">
      <ul className="all_cust_list" onClick={() => props.handleId(props.id)}>
        <li
          className="first_cust_elmt"
          style={{ width: "200px", height: "60px", overflow: "hidden" }}
        >
          {props.id}
        </li>
        {/* <li>{props.id}</li> */}
        <li>{props.name}</li>
        <li>{props.entity}</li>
        <li>{props.wereda}</li>
        <li>{props.zone}</li>
        <li>{props.houseNo}</li>
      </ul>
    </Link>
  );
}
