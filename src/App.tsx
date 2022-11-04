import React from "react";
import { BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import './App.css';
import Evidence from "./pages/Evidence";
import Login from './pages/Login';
import MapPage from "./pages/MapPage";
import SessionInfo from "./pages/SessionInfo";
import Sessions from './pages/Sessions';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="sessions" element={<Sessions />} />
            <Route path="sessionInfo" element={<SessionInfo />} />
            <Route path="map" element={<MapPage />} />
            <Route path="evidence" element={<Evidence />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
