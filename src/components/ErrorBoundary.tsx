import React, { Component, ReactNode, ErrorInfo } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: "",
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.toString(),
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <details>
            <summary>Show Details</summary>
            {this.state.errorMessage}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
