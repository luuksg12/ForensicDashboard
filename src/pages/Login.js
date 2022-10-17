import React, {useState} from "react";
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
          <div class="row-9 main d-flex align-items-center justify-content-center">

            <div class="d-flex flex-column">
              <input class="form-control form-control-lg" type="text" placeholder="Username"></input>
              <input class="form-control form-control-lg mt-1" type="text" placeholder="Password"></input>
              <input class="form-control form-control-lg mt-3" type="submit" value="Login"></input>
            </div>
          </div>
          <div class="bottombar row-3">
            {logos}
          </div>
      </div>
    )
  }

export default Login;