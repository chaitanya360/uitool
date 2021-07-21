import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import InputUnderline from "../../components/InputUnderline";
import { Typography, Space } from "antd";
import { Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import storage from "../../api/storage";
import { login } from "../../api/users";
import Loading from "../../components/Loading";

const emailRegularExpression = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const Login = ({ justRegistered = false, setJustRegistered }) => {
  const { Title, Text } = Typography;
  const [loading, setLoading] = useState(false);

  const authContext = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    if (justRegistered) setTimeout(() => setJustRegistered(false), 3000);
  }, []);

  const [state, setState] = useState({
    email: "",
    password: "",
    error: {
      email: false,
      password: false,
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      login(state.email, state.password).then((response) => {
        setLoading(false);
        if (response.ok) {
          if (response.data.status) {
            // login success
            const userData = response.data.data;

            // creating user object for storing purpose
            const user = {
              firstName: userData.first_name,
              lastName: userData.last_name,
              mobile: userData.mobile_number,
              email: userData.email,
            };

            // storing token and user object
            storage.storeToken(userData.token);
            storage.storeUser(user);

            // setting user globlly
            authContext.setUser(user);

            // redirecting to "workspace"
            history.push("/dashboard");
          } else alert(response.data.message);
        } else alert(response.problem);
      });
    }
  };

  const setEmail = (value) => {
    setState((old) => ({ ...old, error: old.error, email: value }));
  };
  const setPassword = (value) => {
    setState((old) => ({ ...old, error: old.error, password: value }));
  };

  const setEmailError = (error) => {
    setState((old) => ({
      ...old,
      error: { ...old.error, email: error },
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
      case "email":
        setEmailError(Error);
        break;

      case "password":
        setPasswordError(Error);
        break;
    }
  };

  const validateForm = () => {
    let isValid = true;

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
        <form className="formBody" onSubmit={handleLogin}>
          {justRegistered && (
            <div className="register_success_login_info">
              Register Sucess Login to Continue
            </div>
          )}
          <Title level={1} style={{ color: "dodgerblue" }}>
            Login
          </Title>
          <div
            style={{ width: window.innerWidth < 900 ? "80%" : "fit-content" }}
          >
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
          <input type="submit" value="Login" className="should_hover" />
          <Text>
            Don't Have Account?
            <Link to="/register">
              <Button type="link" className="alternateMethod">
                Register
              </Button>
            </Link>
          </Text>
        </form>
      </div>
    </>
  );
};

export default Login;
