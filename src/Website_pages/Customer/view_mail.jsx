import React, { useContext } from "react";
import Footer from "../../components/footer";
import Nav from "../../components/Nav_bar";

export default function View_mail(props) {
  return (
    <div>
      <Nav />
      <div className="send_cont">
        <h1>Sent From Customer Service Operator</h1>
        <div className="msg_content">
          <h3>Content:</h3>
          <form>
            <textarea
              className="cso_textarea"
              name="content"
              value={props.content}
            />
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
