import React  from "react";

import Joi from "joi-browser";
import Form from "./form";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name:"" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username").trim(),
    password: Joi.string().required().label("Password").trim().min(5),
    name: Joi.string().required().label("Name").trim(),
  };

  doSubmit = () => {
    // call the server
    console.log("submitted");
  };

  render() {
    
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", true)}
          {this.renderInput("password", "Password",false, "password")}
          {this.renderInput("name", "Name",false)}

          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
