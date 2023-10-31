import React from "react";
import { Appcontext } from "../context";
import { Link } from "react-router-dom";

export default function Mail_list(props) {
  return (
    <Link to={props.anqour} className="link_list">
      <ul
        className="all_cust_list"
        onClick={() => props.handleContent(props.content)}
      >
        <li
          className="first_cust_elmt"
          style={{ width: "100px", fontSize: "25px" }}
        >
          {props.from}
        </li>
        <li style={{ width: "200px", height: "60px", overflow: "hidden" }}>
          {props.content}
        </li>
      </ul>
    </Link>
  );
}
