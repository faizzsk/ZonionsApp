import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Login from "../Authantication/Login";
import Logout from "../Authantication/Logout";
import SignUp from "../Authantication/Signup";
import AddRestaurant from "./AddRestaurant";
import DataTableAdmin from "./DataTable";
import EditResaurant from "./EditRestaurant";
import Cookies from "js-cookie"; //
//ront-end\to-do-app\node_modules\bootstrap\dist\css\bootstrap.css
import { useState, useEffect } from "react";
import Axios from "axios";
function HomePage() {
  //const email = localStorage.getItem("user");

  const [data, setData] = useState("");
  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3000/login",
    }).then((res) => {
      const user = Cookies.getJSON("token");
      setData(user);
      console.log(user);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <h1>{data}</h1>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav justify-content-center">
          <ul className="navbar-nav mr-auto">
            {/* <li><Link to={'/AddRestaurant'} className="nav-link"> Add Restaurant </Link></li> */}
            <li>
              <Link to={"/Display"} className="nav-link">
                {" "}
                Display{" "}
              </Link>
            </li>
          </ul>
        </nav>
        {/* <Switch> */}
        {/* <Route  path='/' component={DataTable} /> */}

        <Route path="/AddRestaurant" component={AddRestaurant} />
        <Route path="/EditRestaurant/:id" component={EditResaurant} />

        <Route path="/DataTableAdmin" component={DataTableAdmin} />

        {/* </Switch> */}
      </Router>

      <div>
        <h1></h1>{" "}
      </div>

      {/* <DataTable/> */}
    </div>
  );
}

export default HomePage;
