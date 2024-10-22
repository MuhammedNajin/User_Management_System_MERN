import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import FormInput from "../../ui/FormInput";
import Button from "../../ui/Button";
import reducer, { initialState } from "../../../reducers/signupReducer";
import errorReducer, {
  initialErrorState,
} from "../../../reducers/ErrorReducer";
import createAxios from "../../../axios/axios";
import { baseURL } from "../../../data/urls";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from "../../../utils/validation";

function Register() {
  const [state, dispach] = useReducer(reducer, initialState);
  const [error, dispachError] = useReducer(errorReducer, initialErrorState);
  const axios = createAxios(baseURL);
  const navigate = useNavigate();
  const { nameError, passwordError, emailError, phoneError } = error;
  function handleName(event) {
    console.log("hi name", event.target.value);
    const error = validateName(event.target.value);
    console.log("hello", error);
    console.log("nameErro  true");
    dispachError({
      type: "name",
      payload: error,
    });
    dispach({
      type: "name",
      payload: event.target.value,
    });
  }
  function handleEmail(event) {
    console.log("hi name", event.target.value);
    const error = validateEmail(event.target.value);
    console.log("hello", error);
    console.log("nameErro  true");
    dispachError({
      type: "email",
      payload: error,
    });
    dispach({
      type: "email",
      payload: event.target.value,
    });
  }
  function handlePhone(event) {
    console.log("hi name", event.target.value);
    const error = validatePhone(event.target.value);
    console.log("hello", error);
    console.log("nameErro  true");
    dispachError({
      type: "phone",
      payload: error,
    });
    dispach({
      type: "phone",
      payload: event.target.value,
    });
  }
  function handlePassword(event) {
    console.log("hi name", event.target.value);
    const error = validatePassword(event.target.value);
    console.log("hello", error);
    console.log("nameErro  true");

    dispachError({
      type: "password",
      payload: error,
    });

    dispach({
      type: "password",
      payload: event.target.value,
    });
  }
  function handleConfirm(event) { 
    dispach({
      type: "confirm",
      payload: event.target.value,
    });
  }

  async function handleSubmit(event) {
    console.log("hile");
    const { name, email, phone, password, confirm } = state;
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    const passwordError = validatePassword(password);

    const data = {
      name,
      email,
      phone,
      password,
    };
     axios.post("/signup", data)
     .then((res) => {
      navigate("/login");
     })
     .catch((err) => {
       if(err.response.status === 401) {
        dispachError({
          type: "email",
          payload: err.response.data.massage,
        });
       }
     })
    
  }

  return (
    <div className="signup-container">
      <div className="myform">
        <p className="signup-heading">Create your account</p>
        <FormInput
          label="Name"
          type="text"
          onAction={handleName}
          errorMassage={
            nameError != true && state.name.length != 0 ? nameError : null
          }
          error={nameError != true && state.name.length != 0}
        />
        <FormInput
          label="Email"
          type="email"
          onAction={handleEmail}
          errorMassage={
            emailError != true && state.email.length != 0 ? emailError : null
          }
          error={emailError != true && state.email.length != 0}
        />
        <FormInput
          label="Phone"
          type="text"
          onAction={handlePhone}
          errorMassage={
            phoneError != true && state.phone.length != 0 ? phoneError : null
          }
          error={phoneError != true && state.phone.length != 0}
        />
        <FormInput
          label="Password"
          type="password"
          onAction={handlePassword}
          errorMassage={
            passwordError != true && state.password.length != 0 ? passwordError : null
          }
          error={passwordError != true && state.password.length != 0}
        />
        <FormInput
          label="Confirm password"
          type="password"
          onAction={handleConfirm}
        />
        <div className="submit-button">
          <Button onAction={handleSubmit} text="Signup" />
        </div>
      </div>
    </div>
  );
}

export default Register;
