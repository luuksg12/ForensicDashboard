import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import "../styling/SessionInfo.css"
import "../styling/CreateSession.css"
import { Http, Method } from "../helper/Http";
import { HOST } from "../Constants";
import { User } from "../models/user.model";
import * as img from './../img/all'
interface Scene {
    id: string
    map_name: string
    description: string
}

function CreateSession() {
    const navigate = useNavigate()
    const loggedInUser: User = useLocation().state;

    const [Supervisors, setSupervisors] = useState<User[]>([])
    const [Trainees, setTrainees] = useState<User[]>([])
    const [Scenes, setScenes] = useState<Scene[]>([])

    const [ShowDropdownMap, setShowDropdownMap] = useState(false)
    const [ShowDropdownSupervisor, setShowDropdownSupervisor] = useState(false)
    const [ShowDropdownPlayer1, setShowDropdownPlayer1] = useState(false)
    const [ShowDropdownPlayer2, setShowDropdownPlayer2] = useState(false)

    const [MapSelected, setMapSelected] = useState('Map');
    const [SupervisorSelected, setSupervisorSelected] = useState('Supervisor');
    const [Player1Selected, setPlayer1Selected] = useState('Participant 1');
    const [Player2Selected, setPlayer2Selected] = useState('Participant 2');

    const getTraineesBody = {
        skip: 0,
        take: 25,
        role: "Trainee"
    }

    const getSupervisorsBody = {
        skip: 0,
        take: 25,
        role: "Supervisor"
    }

    const getScenesBody = {
        skip: 0,
        take: 100
    }

    const dataFetchingOptions = [
        { method: Method.POST, url: `${HOST}/users`, body: getTraineesBody, callback: setTrainees },
        { method: Method.POST, url: `${HOST}/users`, body: getSupervisorsBody, callback: setSupervisors },
        { method: Method.POST, url: `${HOST}/scenes`, body: getScenesBody, callback: setScenes },
    ]

    function fetchData(method: Method, url: string, body: any, callback: Function): void {
        const fetch = async () => {
            const response = await (
                await Http.request(method, url, body)
            ).json()
            callback(response)
        }
        fetch()
    }

    async function createSession() {
        if (Player1Selected === Player2Selected) {
            alert("Participants can not be thesame.");
            return
        }

        if (MapSelected === 'Map' || SupervisorSelected === 'Supervisor' || Player1Selected === 'Participant 1' || Player2Selected === 'Participant 2') {
            alert("Please fill in all the options.")
            return;
        }

        const sceneId: any = Scenes.map((scene) => {
            if (scene.map_name === MapSelected) return scene.id
        })

        const userId_supervisor = Supervisors.map((supervisor) => {
            if (supervisor.fullname === SupervisorSelected) return supervisor.id
        })

        const userId_trainee1 = Trainees.map((trainee) => {
            if (trainee.fullname === Player1Selected) return trainee.id
        })

        const userId_trainee2 = Trainees.map((trainee) => {
            if (trainee.fullname === Player2Selected) return trainee.id
        })

        const body = {
            sceneId: sceneId[0],
            userId_supervisor: userId_supervisor[0],
            userId_trainee1: userId_trainee1[0],
            userId_trainee2: userId_trainee2[0],
            description: "No description."
        }
        await Http.request(Method.POST, `${HOST}/session/create`, body)
        navigate('/Sessions', { state: loggedInUser })
    }

    useEffect(() => {
        dataFetchingOptions.forEach(options => {
            fetchData(options.method, options.url, options.body, options.callback)
        });
    }, []);

    return (
        <>
            <div>
                <div className="container-fluid py-5">
                    <div className="row justify-content-center"></div>
                    <div className="card container mask-custom text-white">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <div className="menucontainer">
                                        <div className="btn btn-secondary btn-lg dropdown-toggle growSmall" onClick={() => {
                                            setShowDropdownMap(!ShowDropdownMap)
                                        }}>
                                            {MapSelected}
                                        </div>
                                    </div>
                                    <div className={ShowDropdownMap ? "dropdown-menu show" : "dropdown-menu"}>
                                        {Scenes.map((scene, index) =>
                                            <li key={index} onClick={() => {
                                                setShowDropdownMap(!ShowDropdownMap)
                                                setMapSelected(`${scene.map_name}`)
                                            }}>{scene.map_name}</li>)}
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="menucontainer">
                                        <div className="btn btn-secondary btn-lg dropdown-toggle growSmall" onClick={() => { setShowDropdownSupervisor(!ShowDropdownSupervisor) }}>
                                            {SupervisorSelected}
                                        </div>
                                    </div>
                                    <div className={ShowDropdownSupervisor ? "dropdown-menu show" : "dropdown-menu"}>
                                        {Supervisors.map((supervisor, index) =>
                                            <li key={index} onClick={() => {
                                                setShowDropdownSupervisor(!ShowDropdownSupervisor)
                                                setSupervisorSelected(`${supervisor.fullname}`)
                                            }}>{`${supervisor.fullname}`}</li>)}
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="menucontainer">
                                        <div className="btn btn-secondary btn-lg dropdown-toggle growSmall" onClick={() => { setShowDropdownPlayer1(!ShowDropdownPlayer1) }}>
                                            {Player1Selected}
                                        </div>
                                    </div>
                                    <div className={ShowDropdownPlayer1 ? "dropdown-menu show" : "dropdown-menu"}>
                                        {Trainees.map((trainee, index) =>
                                            <li key={index} onClick={() => {
                                                setShowDropdownPlayer1(!ShowDropdownPlayer1)
                                                setPlayer1Selected(`${trainee.fullname}`)
                                            }}>{`${trainee.fullname}`}</li>)}
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="menucontainer">
                                        <div className="btn btn-secondary btn-lg dropdown-toggle growSmall" onClick={() => { setShowDropdownPlayer2(!ShowDropdownPlayer2) }}>
                                            {Player2Selected}
                                        </div>
                                    </div>
                                    <div className={ShowDropdownPlayer2 ? "dropdown-menu show" : "dropdown-menu"}>
                                        <ul>
                                            {Trainees.map((trainee, index) =>
                                                <li key={index} onClick={() => {
                                                    setShowDropdownPlayer2(!ShowDropdownPlayer2)
                                                    setPlayer2Selected(`${trainee.fullname}`)
                                                }}>{`${trainee.fullname}`}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row py-3">
                                <div className="col-8 ms-3 mapPlaceholder text-black">
                                    <img style={{width:'100%', height:'100%'}} src={img.MAP_DEMO} className="p-3" />
                                </div>
                                <div className="col font-weight-bold">
                                    Map: {MapSelected} <br />
                                    Supervisor: {SupervisorSelected} <br />
                                    Participant 1: {Player1Selected} <br />
                                    Participant 2: {(Player1Selected === Player2Selected) ? "Participants can not be thesame." : Player2Selected} <br />
                                    {/* <Link to="/SessionInfo" style={{ textDecoration: 'none' }}> */}
                                    <input onClick={() => createSession()} className="border-0 text-white form-control form-control-lg mt-3 fw-bold growSmall" type="submit" value="Create session" style={{ background: '-webkit-linear-gradient(left,#21d4fd,#b721ff)' }} />
                                    {/* </Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )


}

export default CreateSession;