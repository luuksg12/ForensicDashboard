import React, { useState } from "react";
import "../../styling/Map.css"
import { Session } from './../../models/session.model'
import { EvidenceType } from "./../../models/evidence.model"

interface SessionProp {
  session: Session
}

export function Map(props: SessionProp) {
  const session = props.session

  // translatedZvalue and translatedXvalue are temporary fixes for a specific map.
  // will 100% break whenever a new map is being used with a different layout.

  const translatedZvalue = (zValue: number) => { return (((zValue / 23.8) * 100) / 104) * 100; }
  const translatedXvalue = (xValue: number) => {
    let result;
    if(xValue <= 0){
      result = 60 - ((xValue / - 16) * 100);
    } else {
      result = (((xValue / 3.37) * 100) / 110) * 100;
    }
    return result;
  }

  const evidences = props.session.scene.evidences
  const [evidenceList, setEvidenceList] = useState(evidences)

  //mapping data and storing in evidence variable 
  const evidence = evidenceList.map((value, index) => {
    console.log(value.x)
    console.log(translatedXvalue(value.x))
    return <div key={value.id} className={"evidence " + value} style={{ left: `${translatedZvalue(value.z)}%`, top: `${translatedXvalue(value.x)}%` }}>{EvidenceType[value.type]}: {value.type}</div>

  });

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