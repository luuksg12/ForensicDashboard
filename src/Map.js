import React, {useState} from "react";

function Map (){
  const [evidenceList, setEvidenceList] = useState(
    //placeholder data
    [
      { id: "1", x: 400, y:265, z:0, type: "gunpowder", discovered: true, scene: "", scene_id: "", event: "", event_id: "" },
      { id: "2", x: 260, y:150, z:0, type: "saliva", discovered: true, scene: "", scene_id: "", event: "", event_id: "" },
      { id: "3", x: 650, y:300, z:0, type: "semen", discovered: false, scene: "", scene_id: "", event: "", event_id: "" },
      { id: "4", x: 150, y:250, z:0, type: "gunpowder", discovered: true, scene: "", scene_id: "", event: "", event_id: "" },
    ]
  )
  //mapping data and storing in evidence variable 
  const evidence = evidenceList.map((value) =>
    <div key={value.id}>
      <div class={"evidence " + value.discovered} style={{left: value.x + 'px', top: value.y +"px"}}>{value.id}: {value.type}</div>
    </div>
);
    return (
      <div class="container">
        <div class="row">
          <div class="col map p-0 border border-3 border-primary">
            {evidence}
          </div>
        </div>
      </div>
    )
  }

export default Map;