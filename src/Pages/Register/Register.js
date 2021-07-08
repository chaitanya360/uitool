import React, { useEffect, useState } from "react";
import "./Form.css";
import InputUnderline from "../../components/InputUnderline";
import { Typography, Space } from "antd";
import { Button } from "antd";
import { Link } from "react-router-dom";

const emailRegularExpression = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);

const Register = () => {
  const { Title, Text } = Typography;

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    password: "",
    error: {
      firstName: false,
      lastName: false,
      email: false,
      number: false,
      password: false,
    },
  });

  const setFirstName = (value) => {
    setState((old) => ({ ...old, error: old.error, firstName: value }));
  };
  const setLastName = (value) => {
    setState((old) => ({ ...old, error: old.error, lastName: value }));
  };
  const setNumber = (value) => {
    setState((old) => ({ ...old, error: old.error, number: value }));
  };
  const setEmail = (value) => {
    setState((old) => ({ ...old, error: old.error, email: value }));
  };
  const setPassword = (value) => {
    setState((old) => ({ ...old, error: old.error, password: value }));
  };

  const setFirstNameError = (error) => {
    setState((old) => ({
      ...old,
      error: { ...old.error, firstName: error },
    }));
  };
  const setLastNameError = (error) => {
    setState((old) => ({
      ...old,
      error: { ...old.error, lastName: error },
    }));
  };
  const setEmailError = (error) => {
    setState((old) => ({
      ...old,
      error: { ...old.error, email: error },
    }));
  };
  const setNumberError = (error) => {
    setState((old) => ({
      ...old,
      error: { ...old.error, number: error },
    }));
  };

  const setPasswordError = (error) => {
    setState((old) => ({
      ...old,
      error: { ...old.error, password: error },
    }));
  };

  const setError = (Key, Error) => {
    switch (Key) {
      case "firstName":
        setFirstNameError(Error);
        break;
      case "lastName":
        setLastNameError(Error);
        break;
      case "email":
        setEmailError(Error);
        break;
      case "number":
        setNumberError(Error);
        break;

      case "password":
        setPasswordError(Error);
        break;
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    validateForm();
    console.log(state);
  };

  const validateForm = () => {
    const checkForEmptyEntry = (Key) => {
      if (state[Key].length == 0) {
        setError(Key, "Enter Your " + Key);
      }
    };

    const checkPassword = () => {
      if (state.password.length < 6) {
        setPasswordError("Password should be at least 6 character long");
      }
    };

    Object.keys(state).map((Key) => {
      if (Key != "error") checkForEmptyEntry(Key);
    });

    if (!emailRegularExpression.test(state.email)) {
      setEmailError("Email is not valid");
    }

    checkPassword();
  };

  return (
    <>
      <div className="formWrapper" />

      <form className="formBody" onSubmit={handleRegister}>
        <Title level={1} style={{ color: "dodgerblue" }}>
          Register
        </Title>
        <div style={{ width: window.innerWidth < 900 ? "80%" : "fit-content" }}>
          <div className="namesContainer">
            <div>
              <InputUnderline
                error={state.error.firstName}
                setError={setFirstNameError}
                text="First Name"
                type="text"
                value={state.firstName}
                setValue={setFirstName}
                minWidth={"100px"}
              />
            </div>
            <div>
              <InputUnderline
                error={state.error.lastName}
                setError={setLastNameError}
                text="Last Name"
                type="text"
                value={state.lastName}
                setValue={setLastName}
                minWidth={"100px"}
              />
            </div>
          </div>
          <InputUnderline
            error={state.error.number}
            setError={setNumberError}
            text="Mobile"
            type="number"
            value={state.number}
            setValue={setNumber}
          />
          <InputUnderline
            error={state.error.email}
            setError={setEmailError}
            text="E-mail"
            type="text"
            value={state.email}
            setValue={setEmail}
          />

          <InputUnderline
            error={state.error.password}
            setError={setPasswordError}
            text="Password"
            type="password"
            value={state.password}
            setValue={setPassword}
          />
        </div>
        <input type="submit" value="Register" className="should_hover" />
        <Text>
          Already Have An Account?
          <Link to="/login">
            <Button type="link" className="alternateMethod">
              Login
            </Button>
          </Link>
        </Text>
      </form>
    </>
  );
};

export default Register;
