import React, { useState, useEffect } from "react";
import { json, Link, useLocation } from 'react-router-dom';
import Nav from "./components/Nav";
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
    <div className="container-fluid p-0">
      <Nav />
      <div className="politie"></div>
      <div className="card container">
        <img className="card-img-top" src="..." alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{SessionInfo?.id}</h5>
          <p className="card-text">{SessionInfo?.description}</p>
        </div>
        <ul className="list-group list-group-flush">
          {supervisors}
          {trainees}
          <li className="list-group-item">Session description: {SessionInfo?.description}</li>
          <li className="list-group-item">Scene: {SessionInfo?.scene?.name}</li>
          <li className="list-group-item">Start tijd: {SessionInfo?.startTime}</li>
          <li className="list-group-item">Stop tijd: {(!!SessionInfo?.stopTime) ? SessionInfo?.stopTime : 'nog niet gestopt'}</li>
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