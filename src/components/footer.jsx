import React from "react";

export default function Footer() {
  return (
    <div className="footer_div">
      <div>
        <h2>Contacts</h2>
        <ul>
          <li style={{ marginTop: "20px", listStyle: "none" }}>
            Office Tel: 0911786910
          </li>
          <li style={{ marginTop: "20px", listStyle: "none" }}>
            Email: EEUPower@gmail.com
          </li>
          <li style={{ marginTop: "20px", listStyle: "none" }}>Po box: 883</li>
        </ul>
      </div>
      <div>
        <h2>Socials</h2>
        <ul>
          <li style={{ marginTop: "20px", listStyle: "none" }}>Facebook</li>
          <li style={{ marginTop: "20px", listStyle: "none" }}>Telegram</li>
          <li style={{ marginTop: "20px", listStyle: "none" }}>Instagram</li>
        </ul>
      </div>
      <div>
        <h2>Services</h2>
        <ul>
          <li style={{ marginTop: "20px", listStyle: "none" }}>
            Scheduale Appointment
          </li>
          <li style={{ marginTop: "20px", listStyle: "none" }}>
            Check Appointment Status
          </li>
          <li style={{ marginTop: "20px", listStyle: "none" }}>
            Received Mail
          </li>
        </ul>
      </div>
    </div>
  );
}
