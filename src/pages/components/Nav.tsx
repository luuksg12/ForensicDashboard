import React, {useState} from "react";
import { Link } from 'react-router-dom';
import "../../styling/Nav.css"

function Nav (){

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <div className="collapse navbar-collapse container justify-content-between" id="navbarNavAltMarkup">
                    <div className="navbar-nav navpad">
                        <Link to="/Sessions" className="Navlink grow"><p>Sessies</p></Link>
                        <Link to="/Sessioninfo" className="Navlink grow"><p>Informatie</p></Link>
                    </div>
                    <div className="navbar-nav logout">
                        <Link to="/" className="Navlink grow"><i className="fa fa-sign-out" aria-hidden="true"></i></Link>
                    </div>
                </div>
            </div>
        </nav>

    )
  }

export default Nav;