import React, { useState } from "react";
import "../../styling/Map.css"
import { Session } from './../../models/session.model'
import { EvidenceType } from "./../../models/evidence.model"
interface SessionProp {
  session: Session
}

export function Map(props: SessionProp) {
  const session = props.session
  console.log(props.session.scene.evidences)
  const scaleX = session.scene.scaleX;
  const scaleY = session.scene.scaleY;
  const evidences = props.session.scene.evidences
  const [evidenceList, setEvidenceList] = useState(evidences)

  //mapping data and storing in evidence variable 
  const evidence = evidenceList.map((value, index) =>
    <div key={value.id} className={"evidence " + value} style={{ left: ((value.x * 100)) + 'px', top: (385 - (value.y * 100)) + "px" }}>{EvidenceType[value.type]}: {value.type}</div>
  );
  return (
    <div className="container">
      <div className="row">
        <div className="col map p-0">
          <img src={`http://145.24.222.175/simulation/map?id=${session.scene.id}`} style={{ width: '100%', height: '100%' }}></img>

          {evidence}
        </div>
      </div>
    </div>
  )
}

export default Map;