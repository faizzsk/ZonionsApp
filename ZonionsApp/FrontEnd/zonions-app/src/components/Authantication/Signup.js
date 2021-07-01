import React, { useState } from "react";
import { Validator } from "react";
import validator from 'validator';
import Axios from "axios"
import { useHistory } from "react-router";
const SignUp = () => {

let history=useHistory()
    const[userData, setUserData] = useState({

        email : "",
      //  emailError:"",
        Name :"",
        Email:"",
        password:"",

    })

    const[err, setState] = useState({
      emailError:"",
      nameErr:"",
      passwordErr:""
    })
    //const[dobErr, setdobErr] = useState("")

var arr=[];
    const {email,first_name} = userData
    

    const register = () => {
        Axios({
          method: "POST",
          data: {
            first_name:userData.first_name,
            last_name:userData.last_name,
            email: userData.email,
            password: userData.password,
            password2:userData.password2
          },
         withCredentials: true, //with
        url: "http://localhost:5000/api/users/register",
       
        }).then((res) => console.log(res));
       // console.log("react----=>",data);
      };
 

      const validate = () => {
      
      }





      
    const onSubmitHand = (e)=>{

        e.preventDefault()

      const valid = validate()

      if(valid)
      {
        register()
        history.push("/Login")

      }
       arr.push(userData.email)

        console.log("true");
 

    }



    const onchangeHandler = (e)=>{
        setUserData({...userData, [e.target.name]: e.target.value})
        console.log(e.target.value);
    }

    

    return ( <div>
        {/* <form class="row g-3 d-flex p-2 d-flex justify-content-center" action="action_page.php" >
  <div class="container border border-secondary rounded-1 shadow-lg p-3 sm-1 bg-body rounded ">
    <h1>Sign Up</h1>
    <p>Please fill in this form to create an account.</p>
    <hr/>
<div class="row d-flex justify-content-center text-center">
    <div class="col-md-8 text-center">
    <label for="email" class="form-control w-100 p-1"><b>Email</b></label>

    <input type="text" class="form-control w-100 p-2 " value={userData.email} placeholder="Enter Email" onChange={onchangeHandler}name="email" onchangeHandlerequired/>
        <p style={{color:"red"}}>{err.emailError}</p>
<br></br><br></br>
    <label for="fname" class="form-control w-100 p-1"><b>First Name </b></label>
    <input type="text" class="form-control w-100 p-2" placeholder="Enter First Name" name="first_name" onChange={onchangeHandler} required/>
    <p style={{color:"red"}}>{err.first_nameErr}</p>

    <label for="lname" class="form-control w-100 p-1"><b>Last Name </b></label>
    <input type="text" class="form-control w-100 p-2" placeholder="Enter Last Name" name="last_name" onChange={onchangeHandler} required/>
    <p style={{color:"red"}}>{err.last_nameErr}</p>

    <label for="dob" class="form-control w-100 p-1"><b>Date of Birth </b></label>
    <input type="Date" class="form-control w-100 p-2" placeholder="Enter Date Of Birth" name="date_of_birth" onChange={onchangeHandler} required/>
    <p style={{color:"red"}}>{err.date_of_birthError}</p>

    <label for="psw" class="form-control w-100 p-1"><b>Password</b></label>
    <input type="password" class="form-control w-100 p-2" placeholder="Enter Password" name="password" onChange={onchangeHandler} required/>
    <p style={{color:"red"}}>{err.passwordErr}</p>

    <label for="psw-repeat" class="form-control w-100 p-1"><b>Repeat Password</b></label>
    <input type="password" class="form-control w-100 p-2"  placeholder="Repeat Password" name="password2" onChange={onchangeHandler} required/>

    </div>
    <div class="clearfix">
      <button type="button" class="btn btn-secondary"  style={{margin:"5px"}}>Cancel</button>
      <button type="submit" class="btn btn-secondary" style={{margin:"5px"}} onClick={onSubmitHand}> Sign Up</button>
    </div>
    </div>
  </div>
</form> */}

    </div> );
}
 
export default SignUp;