import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppErrorBoundary from "./components/AppErrorBoundary";
import "./styles/index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppErrorBoundary>
        <App />
      </AppErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>,
);
