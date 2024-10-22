import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../../redux/adminSlice";
import "./Login.css";
import Button from "../../ui/Button";
import FormInput from "../../ui/FormInput";
import { validateEmail, validatePassword } from "../../../utils/validation";
import createAxios from "../../../axios/axios";
import { adminUrl } from "../../../data/urls";

function login() {
  const [state, setState] = useState({});
  const [error, setError] = useState({ email: false, password: false });
  const navigate = useNavigate();
  const axios = createAxios(adminUrl);
  const dispatch = useDispatch();

  useState(() => {
    console.log("heeee");
    const id = setTimeout(() => {
      setError({ email: false, password: false });
    }, 3000);
    return () => {
      clearTimeout(id);
    };
  }, [error]);

  function handleEmail(event) {
    setState({ ...state, email: event.target.value });
  }
  function handlePassword(event) {
    setState({ ...state, password: event.target.value });
  }

  async function handleSubmit(event) {
    const { email, password } = state;
    const data = {
      email,
      password,
    };
    axios
      .post("/login", data)
      .then((response) => {
        if (response.status === 200) {
          const { token } = response.data;
          localStorage.setItem("adminInfo", token);
          dispatch(adminLogin(token));
          navigate("/admin");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          console.log("email errir");
          setError({ ...error, email: true });
        } else if (err.response.status === 402) {
          setError({ ...error, password: true });
        } else if( err.response.status === 500) {
          setError({email: true, password: true})
        }
      });
  }

  return (
    <div className="login-container">
      <div className="myform">
        <p className="signup-heading">Admin log In</p>
        <div className="login-input-container">
          <FormInput
            label="Email"
            type="email"
            onAction={handleEmail}
            errorMassage={error.email ? "Invalid email" : null}
            error={error.email}
          />
        </div>
        <div className="login-input-container">
          <FormInput
            label="Password"
            type="password"
            onAction={handlePassword}
            errorMassage={error.password ? "Invalid password" : null}
            error={error.password}
          />
        </div>
        <div className="submit-button">
          <Button onAction={handleSubmit} text="Signup" />
        </div>
      </div>
    </div>
  );
}

export default login;
