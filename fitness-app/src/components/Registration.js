import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useEffect } from "react";

const initialDisabled = true;
const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  role: 0,
};
const initialFormErrors = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

const schema = yup.object().shape({
  first_name: yup.string().required("Please enter your name!"),
  last_name: yup.string().required("Please enter your last name!"),
  email: yup.string().email("Please enter a valid email address!"),
  password: yup
    .string()
    .required("Please enter a password!")
    .min(4, "Password must be at least 4 characters"),
});

const Registration = (props) => {
  const [values, setValues] = useState(initialValues);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [error, setError] = useState(false);

  const postNewUser = (newUser) => {
    axios
      .post(
        "https://bw-anywhere-fitness-05.herokuapp.com/api/auth/register",
        newUser
      )
      .then((res) => {
        props.history.push("/login");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
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
      first_name: values.first_name.trim(),
      last_name: values.last_name.trim(),
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
        <h2>Create Your Account</h2>
        <p>
          Already have an account?
          <Link to="/login">
            <button type="button" className="switch">
              Login
            </button>
          </Link>
        </p>
      </div>
      <div className="form-container">
        <form className="login-form" onSubmit={onSubmit}>
          <label>
            First Name
            <input
              type="text"
              name="first_name"
              placeholder="Enter First Name"
              max-characters="14"
              value={values.first_name}
              onChange={onChange}
            />
            <p className="error-message">{formErrors.first_name}</p>
          </label>
          <label>
            Last Name
            <input
              type="text"
              name="last_name"
              placeholder="Enter Last Name"
              max-characters="14"
              value={values.last_name}
              onChange={onChange}
            />
            <p className="error-message">{formErrors.last_name}</p>
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              max-characters="14"
              value={values.email}
              onChange={onChange}
            />
            <p className="error-message">{formErrors.email}</p>
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              max-characters="14"
              onChange={onChange}
              value={values.password}
            />
          </label>
          <p className="error-message">{formErrors.password}</p>
          {error && <p className="error-message">This email address has been registered</p>}
          <button id="submit-login" type="submit" disabled={disabled}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default connect(null)(Registration);
