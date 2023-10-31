import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Nav_Admin from "../components/Nav_Admin";
import Footer from "../components/footer";

export default function Employees_list() {
  const navigate = useNavigate();
  const [empVal, setEmp] = React.useState([]);
  const [delStat, setDel] = React.useState(3);

  React.useEffect(() => {
    handleList();
  }, []);

  function handleList() {
    axios.get("http://localhost:80/api/listAll.php/").then((response) => {
      setEmp(response.data);
    });
  }

  function toAdd() {
    navigate("/Add_emps");
  }

  function logoutAdmin() {
    navigate("/");
  }

  function onEmpDelete(email, role) {
    axios
      .post("http://localhost:80/api/adminDelete.php/save", {
        emp_email: email,
        Role: role,
      })
      .then((response) => {
        if (response.data.DataStatus == 0) {
          setDel(0);
        } else {
          setDel(1);
        }
        console.log(response.data);
      });
  }

  const mapped_comp =
    Object.keys(empVal).length != 0 &&
    empVal.map((item) => {
      return (
        <ul
          key={item.password}
          className="emp_list"
          style={{
            display: "flex",
            listStyle: "none",
            gap: "190px",
            marginTop: "20px",
            justifyContent: "center",
            fontSize: "18px",
            background: "grey",
            color: "white",
            height: "40px",
            alignItems: "center",
          }}
        >
          <li style={{ width: "50px" }}>{item.first_name}</li>
          <li style={{ width: "50px" }}>{item.last_name}</li>
          <li style={{ width: "50px" }}>{item.email}</li>
          <li style={{ width: "50px", marginRight: "-170px" }}>{item.Role}</li>
          <li
            style={{ marginRight: "-120px" }}
            onClick={() => onEmpDelete(item.email, item.Role)}
          >
            <i class="fa-solid fa-trash"></i>
          </li>
        </ul>
      );
    });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Nav_Admin />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "0 auto 400px auto",
          // marginTop: "-50px",
        }}
      >
        {delStat == 0 && (
          <h4
            style={{
              width: "300px",
              height: "30px",
              padding: "5px",
              background: "yellow",
              marginBottom: "20px",
            }}
          >
            Deleted Successfully
          </h4>
        )}
        {delStat == 1 && (
          <h4
            style={{
              width: "300px",
              height: "30px",
              padding: "5px",
              background: "red",
              marginBottom: "20px",
              color: "white",
            }}
          >
            Not Deleted Successfully
          </h4>
        )}
        <div style={{ display: "flex" }}>
          <button
            style={{
              marginTop: "200px",
              marginBottom: "10px",
              width: "150px",
              height: "26px",
              marginRight: "20px",
            }}
            onClick={() => {
              window.location.reload(true);
            }}
          >
            Refresh
          </button>
          <button
            style={{
              marginTop: "200px",
              marginBottom: "10px",
              width: "150px",
              height: "26px",
            }}
            onClick={toAdd}
          >
            Add Employee
          </button>

          <button
            style={{
              marginTop: "200px",
              marginBottom: "10px",
              marginLeft: "auto",
              width: "150px",
              height: "26px",
              // alignSelf: "flex-end",
            }}
            onClick={logoutAdmin}
          >
            Logout
          </button>
        </div>

        <div
          style={{
            //   background: "blue",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "1000px",
            borderRadius: "4px",
          }}
        >
          <div
            style={{
              display: "flex",
              // flexDirection: "column",
              height: "50px",
              justifyContent: "center",
              background: "lightgrey",
              fontSize: "25px",
              gap: "160px",
              alignItems: "center",
            }}
          >
            <div>First Name</div>
            <div>Last Name</div>
            <div>Email</div>
            <div>Role</div>
          </div>
          <div style={{ overflowY: "scroll", maxHeight: "500px" }}>
            {Object.keys(empVal).length != 0 && mapped_comp}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
