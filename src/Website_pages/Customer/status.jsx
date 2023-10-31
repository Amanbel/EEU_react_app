import React, { useContext } from "react";
import empty_div from "../../assets/empty_div.png";
import Footer from "../../components/footer";
import Nav from "../../components/Nav_bar";
import axios from "axios";
import { Appcontext } from "../../context";

export default function Status() {
  const [searchId, setSearch] = React.useState({
    id_num: "",
  });
  const [fetched, setFetch] = React.useState({});
  const [custStat, setCustStat] = React.useState({
    cust_id: "",
    customer_status: "",
  });
  const { session } = useContext(Appcontext);

  function handleSearchChange(event) {
    const { name, value } = event.target;

    setSearch((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  const [upInput, setUpInput] = React.useState(3);

  function handleSearch(event) {
    event.preventDefault();

    // const date = new Date();
    // const tech_date = fetched.work_date.split("-")[2];

    // // console.log(tech_date);

    // if (date.getDate() >= tech_date[2]) {
    //   setUpInput(0);
    // } else {
    //   setUpInput(1);
    // }

    if (searchId.id_num != "") {
      axios
        .post("http://localhost:80/api/getStatus.php/save", searchId)
        .then((response) => {
          console.log(response.data);
          setFetch(response.data);
        });
    }
  }

  function updateMyStatus(event) {
    const { name, value } = event.target;

    setCustStat((prev) => {
      return {
        ...prev,
        cust_id: session,
        [name]: value,
      };
    });
  }

  const [NotErr, setNotErr] = React.useState(3);
  function updateStatusSubmit() {
    if (custStat.customer_status != "" && fetched.total_cost != 0) {
      axios
        .post("http://localhost:80/api/custUpdateStat.php/save", custStat)
        .then((response) => {
          // console.log(response.data);
          if (response.data.condition == 0) {
            setNotErr(0);
          } else {
            setNotErr(1);
          }
        });
    } else {
      setNotErr(1);
    }
  }

  console.log(custStat);

  return (
    <div>
      <Nav />
      <div className="status_div">
        <h1>Check Appointment Status</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="id_num"
            placeholder="Identification Number"
            onChange={handleSearchChange}
          />
          <button>Search</button>
        </form>

        <div className="Appoint_info">
          {Object.keys(fetched).length == 0 && (
            <>
              <img
                alt="empty"
                src={empty_div}
                style={{ margin: "100px auto 0 auto" }}
              />
              <h2>
                Enter<br></br> Appointment<br></br> Number
              </h2>
            </>
          )}

          {Object.keys(fetched).length != 0 && (
            <div
              style={{
                display: "flex",
                // flexDirection: "column",
                margin: "20px 20px 20px 40px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <img
                  src={"http://localhost:80/api/images/" + fetched.photo}
                  style={{
                    width: "200px",
                    height: "200px",
                    marginRight: "30px",
                  }}
                />
                <h2 style={{ fontSize: "20px", margin: "10px auto 0 auto" }}>
                  {fetched.full_name}
                </h2>
              </div>

              <div>
                <div style={{ display: "flex" }}>
                  <div style={{ margin: "0 20px 20px 0", fontSize: "26px" }}>
                    Customer Id
                  </div>
                  <div
                    style={{
                      display: "flex",
                      background: "#ffa60093",
                      minWidth: "200px",
                      height: "40px",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      borderRadius: "5px",
                      padding: "11px",
                    }}
                  >
                    {fetched.cust_id}
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ margin: "0 20px 20px 0", fontSize: "26px" }}>
                    Status
                  </div>
                  <div
                    style={{
                      display: "flex",
                      background: "#ffa60093",
                      minWidth: "200px",
                      height: "40px",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      borderRadius: "5px",
                    }}
                  >
                    {fetched.status}
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ margin: "0 20px 20px 0", fontSize: "26px" }}>
                    Cable measurment date
                  </div>
                  <div
                    style={{
                      display: "flex",
                      background: "#ffa60093",
                      minWidth: "200px",
                      height: "40px",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      borderRadius: "5px",
                    }}
                  >
                    {fetched.wire_measure_date}
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ margin: "0 20px 20px 0", fontSize: "26px" }}>
                    Task date
                  </div>
                  <div
                    style={{
                      display: "flex",
                      background: "#ffa60093",
                      minWidth: "200px",
                      height: "40px",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      borderRadius: "5px",
                    }}
                  >
                    {fetched.work_date}
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ margin: "0 20px 20px 0", fontSize: "26px" }}>
                    Material Cost
                  </div>
                  <div
                    style={{
                      display: "flex",
                      background: "#ffa60093",
                      minWidth: "200px",
                      height: "40px",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      borderRadius: "5px",
                    }}
                  >
                    {fetched.materials}
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ margin: "0 20px 20px 0", fontSize: "26px" }}>
                    Service cost
                  </div>
                  <div
                    style={{
                      display: "flex",
                      background: "#ffa60093",
                      minWidth: "200px",
                      height: "40px",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      borderRadius: "5px",
                    }}
                  >
                    {fetched.service}
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ margin: "0 20px 20px 0", fontSize: "26px" }}>
                    Total cost
                  </div>
                  <div
                    style={{
                      display: "flex",
                      background: "#ffa60093",
                      minWidth: "200px",
                      height: "40px",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      borderRadius: "5px",
                    }}
                  >
                    {fetched.total_cost}
                  </div>
                </div>
                {new Date().getDate() >= fetched.work_date.split("-")[2] && (
                  <>
                    <select
                      name="customer_status"
                      onChange={updateMyStatus}
                      style={{
                        height: "30px",
                        width: "150px",
                        borderRadius: "5px",
                        border: "0px solid black",
                        paddingLeft: "10px",
                        fontSize: "18px",
                        marginLeft: "-20px",
                      }}
                    >
                      <option value="">Choose Status</option>
                      <option value="complete">Complete</option>
                      <option value="not complete">Not Complete</option>
                    </select>
                    <button
                      onClick={updateStatusSubmit}
                      style={{
                        marginLeft: "20px",
                        height: "30px",
                        width: "150px",
                        borderRadius: "5px",
                        border: "0px solid black",
                        fontSize: "18px",
                        background: "green",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      Confirm
                    </button>
                  </>
                )}

                {NotErr == 1 && (
                  <h4
                    style={{
                      display: "inline",
                      marginLeft: "20px",
                      background: "red",
                      padding: "7px",
                      fontSize: "14px",
                      color: "white",
                    }}
                  >
                    Update Not Successful
                  </h4>
                )}
                {NotErr == 0 && (
                  <h4
                    style={{
                      display: "inline",
                      marginLeft: "20px",
                      background: "lightgreen",
                      padding: "7px",
                      fontSize: "14px",
                    }}
                  >
                    Update Successful
                  </h4>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
