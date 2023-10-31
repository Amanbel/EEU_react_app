import React, { useContext } from "react";
import { Appcontext } from "../../context";
import Footer from "../../components/footer";
import Nav_cso from "../../components/Nav_CSOs";
import axios from "axios";

export default function Send_toTech() {
  const { handleCsoMessChange, handleMesstoTech, cond, weredaFortech } =
    useContext(Appcontext);
  const [techNum, setNum] = React.useState(0);
  const [techArr, setTechArr] = React.useState([]);
  const [weredaArr, setWeredaArr] = React.useState([]);

  React.useEffect(() => {
    getTechNum();
  }, [weredaFortech]);

  function getTechNum() {
    axios.get("http://localhost:80/api/getNumTech.php").then((response) => {
      console.log(response.data);
      if (typeof response.data == "number") {
        setNum(response.data);
      }
    });
  }

  React.useEffect(() => {
    getTechList();
  }, [weredaFortech]);

  function getTechList() {
    axios.get("http://localhost:80/api/getTechList.php").then((response) => {
      console.log(response.data);
      setTechArr(response.data);
    });
  }

  React.useEffect(() => {
    getWereda();
  }, [weredaFortech]);

  function getWereda() {
    axios.get("http://localhost:80/api/getWereda.php").then((response) => {
      console.log(response.data);
      setWeredaArr(response.data);
    });
  }

  const mappedWeredaOptions =
    Object.keys(weredaArr).length != 0
      ? weredaArr.map((item) => {
          return <option value={item.wereda}>{item.wereda}</option>;
        })
      : [];

  const mappedOptions =
    Object.keys(techArr).length != 0
      ? techArr.map((item) => {
          const stat_var = item.assigned_wereda == 0 ? "Free" : "Occupied";
          return (
            <option value={item.tech_emp_id}>
              {item.first_name + " " + item.last_name + " Status: " + stat_var}
            </option>
          );
        })
      : [];

  return (
    <div>
      <Nav_cso />
      <div className="send_cont" style={{ height: "600px" }}>
        <h1>Send To Technician</h1>
        <div className="msg_info">
          <form
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            onSubmit={handleMesstoTech}
          >
            <h4>To:</h4>
            <select
              className="recipients"
              name="techni_id"
              value={weredaFortech.techni_id}
              onChange={handleCsoMessChange}
            >
              <option value="">Select Technician Group</option>
              {/* <option value="Technician">Technicians</option> */}
              {mappedOptions}
            </select>
            {techNum == 0 && (
              <h2 style={{ color: "red" }}>
                All technician Groups are occupied
              </h2>
            )}
            {techNum > 1 && (
              <h2 style={{ color: "green" }}>{techNum} technicians are Free</h2>
            )}
            {techNum == 1 && (
              <h2 style={{ color: "green" }}>
                {techNum} technician Group is Free
              </h2>
            )}
            <h4>From:</h4>
            <h3>Customer Service Operators</h3>
            <h4>Wereda:</h4>
            <select
              name="wereda"
              onChange={handleCsoMessChange}
              value={weredaFortech.wereda}
              style={{
                fontSize: "16px",
                width: "200px",
                height: "35px",
                border: "0px solid black",
                borderRadius: "8px",
                paddingLeft: "20px",
              }}
            >
              <option value="">Select Wereda</option>
              {/* <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option> */}
              {mappedWeredaOptions}
            </select>
            {/* <input
              type="number"
              name="wereda"
              onChange={handleCsoMessChange}
              style={{
                fontSize: "20px",
                width: "100px",
                height: "40px",
                border: "0px solid black",
                borderRadius: "8px",
                paddingLeft: "20px",
              }}
            /> */}
            {cond == 0 && (
              <h4 style={{ color: "green" }}>Wereda assigned successfully</h4>
            )}
            {cond == 1 && (
              <h4 style={{ color: "red" }}>technicians fully occupied</h4>
            )}

            <button
              className="send_cost cso_send_btn"
              style={{
                width: "200px",
                height: "55px",
                alignSelf: "flex-start",
                fontSize: "20px",
                marginTop: "30px",
              }}
              onClick={handleMesstoTech}
            >
              Send
            </button>
          </form>
        </div>
        {/* <div className="msg_content"></div> */}
      </div>
      <Footer />
    </div>
  );
}
