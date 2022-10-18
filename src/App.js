import { BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import Sessions from './pages/Sessions';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Router>
          <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route exact path="sessions" element={<Sessions />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
