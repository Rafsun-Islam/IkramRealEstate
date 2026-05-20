import { ErrorBoundary } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="error-boundary">
    <h2>Something went wrong.</h2>
    <p>{error.message}</p>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

export default function AppErrorBoundary({ children }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
}
