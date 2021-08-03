import React, { useState } from "react";
import "./Form.css";
import InputUnderline from "../../components/InputUnderline";
import { Typography } from "antd";
import { Link, useHistory } from "react-router-dom";
import { register } from "../../api/users";
import Loading from "../../components/Loading";

const emailRegularExpression = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const Register = ({ setJustRegistered }) => {
  const { Title, Text } = Typography;
  const [loading, setLoading] = useState(false);
  let isValid = false;

  const history = useHistory();

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

    if (validateForm()) {
      setLoading(true);
      register(
        state.firstName,
        state.lastName,
        state.email,
        state.password,
        state.number
      ).then((response) => {
        setLoading(false);
        if (response.ok) {
          if (response.data.status) {
            setJustRegistered(true);
            history.push("/login");
          } else alert(response.data.message);
        } else alert(response.problem);
      });
    }
  };

  const validateForm = () => {
    isValid = true;

    const checkForEmptyEntry = (Key) => {
      if (state[Key].length == 0) {
        setError(Key, "Enter Your " + Key);
        isValid = false;
      }
    };

    const checkPassword = () => {
      if (state.password.length < 4) {
        setPasswordError("Password should be at least 4 character long");
        isValid = false;
      }
    };

    Object.keys(state).map((Key) => {
      if (Key != "error") checkForEmptyEntry(Key);
    });

    if (!emailRegularExpression.test(state.email)) {
      setEmailError("Email is not valid");
      isValid = false;
    }

    checkPassword();
    return isValid;
  };

  return (
    <>
      {loading && <Loading top="20%" />}
      <div className="formWrapper" />
      <div className="formContainer">
        <form className="formBody" onSubmit={handleRegister}>
          <Title level={1} style={{ color: "#ff4769" }}>
            Register
          </Title>
          <div
            style={{ width: window.innerWidth < 900 ? "80%" : "fit-content" }}
          >
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
              <div className="alternateMethod">Login</div>
            </Link>
          </Text>
        </form>
      </div>
    </>
  );
};

export default Register;
