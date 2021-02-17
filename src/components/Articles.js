import React from "react";

class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articlesList: [],
      authorName: "",
      firstRequest: false,
    };
  }

  render() {
    return (
      <div className="controls">
        <div className="input-container">
          <span>author:</span>
          <input
            type="text"
            className="text-input"
            data-testid="text-input"
            name="authorName"
          />
          <button className="fetch-button" data-testid="fetch-button">
            Fetch
          </button>
        </div>
      </div>
    );
  }
}

export default Articles;
