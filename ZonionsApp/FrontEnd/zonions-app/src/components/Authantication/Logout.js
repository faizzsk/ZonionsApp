import React, { useEffect, useState, useHistory } from "react";
import Axios from "axios";
const Logout = () => {
    let history = useHistory()

    const [data,setData]=useState("")

    const clearUser = () => {
        const res = Axios({
          method: "GET",
          withCredentials: true,
          url: "http://localhost:5000/api/users/logout",
        }).then((res) => {
          setData(res.data);
          console.log("delete this: ",res.data.email);
        })//.then((res)=>localStorage.clear());

        
        if(res.data.status==="success")
        {
                 history.push("/Login")
 
        }

        //history.push("/Login")
      };
    

    useEffect((e)=>{
       // e.preventDefault()
         clearUser()
        //history.push("/Login")
    })
    return ( <div>
        <h1></h1>
    </div> );
}
 
export default Logout;