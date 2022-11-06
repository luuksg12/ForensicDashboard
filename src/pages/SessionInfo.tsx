import React, {useState} from "react";
import { Link } from 'react-router-dom';
import Nav from "./components/Nav";
import Map from "./components/Map";
import "../styling/SessionInfo.css"

function SessionInfo (){
  const [SessionInfo, setSessionInfo] = useState(
    //placeholder data
      { id: "1", date: "10/4/2022", time:"10:23", duration: "12:21", player1: "Jan Joost", player2: "John Doe", map: "cabin", situation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat" },
  )

  //mapping data and storing in evidence variable 
    return (
      <div>
        <Nav/>
        <div className="container-fluid py-5">
          <div className="politie"></div>
          <div className="emptyHolder"></div>
            <div className="card container cardHolder">

              <div className="card-body">
                <h5 className="card-title">{SessionInfo.map}</h5>
                <p className="card-text">{SessionInfo.situation}</p>
              </div>

              <ul className="list-group list-group-flush">
                <li className="list-group-item">{SessionInfo.date} - {SessionInfo.time}</li>
                <li className="list-group-item">Duur : {SessionInfo.duration}</li>
                <li className="list-group-item">{SessionInfo.player1} / {SessionInfo.player2}</li>
              </ul>

              <div className="row py-3">
                <div className="col-8"><Map/></div>
                <div className="col">
                      <Link to="/evidence" style={{ textDecoration: 'none' }}><input className="input-background form-control form-control-lg" type="submit" value="blood"></input></Link>
                      <Link to="/evidence" style={{ textDecoration: 'none' }}><input className="input-background form-control form-control-lg" type="submit" value="blood"></input></Link>
                      <Link to="/evidence" style={{ textDecoration: 'none' }}><input className="input-background form-control form-control-lg" type="submit" value="blood"></input></Link>
                      <Link to="/evidence" style={{ textDecoration: 'none' }}><input className="input-background form-control form-control-lg" type="submit" value="blood"></input></Link>
                      <Link to="/evidence" style={{ textDecoration: 'none' }}><input className="input-background form-control form-control-lg" type="submit" value="blood"></input></Link>
                      <Link to="/evidence" style={{ textDecoration: 'none' }}><input className="input-background form-control form-control-lg" type="submit" value="blood"></input></Link>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }

export default SessionInfo;