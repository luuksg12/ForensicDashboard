import React from "react";
import { BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Evidence from "./pages/Evidence";
import Login from './pages/Login';
import MapPage from "./pages/MapPage";
import SessionInfo from "./pages/SessionInfo";
import Sessions from './pages/Sessions';

function App() {
  return (
    <div className="App">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
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
