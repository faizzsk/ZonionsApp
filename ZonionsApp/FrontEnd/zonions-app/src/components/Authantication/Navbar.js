import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Login from "../Authantication/Login";
import Logout from "./Logout";
import SignUp from "./Signup";
import HomePage from "../Admin/HomePage";
import DataTable from "../User/DataTable";
import DataTableAdmin from "../Admin/DataTable";
import DataTableUser from "../User/DataTable";
import AddRestaurant from "../Admin/AddRestaurant";
import EditRestaurant from "../Admin/EditRestaurant";
import Axios from "axios";
import Cookies from "js-cookie";

import { useEffect } from "react";
import { filterGridStateSelector } from "@material-ui/data-grid";
import View from "../Admin/View";

function NavBar() {
  
  var loggedUser = localStorage.getItem("user");
  var flag;
  if (loggedUser == "Faiz") {
    flag = true;
  } else {
    flag = false;
  }

  var user = localStorage.getItem("user");
  console.log(" from ", user);

  return (
    <div className="App">
      <Router>
        {/* <nav className="navbar navbar-expand-lg    " style={{backgroundColor:"#dfe6e9"}}>
          <ul className="navbar-nav mr-auto">
       <a class="navbar-brand" href="#">Zonions</a>

          </ul>
          </nav>
        */}

        <div class="">
          <Route path="/Login" component={Login} />
          <Route path="/DataTableAdmin" component={DataTableAdmin} />

          <Route exact path="/HomePage" component={HomePage} />
          <Route exact path="/DisplayAdmin" component={DataTableAdmin} />

          <Route exact path="/AddRestaurant" component={AddRestaurant} />
          <Route exact path="/DataTable" component={DataTableUser} />

          <Route path="/EditRestaurant/:id" component={EditRestaurant} />
          <Route path="/View/:id" component={View} />

          <Route exact path="/" component={DataTableUser} />
        </div>
      </Router>
    </div>
  );
}

export default NavBar;
