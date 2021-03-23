import React from "react";
import "./App.css";
import Movies from "./components/movies";
import Customers from "./components/customers";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/navbar";
import Customer from './components/customers';
import NotFound from './components/notFound';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <main className="container">
        <Switch>
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect  to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
