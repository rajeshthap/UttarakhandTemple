import React, { useState, useEffect } from "react";
import { Modal, Button, Col, Form } from "react-bootstrap";
import "../../CustomCss/custom.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SendOtpModal = ({ show, handleClose, setIsOtpVerified }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);       
  const [otpExpiry, setOtpExpiry] = useState(60); 

  const navigate = useNavigate();
  const phone = localStorage.getItem("phone");

  // Resend countdown
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

  // Verify OTP 
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
        navigate("/PaymentConfirmation");
        localStorage.setItem("otpVerified", "true");

        if (setIsOtpVerified) setIsOtpVerified(true);

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

  // Resend OTP 
  const resendOtp = async () => {
    if (!phone) {
      alert("No phone number found. Please restart the process.");
      return;
    }

    try {
      setResending(true);
      setTimer(60);       
      setOtpExpiry(120);  
      const res = await axios.post(
        "https://brjobsedu.com/Temple_portal/api/Sentotp/",
        { phone: phone.trim() },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        alert("OTP resent successfully!");
      } else {
        alert(res.data.message || "Failed to resend OTP.");
      }
    } catch (err) {
      console.error("Error resending OTP:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setResending(false);
    }
  };

  const maskedPhone = phone ? `XXXXXX${phone.slice(-4)}` : "XXXXXXXXXX";

  return (
    <Modal show={show} onHide={handleClose} centered size="md" className="text-center">
      <Modal.Header closeButton>
        <Modal.Title className="otp-model">
          <h1>Please Verify OTP</h1>
          <p>OTP sent to your mobile ({maskedPhone}).<br/> Please enter it below to continue.</p>
          <p className="otperror">
            {otpExpiry > 0 ? `OTP valid for ${otpExpiry}s` : "OTP expired, please resend"}
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
  onChange={(e) => {
    let value = e.target.value;

    // Allow only digits
    if (/^\d*$/.test(value)) {
      // Limit to 6 digits
      if (value.length <= 6) {
        setOtp(value);
      }
    }
  }}
/>

          </Form.Group>
        </Col>
      </Modal.Body>

      <Modal.Footer>
        <Button className="model-btn" onClick={verifyOtp} disabled={loading || otpExpiry <= 0}>
          {loading ? "Verifying..." : "Submit"}
        </Button>

        <Button variant="secondary" onClick={resendOtp} disabled={resending || timer > 0}>
          {timer > 0 ? `Resend` : resending ? "Resending..." : "Resend OTP"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SendOtpModal;
