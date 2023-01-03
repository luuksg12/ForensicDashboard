import React, { useEffect, useState } from "react";
import { Link, NavigateOptions, useNavigate, useLocation } from 'react-router-dom';
import { Participant, Session } from "../models/session.model";
import "../styling/Sessions.css";
import IsLiveBadge from "./components/IsLiveBadge";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { User } from "../models/user.model";
import { Http, Method } from '../helper/Http';
import { HOST } from "../Constants";
import { Button, Input } from "@mui/material";
import DeleteBadge from "./components/DeleteBadge";

function Sessions() {

  let [sessions, setSessions] = useState<Session[]>([])
  const loggedInUser: User = useLocation().state;
  const navigate = useNavigate();



  useEffect(() => {
    if (loggedInUser === null) navigate('/')
    const body = {
      userId: loggedInUser.id,
      skip: 0,
      take: 10
    }
    const fetchSessions = async () => {
      const result = await (
        await Http.request(Method.POST, `${HOST}/user/sessions`, body)
      ).json()
      setSessions(result);
    }
    fetchSessions();
  }, []);


  const sessionComponents = sessions.map((session: Session) => {
    let startTime = new Date(session.startTime).toDateString();
    let stopTime = "-";
    if (session.stopTime != undefined) {
      stopTime = new Date(session.stopTime).toDateString();
    }
    let isLive = session.stopTime == undefined;
    return (
      <>
        <tr key={session.id} >
          <td >
            <IsLiveBadge IsLive={isLive} />
          </td>
          <td onClick={() => navigate("/SessionInfo", { state: { data: session.id, user: loggedInUser } })}>
            <div className="d-flex align-items-center">
              <p className="fw-normal mb-1">{session.description}</p>
            </div>
          </td>
          <td onClick={() => navigate("/SessionInfo", { state: { data: session.id, user: loggedInUser } })}>
            <p className="fw-normal mb-1">{startTime}</p>
            <p className="fw-normal">{stopTime}</p>
          </td>
          <td onClick={() => navigate("/SessionInfo", { state: { data: session.id, user: loggedInUser } })}>
            {session.participants?.map((participant, index) => {
              if (participant.user.role == 0)
                return (
                  <div key={index}>{participant.user.fullname}</div>
                )
            })}
          </td>
          <td onClick={() => navigate("/SessionInfo", { state: { data: session.id, user: loggedInUser } })}>
            {session.participants?.map((participant, index) => {
              if (participant.user.role == 1)
                return (
                  <div key={index}>{participant.user.fullname}</div>
                )
            })}
          </td>
          <td>
            <>
              <Button style={{ position: "relative", backgroundColor: "crimson", color: "white" }} onClick={async () => {
                await Http.request(Method.DELETE, `${HOST}/session/delete`, { sessionId: session.id })
                const result = await (
                  await Http.request(Method.POST, `${HOST}/user/sessions`, {
                    userId: loggedInUser.id,
                    skip: 0,
                    take: 10
                  })
                ).json()
                setSessions(result);
              }}>{"Del"}</Button>

            </>
          </td>
        </tr>
      </>
    )
  });



  //mapping data and storing in evidence variable 
  return (
    <div className="d-flex align-content-center justify-content-center h-100">
      <div className="container pt-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="card mask-custom">
              <div className="card-header d-flex justify-content-end">
                <IconButton aria-label="Add" size="large" onClick={() => navigate('/CreateSession', { state: loggedInUser })} className="grow">
                  <AddIcon fontSize="inherit" className="text-white" />
                </IconButton>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table id="sessions" className="table table-borderless text-white mb-0 table-hover">
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Trainees</th>
                        <th>Supervisor</th>
                        <th>Delete session</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sessionComponents}
                    </tbody>

                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}


export default Sessions;