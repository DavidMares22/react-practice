import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import { saveMovie, getMovie } from "./../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title").trim(),
    genreId: Joi.string().required().label("Genre").trim(),
    numberInStock: Joi.number()
      .required()
      .label("Number in Stock")
      .min(0)
      .max(100),
    dailyRentalRate: Joi.number()
      .required()
      .label("Daily Rental Rate")
      .min(0)
      .max(10),
  };
  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  doSubmit = () => {
    // call the server
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };
  render() {
    return (
      <React.Fragment>
        <h1>Movie Form {this.props.match.params.id}</h1>
        {/* <button onClick={() => this.props.history.push("/")}> save </button> */}
        <div>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("title", "Title", true)}
            {this.renderSelect("genreId", "Genre", this.state.genres)}
            {this.renderInput(
              "numberInStock",
              "Number in Stock",
              false,
              "number"
            )}
            {this.renderInput("dailyRentalRate", "Rate", false)}

            {this.renderButton("Save")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default MovieForm;
