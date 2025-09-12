import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Col } from "react-bootstrap";

const SendOtp = ({ phone, setPhone, onOtpSent }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendOtp = async () => {
    if (!phone || !/^\+?\d{10,15}$/.test(phone)) {
      setMessage("Enter a valid phone number (e.g. +911234567890)");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "https://brjobsedu.com/Temple_portal/api/Sentotp/",
        { phone }
      );

      if (res.data.success) {
        setMessage("OTP sent successfully!");
        if (onOtpSent) onOtpSent(); 
      } else {
        setMessage(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error while sending OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Col lg={12} md={12} sm={12}>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Mobile No."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
      </Col>

      <Button
        variant="danger"
        onClick={handleSendOtp}
        disabled={loading}
      >
        {loading ? "Sending..." : "Send OTP"}
      </Button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default SendOtp;
