import React, {useState} from "react";
import { Link } from 'react-router-dom';
import Nav from "./components/Nav";
import "../styling/SessionInfo.css"

function SessionInfo (){
  const [SessionInfo, setSessionInfo] = useState(
    //placeholder data
      { id: "1", date: "10/4/2022", time:"10:23", duration: "12:21", player1: "Jan Joost", player2: "John Doe", map: "cabin", situation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat" },
  )

  //mapping data and storing in evidence variable 
    return (
      <div className="container-fluid p-0">
        <Nav/>
        <div className="politie"></div>
        <div className="card container">
            <img className="card-img-top" src="..." alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title">{SessionInfo.map}</h5>
              <p className="card-text">{SessionInfo.situation}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{SessionInfo.date} - {SessionInfo.time}</li>
              <li className="list-group-item">Duur : {SessionInfo.duration}</li>
              <li className="list-group-item">{SessionInfo.player1} / {SessionInfo.player2}</li>
              <li className="list-group-item"><Link to="/map" style={{ textDecoration: 'none' }}><input className="input-background form-control form-control-lg" type="submit" value="zie map"></input></Link></li>
            </ul>
            <div className="card-body">
              <a href="#" className="card-link">Card link</a>
              <a href="#" className="card-link">Another link</a>
            </div>
          </div>
      </div>
    )
  }

export default SessionInfo;