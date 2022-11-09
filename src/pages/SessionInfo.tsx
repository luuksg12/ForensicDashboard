import React, { useState, useEffect } from "react";
import { json, Link, useLocation } from 'react-router-dom';
import Nav from "./components/Nav";
import Map from "./components/Map";
import "../styling/SessionInfo.css"
import { Session } from './../models/session.model'
import { User } from './../models/user.model'

function SessionInfo (){
  const [SessionInfoPH, setSessionInfoPH] = useState(
    //placeholder data
      { id: "1", date: "10/4/2022", time:"10:23", duration: "12:21", player1: "Jan Joost", player2: "John Doe", map: "cabin", situation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat" },
  )
  const location = useLocation();
  const sessionId = location.state?.data;

  const [SessionInfo, setSessionInfo] = useState<Session>()
  const [Supervisors, setSupervisors] = useState<User[]>([])
  const [Trainees, setTrainees] = useState<User[]>([])

  const SUPERVISOR = 1
  const TRAINEE = 0

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(
          `http://145.24.222.175/simulation/session?sessionId=${sessionId}`
        )
      ).json();
      await setSessionInfo(data);
    };

    dataFetch();
  }, [sessionId]);

  useEffect(() => {
    if (!!SessionInfo?.participants) {
      const allUsers: Promise<User>[] = SessionInfo?.participants.map(async (userJSON) => {
        return await (
          await fetch(
            `http://145.24.222.175/simulation/user?id=${userJSON['userId']}`
          )
        ).json();
      })
      const userBase = Promise.all(allUsers)
      userBase.then((users) => {
        setSupervisors(users.filter(user => user.role === SUPERVISOR))
        setTrainees(users.filter(user => user.role === TRAINEE))
      })
    }

  }, [SessionInfo?.participants]);

  const trainees = Trainees.map((trainee, index) =>
    <li key={index} className="list-group-item">Trainee {index+1}: {trainee.firstname} {trainee.lastname}</li>
  );

  const supervisors = Supervisors.map((supervisor, index) =>
    <li key={index} className="list-group-item">Supervisor {index+1}: {supervisor.firstname} {supervisor.lastname}</li>
  );

  //mapping data and storing in evidence variable 
    return (
      <div>
        <Nav/>
        <div className="container-fluid py-5">
          <div className="politie"></div>
          <div className="emptyHolder"></div>
            <div className="card container cardHolder">

              <div className="card-body">
                <h5 className="card-title">{SessionInfoPH.map}</h5>
                <p className="info">{SessionInfoPH.date} - {SessionInfoPH.time} | Duur : {SessionInfoPH.duration} | {SessionInfoPH.player1} / {SessionInfoPH.player2}</p>
                <p className="card-text">{SessionInfoPH.situation}</p>
              </div>

              <div className="row py-3">
                <div className="col-8 ms-3 mapPlaceholder"></div>
                <div className="col">
                      <Link to="/evidence" style={{ textDecoration: 'none' }}><p className="evidenceItem">Blood</p></Link>
                      <Link to="/evidence" style={{ textDecoration: 'none' }}><p className="evidenceItem">Blood</p></Link>
                      <Link to="/evidence" style={{ textDecoration: 'none' }}><p className="evidenceItem">Blood</p></Link>
                      <Link to="/evidence" style={{ textDecoration: 'none' }}><p className="evidenceItem">Blood</p></Link>
                      <Link to="/evidence" style={{ textDecoration: 'none' }}><p className="evidenceItem">Blood</p></Link>
                      <Link to="/evidence" style={{ textDecoration: 'none' }}><p className="evidenceItem">Blood</p></Link>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }

export default SessionInfo;