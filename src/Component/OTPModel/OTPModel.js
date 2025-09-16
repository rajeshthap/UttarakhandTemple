import React from "react";
import { Modal, Button, Col, Form } from "react-bootstrap";
import "../../CustomCss/custom.css";

const OTPModel = ({ show, handleClose, otp, setOtp, handleVerifyOtp, verifying }) => {
  return (
    <Modal show={show} onHide={handleClose} centered size="md" className="text-center">
      <Modal.Header closeButton>
        <Modal.Title className="otp-model">
          <h1>Please Verify OTP</h1>
          <p>OTP sent to your mobile. Please enter it below to continue.</p>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Col lg={12} md={12} sm={12}>
          <Form.Group className="mb-3" controlId="otpInput">
            <Form.Control
              type="text"
              placeholder="Enter OTP"
              className="temp-form-control"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Modal.Body>

      <Modal.Footer>
        <Button
          className="model-btn"
          variant="primary"
          onClick={handleVerifyOtp}
          disabled={verifying}
        >
          {verifying ? "Verifying..." : "Submit"}
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OTPModel;
