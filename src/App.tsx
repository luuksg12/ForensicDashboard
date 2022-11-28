import React, {useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    RouteMatch,
    useParams, useLocation
} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Nav from "./pages/components/Nav";
import Evidence from "./pages/Evidence";
import Login from './pages/Login';
import MapPage from "./pages/MapPage";
import SessionInfo from "./pages/SessionInfo";
import Sessions from './pages/Sessions';
import Footer from "./pages/components/Footer";
import Map from "./pages/components/Map";
import Create from "./pages/Create";

function App() {
    
    return (
      <div className="wrapper">
              <Router>
                  <header>
                      <Nav/>
                  </header>
                  <main className="image">
                      <Routes>
                          <Route path="/" element={<Login/>}/>
                          <Route path="/Create" element={<Create/>}/>
                          <Route path="/Sessions" element={<Sessions/>}/>
                          <Route path="/SessionInfo" element={<SessionInfo/>}/>
                      </Routes>
                  </main>
              </Router>
          <footer>
              <Footer/>
          </footer>
      </div>
  );
}

export default App;
