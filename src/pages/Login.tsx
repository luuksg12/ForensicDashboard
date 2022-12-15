import React, { useRef } from "react";
// import TNOLogo from '../img/logo-tno.png';
import { Link, useNavigate } from 'react-router-dom';
import { LOGO_TNO } from "../img/all";
import "../styling/Login.css"
import { InputField } from "./components/InputField";
import { authenticateLogin } from "../services/authenticate";

function Login() {

  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()
  const fieldOptions = [
    { name: "Email", reference: emailRef, type: "text" },
    { name: "Password", reference: passwordRef, type: "password" },
  ]

  const loginForm = fieldOptions.map((fo: { name: string, reference: any, type: string }, index) =>
    <InputField index={index} name={fo.name} reference={fo.reference} type={fo.type} />
  )

  return (
    <div className="container h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-4">
          <div className="card mask-custom">
            <img src={LOGO_TNO} className="p-3" />
            <div className="card-title d-flex justify-content-center text-white fw-bold">Welcome</div>
            <div className="card-body px-5">
              {loginForm}
              <input onClick={async () => {
                if (!emailRef.current?.value || !passwordRef.current?.value) return
                const user = await authenticateLogin(emailRef.current?.value, passwordRef.current?.value)
                if (user) navigate('/Sessions', { state: user })

                /* This space can be refactored into a more elegant way 
                  of informing the user of an invalid login attempt and 
                  to disrupt any brute forcing.
                */

              }} className="border-0 text-white form-control form-control-lg mt-3 fw-bold growSmall" type="submit" value="Login" style={{ background: '-webkit-linear-gradient(left,#21d4fd,#b721ff)' }} />
              <Link to="/create" style={{ textDecoration: 'none', background: '-webkit-linear-gradient(right,#21d4fd,#b721ff,#21d4fd,#b721ff)' }}>
                <input className="border-0 text-white form-control form-control-lg mt-3 fw-bold growSmall" type="submit" value="Register" style={{ background: '-webkit-linear-gradient(left,#21d4fd,#b721ff)' }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login;