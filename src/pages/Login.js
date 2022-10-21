import React, {useState} from "react";
import Sessions from "./Sessions";
import { Link } from 'react-router-dom';
import "../styling/Login.css"

function Login (){

  const [logoList, setlogoList] = useState(
    //placeholder data
    [
      { id: "1", name:"Logo" },
      { id: "2", name:"Logo" },
    ]
  )


  const logos = logoList.map((value) =>
    <div className="col-1 logo" key={value.id}>
      <div className="logotext">{value.name}</div>
    </div>
  );
  //mapping data and storing in evidence variable 
    return (
      <div className="container-fluid p-0">
        <div className="politie"></div>
          <div className="row-9 main d-flex align-items-center justify-content-center">
            <div className="d-flex flex-column">
              <input className="input-background form-control form-control-lg" type="text" placeholder="Username"></input>
              <input className="input-background form-control form-control-lg mt-1" type="text" placeholder="Password"></input>
              
              <Link to="/sessions" style={{ textDecoration: 'none' }}><input className="input-background form-control form-control-lg mt-3" type="submit" value="Login"></input></Link>
            </div>
          </div>
          <div className="bottombar row-3 container">
            {logos}
          </div>
      </div>
    )
  }

export default Login;