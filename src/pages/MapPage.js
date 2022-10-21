import React, {useState} from "react";
import { Link } from 'react-router-dom';
import Map from "./components/Map";
import "./MapPage.css"

function MapPage (){

  //mapping data and storing in evidence variable 
    return (
      <div className="container p-0">
        <div className="politie"></div>
          <div className="row-9 d-flex align-items-center justify-content-center mainHolder p-3">
                <div className="col-8 map"><Map/></div>
                <div className="col">
                    <div className="row"><div>Evidence</div></div>
                    <div className="row"><div>Evidence</div></div>
                    <div className="row"><div>Evidence</div></div>
                    <div className="row"><div>Evidence</div></div>
                    <div className="row"><div>Evidence</div></div>
                    <div className="row"><div>Evidence</div></div>
                </div>
          </div>
      </div>
    )
  }

export default MapPage;