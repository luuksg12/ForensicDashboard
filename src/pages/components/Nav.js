import React, {useState} from "react";
import { Link } from 'react-router-dom';
import "../../styling/Nav.css"

function Nav (){

    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                <a class="nav-item nav-link" href="/Sessions">Sessies</a>
                <a class="nav-item nav-link" href="/sessioninfo">Sessies</a>
                <a class="nav-item nav-link" href="/Map">Kaart</a>
                </div>
            </div>
        </nav>

    )
  }

export default Nav;