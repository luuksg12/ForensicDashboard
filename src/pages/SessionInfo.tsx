import React, { useState, useEffect } from "react";
import { json, Link, useLocation } from 'react-router-dom';
import Nav from "./components/Nav";
import Map from "./components/Map";
import "../styling/SessionInfo.css"
import { Session } from './../models/session.model'
import { User } from './../models/user.model'


function SessionInfo() {
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

  return (
    <div>
      <Nav/>
      <div className="container-fluid py-5">
        <div className="politie"></div>
        <div className="emptyHolder"></div>
          <div className="card container cardHolder">

            <div className="card-body">
              <h5 className="card-title">{SessionInfo?.scene?.name}</h5>
              <p className="info">{SessionInfo?.startTime} | Duur : {(!!SessionInfo?.stopTime) ? SessionInfo?.stopTime : 'nog niet gestopt'} | {trainees} | {supervisors}</p>
              <p className="card-text">{SessionInfo?.description}</p>
            </div>

            <div className="row py-3">
              <div className="col-8 ms-3 mapPlaceholder"></div>
              <div className="col">
                    <Link to="/evidence" style={{ textDecoration: 'none' }}><p className="evidenceItem growSmall">Blood</p></Link>
                    <Link to="/evidence" style={{ textDecoration: 'none' }}><p className="evidenceItem growSmall">Blood</p></Link>
                    <Link to="/evidence" style={{ textDecoration: 'none' }}><p className="evidenceItem growSmall">Blood</p></Link>
                    <Link to="/evidence" style={{ textDecoration: 'none' }}><p className="evidenceItem growSmall">Blood</p></Link>
                    <Link to="/evidence" style={{ textDecoration: 'none' }}><p className="evidenceItem growSmall">Blood</p></Link>
                    <Link to="/evidence" style={{ textDecoration: 'none' }}><p className="evidenceItem growSmall">Blood</p></Link>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SessionInfo;