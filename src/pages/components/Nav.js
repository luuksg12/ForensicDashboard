import React, {useState} from "react";
import { Link } from 'react-router-dom';
import "../../styling/Nav.css"

function Nav (){

    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="collapse navbar-collapse container justify-content-between" id="navbarNavAltMarkup">
                <div class="navbar-nav navpad">
                    <a class="nav-item nav-link" href="/Sessions">Sessies</a>
                    <a class="nav-item nav-link" href="/sessioninfo">Sessies</a>
                    <a class="nav-item nav-link" href="/Map">Kaart</a>
                </div>
                <div class="navbar-nav logout">
                <a class="nav-item nav-link" href="/Login">Logout</a>
                </div>
            </div>
        </nav>

    )
  }

export default Nav;