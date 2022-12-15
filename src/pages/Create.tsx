import React, { useRef } from "react";
import "../styling/Login.css"
import { InputField } from "./components/InputField";
import { validateRegisterInput } from "../utils/validate";
import { last } from "rxjs";
import { Http } from "../helper/Http";
import { CreateUser } from "../models/request_bodies";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate()

  const firstNameRef = useRef<HTMLInputElement>()
  const lastNameRef = useRef<HTMLInputElement>()
  const additionRef = useRef<HTMLInputElement>()
  const emailRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()
  const retypedPasswordRef = useRef<HTMLInputElement>()

  const fieldOptions = [
    { name: "First name", reference: firstNameRef, type: "text" },
    { name: "Last name", reference: lastNameRef, type: "text" },
    { name: "Addition", reference: additionRef, type: "text" },
    { name: "Email", reference: emailRef, type: "text" },
    { name: "Password", reference: passwordRef, type: "password" },
    { name: "Retype password", reference: retypedPasswordRef, type: "password" },
  ]

  const registerUser = async () => {
    const firstname = firstNameRef.current?.value, lastname = lastNameRef.current?.value;
    const email = emailRef.current?.value, addition = additionRef.current?.value;
    const password = passwordRef.current?.value, retypedPassword = retypedPasswordRef.current?.value;

    if (!firstname || !lastname || !email || !password || !retypedPassword) {
      alert("Please fill in the form.");
      return;
    }

    let result = validateRegisterInput(email, password, retypedPassword, firstname, lastname, addition);
    if (result !== 1) {
      alert(result);
      return;
    }

    const body: CreateUser = {
      firstname: firstname,
      lastname: lastname,
      addition: addition,
      email: email,
      password: password,
      role: "Trainee"
    };

    const response = await Http.request("POST", "http://localhost:8010/proxy/simulation/user", body)
    if (response.status !== 201) {
      alert("Something went wrong.");
      return
    }
    alert("Successfully registered account")
    navigate('/');
  }

  const createForm = fieldOptions.map((fo: { name: string, reference: any, type: string }, index) =>
    <InputField index={index} name={fo.name} reference={fo.reference} type={fo.type} />
  )

  //mapping data and storing in evidence variable 
  return (
    <div className="container h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-4">
          <div className="card mask-custom">
            <img src={require('../img/logo-tno.png')} className="p-3" />
            <div className="card-body px-5">
              {createForm}
              <input onClick={() => registerUser()} className="border-0 text-white form-control form-control-lg mt-3 fw-bold growSmall" type="submit" value="Create" style={{ background: '-webkit-linear-gradient(left,#21d4fd,#b721ff)' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create;