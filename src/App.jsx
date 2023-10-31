import React from "react";
import Home from "./Website_pages/Customer/home";
import Status from "./Website_pages/Customer/status";
import { Appcontext } from "./context";
import Mail from "./Website_pages/Customer/Mail";
import Schedule from "./Website_pages/Customer/Schedual";
import { Route, Routes, useNavigate } from "react-router-dom";
import Customer_list from "./Website_pages/CSOs/Customers_list";
import Send from "./Website_pages/CSOs/send";
import Estimate from "./Website_pages/Estimators/Estimate";
import Est_req from "./Website_pages/Estimators/Request";
import Login from "./Login";
import Signup from "./Signup";
import Tech_send from "./Website_pages/Technicians/send";
import Tech_rec from "./Website_pages/Technicians/Received";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Send_toTech from "./Website_pages/CSOs/sendToTech";
import Admin from "./Website_pages/Admin_page";
import View_mail from "./Website_pages/Customer/view_mail";
import Employees_list from "./Website_pages/Employees";

export default function App() {
  const [lightArray, setLight] = React.useState([true, false, false, false]);
  const [Tech, setTech] = React.useState("Customer");
  const [transId, setId] = React.useState(null);
  const [session, setSession] = React.useState(null);
  const [nav_switch, setNav] = React.useState("customer");
  const [EntityReg, setEntity] = React.useState("Ind");
  const [conpass, setCon] = React.useState("");
  const [conNum, setNum] = React.useState(1);
  const navigate = useNavigate();
  const [routing, setRoute] = React.useState("");
  const [ErrStyle, setStyle] = React.useState(0);
  const [custResponse, setCustresponse] = React.useState({});
  const [EmpInfo, setEmp] = React.useState({
    Emp_id: uuidv4(),
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    Emp_type: "cso",
  });
  const [LoginForm, setLogin] = React.useState({
    User: "customer",
    Email: "",
    password: "",
  });

  const [resdata, setRes] = React.useState({
    status: 2,
    message: "unsuccessful",
  });

  const [SignupForm, setSignup] = React.useState({
    cust_id: uuidv4(),
    first_name: "",
    last_name: "",
    Entity: EntityReg,
    Phone: "",
    Email: "",
    password: "",
  });
  const [custInfo, setCustInfo] = React.useState({
    userId: null,
    res_id: "",
    photo: "",
    serial_no: "",
    house_no: "",
    wereda: "",
    zone: "",
  });
  const [checkState, setCheck] = React.useState({});
  const [custType, setCustType] = React.useState({
    cust_type: "Ind",
  });
  const [cust_array, setArr] = React.useState([{}]);
  const [weredaFortech, setWereda] = React.useState({
    techni_id: "",
    wereda: "",
  });
  const [toEst, setToest] = React.useState({
    cust_id: "",
    tech_id: "",
    taskStatus: "waiting",
    content: "",
    workDate: "",
    cableDate: "",
  });

  const [toCust, setToCust] = React.useState({
    materials: "",
    service: "",
    cust_id: "",
  });
  const [cont, setCont] = React.useState("");

  function handleContent(content) {
    setCont(content);
  }

  function handleLogin(event) {
    const { name, value } = event.target;
    name == "User" ? setNav(value) : null;
    if (name == "User") {
      if (value == "customer") {
        setRoute("/home");
      } else if (value == "estimator") {
        setRoute("/requests");
      } else if (value == "cso") {
        setRoute("/customer list");
      } else if (value == "technician") {
        setRoute("/technician_receive");
      }
    }

    setLogin((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleCon(event) {
    const { value } = event.target;
    setCon(value);
  }

  function handleChangeSign(event) {
    const { name, value } = event.target;

    if (name == "Entity") {
      setEntity(value);
    }
    setSignup((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function handleLogSubmit(event) {
    event.preventDefault();

    if (
      LoginForm.User == "Admin" &&
      LoginForm.Email == "Admin@admin.com" &&
      LoginForm.password == "EEUadmin"
    ) {
      navigate("/Add_emps");
    } else {
      axios
        .post("http://localhost:80/api/LoginGet.php/save", LoginForm)
        .then((response) => {
          setRes(response.data);
          setSession(response.data["user_id"]);
        });
    }
  }

  function handleSignSubmit(event) {
    event.preventDefault();
    if (
      SignupForm.first_name != "" &&
      SignupForm.Email != "" &&
      SignupForm.Phone != "" &&
      SignupForm.password != ""
    ) {
      if (conpass == SignupForm.password) {
        setSignup((prev) => {
          return {
            ...prev,
            cust_id: uuidv4(),
          };
        });
        console.log(SignupForm);
        setNum(1);
        axios
          .post("http://localhost:80/api/post.php/save", SignupForm)
          .then((response) => {});
        navigate("/");
      } else {
        setNum(0);
      }
    } else {
      setNum(2);
    }
  }

  function showWereda(event) {
    const { value } = event.target;
    setTech(value);
  }

  function handleLight(index) {
    setLight((perv) => {
      const newArray = [];

      for (let i = 0; i < perv.length; i++) {
        if (index == i) {
          newArray.push(true);
        } else {
          newArray.push(false);
        }
      }
      return newArray;
    });
  }

  function handleImageChangeOne(event) {
    const { files } = event.target;

    setCustInfo((prev) => {
      return {
        ...prev,
        res_id: files[0],
      };
    });
  }
  function handleImageChangeTwo(event) {
    const { files } = event.target;

    setCustInfo((prev) => {
      return {
        ...prev,
        photo: files[0],
      };
    });
  }

  function handleStatusChange(event) {
    const { name, value } = event.target;

    setCustInfo((prev) => {
      return {
        ...prev,
        userId: session,
        [name]: value,
      };
    });
  }

  const [Eror, setEror] = React.useState(3); //state to notify if the Appointment has been scheduled

  function handleStatus(event) {
    event.preventDefault();

    if (
      custInfo["res_id"] != "" &&
      custInfo["photo"] != "" &&
      custInfo["serial_no"] != "" &&
      custInfo["house_no"] != "" &&
      custInfo["wereda"] != "" &&
      custInfo["zone"] != ""
    ) {
      axios
        .post("http://localhost:80/api/customerInfo.php/save", custInfo, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          if (response.data.imageDataRec == 0) {
            setCustresponse(response.data);
            setCustInfo({
              userId: null,
              res_id: "",
              photo: "",
              serial_no: "",
              house_no: "",
              wereda: "",
              zone: "",
            });
            setEror(0);
          } else {
            setEror(1);
          }
        });
    }
  }

  function handleId(id) {
    setId(id);
  }

  function handleCustType(type) {
    setCustType((prev) => {
      return {
        ...prev,
        cust_type: type,
      };
    });
  }

  function handleEmpChange(event) {
    const { name, value } = event.target;

    setEmp((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  const [adminError, setAdminErr] = React.useState(3);

  function handleAdminSubmit(event) {
    event.preventDefault();

    if (
      EmpInfo.first_name != "" &&
      EmpInfo.last_name != "" &&
      EmpInfo.email != "" &&
      EmpInfo.password != ""
    ) {
      setEmp((prev) => {
        return {
          ...prev,
          Emp_id: uuidv4(),
        };
      });
      axios
        .post("http://localhost:80/api/AdminSubmit.php/save", EmpInfo)
        .then((response) => {
          // console.log(response.data);
          if (response.data.DataStatus == 0) {
            setAdminErr(0);
            navigate("/Administrator");
          } else {
            setAdminErr(1);
          }
        });
    }
  }

  function handleCsoMessChange(event) {
    const { name, value } = event.target;
    setWereda((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  console.log(weredaFortech);

  const [cond, setCond] = React.useState(3);
  function handleMesstoTech(event) {
    event.preventDefault();
    if (weredaFortech.wereda != "" && weredaFortech.techni_id != "") {
      axios
        .post("http://localhost:80/api/assignWereda.php/save", weredaFortech)
        .then((response) => {
          console.log(response.data);
          if (response.data.condition == 0) {
            setCond(0);
            setWereda((prev) => {
              return {
                ...prev,
                techni_id: "",
                wereda: "",
              };
            });
          } else {
            setCond(1);
          }
          // navigate("/cso_to_tech");
        });
    }
  }

  // console.log(weredaFortech);

  function handleMessChange(event) {
    const { name, value } = event.target;
    setToest((prev) => {
      return {
        ...prev,
        tech_id: session,
        cust_id: transId,
        [name]: value,
      };
    });
  }

  function handleMessForTech() {
    if (
      (toEst.tech_id != "",
      toEst.content != "" &&
        toEst.taskStatus != "" &&
        toEst.workDate != "" &&
        toEst.cableDate != "")
    ) {
      axios
        .post("http://localhost:80/api/handleMessage.php/save", toEst)
        .then((response) => {
          navigate("/technician_receive");
        });
    }
  }

  function handleEstMessChange(event) {
    const { name, value } = event.target;

    setToCust((prev) => {
      return {
        ...prev,
        cust_id: transId,
        [name]: value,
      };
    });
  }

  function handleEstMessSubmit() {
    if (toCust.materials != "" && toCust.service != "") {
      axios
        .post("http://localhost:80/api/EstToCust.php/save", toCust)
        .then((response) => {
          navigate("/requests");
        });
    }
  }

  const values = {
    Tech,
    showWereda,
    handleStatus,
    handleId,
    lightArray,
    handleLight,
    nav_switch,
    handleStatusChange,
    EntityReg,
    handleSignSubmit,
    handleChangeSign,
    handleCon,
    conNum,
    handleLogSubmit,
    handleLogin,
    resdata,
    routing,
    ErrStyle,
    setLogin,
    setSignup,
    setCustInfo,
    setRes,
    handleCustType,
    custType,
    cust_array,
    setArr,
    checkState,
    setCheck,
    handleAdminSubmit,
    handleEmpChange,
    handleCsoMessChange,
    handleMesstoTech,
    session,
    handleMessForTech,
    handleMessChange,
    handleEstMessChange,
    handleEstMessSubmit,
    handleContent,
    Eror,
    handleImageChangeOne,
    handleImageChangeTwo,
    adminError,
    cond,
    weredaFortech,
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Appcontext.Provider value={values}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/status" element={<Status />} />
          <Route path="/mail" element={<Mail />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/customer list" element={<Customer_list />} />
          <Route path="/send" element={<Send idNo={transId} />} />
          <Route path="/send_estimator" element={<Estimate idNo={transId} />} />
          <Route path="/requests" element={<Est_req />} />
          <Route
            path="/technician_send"
            element={<Tech_send idNo={transId} />}
          />
          <Route path="/technician_receive" element={<Tech_rec />} />
          <Route path="/cso_to_tech" element={<Send_toTech />} />
          <Route path="/Administrator" element={<Employees_list />} />
          <Route path="/Add_emps" element={<Admin />} />
          <Route path="/view_mail" element={<View_mail content={cont} />} />
        </Routes>
      </Appcontext.Provider>
    </div>
  );
}
