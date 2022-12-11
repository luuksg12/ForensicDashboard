import React, { useEffect, useState, useRef } from "react";
import Sessions from "./Sessions";
import TNOLogo from '../img/logo-tno.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../styling/Login.css"

function Login() {
  let navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);

  const [logoList, setlogoList] = useState(
    //placeholder data
    [
      { id: "1", name: "Logo" },
      { id: "2", name: "Logo" },
    ]
  )
 
  function validateLogin() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
       },
      body: JSON.stringify({ "email": `${email}`, "password": `${password}` })
    };
    const dataFetch = async () => {
      const data = await (
        await fetch('http://localhost:8010/proxy/simulation/user/login', requestOptions)
      );
      if(data.status === 201){
        navigate("/sessions");
        return;
      }
      alert("Invalid login credentials..")
    };
    dataFetch();
  }


  const logos = logoList.map((value) =>
    <div className="col-1 logo" key={value.id}>
      <div className="logotext">{value.name}</div>
    </div>
  );

  //mapping data and storing in evidence variable 
  return (
    <div className="container h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-4">
          <div className="card mask-custom">
            <img src={TNOLogo} className="p-3" />
            <div className="card-title d-flex justify-content-center text-white fw-bold">Welkom</div>
            <div className="card-body px-5">
              <div className="form-floating mb-3 bg-transparent">
                <input type="text" className="form-control bg-transparent text-white growSmall" id="Email"
                  placeholder="Email" onChange={event => setEmail(event.target.value)} />
                <label htmlFor="Email" className="text-white">Email</label>
              </div>
              <div className="form-floating mb-3 bg-transparent mb-5">
                <input type="password" className="form-control bg-transparent text-white growSmall" id="Password"
                  placeholder="Wachtwoord" onChange={event => setPassword(event.target.value)} />
                <label htmlFor="Password" className="text-white">Wachtwoord</label>
              </div>
                <input onClick={() => validateLogin()} className="border-0 text-white form-control form-control-lg mt-3 fw-bold growSmall" type="submit" value="Login" style={{ background: '-webkit-linear-gradient(left,#21d4fd,#b721ff)' }} />
              <Link to="/create" style={{ textDecoration: 'none', background: '-webkit-linear-gradient(right,#21d4fd,#b721ff,#21d4fd,#b721ff)' }}>
                <input className="border-0 text-white form-control form-control-lg mt-3 fw-bold growSmall" type="submit" value="Account aanmaken" style={{ background: '-webkit-linear-gradient(left,#21d4fd,#b721ff)' }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



export default Login;