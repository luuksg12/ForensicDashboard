import React, { useState, useEffect } from "react";
import { json, Link, useLocation } from 'react-router-dom';
import "../styling/SessionInfo.css"
import "../styling/CreateSession.css"
import { User } from './../models/user.model'

function CreateSession (){
    const location = useLocation();
  
    const [Supervisors, setSupervisors] = useState<User[]>([])
    const [Trainees, setTrainees] = useState<User[]>([])

    const [ShowDropdownMap, setShowDropdownMap] = useState(false)
    const [ShowDropdownSupervisor, setShowDropdownSupervisor] = useState(false)
    const [ShowDropdownPlayer1, setShowDropdownPlayer1] = useState(false)
    const [ShowDropdownPlayer2, setShowDropdownPlayer2] = useState(false)

    const [MapSelected, setMapSelected] = useState('Map');
    const [SupervisorSelected, setSupervisorSelected] = useState('Supervisor');
    const [Player1Selected, setPlayer1Selected] = useState('Deelnemer 1');
    const [Player2Selected, setPlayer2Selected] = useState('Deelnemer 2');
  
    const SUPERVISOR = 1
    const TRAINEE = 0

    const trainees = Trainees.map((trainee, index) =>
      <li key={index} className="list-group-item">Trainee {index+1}: {trainee.firstname} {trainee.lastname}</li>
    );
  
    const supervisors = Supervisors.map((supervisor, index) =>
      <li key={index} className="list-group-item">Supervisor {index+1}: {supervisor.firstname} {supervisor.lastname}</li>
    );
  
    return (
      <div>
        <div className="container-fluid py-5">
          <div className="emptyHolder"></div>
            <div className="card container cardHolder">
  
              <div className="card-body">
                <div className="row">
                    <div className="col">
                        <div className="menucontainer">
                            <div className="btn btn-secondary btn-lg dropdown-toggle growSmall" onClick={() => setShowDropdownMap(!ShowDropdownMap)}>
                                {MapSelected}
                            </div>
                        </div>
                        <div className={ShowDropdownMap ? "dropdown-menu show" : "dropdown-menu"}>
                            <ul>
                                <li onClick={()=>setMapSelected("Cabin")}>Cabin</li>
                                <li onClick={()=>setMapSelected("Bedroom")}>Bedroom</li>
                                <li onClick={()=>setMapSelected("Alleyway")}>Alleyway</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col">
                        <div className="menucontainer">
                            <div className="btn btn-secondary btn-lg dropdown-toggle growSmall" onClick={() => setShowDropdownSupervisor(!ShowDropdownSupervisor)}>
                                {SupervisorSelected}
                            </div>
                        </div>
                        <div className={ShowDropdownSupervisor ? "dropdown-menu show" : "dropdown-menu"}>
                            <ul>
                                <li onClick={()=>setSupervisorSelected("Raoul de Graaf")}>Raoul de Graaf</li>
                                <li onClick={()=>setSupervisorSelected("Supervisor 2")}>Supervisor 2</li>
                                <li onClick={()=>setSupervisorSelected("Supervisor 3")}>Supervisor 3</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col">
                        <div className="menucontainer">
                            <div className="btn btn-secondary btn-lg dropdown-toggle growSmall" onClick={() => setShowDropdownPlayer1(!ShowDropdownPlayer1)}>
                                {Player1Selected}
                            </div>
                        </div>
                        <div className={ShowDropdownPlayer1 ? "dropdown-menu show" : "dropdown-menu"}>
                            <ul>
                                <li onClick={()=>setPlayer1Selected("test Player")}>test Player</li>
                                <li onClick={()=>setPlayer1Selected("test Player 2")}>test Player 2</li>
                                <li onClick={()=>setPlayer1Selected("test Player 3")}>test Player 3</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col">
                        <div className="menucontainer">
                            <div className="btn btn-secondary btn-lg dropdown-toggle growSmall" onClick={() => setShowDropdownPlayer2(!ShowDropdownPlayer2)}>
                                {Player2Selected}
                            </div>
                        </div>
                        <div className={ShowDropdownPlayer2 ? "dropdown-menu show" : "dropdown-menu"}>
                            <ul>
                                <li onClick={()=>setPlayer2Selected("test Player")}>test Player</li>
                                <li onClick={()=>setPlayer2Selected("test Player 2")}>test Player 2</li>
                                <li onClick={()=>setPlayer2Selected("test Player 3")}>test Player 3</li>
                            </ul>
                        </div>
                    </div>
                </div>
              </div>
  
              <div className="row py-3">
                <div className="col-8 ms-3 mapPlaceholder"></div>
                <div className="col font-weight-bold">
                        Map: {MapSelected} <br/>
                        Supervisor: {SupervisorSelected} <br/>
                        Deelnemer 1: {Player1Selected} <br/>
                        Deelnemer 2: {Player2Selected} <br/>

                        <Link to="/Sessioninfo" style={{ textDecoration: 'none', background: '-webkit-linear-gradient(right,#21d4fd,#b721ff,#21d4fd,#b721ff)' }}>
                             <input className="border-0 text-white form-control form-control-lg mt-3 fw-bold growSmall"  type="submit" value="Sessie Aanmaken" style={{background: '-webkit-linear-gradient(left,#21d4fd,#b721ff)' }}/>
                        </Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default CreateSession;