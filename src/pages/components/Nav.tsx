import React, { useEffect } from "react";
import "../../styling/Nav.css"
import { useLocation } from "react-router-dom";
import { LOGO_POLITIE } from "../../img/all";

function Nav(): JSX.Element {

    const location = useLocation();
    useEffect(() => {
    }, [location]);

    if (location.pathname !== "/" && location.pathname !== "/create") {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand">
                    <img src={LOGO_POLITIE} />
                </a>
                <ul className="navbar-nav mr-auto d-flex w-100">
                    <li className="nav-item active">
                        <a className="nav-link" href="/Sessions">
                            <i className="fa fa-vr-cardboard nav-icon" aria-hidden="true" />
                            Sessies
                        </a>
                    </li>
                    <div className="flex-grow-1" />
                    <li className="nav-item">
                        <a className="nav-link" href="/">
                            <i className="fa fa-sign-out nav-icon" aria-hidden="true" />
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand">
                <img src={LOGO_POLITIE} />
            </a>
        </nav>
    );
}
export default Nav;