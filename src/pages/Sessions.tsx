import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { SessionModel } from "../models/session.model";
import { SessionQuery } from "../querys/SessionQuery";
import Nav from "./components/Nav";
import "../styling/Sessions.css"
import SessionInfo from "./SessionInfo";

function Sessions() {
  const [selectedItem, setSelectedItem] = useState({id:"none"})

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
      <li className={"SessionItem"} key={index}>
        <Link className="SessionLink" to={"/sessionInfo"} style={{ textDecoration: 'none' }}><div>{item.description}</div></Link>
      </li>
    )
  }
    
  );

  const logos = logoList.map((value) =>
    <div className="col-1 logo" key={value.id}>
      <div className="logotext">{value.name}</div>
    </div>
  );

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    var fetchedSessions = await SessionQuery.GetSessions()

    console.log(fetchedSessions)

    setSessionList(fetchedSessions)
  }

  //mapping data and storing in evidence variable 
  return (
    <div className="container-fluid p-0">
      <Nav />
      <div className="politie"></div>
      <div className="row-9 main d-flex align-items-center justify-content-center">
        <div className="d-flex flex-column sessionHolder">
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {sessions}
          </ul>
        </div>
      </div>
      <div className="bottombar row-3 container">
        {logos}
      </div>
    </div>
  )
}

export default Sessions;