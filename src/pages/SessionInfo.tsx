import React, { useState, useEffect } from "react";
import { json, Link, useLocation } from 'react-router-dom';
import Map from "./components/Map";
import "../styling/SessionInfo.css"
import {Evidence, Session} from './../models/session.model'
import { User } from './../models/user.model'
import IsLiveBadge from "./components/IsLiveBadge";
import {Accordion, AccordionDetails, AccordionSummary, Box, Tab, Tabs, Typography} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import {EvidenceType} from "../models/evidence.model";
import {EventType, FilterType, LightType} from "../models/event.model";
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';


function SessionInfo(): JSX.Element {
  const location = useLocation();
  const sessionId = location.state?.data;
  const [value, setValue] = React.useState(0);
  const [SessionInfo, setSessionInfo] = useState<Session>()
  const [Supervisors, setSupervisors] = useState<User[]>([])
  const [Trainees, setTrainees] = useState<User[]>([])
  const [evidenceList,setEvidenceList] = useState<Evidence[]>()

  const SUPERVISOR = 1
  const TRAINEE = 0

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(
          `http://145.24.222.175/simulation/session?sessionId=${sessionId}`
        )
      ).json();
      await setSessionInfo(data);
      await setEvidenceList(data.scene?.evidences ?? []);
    };

    dataFetch();
  }, [sessionId]);

  useEffect(() => {
    if (!!SessionInfo?.participants) {
      const allUsers: Promise<User>[] = SessionInfo?.participants.map(async (userJSON) => {
        return await (
          await fetch(
            `http://145.24.222.175/simulation/user?id=${userJSON['userId']}`
          )
        ).json();
      })
      const userBase = Promise.all(allUsers)
      userBase.then((users) => {
        setSupervisors(users.filter(user => user.role === SUPERVISOR))
        setTrainees(users.filter(user => user.role === TRAINEE))
      })
    }

  }, [SessionInfo?.participants]);

  const trainees = Trainees.map((trainee, index) =>
      <tr key={index}>
        <td>{trainee.firstname} {trainee.addition != undefined ? trainee.addition + " " : ""}{trainee.lastname}</td>
        <td>
           <span className="badge badge-pill badge bg-secondary rounded-pill d-inline">
            Trainee
         </span>
        </td>
      </tr>
  );

  const supervisors = Supervisors.map((supervisor, index) =>
      <tr key={index}>
        <td>{supervisor.firstname} {supervisor.lastname}</td>
        <td>
          <span className="badge badge-pill badge bg-primary rounded-pill d-inline">
            Supervisor
         </span>
        </td>
      </tr>
  );
  
  const evidences = SessionInfo?.scene.evidences.map((evidence, index)=>
      <tr key={index}>
        <td>{index}</td>
        <td>
          {EvidenceType[evidence.type]}
        </td>
      </tr>
  );
  const events = SessionInfo?.events.map((event, index)=>
      <TimelineItem key={index}>
        <TimelineSeparator>
          <TimelineDot variant="outlined">
            <div style={{height: "20px", width: '20px',display: 'flex',alignItems: 'center',justifyContent:'center'}} className="text-white">
              {index}
            </div>
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }} className="text-white">
          <Typography variant="h6" className="d-flex align-items-center">
            {EventType[event.action]}
            <Typography className="ms-1 text-secondary">[{new Date(event.timeStamp).getHours()}:{new Date(event.timeStamp).getMinutes()}:{new Date(event.timeStamp).getSeconds()}]</Typography>
          </Typography>
          <Typography>Bewijsstuk: {evidenceList?.indexOf(evidenceList?.filter(
              function (e) {
                return e.id == event.evidenceId
              })[0])}</Typography>
          <Typography>Filter: {FilterType[event.filter]}</Typography>
          <Typography>Licht: {LightType[event.light]}</Typography>
        </TimelineContent>
      </TimelineItem>
  );
  
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
          {value === index && (
              <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
              </Box>
          )}
        </div>
    );
  }
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  
if(SessionInfo != undefined){
  return (
    <div>
      <div className="d-flex align-content-center justify-content-center h-100">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="card mask-custom p-5 mb-2">
                <div className="d-flex align-items-center">
                  <div className="card-title text-white me-1">
                    {SessionInfo.description}
                  </div>
                  <IsLiveBadge IsLive={SessionInfo?.stopTime == undefined}/>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-6">
                    <h3 className="text-white">Algemene Info</h3>
                      <p className="info text-white">Begintijd: {SessionInfo?.startTime}</p>
                      <p className="info text-white">Eindtijd: {SessionInfo?.stopTime}</p>
                    </div>
                    <div className="col-6">
                      <h3 className="text-white ">Deelnemers</h3>
                      <table id="sessions" className="table table-borderless text-white mb-0">
                        <thead>
                        <tr>
                          <th>Naam</th>
                          <th>Rol</th>
                        </tr>
                        </thead>
                        <tbody>
                        {supervisors}
                        {trainees}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mask-custom p-5 ">
                <div className="d-flex align-items-center">
                  <div className="row">
                    <div className="col-7">
                      <h3 className="text-white ">Kaart</h3>
                      <Map session={SessionInfo}/>
                    </div>
                    <div className="col-5">
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} className="text-white" textColor="inherit" >
                          <Tab label="Bewijsstukken"/>
                          <Tab label="Events"/>
                          <Tab label="Logs"/>
                        </Tabs>
                      </Box>
                      <TabPanel value={value} index={0} >
                        <div style={{height: 500,overflow:'auto'}}>
                          <table id="evidences" className="table table-sm table-borderless text-white mb-0">
                            <thead>
                            <tr>
                              <th>Nr.</th>
                              <th>Type</th>
                            </tr>
                            </thead>
                            <tbody>
                              {evidences}
                            </tbody>
                          </table>
                        </div>
                      </TabPanel>
                      <TabPanel value={value} index={1}>
                        <Timeline sx={{[`& .${timelineItemClasses.root}:before`]:{
                            flex: 0,
                            padding: 0,
                          },
                        }}>
                          {events}
                        </Timeline>
                      </TabPanel>
                      <TabPanel value={value} index={2}>
                      </TabPanel>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      {/*
      <div className="container-fluid py-5">
        <div className="emptyHolder"></div>
          <div className="card container cardHolder">

            <div className="card-body">
              <h5 className="card-title">{SessionInfo?.scene?.name}</h5>
              <p className="info">{SessionInfo?.startTime} | Duur : {(!!SessionInfo?.stopTime) ? SessionInfo?.stopTime : 'nog niet gestopt'} | {trainees} | {supervisors}</p>
              <p className="card-text">{SessionInfo?.description}</p>
            </div>

            <div className="row py-3">
              <Map session={SessionInfo}/>
              <div className="col">
                    <Link to="/evidence" style={{ textDecoration: 'none' }}><p className="evidenceItem growSmall">Blood</p></Link>
                    <Link to="/evidence" style={{ textDecoration: 'none' }}><p className="evidenceItem growSmall">Blood</p></Link>
                    <Link to="/evidence" style={{ textDecoration: 'none' }}><p className="evidenceItem growSmall">Blood</p></Link>
                    <Link to="/evidence" style={{ textDecoration: 'none' }}><p className="evidenceItem growSmall">Blood</p></Link>
                    <Link to="/evidence" style={{ textDecoration: 'none' }}><p className="evidenceItem growSmall">Blood</p></Link>
                    <Link to="/evidence" style={{ textDecoration: 'none' }}><p className="evidenceItem growSmall">Blood</p></Link>
              </div>
          </div>
        </div>
      </div>*/}
    </div>
  )}
return <div/> ;
}

export default SessionInfo;