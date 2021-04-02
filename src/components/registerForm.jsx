import React from "react";

import Joi from "joi-browser";
import Form from "./form";

import * as userService from "../services/userService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().trim(),
    password: Joi.string().required().label("Password").trim().min(5),
    name: Joi.string().required().label("Name").trim(),
  };

  doSubmit = async () => {
    // call the server
    try {
      const response = await userService.register(this.state.data);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this.setState({ errors });
      }
    }
    console.log("submitted");
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", true)}
          {this.renderInput("password", "Password", false, "password")}
          {this.renderInput("name", "Name", false)}

          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
