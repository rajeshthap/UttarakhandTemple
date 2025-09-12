import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Col } from "react-bootstrap";

const VerifyOtp = ({ phone, onVerified }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage("OTP is required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "https://brjobsedu.com/Temple_portal/api/Verify/",
        { phone, otp }
      );

      if (res.data.success) {
        setMessage("OTP verified successfully!");
        if (onVerified) onVerified(); 
      } else {
        setMessage(res.data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error while verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Col lg={12} md={12} sm={12}>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" value={phone} readOnly />
        </Form.Group>
      </Col>

      <Col lg={12} md={12} sm={12}>
        <Form.Group className="mb-3">
          <Form.Label>Enter OTP *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </Form.Group>
      </Col>

      <Button
        variant="success"
        onClick={handleVerifyOtp}
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </Button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyOtp;
