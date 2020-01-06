import React, { Component, ErrorInfo } from "react";
import { Link, Redirect } from "@reach/router";

interface IState {
  hasError: boolean;
  redirect: boolean;
}

class ErrorBoundary extends Component<{}, IState> {
  public constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      redirect: false,
    };
  }

  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  public componentDidUpdate() {
    const { hasError } = this.state;
    if (hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  public render() {
    const { hasError, redirect } = this.state;
    const { children } = this.props;

    if (redirect) {
      return <Redirect to="/" noThrow />;
    }
    if (hasError) {
      return (
        <div>
          <h1>
            There was an error with this listing.
            {" "}
            <Link to="/">Click here</Link>
            {" "}
            to go back to the home page or wait five seconds.
          </h1>
        </div>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
