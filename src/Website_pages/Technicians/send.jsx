import React, { useContext } from "react";
import Nav_tech from "../../components/Nav_tech";
import Footer from "../../components/footer";
import { Appcontext } from "../../context";
import axios from "axios";

export default function Tech_send(props) {
  const { handleMessChange, handleMessForTech } = useContext(Appcontext);
  const [notify, setNot] = React.useState(1);
  let [fetched, setFetch] = React.useState([]);
  const [statVal, setStat] = React.useState({
    status: "",
    cust_id: "",
  });

  function handleStatusChange(event) {
    const { name, value } = event.target;

    setStat((prev) => {
      return {
        ...prev,
        cust_id: props.idNo,
        [name]: value,
      };
    });
  }

  function handleStatusUpdate() {
    if (statVal.status != "") {
      axios
        .post("http://localhost:80/api/handleStatusUpdate.php/save", statVal)
        .then((response) => {
          if (response.data.condition == 0) {
            setNot(0);
          } else {
            setNot(2);
          }
        });
    }
  }

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
      });
  }

  // console.log(Object.keys(fetched).length);

  return (
    <div>
      <Nav_tech />
      {Object.keys(fetched).length != 0 && (
        <div style={{ margin: "30px 0 0 30px", display: "flex" }}>
          <div>
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
              {notify == 0 && (
                <h4
                  style={{
                    background: "#98fb98",
                    width: "250px",
                    textAlign: "center",
                    height: "30px",
                    paddingTop: "6px",
                  }}
                >
                  Updated
                </h4>
              )}
              <h3>Status</h3>
              <select
                name="status"
                onChange={handleStatusChange}
                style={{ width: "200px", height: "30px", fontSize: "17px" }}
              >
                <option value="">{fetched.status}</option>
                <option value="started">Started</option>
                <option value="completed">Completed</option>
              </select>

              <button
                style={{ width: "170px", height: "27px" }}
                onClick={handleStatusUpdate}
              >
                Change
              </button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              overflowY: "visible",
              maxHeight: "400px",
              marginLeft: "25px",
            }}
          >
            <img
              src={"http://localhost:80/api/images/" + fetched.Res_id_img}
              style={{ marginBottom: "20px" }}
            />
            <img src={"http://localhost:80/api/images/" + fetched.photo} />
            <h1 style={{ fontSize: "23px", marginTop: "10px" }}>
              {fetched.full_name}
            </h1>
          </div>
        </div>
      )}
      {Object.keys(fetched).length == 0 && (
        <div className="send_cont">
          <h1>Send Requirments</h1>
          <div className="msg_info">
            <h4>To:</h4>
            <select className="recipients">
              <option value="Estimator">Estimator</option>
            </select>
            <h4>From:</h4>
            <h3>Technician Group</h3>
            <h4 style={{ marginLeft: "20px" }}>Customer Id:</h4>
            <h3 style={{ width: "500px" }}>{props.idNo}</h3>
            <br></br>
            <h4 style={{ marginLeft: "20px" }}>Status</h4>
            <select
              className="recipients"
              name="taskStatus"
              onChange={handleMessChange}
            >
              <option value="waiting">Waiting</option>
              <option value="started">Started</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <textarea
            name="content"
            placeholder="Message Content"
            style={{
              width: "600px",
              padding: "8px",
              height: "120px",
              fontSize: "15px",
              marginTop: "20px",
            }}
            onChange={handleMessChange}
          />
          <div className="msg_content">
            <h2 style={{ marginTop: "10px", marginBottom: "-10px" }}>
              Cable measurment date
            </h2>
            <br></br>
            <input
              type="date"
              data-date=""
              data-date-format="DD MMMM YYYY"
              style={{
                width: "300px",
                fontSize: "15px",
                height: "40px",
                // marginTop: "-10px",
              }}
              onChange={handleMessChange}
              name="cableDate"
            />
            <h2 style={{ marginTop: "10px", marginBottom: "-10px" }}>
              Work date
            </h2>
            <br></br>
            <input
              type="date"
              data-date=""
              data-date-format="DD MMMM YYYY"
              style={{
                width: "300px",
                fontSize: "15px",
                height: "40px",
                // marginTop: "-10px",
              }}
              onChange={handleMessChange}
              name="workDate"
            />
            <br></br>
            <button
              className="send_cost cso_send_btn"
              style={{
                width: "200px",
                height: "55px",
                alignSelf: "flex-end",
                fontSize: "20px",
                marginTop: "30px",
              }}
              onClick={handleMessForTech}
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
