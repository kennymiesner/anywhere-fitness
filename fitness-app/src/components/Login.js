import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { login, setEmail } from "../actions/loginActions";
import * as yup from "yup";
import { useEffect } from "react";

const initialDisabled = true;
const initialValues = {
  email: "",
  password: "",
};
const initialFormErrors = {
  email: "",
  password: "",
};
const schema = yup.object().shape({
  email: yup.string().email("Please enter a valid email address!"),
  password: yup
    .string()
    .required("Please enter a password!")
    .min(4, "Password must be at least 4 characters"),
});

const Login = (props) => {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(initialDisabled);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const postNewUser = (newUser) => {
    axios
      .post(
        "https://bw-anywhere-fitness-05.herokuapp.com/api/auth/login",
        newUser
      )
      .then((res) => {
        setError("");
        localStorage.setItem("token", res.data.token);
        if (res.data.role) {
          localStorage.setItem("role", "i");
          props.login("i");
          localStorage.setItem("email", values.email);
          props.setEmail(values.email);
          props.history.push("/class-admin");
        } else {
          localStorage.setItem("role", "u");
          props.login("u");
          localStorage.setItem("email", values.email);
          props.setEmail(values.email);
          props.history.push("/class");
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Login failed");
        setValues(initialValues);
      });
  };

  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: "" }))
      .catch((err) => setFormErrors({ ...formErrors, [name]: err.errors[0] }));
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    validate(name, value);
    event.preventDefault();
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      email: values.email.trim(),
      password: values.password.trim(),
    };
    postNewUser(newUser);
  };

  useEffect(() => {
    schema.isValid(values).then((valid) => setDisabled(!valid));
  }, [values]);

  return (
    <div className="form-wrapper">
      <div className="form-text-container">
        <h2>Login to your account</h2>
        <p>
          Do not have an account?
          <Link to="/register">
            <button type="button" className="switch">
              Create account
            </button>
          </Link>
        </p>
      </div>
      <div className="form-container">
        <form className="login-form" onSubmit={onSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={values.email}
              placeholder="Enter Email"
              max-characters="14"
              onChange={onChange}
            />
            <p className="error-message">{formErrors.email}</p>
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={values.password}
              placeholder="Enter Password"
              max-characters="14"
              onChange={onChange}
            />
            <p className="error-message">{formErrors.password}</p>
          </label>
          {error && <p className="error-message">{error}</p>}
          <button id="submit-login" type="submit" disabled={disabled}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { login, setEmail })(Login);
