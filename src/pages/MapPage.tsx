import React, {useState} from "react";
import { Link } from 'react-router-dom';
import Map from "./components/Map";
import Nav from "./components/Nav";
import "../styling/MapPage.css"

function MapPage (){

  //mapping data and storing in evidence variable 
    return (
      <div className="container p-0">
        <Nav/>
        <div className="politie"></div>
          <div className="row-9 d-flex align-items-center justify-content-center mainHolder p-3">
                <div className="col-8 map"><Map/></div>
                <div className="col">
                    <Link to="/evidence" style={{ textDecoration: 'none' }}><input className="input-background form-control form-control-lg" type="submit" value="blood"></input></Link>
                    <Link to="/evidence" style={{ textDecoration: 'none' }}><input className="input-background form-control form-control-lg" type="submit" value="blood"></input></Link>
                    <Link to="/evidence" style={{ textDecoration: 'none' }}><input className="input-background form-control form-control-lg" type="submit" value="blood"></input></Link>
                    <Link to="/evidence" style={{ textDecoration: 'none' }}><input className="input-background form-control form-control-lg" type="submit" value="blood"></input></Link>
                    <Link to="/evidence" style={{ textDecoration: 'none' }}><input className="input-background form-control form-control-lg" type="submit" value="blood"></input></Link>
                    <Link to="/evidence" style={{ textDecoration: 'none' }}><input className="input-background form-control form-control-lg" type="submit" value="blood"></input></Link>
                </div>
          </div>
      </div>
    )
  }

export default MapPage;