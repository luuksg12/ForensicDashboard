import React, {useState} from "react";
function Footer() {
const [logoList, setlogoList] = useState(
    //placeholder data
    [
        { id: "1", name:"Logo" },
        { id: "2", name:"Logo" },
    ]
)
const logos = logoList.map((value)=>
<div className="col-1 logo grow" key={value.id}>
    <div className="logotext">{value.name}</div>
</div>
);


  return (
      <div className="navbar navbar-expand-lg navbar-dark bg-dark">
          {logos}
      </div>
  );
}export default Footer;