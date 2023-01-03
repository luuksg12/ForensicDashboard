import React, { useState, useEffect } from "react";
import "../../styling/Map.css"
import { Session } from './../../models/Session'

interface SessionProp {
    session: Session
}

export function MapEvidences(props: SessionProp) {
    const evidences = props.session.scene.evidences
    const events = props.session.events
    const [evidenceList] = useState(evidences)
    const [session] = useState(props.session)
    // translatedZvalue and translatedXvalue are temporary fixes for a specific map.
    // will 100% break whenever a new map is being used with a different layout.

    const translatedZvalue = (zValue: number) => { return (((zValue / 23.8) * 100) / 104) * 100; }
    const translatedXvalue = (xValue: number) => {
        let result;
        if (xValue <= 0) {
            result = 60 - ((xValue / - 16) * 100);
        } else {
            result = (((xValue / 3.37) * 100) / 110) * 100;
        }
        return result;
    }

    return (
        <>
            {evidenceList.map((value, index) => {
                let found = "false";
                if (events.filter(event => event.evidenceId === value.id).length != 0) {
                    found = "true";
                }
                return <div key={value.id} className={"evidence " + found} style={{ left: `${translatedZvalue(value.z)}%`, top: `${translatedXvalue(value.x)}%` }}>{index+1}</div>
            })}
        </>
    )
}

export default MapEvidences;