import React from "react";

import Joi from "joi-browser";
import Form from "./form";
import { login } from "../services/authService";
import {getCurrentUser}  from '../services/authService';
import { Redirect } from "react-router";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().trim(),
    password: Joi.string().required().label("Password").trim(),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await login(data.username, data.password);
      const {state} = this.props.location
      window.location = state? state.from.pathname: '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {

    if (getCurrentUser()) return <Redirect to="/"/>

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", true)}
          {this.renderInput("password", "Password", false, "password")}

          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
