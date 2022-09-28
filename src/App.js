import './App.css';
import MainData from './blocks/MainData';
import Map from './blocks/Map';
import EvidenceList from './blocks/EvidenceList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dashboard forensische VR simulatie</h1>
        <MainData/>
        <div class="container p-0">
          <div class="row">
            <div class="col-8"><Map/></div>
            <div class="col p-0"><EvidenceList/></div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
