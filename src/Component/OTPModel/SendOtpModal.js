import React, { useState } from "react";
import { Modal, Button, Col, Form } from "react-bootstrap";
import "../../CustomCss/custom.css";
import axios from "axios";

const SendOtpModal = ({ show, handleClose, setIsOtpVerified }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const phone = localStorage.getItem("phone");

  const verifyOtp = async () => {
    if (!otp.trim()) {
      alert("Please enter the OTP");
      return;
    }

    if (!phone) {
      alert("No phone number found. Please restart the process.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "https://brjobsedu.com/Temple_portal/api/Verify/",
        { phone: phone.trim(), otp: otp.trim() },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        alert("OTP verified successfully");

   
        localStorage.setItem("otpVerified", "true");

     
        if (setIsOtpVerified) setIsOtpVerified(true);

        // Automatically close modal
        handleClose();
      } else {
        alert(res.data.message || "Invalid OTP, please try again.");
      }
    } catch (err) {
      console.error("Error verifying OTP:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const maskedPhone = phone ? `XXXXXX${phone.slice(-4)}` : "XXXXXXXXXX";

  return (
    <Modal show={show} onHide={handleClose} centered size="md" className="text-center">
      <Modal.Header closeButton>
        <Modal.Title className="otp-model">
          <h1>Please Verify OTP</h1>
          <p>
            OTP sent to your mobile ({maskedPhone}). Please enter it below to continue.
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
        <Button className="model-btn" variant="" onClick={verifyOtp} disabled={loading}>
          {loading ? "Verifying..." : "Submit"}
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SendOtpModal;
