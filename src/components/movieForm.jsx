import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import { saveMovie, getMovie } from "./../services/movieService";
import { getGenres } from "../services/genreService";

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

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
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

  doSubmit = async () => {
    // call the server
    await saveMovie(this.state.data);
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
