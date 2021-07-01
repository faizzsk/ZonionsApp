import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Logout from "./Logout";
import HomePage from "../Admin/HomePage";
import "bootstrap/dist/css/bootstrap.css";
import validator from "validator";
import Axios from "axios";

const Login = (props) => {
  let history = useHistory();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [err, setError] = useState({
    emailErr: "",
    passwordErr: "",
  });

  //-----Authentication

  const loginHand = async () => {
    try {
      const result = await Axios({
        method: "POST",
        data: {
          email: login.email,
          password: login.password,
        },
        withCredentials: true,
        url: "http://localhost:3000/login",
      });

      // if(data.data.success =="true")
      //{
      //  if(result.data.status==200){
      alert("Login Succefully");

      // if(localStorage.getItem('user'))
      //{
      localStorage.setItem("user", JSON.stringify(result.data.name));
      history.push("/DataTableAdmin");

      //}

      // }

      console.log("REsultttttttttttttttt", result);
    } catch (err) {
      //console.log(err.response.data);
      setError({ passwordErr: "Passowrd is incoccrect" });
      alert("wrong password");
      history.push("/Login");
    }
  };

  //----------XXXXXX--------

  const validate = () => {
    let emailErr = "";
    let passwordErr = "";

    if (!login.email) {
      emailErr = "Email can not to be blank";
    }

    if (!login.password) {
      passwordErr = "passowrd can not be empty";
    }

    if (!validator.isEmail(login.email)) {
      emailErr = "invalid email";
    }

    if (emailErr || passwordErr) {
      setError({ emailErr, passwordErr });
      return false;
    }

    return true;
  };

  const onchangeHand = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const HandleLogin = (e) => {
    e.preventDefault();
    const valid = validate();

    if (valid) {
      console.log(login);
      loginHand();
      // history.push("/HomePage")
    }

    // props.history.push("./Logout")
    //  return <Redirect to="/Logout"/>

    console.log("clicked");
  };

  const HandleSignup = (e) => {
    // e.preventDefault();

    history.push("/SignUp");


    console.log("clicked");
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-md navbar-light bg-secondary stickey-top"
        style={{ backgroundColor: "#dfe6e9" }}
      >
             <a class="navbar-brand" href="#">Zonions</a>

        <div className="container">
          <div className=" " id="navbar-Responsive"></div>
          <ul className="navbar-nav">
          {localStorage.getItem("user")?

          <li className="nav-item navAddEdit" style={{ fontSize: "" }}>
              {" "}
              <button
                className="nav-link"
                class="btn btn-secondary"
                
              >
Admin : {localStorage.getItem("user")}
             </button>
            {/* </li> */}
            </li>
       :null} 
            <li className="nav-item navAddEdit" style={{ fontSize: "" }}>
              {" "}
              <button
                className="nav-link"
                class="btn btn-secondary"
                onClick={()=> history.push("/DataTable")}
              >
HomePage              </button>
            </li>


          </ul>
        </div>
            </nav>
      <div
        class="container border border-secondary rounded-1 shadow-lg p-3 sm-1  rounded login "
        
      >
        <br></br><br></br><br></br>
        <h1>Login</h1>
        <br></br>

        <div className="row d-flex justify-content-center text-center">
          <div class="col-md-4 text-center">
            <form
              class="row g-3 d-flex p-2 d-flex justify-content-center"
              action=""
            >
              <br></br>
              <br></br>
              <label for="uname" class="form-control w-100 p-1">
                <b>Email</b>
              </label>
              <input
                type="text"
                class="form-control w-100 p-2"
                placeholder="Enter Username"
                onChange={onchangeHand}
                name="email"
                value={login.email}
                required
              />
              <p style={{ color: "red" }}>{err.emailErr}</p>

              <br></br>
              <br></br>
              <br></br>
              <label for="psw" class="form-control w-100 p-1">
                <b>Password</b>
              </label>
              <input
                type="password"
                class="form-control w-100 p-2"
                placeholder="Enter Password"
                onChange={onchangeHand}
                name="password"
                value={login.password}
                required
              />
              <p style={{ color: "red" }}>{err.passwordErr}</p>

              <br></br>

              <br></br>
              <div class="d-grid gap-2 d-md-block">
                <button
                  class="btn btn-secondary "
                  style={{ margin: "5px" }}
                  type="button"
                  onClick={HandleLogin}
                >
                  Login
                </button>
                <button
                  class="btn btn-secondary"
                  style={{ margin: "5px" }}
                  type="button"
                  onClick={HandleSignup}
                >
                  Sign Up...
                </button>
                <br></br><br></br>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
