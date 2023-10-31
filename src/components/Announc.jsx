import React from "react";

export default function Announc_cont(props) {
  return (
    <div className="Announc_cont">
      <div className="Ann_img_div">
        <img src={props.image} />
      </div>
      <div className="news_detail">
        <h3>{props.Ann}</h3>
      </div>
    </div>
  );
}
