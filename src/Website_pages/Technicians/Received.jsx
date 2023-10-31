import React, { useContext } from "react";
import Cust_element from "../../components/cust_element_list";
import empty_mail from "../../assets/empty_mail.png";
import { Appcontext } from "../../context";
import Nav_tech from "../../components/Nav_tech";
import Footer from "../../components/footer";
import axios from "axios";
import Cust_forTech from "../../components/cust_for_tech";

export default function Tech_rec() {
  const { handleId, session } = useContext(Appcontext);
  const [comp_obj, setComp] = React.useState([]);

  React.useEffect(() => {
    getCust();
  }, []);

  function getCust() {
    axios
      .post("http://localhost:80/api/handleCustomerRequest.php/save", {
        sessId: session,
      })
      .then((response) => {
        setComp(response.data);
      });
  }

  const mapedcomp = comp_obj.map((item) => {
    return (
      <Cust_forTech
        key={item.cust_id}
        id={item.cust_id}
        name={item.full_name}
        entity={item.Entity}
        wereda={item.wereda}
        zone={item.Zone}
        houseNo={item.house_no}
        handleId={handleId}
        anqour="/technician_send"
      />
    );
  });
  return (
    <div>
      <Appcontext.Provider value={{ getCust }}>
        <Nav_tech />
      </Appcontext.Provider>
      <div className="rec_cont">
        <h1>Customers Requesting Services</h1>
        <div className="cust_list_head">
          <ul>
            <li>id</li>
            <li>Name</li>
            <li>Entity</li>
            <li>Wereda</li>
            <li>Zone</li>
            <li>HouseNo</li>
          </ul>
        </div>
        <div
          className="Received_div request_div"
          style={{
            maxHeight: "400px",
            overflowX: "scroll",
          }}
        >
          {comp_obj.length == 0 && <img alt="empty" src={empty_mail} />}
          {comp_obj.length == 0 && <h2>No Mail</h2>}
          {mapedcomp}
        </div>
      </div>
      <Footer />
    </div>
  );
}
