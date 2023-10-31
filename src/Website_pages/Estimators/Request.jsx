import React, { useContext } from "react";
import Cust_element from "../../components/cust_element_list";
import empty_mail from "../../assets/empty_mail.png";
import { Appcontext } from "../../context";
import Nav_Est from "../../components/Nav_Estimator";
import Footer from "../../components/footer";
import axios from "axios";

export default function Est_req() {
  const { handleId } = useContext(Appcontext);
  const [comp_obj, setComp] = React.useState([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios.get("http://localhost:80/api/getSchedule.php").then((response) => {
      setComp(response.data);
    });
  }

  const mapedcomp = comp_obj.map((item) => {
    return (
      <Cust_element
        key={item.cust_id}
        id={item.cust_id}
        wire={item.wire_measure_date}
        task={item.work_date}
        status={item.status}
        material={item.materials}
        service={item.service}
        total={item.total_cost}
        handleId={handleId}
        anqour="/send_estimator"
      />
    );
  });
  return (
    <div>
      <Appcontext.Provider value={{ fetchData }}>
        <Nav_Est />
      </Appcontext.Provider>
      <div className="rec_cont">
        <h1>Requests for Estimation</h1>
        <div className="cust_list_head">
          <ul>
            <li>customer id</li>
            <li>Wire measurment date</li>
            <li>Task date</li>
            <li>status</li>
            <li>material cost</li>
            <li>Service cost</li>
            <li>total cost</li>
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
