import React, { Component } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Navbar from "./components/navbar";
import MovieForm from "./components/movieForm";
import NotFound from "./components/notFound";
import Rentals from "./components/rentals";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import { getCurrentUser } from "./services/authService";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={user} />
        <main className="container">
          <Switch>
            <Route
              path="/movies/:id"
              render={(props) => {
                if (!user) return <Redirect to="/login" />;
                return <MovieForm {...props} />;
              }}
            />

            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
