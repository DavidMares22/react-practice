import React, { Component } from "react";
import Input from "./input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };
  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            value={account.username}
            onChange={this.handleChange}
            id="username"
            label="Username"
            name="username"
          />
          <Input
            value={account.password}
            onChange={this.handleChange}
            id="password"
            label="Password"
            name="password"
          />

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
