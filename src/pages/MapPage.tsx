import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Map from "./components/Map";
import "../styling/MapPage.css"
import { Session } from "../models/Session";
import { EvidenceType } from "../models/enums"

function MapPage (){
  const location = useLocation();
  const sessionInformation: Session = location.state?.data;
  //mapping data and storing in evidence variable 

  const evidence = sessionInformation.scene.evidences.map((evidence, index) => {
    return <Link to="/evidence" key={index} style={{ textDecoration: 'none' }}><input className="input-background form-control form-control-lg" type="submit" value={`${index} ${EvidenceType[evidence.type]}`}></input></Link>
  })

  //mapping data and storing in evidence variable 
    return (
      <div className="container p-0">
          <div className="row-9 d-flex align-items-center justify-content-center mainHolder p-3">
                <div className="col-8 map"><Map session={sessionInformation}/></div>
                <div className="col">
                    {evidence}
                </div>
          </div>
      </div>
    )
  }

export default MapPage;