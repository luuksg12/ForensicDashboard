import React, { useEffect, useState } from "react";
import {Link, NavigateOptions, useNavigate} from 'react-router-dom';
import {Participant, SessionModel} from "../models/session.model";
import { SessionQuery } from "../querys/SessionQuery";
import "../styling/Sessions.css";
import { format } from 'date-fns'
import {websocketService} from "../services/singeltons";
import IsLiveBadge from "./components/IsLiveBadge";

function Sessions() {
  const [selectedItem, setSelectedItem] = useState({id:"none"})
  const [webSock, setWebSock] = useState(websocketService)
  let navigate = useNavigate();

  function HandleOnClick(id: string) {
    navigate("/SessionInfo", {state: {data :id}} );
    console.log(id);
  }
  
  const listOfSessions: SessionModel[] = [
    {
      id: "",
      description: "",
      participants: [],
      events: [],
      startTime: new Date(),
      stopTime: new Date(),
    }
  ];

  const [SessionList, setSessionList] = useState(
    listOfSessions
  )

  
  const sessions = SessionList.map((item, index) => {
    let startTime = new Date(item.startTime).toDateString();
    let stopTime = "-";
    if(item.stopTime != undefined){
      stopTime = new Date(item.stopTime).toDateString();
    }
    let isLive = item.stopTime == undefined;
   

    return (
        <tr key={item.id} onClick={() => HandleOnClick(item.id)}>
          <td>
            <IsLiveBadge IsLive={isLive}/>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <div className="ms-3">
                <p className="fw-bold mb-1">{item.description}</p>
              </div>
            </div>
          </td>
          <td>
            <p className="fw-normal mb-1">{startTime}</p>
            <p className="fw-normal">{stopTime}</p>
          </td>
          <td>
            {item.participants?.map((participant,index)=>{
              if(participant.user.role == 0)
            return (
                <div key={participant.userId}>{participant.user.firstname}</div>
            )
          })}
          </td>
          <td>
            {item.participants?.map((participant,index)=>{
              if(participant.user.role == 1)
                return (
                    <div key={participant.userId}>{participant.user.firstname}</div>
                )
            })}
          </td>
        </tr>
      )
  });
  
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    var fetchedSessions = await SessionQuery.GetSessions()
    setSessionList(fetchedSessions)
  }
  
  //mapping data and storing in evidence variable 
  return (
    <div className="d-flex align-content-center justify-content-center h-100">
      <div className="container pt-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="card mask-custom">
              <div className="card-body">
                <div className="table-responsive">
                  <table id="sessions" className="table table-borderless text-white mb-0 table-hover">
                    <thead>
                    <tr> 
                      <th>Status</th>
                      <th>Beschrijving</th>
                      <th>Datum</th>
                      <th>Trainees</th>
                      <th>Supervisor</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sessions}
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