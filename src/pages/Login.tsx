import React, {useEffect, useState} from "react";
import Sessions from "./Sessions";
import TNOLogo from '../img/logo-tno.svg';
import {Link, useLocation} from 'react-router-dom';
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
     <div className="container h-100">
         <div className="row justify-content-center align-items-center h-100">
             <div className="col-4">
                 <div className="card mask-custom">
                     <img src={TNOLogo} className="p-3"/>
                     <div className="card-title d-flex justify-content-center text-white fw-bold">Welkom</div>
                     <div className="card-body px-5">
                         <div className="form-floating mb-3 bg-transparent">
                             <input type="email" className="form-control bg-transparent text-white" id="Username"
                                    placeholder="Gebruikersnaam"/>
                                 <label htmlFor="Username" className="text-white">Gebruikersnaam</label>
                         </div>
                         <div className="form-floating mb-3 bg-transparent mb-5">
                             <input type="email" className="form-control bg-transparent text-white" id="Password"
                                    placeholder="Wachtwoord"/>
                             <label htmlFor="Password" className="text-white">Wachtwoord</label>
                         </div>
                         <Link to="/sessions" style={{ textDecoration: 'none', background: '-webkit-linear-gradient(right,#21d4fd,#b721ff,#21d4fd,#b721ff)' }}>
                             <input className="border-0 text-white form-control form-control-lg mt-3 fw-bold"  type="submit" value="Login" style={{background: '-webkit-linear-gradient(left,#21d4fd,#b721ff)' }}/>
                         </Link>
                     </div>
                 </div>
             </div>
         </div>
     </div>
    )
  }

export default Login;