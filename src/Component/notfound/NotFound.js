import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";


const NotFound = ({ code = 404, type = "frontend", message }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const errorTitles = {
    404: type === "frontend" ? "Page Not Found" : "Resource Not Found",
    500: "Internal Server Error",
    503: "Service Unavailable",
  };

  const errorMessages = {
    404:
      message ||
      (type === "frontend"
        ? `The page "${location.pathname}" does not exist.`
        : "The requested data could not be found on the server."),
    500:
      message ||
      "The server encountered an unexpected condition. Please try again later.",
    503:
      message ||
      "The service is temporarily unavailable. Please try again later.",
  };

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center"
    >
      <h1 className="display-3 fw-bold temp-not-found text-secondary">{code}</h1>
      <h3 className="fw-semibold mb-3">{errorTitles[code]}</h3>
      <p className="text-secondary mb-4">{errorMessages[code]}</p>

      <div>
        <Button variant="outline-secondary" className="me-2" onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <Button variant="outline-warning" onClick={() => navigate("/")}>
          Home
        </Button>
      </div>
    </Container>
  );
};

export default NotFound;
