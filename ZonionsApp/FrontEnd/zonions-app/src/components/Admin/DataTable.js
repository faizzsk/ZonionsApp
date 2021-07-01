import { useEffect, useState } from "react";
import Axios from "axios";
import { MDBDataTable } from "mdbreact";
import { useHistory, useParams } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import DeleteIcon from "@material-ui/icons/Delete";
import EditResaurant from "./EditRestaurant";
import AddRestaurant from "./AddRestaurant";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import Login from "../Authantication/Login";
import VisibilityIcon from "@material-ui/icons/Visibility";
//-------import Done---------

const DataTableAdmin = () => {
  const [data, setData] = useState([]);

  let history = useHistory();

  // Get All Restaurant
  const AddRestaurantHandle = async () => {
    try {
      const result = await Axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:3000/restaurants",
      });
      console.log(result.data);
      setData(result.data);
    } catch (err) {
      /// console.log(err.response.data);
    }
  };

  // const submitHand = (e) => {
  //   e.preventDefault();
  // };

  useEffect((e) => {
    //e.preventDefault()
    let token = localStorage.getItem("user");
    console.log(token);
    if (token == null) {
      history.push("/Login");
      alert("please login");
    }

    AddRestaurantHandle();

    // getUser();
  }, []);

  // Delete Handleer--------

  const deleteHand = async (id) => {
    try {
      const result = await Axios({
        method: "DELETE",
        withCredentials: true,
        url: `http://localhost:3000/restaurants/${id}`,
      });
      console.log(result.data);
      // setData(data.concat(result.data))
      //history.push("/Home")
      AddRestaurantHandle();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  //    const deleteHandler = (id)=>{
  //}

  // const EditHand = (id) => {
  //   history.push(`/EditRestaurant/${id}`);
  // };

  //-------xxxxx-----
  var validuser;
  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3000/login",
    }).then((res) => {
      // const user = Cookies.getJSON("token")
      // setUser(localStorage.getItem("user"));
      console.log("Login -----", res.status);
      validuser = res.status;
    });
  };
  var flag = false;
  if (validuser == 200) {
    flag = true;
  }
  //   useEffect(() => {
  // },[]);
  //--------xxxxxx-------

  const DataArr = data.map((data, index) => {
    return (
      <tr key={data._id}>
        <td>{++index}</td>
        <td>{data.name}</td>
        <td>{data.address}</td>
        <td>{data.phone}</td>
        <td>{data.openingtime}</td>
        <td>{data.closingtime}</td>
        <td className="">
          <Link className="btn btn-outline-secondary" to={`/View/${data._id}`}>
            <VisibilityIcon></VisibilityIcon>
          </Link>
          <Link
            className="btn btn-outline-secondary"
            to={`/EditRestaurant/${data._id}`}
          >
            <EditIcon></EditIcon>
          </Link>
          <Link
            className="btn btn-outline-secondary "
            onClick={() => deleteHand(data._id)}
          >
            <DeleteIcon></DeleteIcon>
          </Link>
        </td>
        <td>{data.active.toString()}</td>
      </tr>
    );
  });

  return (
    <div className="home">
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
            <li className="nav-item" style={{ fontSize: "" }}>
              {" "}
              <button className="nav-link" class="btn btn-secondary">
                Admin : {localStorage.getItem("user")}
              </button>
            </li>

            <li className="nav-item" style={{ fontSize: "" }}>
              {" "}
              <button
                className="nav-link"
                type="button"
                class="btn btn-secondary"
                style={{ margin: "135px" }}
                style={{ backgroundColor: "" }}
                onClick={() => {
                  history.push("/AddRestaurant");
                }}
              >
                <AddIcon></AddIcon> New Restaurant
              </button>
            </li>

            <li className="nav-item" style={{ fontSize: "" }}>
              {" "}
              <button
                className="nav-link"
                class="btn btn-secondary"
                onClick={() => history.push("/DataTable")}
              >
                HomePage{" "}
              </button>
            </li>

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
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <br></br>
      <br></br>

      <br></br>
      <br></br>
      <div className="row d-flex justify-content-center text-center home2">
        <div className="col-md-8 text-center">
          <table class="table table-hover">
            <thead class="">
              <tr>
                <th scope="col">Sr.No</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
                <th scope="col">Opening Time</th>
                <th scope="col">Closing Time</th>
                <th scope="col">Action</th>
                <th scope="col">Active</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: "" }}>{DataArr}</tbody>
          </table>
        </div>
      </div>

      <br></br>
      <br></br>
      <div></div>
    </div>
  );
};

export default DataTableAdmin;
