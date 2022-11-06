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
    <div key={index}>
      <div className={"evidence " + value} style={{ left: ((value.x * scaleX) + 200) + 'px', top: ((value.y * scaleY) - 25) + "px" }}>{EvidenceType[value.type]}: {value.type}</div>
    </div>
  );
  return (
    <div className="container">
      <div className="row">
        <div className="col map p-0">
            <img src={`http://145.24.222.175/simulation/map?id=${session.scene.id}`} style={{ width: 850, height: 770 }}></img>
          
          {evidence}
        </div>
      </div>
    </div>
  )
}

export default Map;