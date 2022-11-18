import React, { useState, useEffect } from "react";
import "../../styling/Map.css"
import map from '../../img/59b92ceb-a958-4a3a-b465-78f91dbab157.jpg';
import { Session } from './../../models/session.model'
import { EvidenceType } from "./../../models/evidence.model"
import MapEvidences from "./MapEvidences";

interface SessionProp {
  session: Session
}

export function Map(props: SessionProp) {
  const [session, setSession] = useState(props.session)
  useEffect(() => {
    setInterval(async () => {
      const dataFetch = async () => {
        const data = await (
          await fetch(
            `http://145.24.222.175/simulation/session?sessionId=${session.id}`
          )
        ).json();
        await setSession(data);
      }
      dataFetch();
    }, 500);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col map p-0">
          <img src={map} style={{ width: '100%', height: '100%' }}></img>
          <MapEvidences session={session}/>
        </div>
      </div>
    </div>
  )
}

export default Map;