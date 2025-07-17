// Minimal demo error handler

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

    window.addEventListener("error", (event) => {
      this.handleError(event.error || new Error(event.message));
    });
    window.addEventListener("unhandledrejection", (event) => {
      this.handleError(
        event.reason instanceof Error
          ? event.reason
          : new Error(String(event.reason))
      );
    });
  }

  private handleError(error: Error) {
    // Log error to console
    // (In production, you might send this to a service)

    console.error(error);
    // Show a simple alert for demo purposes
    alert("Something went wrong. Please try again.");
  }

  // Manual error reporting
  reportError(error: Error) {
    this.handleError(error);
  }
}

export const globalErrorHandler = GlobalErrorHandler.getInstance();

if (typeof window !== "undefined") {
  globalErrorHandler.init();
}
