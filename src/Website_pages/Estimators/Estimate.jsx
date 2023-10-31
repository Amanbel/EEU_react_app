import React, { useContext } from "react";
import Est_list from "../../components/estimation_input";
import { Appcontext } from "../../context";
import Nav_Est from "../../components/Nav_Estimator";
import Footer from "../../components/footer";
import axios from "axios";

export default function Estimate(props) {
  const { session, handleEstMessChange, handleEstMessSubmit } =
    useContext(Appcontext);
  const [arrState, setArr] = React.useState([<Est_list />]);
  const [textVal, setText] = React.useState("");
  const [compKey, setKey] = React.useState(2);
  const [compArray, setComp] = React.useState([]);
  let [fetched, setFetch] = React.useState([]);
  const [estCase, setCase] = React.useState(0);

  React.useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .post("http://localhost:80/api/fetchSchedule.php/save", {
        custId: props.idNo,
      })
      .then((response) => {
        console.log(response.data);
        setFetch(response.data);
        setCase(response.data.total_cost);
      });
  }

  React.useEffect(() => {
    fetchDataMess();
  }, []);

  function fetchDataMess() {
    axios
      .post("http://localhost:80/api/techRep.php/save", {
        user: "estimator",
        cust_id: props.idNo,
      })
      .then((response) => {
        setText(response.data.content);
      });
  }

  return (
    <div>
      <Nav_Est />
      {estCase != 0 && (
        <div style={{ margin: "30px 0 0 30px" }}>
          <h1>Customer Status</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <h3>Customer id</h3>
            <h3
              style={{
                margin: "0 0 0 20px",
                background: "orange",
                width: "400px",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              {fetched.cust_id}
            </h3>
            <h3>cable measurment date</h3>
            <h3
              style={{
                margin: "0 0 0 20px",
                background: "orange",
                width: "200px",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              {fetched.wire_measure_date}
            </h3>
            <h3>task date</h3>
            <h3
              style={{
                margin: "0 0 0 20px",
                background: "orange",
                width: "200px",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              {fetched.work_date}
            </h3>
            <h3>Total cost</h3>
            <h3
              style={{
                margin: "0 0 0 20px",
                background: "orange",
                width: "200px",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              {fetched.total_cost}
            </h3>
            <h3>Status</h3>
            <h3
              style={{
                margin: "0 0 0 20px",
                background: "orange",
                width: "200px",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              {fetched.status}
            </h3>
          </div>
        </div>
      )}
      {estCase == 0 && (
        <div className="send_cont" style={{ background: "white" }}>
          <h1>Send Estimation</h1>
          <div className="msg_info">
            <h4>To:</h4>
            <select className="recipients">
              <option value="customer">Customer</option>
            </select>
            <h4>From:</h4>
            <h3>Estimator</h3>
            <h4 style={{ marginLeft: "20px" }}>Custoemr Id:</h4>
            <h3 style={{ width: "400px" }}>{props.idNo}</h3>
          </div>
          <h2 style={{ margin: "30px 0 0 0 ", fontSize: "30px" }}>
            Technician Report
          </h2>
          <textarea
            style={{
              margin: "10px 0 0 0",
              width: "780px",
              height: "200px",
              padding: "20px",
              fontSize: "20px",
            }}
            placeholder="Content"
            value={textVal}
          />
          <div className="msg_cost">
            <form className="est_cls" style={{ marginTop: "40px" }}>
              <select style={{ background: "#90F49B" }}>
                <option value="serv_val">Service</option>
              </select>
              <input
                className="val_cost_input"
                type="number"
                name="service"
                placeholder="Cost"
                onChange={handleEstMessChange}
              />
            </form>
            <form className="est_cls">
              <select style={{ background: "#90F49B" }}>
                <option value="mats_val">Material</option>
              </select>
              <input
                className="val_cost_input"
                type="number"
                name="materials"
                placeholder="Cost"
                onChange={handleEstMessChange}
              />
            </form>
            <button
              className="send_cost"
              type="button"
              onClick={handleEstMessSubmit}
            >
              Send
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
