import React, { Component } from "react";
import { Link, Redirect } from "@reach/router";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      redirect: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    const { hasError, redirect } = this.state;
    const { children } = this.props;

    if (redirect) {
      return <Redirect to="/" noThrow />;
    }
    if (hasError) {
      return (
        <div>
          <h1>
            There was an error with this listing. <Link to="/">Click here</Link>{" "}
            to go back to the home page or wait five seconds.
          </h1>
        </div>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
