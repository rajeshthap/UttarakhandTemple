import React from "react";
import { Alert } from "react-bootstrap";
import NotFound from "./NotFound";

const ApiError = ({ code, message }) => {
  if (!message) return null; // don’t render anything if no error message

  // Handle specific error pages
  if (code === 404) {
    return <NotFound message={message} />;
  }

  // You can customize 503, Network, Unknown differently if needed
  if (code === 503 || code === "Network" || code === "Unknown") {
    return (
      <Alert variant="danger" className="text-center mt-3">
        <strong>Error {code}</strong>
        <div>{message}</div>
      </Alert>
    );
  }

  // Default error rendering
  return (
    <Alert variant="danger" className="text-center mt-3">
      <strong>Error</strong>
      <div>{message}</div>
    </Alert>
  );
};

export default ApiError;
