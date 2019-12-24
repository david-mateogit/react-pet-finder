import React, { Component } from "react";
import { Link, Redirect } from "@reach/router";

class ErrorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ redirect: true }), 5000);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" noThrow />;
    }

    return (
      <div>
        <h1>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to go back to the home page or wait five seconds.
        </h1>
      </div>
    );
  }
}

export default ErrorComponent;
