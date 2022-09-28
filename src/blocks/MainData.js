import React from "react";
import { useState } from "react";

function MainData (){
    //player use states
    const [player1, setPlayer1] = useState('John Doe');
    const [player2, setPlayer2] = useState('John Doe');

    //simulatie use states Date.toLocaleString()
    const timeValue = new Date()
    const [time, setTime] = useState(timeValue.getHours() + ":" + timeValue.getMinutes());
    //simulatie sporen
    const [foundEvidence, setFoundEvidence] = useState('4');
    const [maxEvidence, setMaxEvidence] = useState('5');
    
    return (
    <div class="container">
        <div class="row mb-3 p-0">
            <div class="col-sm p-2 border border-secondary">
                <div class="row">
                    <div class="col-6 align-content-center"><h3>Spelers</h3></div>
                    <div class="col-6 align-content-center"><h3>{player1}</h3></div>
                </div>
            </div>
            <div class="col-sm mx-3 p-2 border border-secondary">
                <div class="row">
                    <div class="col-6 align-content-center"><h3>Simulatie tijd</h3></div>
                    <div class="col-6 align-content-center"><h3>{time}</h3></div>
                </div>
            </div>
            <div class="col-sm p-2 border border-secondary">
                <div class="row">
                    <div class="col-6 align-content-center"><h3>Sporen</h3></div>
                    <div class="col-6 align-content-center"><h3>{foundEvidence} / {maxEvidence}</h3></div>
                </div>
            </div>
        </div>
    </div>
    )
  }

export default MainData;