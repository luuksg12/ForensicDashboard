import React, { useState, useEffect } from "react";
import "../../styling/Map.css"
import { Session } from './../../models/Session'
import MapEvidences from "./MapEvidences";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { MAP_DEMO } from "../../img/all";
import { HOST } from "../../Constants";

export function Map(props: {session: Session}) {
  const [session, setSession] = useState(props.session)
  const [open, setOpen] = React.useState(false);

  
  // useEffect(() => {
  //   setInterval(async () => {
  //     const dataFetch = async () => {
  //       const data = await (
  //         await fetch(
  //           `${HOST}/session?sessionId=${session.id}`
  //         )
  //       ).json();
  //       await setSession(data);
  //     }
  //     dataFetch();
  //   }, 500);
  // }, []);

  return (
    <div className="container">
      <div className="row ">
        <div className="col map p-0">
          <img src={MAP_DEMO} style={{ width: '100%', height: '100%' }} alt="Map"/>
          <MapEvidences session={session}/>
        </div>
        <Toolbar className="bg-dark" style={{ borderBottomLeftRadius: 5,borderBottomRightRadius: 5}} variant="dense">
            <IconButton size="large" onClick={() => setOpen(true)}>
              <FullscreenIcon fontSize="inherit" className="text-white"/>
            </IconButton>
        </Toolbar>
        <Dialog
            fullWidth={true}
            maxWidth="xl"
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
          <DialogContent>
            <div className="col map p-0">
              <img src={MAP_DEMO} style={{ width: '100%', height: '100%' }} alt="Map"/>
              <MapEvidences session={session}/>
            </div>
            
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default Map;