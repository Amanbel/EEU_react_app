import React, { useContext } from "react";
import { Appcontext } from "../../context";
import Nav from "../../components/Nav_bar";
import Footer from "../../components/footer";

export default function Schedule() {
  const {
    handleStatus,
    handleStatusChange,
    Eror,
    handleImageChangeOne,
    handleImageChangeTwo,
  } = useContext(Appcontext);
  return (
    <div>
      <Nav />
      <div className="sch_cont">
        <h1>Upload Documents</h1>
        {Eror == 0 && (
          <h3
            style={{
              background: "#98fb98",
              margin: "0 auto 0 auto",
              width: "800px",
              textAlign: "center",
            }}
          >
            Uploaded
          </h3>
        )}
        <form onSubmit={handleStatus} encType="multipart/form-data">
          <label htmlfor="res_id_lable">Resident Id</label>
          <label htmlfor="photo_lable">Photo</label>
          <input
            type="file"
            name="res_id"
            placeholder="Resident Id"
            onChange={handleImageChangeOne}
          />
          <input
            type="file"
            name="photo"
            placeholder="Photo"
            onChange={handleImageChangeTwo}
          />
          <input
            type="number"
            name="serial_no"
            placeholder="Junction box number"
            onChange={handleStatusChange}
          />
          <input
            type="number"
            name="house_no"
            placeholder="House No"
            onChange={handleStatusChange}
          />
          {/* <input
            type="number"
            name="wereda"
            placeholder="Wereda"
            onChange={handleStatusChange}
          /> */}
          <select
            name="wereda"
            onChange={handleStatusChange}
            // value={weredaFortech.wereda}
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
            <option value="1">1</option>
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
            <option value="14">14</option>
          </select>
          <select
            name="zone"
            onChange={handleStatusChange}
            style={{
              border: "0px solid black",
              borderRadius: "7px",
              paddingLeft: "20px",
              fontSize: "17px",
            }}
          >
            <option value="">Choose Zone</option>
            <option value="Bole">Bole</option>
            <option value="Gullele">Gullele</option>
            <option value="Lideta">Lideta</option>
            <option value="Kolfe Keranio">Kolfe Keranio</option>
            <option value="Nifas Silk Lafto">Nifas Silk Lafto</option>
            <option value="Yeka">Yeka</option>
            <option value="Akaky Kaliti">Akaky Kaliti</option>
            <option value="Arada">Arada</option>
            <option value="Addis Ketema">Addis Ketema</option>
            <option value="Kirkos">Kirkos</option>
          </select>
          {/* <input
            type="text"
            name="zone"
            placeholder="Zone"
            onChange={handleStatusChange}
          /> */}
          {Eror != 0 && <button>Upload</button>}
          {Eror == 0 && (
            <button type="button" style={{ background: "#fb9898" }}>
              Upload
            </button>
          )}
        </form>
        <div className="req_div">
          <h1>Requirments</h1>
          <ol>
            <li>
              A picture of a Resident Id, that can be clearly seen and
              inspected, the picture must incapsulate all the sides of the Id
            </li>
            <li>
              4x4 Photo of the person applying for the Appointment, must be
              clear and visable
            </li>
            <li>the number written on your houses junction box(kotari)</li>
            <li>
              the house number where you want the new power line to be setup at,
              if you are an organization, company or a government entity leave
              the
              <b> House no</b> field blank and we will follow up with questions
            </li>
            <li>
              the wereda that the entity requesting the service resides in
            </li>
            <li>the Zone that the entity requesting the service resides in</li>
          </ol>
        </div>
      </div>
      <Footer />
    </div>
  );
}
