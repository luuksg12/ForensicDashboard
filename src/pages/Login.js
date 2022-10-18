import React, {useState} from "react";
import Sessions from "./Sessions";
import { Link } from 'react-router-dom';
import "./Login.css"

function Login (){

  const [logoList, setlogoList] = useState(
    //placeholder data
    [
      { id: "1", name:"Logo" },
      { id: "2", name:"Logo" },
    ]
  )


  const logos = logoList.map((value) =>
    <div class="col-1 logo" key={value.id}>
      <div class="logotext">{value.name}</div>
    </div>
  );
  //mapping data and storing in evidence variable 
    return (
      <div class="container-fluid p-0">
        <div class="politie"></div>
          <div class="row-9 main d-flex align-items-center justify-content-center">
            <div class="d-flex flex-column">
              <input class="input-background form-control form-control-lg" type="text" placeholder="Username"></input>
              <input class="input-background form-control form-control-lg mt-1" type="text" placeholder="Password"></input>
              
              <Link to="/sessions" style={{ textDecoration: 'none' }}><input class="input-background form-control form-control-lg mt-3" type="submit" value="Login"></input></Link>
            </div>
          </div>
          <div class="bottombar row-3 container">
            {logos}
          </div>
      </div>
    )
  }

export default Login;