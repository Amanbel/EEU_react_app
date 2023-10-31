import React, { useContext } from "react";
import { Appcontext } from "../../context";
import Footer from "../../components/footer";
import Nav_cso from "../../components/Nav_CSOs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Send(props) {
  const navigate = useNavigate();
  const [Err, setErr] = React.useState(3);
  const [appInfo, setAppInfo] = React.useState({});
  let [message, setMess] = React.useState({
    cust_id: "",
    content: "",
  });

  function messageChange(event) {
    const { name, value } = event.target;

    setMess((prev) => {
      return {
        ...prev,
        cust_id: props.idNo,
        [name]: value,
      };
    });
  }

  function onSend() {
    if (message.content != "") {
      axios
        .post("http://localhost:80/api/sendMessage.php/save", message)
        .then((response) => {
          if (response.data.condition == 0) {
            setErr(0);
            setMess((prev) => {
              return {
                ...prev,
                content: "",
              };
            });
          } else {
            setErr(1);
          }
        });
    }
  }

  React.useEffect(() => {
    getAllData();
  }, []);

  function getAllData() {
    axios
      .post("http://localhost:80/api/getAllForCso.php/save", {
        cust_id: props.idNo,
      })
      .then((response) => {
        console.log(response.data);
        setAppInfo(response.data);
      });
  }

  function deleteAppoint() {
    axios
      .post("http://localhost:80/api/deleteInvalid.php/save", {
        cust_id: props.idNo,
      })
      .then((response) => {
        console.log(response.date);
        if (response.data.condition == 0) {
          alert("Deletion Successful");
          navigate("/customer list");
        } else {
          alert("Deletion Not Successful");
        }
      });
  }

  return (
    <div>
      <Nav_cso />
      <div className="send_cont" style={{ height: "1200px" }}>
        <div style={{ display: "flex" }}>
          <h1>Send</h1>
          <button
            style={{
              height: "40px",
              alignSelf: "center",
              margin: "0 50px 0 auto",
              padding: "10px",
              fontSize: "16px",
              color: "white",
              background: "red",
              cursor: "pointer",
              border: "0px solid black",
              borderRadius: "4px",
            }}
            onClick={deleteAppoint}
          >
            Delete appointment
          </button>
        </div>

        <div className="msg_info">
          <h4>To:</h4>
          <select className="recipients">
            <option value="Customer">Customer</option>
          </select>
          <h4>From:</h4>
          <h3>Customer Service Operators</h3>
          <h4 style={{ marginLeft: "20px" }}>Customer id:</h4>
          <input
            type="text"
            name="customer_id"
            value={props.idNo}
            onChange={() => {}}
            style={{
              fontSize: "20px",
              width: "450px",
              color: "black",
              border: "0px solid black",
              borderRadius: "8px",
              paddingLeft: "20px",
            }}
          />
        </div>
        <div>
          <div
            style={{ display: "flex", objectFit: "cover", marginTop: "40px" }}
          >
            <img
              style={{ objectFit: "contain" }}
              src={"http://localhost:80/api/images/" + appInfo.Res_id_img}
              alt="Residential Id"
            />
            <img
              style={{ objectFit: "contain", marginLeft: "40px" }}
              src={"http://localhost:80/api/images/" + appInfo.photo}
              alt="Residential Id"
            />
            <div style={{ marginLeft: "20px" }}>
              <h3 style={{ marginBottom: "20px" }}>
                <b style={{ fontSize: "23px", marginRight: "12px" }}>Name:</b>
                {appInfo.full_name}
              </h3>
              <h3 style={{ marginBottom: "20px" }}>
                <b style={{ fontSize: "23px", marginRight: "12px" }}>Email:</b>
                {appInfo.email}
              </h3>
              <h3 style={{ marginBottom: "20px" }}>
                <b style={{ fontSize: "23px", marginRight: "12px" }}>Phone:</b>
                {appInfo.phone}
              </h3>
              <h3 style={{ marginBottom: "20px" }}>
                <b style={{ fontSize: "23px", marginRight: "12px" }}>Wereda:</b>
                {appInfo.wereda}
              </h3>
              <h3 style={{ marginBottom: "20px" }}>
                <b style={{ fontSize: "23px", marginRight: "12px" }}>Zone:</b>
                {appInfo.Zone}
              </h3>
              <h3 style={{ marginBottom: "20px" }}>
                <b style={{ fontSize: "23px", marginRight: "12px" }}>
                  House No:
                </b>
                {appInfo.house_no}
              </h3>
              <h3 style={{ marginBottom: "20px" }}>
                <b style={{ fontSize: "23px", marginRight: "12px" }}>
                  Junction Box Serial No:
                </b>
                {appInfo.junc_serial}
              </h3>
            </div>
            <div
              style={{
                height: "100px",
                background: "white",
                marginLeft: "40px",
                width: "400px",
                border: "0px solid black",
                borderRadius: "5px",
                padding: "20px",
              }}
            >
              {appInfo.work_date && (
                <>
                  <h3 style={{ marginBottom: "10px" }}>
                    <span style={{ fontSize: "23px" }}>
                      Technician Status:{" "}
                    </span>
                    {appInfo.status}
                  </h3>
                  <h3 style={{ marginBottom: "10px" }}>
                    <span style={{ fontSize: "23px" }}>Customer Status:</span>{" "}
                    {appInfo.customer_status}
                  </h3>
                </>
              )}
              {!appInfo.work_date && (
                <h3 style={{ color: "red" }}>Work date not scheduled yet</h3>
              )}
            </div>
          </div>
        </div>
        <div className="msg_content">
          <h3>Content:</h3>
          <form>
            <textarea
              className="cso_textarea"
              name="content"
              value={message.content}
              onChange={messageChange}
            />
          </form>
          {Err == 0 && (
            <h4
              style={{
                background: "#98fb98",
                width: "250px",
                textAlign: "center",
                height: "30px",
                paddingTop: "6px",
              }}
            >
              Sent Successfully
            </h4>
          )}
          <button
            className="send_cost cso_send_btn"
            style={{
              width: "200px",
              height: "55px",
              alignSelf: "flex-end",
              fontSize: "20px",
              marginTop: "30px",
            }}
            onClick={onSend}
          >
            Send
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
