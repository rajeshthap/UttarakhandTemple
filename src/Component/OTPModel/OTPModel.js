import React, { useState, useEffect } from "react";
import { Modal, Button, Col, Form } from "react-bootstrap";
import "../../CustomCss/custom.css";

const OTPModel = ({ 
  show, 
  handleClose, 
  otp, 
  setOtp, 
  handleVerifyOtp, 
  verifying, 
  phone,
  handleResendOtp   
}) => {
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);     
  const [otpExpiry, setOtpExpiry] = useState(120); // OTP validity timer
  const maskedPhone = phone ? `XXXXXX${phone.slice(-4)}` : "XXXXXXXXXX";

  // Resend button countdown
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // OTP expiry countdown
  useEffect(() => {
    let interval;
    if (otpExpiry > 0) {
      interval = setInterval(() => setOtpExpiry(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpExpiry]);

  // Reset timers when modal opens
  useEffect(() => {
    if (show) {
      setTimer(60);
      setOtpExpiry(120);
    }
  }, [show]);

  const onResendClick = async () => {
    try {
      setResending(true);
      setTimer(60);
      setOtpExpiry(120);
      await handleResendOtp(); // call parent API
    } catch (err) {
      console.error("Resend OTP failed:", err);
    } finally {
      setResending(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="md" className="text-center">
      <Modal.Header closeButton>
        <Modal.Title className="otp-model">
          <h1>Please Verify OTP</h1>
          <p>
            OTP sent to your mobile <strong>{maskedPhone}</strong> <br />
            Please enter it below to continue.
          </p>
          <p className="otperror">
            {otpExpiry > 0 
              ? `OTP valid for ${otpExpiry}s` 
              : "OTP expired, please resend"}
          </p>
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
          disabled={verifying || otpExpiry <= 0}
        >
          {verifying ? "Verifying..." : "Verify"}
        </Button>

        <Button 
          variant="secondary" 
          onClick={onResendClick} 
          disabled={resending || timer > 0}
        >
          {timer > 0 
            ? `Resend in ${timer}s` 
            : resending 
              ? "Resending..." 
              : "Resend OTP"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OTPModel;
