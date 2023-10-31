import React, { useContext } from "react";
import Nav from "../../components/Nav_bar";
import Footer from "../../components/footer";
import axios from "axios";
import Mail_list from "../../components/Mail_list";
import { Appcontext } from "../../context";

export default function Mail() {
  const { handleContent, session } = useContext(Appcontext);
  const [obj_array, setObj] = React.useState([]);
  React.useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .post("http://localhost:80/api/getMessages.php/save", {
        cust_id: session,
      })
      .then((response) => {
        setObj(response.data);
      });
  }

  const mapped = obj_array.map((item) => {
    return (
      <Mail_list
        key={item.cust_id}
        from={item.from}
        content={item.content}
        anqour={"/view_mail"}
        handleContent={handleContent}
      />
    );
  });

  return (
    <div>
      <Nav />
      <div className="rec_cont">
        <h1>Received</h1>
        <div className="cust_list_head">
          <ul>
            <li>From</li>
            <li>Message</li>
          </ul>
        </div>
        <div className="Received_div">
          {/* <img alt="empty" src={empty_mail} />
          <h2>No Mail</h2> */}
          {mapped}
        </div>
      </div>
      <Footer />
    </div>
  );
}
