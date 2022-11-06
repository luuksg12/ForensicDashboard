import React, {useState} from "react";
import { Link } from 'react-router-dom';
import "../../styling/Nav.css"

function Nav (){

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="collapse navbar-collapse container justify-content-between" id="navbarNavAltMarkup">
                <div className="navbar-nav navpad">
                    <a className="nav-item nav-link" href="/Sessions">Sessies</a>
                    <a className="nav-item nav-link" href="/sessioninfo">Informatie</a>
                </div>
                <div className="navbar-nav logout">
                <a className="nav-item nav-link" href="/Login">Logout</a>
                </div>
            </div>
        </nav>

    )
  }

export default Nav;