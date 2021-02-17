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

  fetchArticles = () => {
    fetch(`https://jsonmock.hackerrank.com/api/articles?author=saintamh&page=1`)
      .then((res) => res.json())
      .then((json) => {
        let arr = [];
        json.data.map((el) => {
          if (el.title != null) {
            arr.push(el);
          }
        });

        this.setState({ articlesList: arr, firstRequest: true });
      });
  };
  render() {
    return (
      <React.Fragment>
        <div className="controls">
          <div className="input-container">
            <span>author:</span>
            <input
              type="text"
              className="text-input"
              data-testid="text-input"
              name="authorName"
            />
            <button
              className="fetch-button"
              data-testid="fetch-button"
              onClick={this.fetchArticles}
            >
              Fetch
            </button>
          </div>
        </div>
        {this.state.articlesList.length > 0
          ? this.state.articlesList.map((el, i) => {
              return (
                <div key={i} className="results">
                  <li key="example-key" data-testid="result-row">
                    {el.title}
                  </li>
                </div>
              );
            })
          : null}
      </React.Fragment>
    );
  }
}

export default Articles;
