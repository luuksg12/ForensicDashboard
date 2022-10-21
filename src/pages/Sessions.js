import React, {useState} from "react";
import { Link } from 'react-router-dom';
import "../styling/Sessions.css"

function Sessions (){
  const [selectedItem, setSelectedItem] = useState()

  const [logoList, setlogoList] = useState(
    //placeholder data
    [
      { id: "1", name:"Logo" },
      { id: "2", name:"Logo" },
    ]
  )

  const [SessionList, setSessionList] = useState(
    //placeholder data
    [
      { id: "1", date:"10/19/2022 3:24" },
      { id: "2", date:"09/19/2022 2:32" },
    ]
  )

  const sessions = SessionList.map((item, index) =>
    <li key={index} onClick={() => handleSelection(item, index)} style={{cursor : 'pointer'}}>
      <div className={"session"}>{item.date}</div>
    </li>
  );

  const logos = logoList.map((value) =>
    <div className="col-1 logo" key={value.id}>
      <div className="logotext">{value.name}</div>
    </div>
  );

  function handleSelection(e, index){
    const setActive = document.getElementsByClassName('session')
    for(let item of setActive){
      item.classList.remove('selected')
    }
    setActive[index].classList.toggle('selected')
    setSelectedItem(e)
  }
  //mapping data and storing in evidence variable 
    return (
      <div className="container-fluid p-0">
        <div className="politie"></div>
          <div className="row-9 main d-flex align-items-center justify-content-center">
            <div className="d-flex flex-column sessionHolder">
              <ul onChange={handleSelection} style={{ listStyle: 'none', padding: 0 }}>
                {sessions}
              </ul>
              
              <Link to="/sessionInfo" style={{ textDecoration: 'none' }}><input class="input-background form-control form-control-lg" type="submit" value="Selecteer"></input></Link>
            </div>
          </div>
          <div className="bottombar row-3 container">
            {logos}
          </div>
      </div>
    )
  }

export default Sessions;