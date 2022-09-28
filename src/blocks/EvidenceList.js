import React, {useState} from "react";
import "./blocks.css"

function EvidenceList (){
  const [evidenceList, setEvidenceList] = useState(
    //placeholder data
    [
      { id: "1", x: 0, y:0, z:0, type: "gunpowder", discovered: true, scene: "", scene_id: "", event: "", event_id: "" },
      { id: "2", x: 50, y:50, z:0, type: "saliva", discovered: true, scene: "", scene_id: "", event: "", event_id: "" },
      { id: "3", x: 100, y:100, z:0, type: "semen", discovered: false, scene: "", scene_id: "", event: "", event_id: "" },
      { id: "4", x: 150, y:150, z:0, type: "gunpowder", discovered: true, scene: "", scene_id: "", event: "", event_id: "" },
    ]
  )
  //mapping data and storing in evidence variable 
  const evidence = evidenceList.map((value) =>
    <div key={value.id}>
        <div class="d-flex flex-row justify-content-around mb-3 p-3 border border-secondary">
            <div class={"col-2 align-content-center evidenceList " + value.discovered}>{value.id}</div>
            <div class="col align-content-center">{value.type}</div>
            <div class="col-2 align-content-center">00:00</div>
        </div>
    </div>
);
    return (
      <div class="container">
            {evidence}
      </div>
    )
  }

export default EvidenceList;