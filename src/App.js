import React from "react";
import "./App.css";
import Movies from "./components/movies";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <main className="container">
        <Switch>
          <Route path="/movies" component={Movies} />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
