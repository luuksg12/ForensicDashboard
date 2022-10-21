import React, {useState} from "react";
import { Link } from 'react-router-dom';
import "./SessionInfo.css"

function SessionInfo (){
  const [SessionInfo, setSessionInfo] = useState(
    //placeholder data
      { id: "1", date: "10/4/2022", time:"10:23", duration: "12:21", player1: "Jan Joost", player2: "John Doe", map: "cabin", situation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat" },
  )

  //mapping data and storing in evidence variable 
    return (
      <div className="container-fluid p-0">
        <div className="politie"></div>
          <div className="row-9 main d-flex align-items-center justify-content-center">
            <div className="d-flex flex-column sessionHolder text-left">
              <div className="row">
                <div className="col">{SessionInfo.map}</div>
                <div className="col">{SessionInfo.date}</div>
                <div className="col">{SessionInfo.time}</div>
              </div>
              <div className="row">
                <div className="col">Duur : {SessionInfo.duration}</div>
              </div>
              <div className="row">
                <div className="col">Student 1 : {SessionInfo.player1}</div>
              </div>
              <div className="row">
                <div className="col">Student 2 : {SessionInfo.player2}</div>
              </div>
              <div className="row">
                <div className="col">situatie : {SessionInfo.situation}</div>
              </div>
            </div>
          </div>
      </div>
    )
  }

export default SessionInfo;