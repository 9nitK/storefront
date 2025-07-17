interface ErrorInfo {
  message: string;
  stack?: string;
  type: "error" | "warning" | "info";
  timestamp: Date;
  url: string;
  userAgent: string;
}

class GlobalErrorHandler {
  private static instance: GlobalErrorHandler;
  private isInitialized = false;

  private constructor() {}

  static getInstance(): GlobalErrorHandler {
    if (!GlobalErrorHandler.instance) {
      GlobalErrorHandler.instance = new GlobalErrorHandler();
    }
    return GlobalErrorHandler.instance;
  }

  init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    // Handle uncaught errors
    window.addEventListener("error", (event) => {
      this.handleError(event.error || new Error(event.message), "uncaught");
    });

    // Handle unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      this.handleError(
        event.reason instanceof Error
          ? event.reason
          : new Error(String(event.reason)),
        "unhandledrejection"
      );
    });

    // Handle Apollo GraphQL errors
    this.handleApolloErrors();
  }

  private handleError(error: Error, type: string) {
    const errorInfo: ErrorInfo = {
      message: error.message,
      stack: error.stack,
      type: "error",
      timestamp: new Date(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    // Show user-friendly message
    this.showUserMessage(error, type);

    // Send to error tracking service (optional)
    this.sendToErrorService(errorInfo);
  }

  private handleApolloErrors() {
    // Override console.error to catch Apollo errors
    const originalConsoleError = console.error;
    console.error = (...args) => {
      const errorMessage = args.join(" ");

      // Check for Apollo-specific errors
      if (
        errorMessage.includes("ApolloError") ||
        errorMessage.includes("GraphQL")
      ) {
        this.handleError(new Error(errorMessage), "apollo");
      }

      // Check for cursor errors (like the one you're seeing)
      if (
        errorMessage.includes("cursor") &&
        errorMessage.includes("already exists")
      ) {
        this.handleError(
          new Error("Database connection issue. Please try again."),
          "database"
        );
      }

      // Call original console.error
      originalConsoleError.apply(console, args);
    };
  }

  private showUserMessage(error: Error, type: string) {
    let userMessage = "Something went wrong. Please try again.";

    // Customize message based on error type
    switch (type) {
      case "apollo":
        userMessage =
          "Unable to load data. Please check your connection and try again.";
        break;
      case "database":
        userMessage =
          "Service temporarily unavailable. Please try again in a moment.";
        break;
      case "unhandledrejection":
        userMessage = "An operation failed. Please try again.";
        break;
      case "network":
        userMessage = "Network error. Please check your internet connection.";
        break;
    }
  }

  private sendToErrorService(errorInfo: ErrorInfo) {
    // Send to external error tracking service (e.g., Sentry, LogRocket)
    // This is optional but recommended for production
    if (process.env.NODE_ENV === "production") {
      // Example: send to your error tracking service
      // errorTrackingService.captureException(errorInfo);
    }
  }

  // Manual error reporting
  reportError(error: Error, context?: string) {
    this.handleError(error, context || "manual");
  }
}

export const globalErrorHandler = GlobalErrorHandler.getInstance();

// Initialize on client side
if (typeof window !== "undefined") {
  globalErrorHandler.init();
}
