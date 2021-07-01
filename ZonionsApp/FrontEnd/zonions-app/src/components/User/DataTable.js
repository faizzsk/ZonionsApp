import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import DataTable from "react-data-table-component";
import { useHistory, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { MDBDataTable } from "mdbreact";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const DataTableUser = () => {
  const [data, setData] = useState([]);
  // name:"",
  // address:"",
  // phone:"",
  // openingtime:"",
  // closingtime:"",
  // menu:"",
  // active:""
  //})
  let history = useHistory();

  const AddRestaurantHandle = async (
    name,
    address,
    phone,
    openingtime,
    closingtime,
    menu,
    active
  ) => {
    try {
      const result = await Axios({
        method: "Get",
        withCredentials: true,
        url: "http://localhost:3000/restaurants/all/all",
      });
      console.log(result.data);
      setData(result.data);
      //history.push("/Home")
    } catch (err) {
      // console.log(err.response.data);
    }
  };

  const submitHand = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    AddRestaurantHandle();
  }, []);

  //---------------------------Table----------------------------------//

  const dataa = data.map((data, index) => {
    return (
      <tr key={data._id}>
        <td>{data.name}</td>
        <td>{data.address}</td>
        <td>{data.phone}</td>
        <td>{data.openingtime}</td>
        <td>{data.closingtime}</td>
        <td className>
          {/* <img src={data.menu}></img> */}
          <Link className="btn btn-outline-secondary" to={`/View/${data._id}`}>
            <VisibilityIcon></VisibilityIcon>
          </Link>
        </td>
      </tr>
    );
  });
  //------xx----
  return (
    <div class="userdata">
      <nav
        className="navbar navbar-expand-md navbar-light bg-secondary stickey-top"
        style={{ backgroundColor: "#dfe6e9" }}
      >
        <a class="navbar-brand" href="#">
          Zonions
        </a>

        <div className="container-fluid">
          <div
            className="collapse navbar-collapse "
            id="navbar-Responsive"
          ></div>
          <ul className="navbar-nav ml-auto">
            {/* <li className="nav-item"><Link to={'/DataTableAdmin'} className="nav-link"> HomePage </Link></li> */}

            {localStorage.getItem("user") ? (
              <li className="nav-item navAddEdit" style={{ fontSize: "" }}>
                {" "}
                <button className="nav-link" class="btn btn-secondary">
                  Admin : {localStorage.getItem("user")}
                </button>
                {/* </li> */}
              </li>
            ) : (
              <li className="nav-item" style={{ fontSize: "" }}>
                {" "}
                <button
                  className="nav-link"
                  class="btn btn-secondary"
                  onClick={(e) => {
                    e.preventDefault();

                    localStorage.removeItem("user");
                    history.push("/Login");
                  }}
                >
                  Login
                </button>
              </li>
            )}
            <li className="nav-item navAddEdit" style={{ fontSize: "" }}>
              {" "}
              <button className="nav-link" class="btn btn-secondary"></button>
            </li>

            {localStorage.getItem("user") ? (
              <li className="nav-item navAddEdit" style={{ fontSize: "" }}>
                {" "}
                <button
                  className="nav-link"
                  class="btn btn-secondary"
                  onClick={() => history.push("/DataTableAdmin")}
                >
                  HomePage
                </button>
              </li>
            ) : (
              <li className="nav-item navAddEdit" style={{ fontSize: "" }}>
                {" "}
                <button
                  className="nav-link"
                  class="btn btn-secondary"
                  onClick={() => history.push("/DataTable")}
                >
                  HomePage{" "}
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <h1>Active Restaurant</h1>
      <br></br>
      <br></br>
      <div className="row d-flex justify-content-center text-center view1">
        <div className="col-md-8 text-center">
          <table class="table table-hover">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Opening Time</th>
                  <th scope="col">Closing Time</th>
                  <th scope="col">Menu</th>
                </tr>
              </thead>
              <tbody>{dataa}</tbody>
            </table>
            <div></div>
          </table>
        </div>
      </div>

      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default DataTableUser;
