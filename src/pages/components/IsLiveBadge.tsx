import React from "react";
function IsLiveBadge(props: {IsLive:boolean}){
    if(props.IsLive){
        return(<span className="badge badge-pill badge-primary bg-danger rounded-pill d-inline">
            <i className="fa fa-circle me-1" aria-hidden="true"/>
            Live
        </span>);
    }
    return(<span className="badge badge-pill badge-primary bg-primary rounded-pill d-inline">Afgelopen</span>);
} export default IsLiveBadge