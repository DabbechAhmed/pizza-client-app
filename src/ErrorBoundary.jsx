import { Link } from "@tanstack/react-router";
import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.log("ErrorBoundary caught an error", error, info);
  } 
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Uh oh!</h2>
          <p>
            There was an error with this page .{" "}
            <Link to={"/"}>Click here</Link>
            to go back to the home page or wait a moment and try again.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
