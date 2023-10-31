import React from "react";
import { Appcontext } from "../context";
import { Link } from "react-router-dom";

export default function Cust_element(props) {
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
        <li>{props.wire}</li>
        <li>{props.task}</li>
        <li>{props.status}</li>
        <li>{props.material}</li>
        <li>{props.service}</li>
        <li>{props.total}</li>
      </ul>
    </Link>
  );
}
