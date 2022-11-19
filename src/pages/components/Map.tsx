import React, { useState, useEffect } from "react";
import "../../styling/Map.css"
import map from '../../img/59b92ceb-a958-4a3a-b465-78f91dbab157.jpg';
import { Session } from './../../models/session.model'
import { EvidenceType } from "./../../models/evidence.model"
import MapEvidences from "./MapEvidences";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

interface SessionProp {
  session: Session
}

export function Map(props: SessionProp) {
  const [session, setSession] = useState(props.session)
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    setInterval(async () => {
      const dataFetch = async () => {
        const data = await (
          await fetch(
            `http://145.24.222.175/simulation/session?sessionId=${session.id}`
          )
        ).json();
        await setSession(data);
      }
      dataFetch();
    }, 500);
  }, []);

  return (
    <div className="container">
      <div className="row ">
        <div className="col map p-0">
          <img src={map} style={{ width: '100%', height: '100%' }} alt="Map"/>
          <MapEvidences session={session}/>
        </div>
        <Toolbar className="bg-dark" style={{ borderBottomLeftRadius: 5,borderBottomRightRadius: 5}} variant="dense">
            <IconButton size="large" onClick={handleClickOpen}>
              <FullscreenIcon fontSize="inherit" className="text-white"/>
            </IconButton>
        </Toolbar>
        <Dialog
            fullWidth={true}
            maxWidth="xl"
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
          <DialogContent>
            <div className="col map p-0">
              <img src={map} style={{ width: '100%', height: '100%' }} alt="Map"/>
              <MapEvidences session={session}/>
            </div>
            
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default Map;