import React, { useEffect, useState } from "react";
import { Validator } from "react";
import validator from "validator";
import Axios from "axios";
import { useHistory, useParams } from "react-router";
import DataTable from "./DataTable";
import { Link } from "react-router-dom";
//------Import Done-----

const EditRestaurant = () => {
  let history = useHistory();
  const [restaurantData, setData] = useState({
    rest_name: "",
    rest_address: "",
    rest_openingTime: "",
    rest_closingTime: "",
    rest_menu: "",
  });

  const { id } = useParams();

  const [rest, setRest] = useState([]);

  const [err, setError] = useState({
    rest_nameError: "",
    rest_addressError: "",
    rest_phone: "",
    rest_openingTimeError: "",
    rest_closingTimeError: "",
    rest_menuError: "",
  });

  //---Validation
  const validate = () => {
    let rest_nameError = "";
    let rest_addressError = "";
    let rest_phoneError = "";
    let rest_openingTimeError = "";
    let rest_closingTimeError = "";
    let rest_menuError = "";

    if (!rest.name) {
      rest_nameError = " Field can not be blank";
    }

    if (!rest.address) {
      rest_addressError = "Field can not be blank";
    }

    if (!rest.phone) {
      rest_phoneError = " Field can not be blank";
    }

    if (!rest.openingtime) {
      rest_openingTimeError = "Field can not be blank";
    }

    if (!rest.closingtime) {
      rest_closingTimeError = "Field can not be blank";
    }

    if (!rest.menu) {
      rest_menuError = "Field can not be blank";
    }

    if (!validator.isAlphanumeric(rest.name)) {
      console.log("wrong");
      rest_nameError = "No special Charachter is allowed";
    }

    // if (!rest.phone.match(/^[789]\d{9}$/)) {
    //   rest_phoneError = "Phone number is invalid";
    // }

    if (!rest.phone) {
      rest_phoneError = " Field can not be blank";
    } else {
      if (rest.phone.match(/^[789]{1}\d{9}$/)) {
        return true;
      } else {
        rest_phoneError = "Phone number is invalid";
        return false;
      }
    }

    if (
      rest_nameError ||
      rest_addressError ||
      rest_phoneError ||
      rest_openingTimeError ||
      rest_closingTimeError ||
      rest_menuError
    ) {
      setError({
        rest_nameError,
        rest_addressError,
        rest_phoneError,
        rest_openingTimeError,
        rest_closingTimeError,
        rest_menuError,
      });
      return false;
    }

    return true;
  };

  //------ Update Handler
  const updateHand = async () => {
    try {
      const result = await Axios({
        method: "PUT",
        data: {
          name: rest.name,
          address: rest.address,
          phone: rest.phone,
          openingtime: rest.openingtime,
          closingtime: rest.closingtime,
          menu: rest.menu,
          active: rest.active,
        },
        withCredentials: true,
        url: `http://localhost:3000/restaurants/${id}`,
      });
      console.log(result.data);
      setRest(result.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  //GET
  const GetRestaurant = async () => {
    try {
      const result = await Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:3000/restaurants/${id}`,
      });
      console.log("iiii", result.data);
      setRest(result.data);
      //    setData(...restaurantData,[result.data])
      console.log(rest);
      //history.push("/Home")
    } catch (err) {
      console.log(err.response.data);
    }
  };

  //use Effect
  useEffect(() => {
    GetRestaurant();
  }, []);

  //Submit Handler
  const onSubmitHand = (e) => {
    e.preventDefault();

    const valid = validate();

    if (valid) {
      console.log(restaurantData);
      updateHand();
      setTimeout(() => {
        history.push("/DisplayAdmin");
      }, 1500);
    }
  };

  // ON CHNAGE

  const onchangeHandler = (e) => {
    setRest({ ...rest, [e.target.name]: e.target.value });
    //    setData({...restaurantData, [e.target.name]: e.target.value})

    console.log(e.target.value);
  };

  return (
    <div class="editrest">
      <div>
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
              <li className="nav-item navAddEdit" style={{ fontSize: "" }}>
                {" "}
                <button className="nav-link" class="btn btn-secondary">
                  Admin : {localStorage.getItem("user")}
                </button>
              </li>

              <li className="nav-item navAddEdit" style={{ fontSize: "" }}>
                {" "}
                <button
                  className="nav-link"
                  class="btn btn-secondary"
                  onClick={() => history.push("/DataTableAdmin")}
                >
                  HomePage{" "}
                </button>
              </li>

              <li className="nav-item navAddEdit" style={{ fontSize: "" }}>
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
      </div>
      <h1></h1>
      <form class="row g-3 d-flex p-2 d-flex justify-content-center" action="">
        <div
          class="container border border-secondary rounded-1 shadow-lg p-3 sm-1 bg-body rounded "
          class="editrest"
          style={{ backgroundColor: "#b2bec3" }}
        >
          <h4>Update Restaurant</h4>
          <p></p>
          <hr />
          <div class="row d-flex justify-content-center text-center">
            <div class="col-md-4 text-center">
              <label for="name" class="form-control w-100 p-1">
                <b>Restaurant Name</b>
              </label>

              <input
                type="text"
                class="form-control w-100 p-2 "
                value={rest.name}
                placeholder="Restaurant Name"
                onChange={onchangeHandler}
                name="name"
                required
              />
              <p style={{ color: "red" }}>{err.rest_nameError}</p>
              <br></br>
              <br></br>
              <label for="address" class="form-control w-100 p-1">
                <b>Address </b>
              </label>
              <input
                type="text"
                class="form-control w-100 p-2"
                placeholder="Enter Address"
                value={rest.address}
                name="address"
                onChange={onchangeHandler}
                required
              />
              <p style={{ color: "red" }}>{err.rest_addressError}</p>

              <label for="phone" class="form-control w-100 p-1">
                <b>Phone Number </b>
              </label>
              <input
                type="text"
                class="form-control w-100 p-2"
                placeholder="Enter Phone Number"
                value={rest.phone}
                name="phone"
                onChange={onchangeHandler}
                required
              />
              <p style={{ color: "red" }}>{err.rest_phoneError}</p>

              <label for="openingTime" class="form-control w-100 p-1">
                <b>Opening Time </b>
              </label>
              <input
                type="time"
                class="form-control w-100 p-2"
                placeholder="Enter Opening Time"
                value={rest.openingtime}
                name="openingtime"
                onChange={onchangeHandler}
                required
              />
              <p style={{ color: "red" }}>{err.rest_openingTimeError}</p>

              <label for="closingtime" class="form-control w-100 p-1">
                <b>Closing Time</b>
              </label>
              <input
                type="time"
                class="form-control w-100 p-2"
                placeholder="Enter Closing Time"
                value={rest.closingtime}
                name="closingtime"
                onChange={onchangeHandler}
                required
              />
              <p style={{ color: "red" }}>{err.passwordErr}</p>

              <label for="menu" class="form-control w-100 p-1">
                <b>Active</b>
              </label>

              <div class="form-check" onChange={onchangeHandler}>
                <input
                  class="form-check-input"
                  type="radio"
                  onChange={onchangeHandler}
                  value="true"
                  name="active"
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  <b>True</b>
                </label>
              </div>
              <div class="form-check" onChange={onchangeHandler}>
                <input
                  class="form-check-input"
                  type="radio"
                  onChange={onchangeHandler}
                  value="false"
                  name="active"
                />
                <label class="form-check-label" for="flexRadioDefault2">
                  <b>False</b>
                </label>
              </div>
            </div>

            <div class="clearfix">
              <button
                type="submit"
                class="btn btn-secondary"
                style={{ margin: "5px" }}
                onClick={onSubmitHand}
              >
                {" "}
                Update{" "}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditRestaurant;
