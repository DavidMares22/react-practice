import React, { Component } from "react";

// import Form from "../common/form";
// import Joi from "joi-browser";

// import { getGenres } from "../services/genreService";
// import { getMovie, saveMovie } from "../services/movieService";

class MovieForm extends Component {
  //   state = {
  //     genres: [],
  //     data: {
  //       title: "",
  //       genreId: "",
  //       numberInStock: "",
  //       dailyRentalRate: ""
  //     },
  //     errors: {}
  //   };

  render() {
    return (
      <React.Fragment>
        <h1>Movie Form {this.props.match.params.id}</h1>
        <button onClick={()=>this.props.history.push('/')}> save </button>
        <div>
          <form></form>
        </div>
      </React.Fragment>
    );
  }
}

export default MovieForm;
