import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data: posts } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    this.setState({ posts });
  }

  render() {
    return (
      <main className="container">
        <button className="btn btn-primary">Add</button>
        {this.state.posts && (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.posts.map((p) => {
                return (
                  <tr key={p.id}>
                    <th scope="row">{p.id}</th>
                    <td>{p.title}</td>
                    <td>
                      <button className="btn btn-info">Update</button>
                    </td>
                    <td>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>
    );
  }
}

export default App;
