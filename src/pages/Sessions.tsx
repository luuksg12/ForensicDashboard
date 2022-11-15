import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { SessionModel } from "../models/session.model";
import { SessionQuery } from "../querys/SessionQuery";
import Nav from "./components/Nav";
import "../styling/Sessions.css";
import SessionInfo from "./SessionInfo";
import { WebsocketService } from "../services/websocket.service";

function Sessions() {
  const [selectedItem, setSelectedItem] = useState({id:"none"})
  const [webSock, setWebSock] = useState(new WebsocketService())
  const [logoList, setlogoList] = useState(
    //placeholder data
    [
      { id: "1", name: "Logo" },
      { id: "2", name: "Logo" },
    ]
  )

  const listOfSessions: SessionModel[] = [
    {
      id: "",
      description: "",
      superVisor: "",
      events: [],
      date: new Date(),
      duration: new Date(),
    }
  ];

  const [SessionList, setSessionList] = useState(
    listOfSessions
  )

  // const [theArray, setTheArray] = useState(friendsArray);

  const sessions = SessionList.map((item, index) => {
    return (
      <li className={"SessionItem"} key={index} onClick={() => handleSelection(item, index)} style={{ cursor: 'pointer' }}>
        <div className="SessionLink grow">{item.description}</div>
      </li>
    )
  }
    
  );

  const logos = logoList.map((value) =>
    <div className="col-1 logo grow" key={value.id}>
      <div className="logotext">{value.name}</div>
    </div>
  );



  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    var fetchedSessions = await SessionQuery.GetSessions()
    setSessionList(fetchedSessions)
  }


  function handleSelection(e: any, index: number) {
    
    var setActive = Array.from(document.getElementsByClassName('session'))
    for (let item of setActive) {
      item.classList.remove('selected')
    }
    setActive[index].classList.toggle('selected')
    setSelectedItem(e)
  }
  //mapping data and storing in evidence variable 
  return (
    <div className="container-fluid p-0">
      <Nav />
      <div className="politie"></div>
      <div className="row-9 main d-flex align-items-center justify-content-center">
        <div className="d-flex flex-column sessionHolder">
          <ul onChange={(e) => handleSelection} style={{ listStyle: 'none', padding: 0 }}>
            {sessions}
          </ul>
          <Link to="/sessionInfo" state={{data: selectedItem.id}} style={{ textDecoration: 'none' }}><input className="input-background form-control form-control-lg" type="submit" value="Selecteer"></input></Link>
          
        </div>
      </div>
      <div className="bottombar row-3 container">
        {logos}
      </div>
    </div>
  )
}

export default Sessions;