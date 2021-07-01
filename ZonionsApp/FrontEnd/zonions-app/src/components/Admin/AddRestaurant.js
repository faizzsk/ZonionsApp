import React, { useState } from "react";
import { Validator } from "react";
import validator from "validator";
import Axios from "axios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
//-------materail ui

import { TimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import AddBoxIcon from "@material-ui/icons/AddBox";

//-------Import Done---

const AddRestaurant = () => {
  let history = useHistory();

  //state
  const [restaurantData, setData] = useState({
    rest_name: "",
    rest_address: "",
    rest_openingTime: "",
    rest_closingTime: "",
    rest_menu: "",
    rest_active: "",
  });

  // const [image, setImage] = useState({
  //   image: "",
  // });

  //Error state
  const [err, setError] = useState({
    rest_nameError: "",
    rest_addressError: "",
    rest_phone: "",
    rest_openingTimeError: "",
    rest_closingTimeError: "",
    rest_menuError: "",
  });

  //Validation Function----------
  const validate = () => {
    let rest_nameError = "";
    let rest_addressError = "";
    let rest_phoneError = "";
    let rest_openingTimeError = "";
    let rest_closingTimeError = "";
    let rest_menuError = "";

    if (!restaurantData.rest_name) {
      rest_nameError = " Field can not be blank";
    }

    if (!restaurantData.rest_address) {
      rest_addressError = "Field can not be blank";
    }

    if (!restaurantData.rest_phone) {
      rest_phoneError = " Field can not be blank";
    } else {
      if (restaurantData.rest_phone.match(/^[789]{1}\d{9}$/)) {
        return true;
      } else {
        rest_phoneError = "Phone number is invalid";
        return false;
      }
    }
    if (!restaurantData.rest_openingTime) {
      rest_openingTimeError = "Field can not be blank";
    }

    if (!restaurantData.rest_closingTime) {
      rest_closingTimeError = "Field can not be blank";
    }

    if (!restaurantData.rest_menu) {
      rest_menuError = "Field can not be blank";
    }

    if (!validator.isAlphanumeric(restaurantData.rest_name)) {
      console.log("wrong");
      rest_nameError = "No special Charachter is allowed";
    }

    // var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    //         if (!allowedExtensions.exec(rest_menu)) {
    //             alert('Invalid file type');
    //             fileInput.value = '';
    //             return false;
    //         }

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

  const onSubmitHand = (e) => {
    e.preventDefault();

    const valid = validate();

    if (valid) {
      console.log(restaurantData);
      alert("Data Added Succesfully");
      AddRestaurantHandle();
      //  history.push("/Login")
    } else {
    }
  };

  //-----On change handler

  const onchangeHandler = (e) => {
    //  setUserData({...userData}, [e.target.value])
    setData({ ...restaurantData, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  // const changeTime =(e)=>{
  //   setTime(e.target.value)
  // }

  // Add Restaurant into DB

  const AddRestaurantHandle = async () => {
    try {
      const result = await Axios({
        method: "POST",
        data: {
          name: restaurantData.rest_name,
          address: restaurantData.rest_address,
          phone: restaurantData.rest_phone,
          openingtime: restaurantData.rest_openingTime,
          closingtime: restaurantData.rest_closingTime,
          menu: restaurantData.rest_menu,
        },
        withCredentials: true,
        url: "http://localhost:3000/restaurants",
      });
      console.log(result.data.menu);

      history.push("/DataTableAdmin");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  //----------------------------------------------Image

  const handleImageUpload = (e) => {
    e.preventDefault();
    const { files } = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append("file", files[0]);
    // replace this with your upload preset name
    formData.append("upload_preset", "ml_default");
    const options = {
      method: "POST",
      body: formData,
    };

    return fetch("https://api.Cloudinary.com/v1_1/fizzsk/image/upload", options)
      .then((res) => res.json())
      .then((res) => {
        setData({
          ...restaurantData,
          rest_menu: res.secure_url,
          imageAlt: `An image of ${res.original_filename}`,
        });
      })
      .then((res) => console.log(restaurantData))
      .catch((err) => console.log(err));
  };

  //----------------------End Of Image -----------------------------------------------------------------

  return (
    <div class="addrest">
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
              {/* </li> */}
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

      <form class="row g-3 d-flex p-2 d-flex justify-content-center" action="">
        <div
          class="container border border-secondary rounded-1 shadow-lg p-3 sm-1  rounded "
          style={{ backgroundColor: "" }}
        >
          <h4>Add Restaurant</h4>
          <p></p>
          <hr />
          <div
            class="row d-flex justify-content-center text-center"
            style={
              ({ backgroundColor: "" }, { backgroundImage: "url(bg.jpg)" })
            }
          >
            <div class="col-md-4 text-center" style={{ backgroundColor: "" }}>
              <label for="name" class="form-control w-100 p-1">
                <b>Restaurant Name</b>
              </label>

              <input
                type="text"
                class="form-control w-100 p-2 "
                value={restaurantData.rest_name}
                placeholder="Restaurant Name"
                onChange={onchangeHandler}
                name="rest_name"
              />
              <p style={{ color: "red" }}>{err.rest_nameError}</p>
              <br></br>
              <br></br>
              <label for="address" class="form-control w-100 p-1">
                <b>Address </b>
              </label>
              {/* <textarea  name="rest_address" onchange={onchangeHandler} value={restaurantData.rest_address}></textarea> */}
              <input
                type="text"
                class="form-control w-100 p-2"
                placeholder="Enter Address"
                name="rest_address"
                onChange={onchangeHandler}
              />
              <p style={{ color: "red" }}>{err.rest_addressError}</p>

              <label for="phone" class="form-control w-100 p-1">
                <b>Phone Number </b>
              </label>
              <input
                type="text"
                class="form-control w-100 p-2"
                placeholder="Enter Phone Number"
                name="rest_phone"
                onChange={onchangeHandler}
              />
              <p style={{ color: "red" }}>{err.rest_phoneError}</p>

              <label for="openingTime" class="form-control w-100 p-1">
                <b>Opening Time </b>
              </label>
              <input
                type="time"
                class="form-control w-100 p-2"
                placeholder="Enter Opening Time"
                name="rest_openingTime"
                onChange={onchangeHandler}
              />
              <p style={{ color: "red" }}>{err.rest_openingTimeError}</p>

              <label for="closingtime" class="form-control w-100 p-1">
                <b>Closing Time</b>
              </label>
              <input
                type="time"
                class="form-control w-100 p-2"
                placeholder="Enter Closing Time"
                name="rest_closingTime"
                onChange={onchangeHandler}
              />
              <p style={{ color: "red" }}>{err.rest_closingTimeError}</p>

              <br></br>
              <label for="menu" class="form-control w-100 p-1">
                <b>Menu</b>
              </label>
              <input
                type="file"
                class="form-control w-100 p-2"
                //accept="image/png, image/jpeg"
                onChange={handleImageUpload}
              />
            </div>
            <div class="clearfix">
              <button
                type="submit"
                class="btn btn-secondary"
                style={{ margin: "5px" }}
                onClick={onSubmitHand}
              >
                {" "}
                Save{" "}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
