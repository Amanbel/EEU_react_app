import React, { useContext } from "react";
import empty_list from "../../assets/empty_list.png";
import Footer from "../../components/footer";
import Nav_cso from "../../components/Nav_CSOs";
import axios from "axios";
import { Appcontext } from "../../context";
import Cso_cust_list from "../../components/cso_cust_list";

export default function Customer_list() {
  const [errChk, setErr] = React.useState(3);
  const {
    handleCustType,
    custType,
    cust_array,
    setArr,
    checkState,
    setCheck,
    handleId,
  } = useContext(Appcontext);

  React.useEffect(() => {
    list_customers(custType);
  }, [custType["cust_type"]]);

  function list_customers(cat) {
    axios
      .post("http://localhost:80/api/listCustomers.php/save", cat)
      .then((response) => {
        setArr(response.data);
      });
  }

  function handleDelete() {
    axios
      .get("http://localhost:80/api/deleteComplete.php/")
      .then((response) => {
        // console.log(response.data);

        if (response.data.condition == 0) {
          setErr(0);
        } else {
          setErr(1);
        }
      });
  }

  // console.log(cust_array);

  const mapedcomp = cust_array.map((item) => {
    return (
      <Cso_cust_list
        key={item.cust_id}
        id={item.cust_id}
        name={item.full_name}
        entity={item.Entity}
        wereda={item.wereda}
        zone={item.Zone}
        houseNo={item.house_no}
        handleId={handleId}
        anqour="/send"
      />
    );
  });

  return (
    <div>
      <Nav_cso />
      <div className="CSO_cont">
        <div className="cust_catag">
          <ul>
            <li
              className="first_cat"
              onClick={() => {
                handleCustType("Ind");
              }}
            >
              Individual
            </li>
            <li
              onClick={() => {
                handleCustType("Org");
              }}
            >
              Organization
            </li>
            <li
              onClick={() => {
                handleCustType("Gov");
              }}
            >
              Government
            </li>
            <li
              className="last_cat"
              onClick={() => {
                handleCustType("Comp");
              }}
            >
              Company
            </li>
          </ul>
        </div>

        {/* <div className="cust_list">
          <img alt="empty_list" src={empty_list} />
          <h4>List Empty</h4>
        </div> */}
        <div className="cust_list_head" style={{ marginTop: "20px" }}>
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
          {cust_array.length == 0 && <img alt="empty_list" src={empty_list} />}
          {cust_array.length == 0 && <h2>List Empty</h2>}
          {mapedcomp}
        </div>
        {errChk == 0 && (
          <h4
            style={{
              background: "#98fb98",
              width: "250px",
              textAlign: "center",
              height: "30px",
              paddingTop: "6px",
              marginLeft: "195px",
              marginTop: "30px",
            }}
          >
            Deleted Successfully
          </h4>
        )}
        <button
          style={{
            margin: "30px 0 0 195px",
            width: "160px",
            height: "40px",
            border: "0px solid black",
            background: "#fb9898 ",
            fontSize: "15px",
            cursor: "pointer",
          }}
          onClick={handleDelete}
        >
          Delete completed
        </button>
      </div>
      <Footer />
    </div>
  );
}
