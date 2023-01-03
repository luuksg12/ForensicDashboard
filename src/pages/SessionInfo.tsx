import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Map from "./components/Map";
import "../styling/SessionInfo.css"
// import { Evidence } from './../models/session.model'
// import { User } from './../models/user.model'
import { Session, User, Evidence, Participant } from "../models/Session";
import IsLiveBadge from "./components/IsLiveBadge";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { ActionType, EvidenceType, FilterType, LightType } from "../models/enums";
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { HOST } from "../Constants";
import { Http, Method } from "../helper/Http";

function SessionInfo() {
  const location = useLocation();
  const sessionId = location.state?.data;
  const loggedInUser = location.state?.user;
  const [value, setValue] = React.useState(0);
  const [SessionInfo, setSessionInfo] = useState<Session>()
  const [Supervisors, setSupervisors] = useState<Participant[]>([])
  const [Trainees, setTrainees] = useState<Participant[]>([])
  const [evidenceList, setEvidenceList] = useState<Evidence[]>([])
  const SUPERVISOR = 1
  const TRAINEE = 0


  useEffect(() => {
    const fetchData = async () => {
      const result: Session = await (await Http.request(Method.POST, `${HOST}/sessions/single`, { sessionId: sessionId })).json()
      setSessionInfo(result);
      let supervisorList: Participant[] = result.participants.filter((participant: Participant) => {
        if (participant.user.role === SUPERVISOR) return participant.user;
      });

      let traineeList: Participant[] = result.participants.filter((participant) => {
        if (participant.user.role === TRAINEE) return participant.user;
      });
      let evidences = result?.scene?.evidences
      setSupervisors(supervisorList)
      setTrainees(traineeList)
      setEvidenceList(evidences)
    };
    fetchData();
  }, []);



  const trainees = Trainees.map((trainee, index) =>
    <tr key={index}>
      <td>{trainee.user.fullname}</td>
      <td>
        <span className="badge badge-pill badge bg-secondary rounded-pill d-inline">
          Trainee
        </span>
      </td>
    </tr>
  );

  const supervisors = Supervisors.map((supervisor, index) =>
    <tr key={index}>
      <td>{supervisor.user.fullname}</td>
      <td>
        <span className="badge badge-pill badge bg-primary rounded-pill d-inline">
          Supervisor
        </span>
      </td>
    </tr>
  );

  const evidences = evidenceList.map((evidence, index) =>
    <tr key={index + 1}>
      <td>{index + 1}</td>
      <td>{EvidenceType[evidence.type]}</td>
    </tr>
  );


  const events = SessionInfo?.events.map((event, index) => {
    console.log(event)
    return (<TimelineItem key={index}>
      <TimelineSeparator>
        <TimelineDot variant="outlined">
          <div style={{ height: "20px", width: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="text-white">
            {index}
          </div>
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={{ py: '12px', px: 2 }} className="text-white">
        <Typography variant="h6" className="d-flex align-items-center">
          {ActionType[event.action]}
          <Typography className="ms-1 text-secondary">[{new Date(event.timeStamp).getHours()}:{new Date(event.timeStamp).getMinutes()}:{new Date(event.timeStamp).getSeconds()}]</Typography>
        </Typography>
        <Typography>Evidence: {evidenceList?.indexOf(evidenceList?.filter(
          function (e) {
            return e.id == event.evidenceId
          })[0])}</Typography>
        <Typography>Filter: {FilterType[event?.filter]}</Typography>
        <Typography>Light: {LightType[event?.light]}</Typography>
      </TimelineContent>
    </TimelineItem>)
  }
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


  if (SessionInfo != undefined) {
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
                    <IsLiveBadge IsLive={SessionInfo?.stopTime == undefined} />
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6">
                        <h3 className="text-white">General information:</h3>
                        <p className="info text-white">Start time: {SessionInfo?.startTime}</p>
                        <p className="info text-white">{(SessionInfo.stopTime) ? `End time: ${SessionInfo?.stopTime}` : ""}</p>
                      </div>
                      <div className="col-6">
                        <h3 className="text-white ">Participants</h3>
                        <table id="sessions" className="table table-borderless text-white mb-0">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Role</th>
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
                        <h3 className="text-white ">Map</h3>
                        <Map session={SessionInfo} />
                      </div>
                      <div className="col-5">
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                          <Tabs value={value} onChange={handleChange} className="text-white" textColor="inherit" >
                            <Tab label="Evidences" />
                            <Tab label="Events" />
                            <Tab label="Logs" />
                          </Tabs>
                        </Box>
                        <TabPanel value={value} index={0} >
                          <div style={{ height: 500, overflow: 'auto' }}>
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
                          <div style={{ height: 500, overflow: 'auto' }}>

                          <Timeline sx={{
                            [`& .${timelineItemClasses.root}:before`]: {
                              flex: 0,
                              padding: 0,
                            },
                          }}>
                            {events}
                          </Timeline>
                          </div>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                          <p className="text-white">onder constructie</p>
                        </TabPanel>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return <div />;
  return (
    <>
      <div>

      </div>
    </>)
}

export default SessionInfo;