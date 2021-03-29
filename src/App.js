import React, { Component } from "react";
import http from "./services/httpService";
import "./App.css";


const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data: posts } = await http.get(apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(apiEndpoint, obj);
    post.id = Date.now().toString();
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = "UPDATED";
    await http.put(`${apiEndpoint}/${post.id}`, post);
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };
  handleUpdate = async (post) => {
    post.title = "UPDATED";
    await http.put(`${apiEndpoint}/${post.id}`, post);
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };
  handleDelete = async (post) => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    try {
      await http.delete(`${apiEndpoint}/${post.id}`);
      // throw new Error("");
    } catch (e) {
      // handle 404 errors
      if (e.response && e.response.status === 404) {
        alert("This post has already been deleted");
        this.setState({ posts: originalPosts });
      }
    }
  };

  render() {
    return (
      <main className="container">
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
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
                      <button
                        className="btn btn-info"
                        onClick={() => this.handleUpdate(p)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => this.handleDelete(p)}
                      >
                        Delete
                      </button>
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
