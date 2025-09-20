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
  <Form.Label>
    Mobile Number <span className="temp-span-star"> *</span>
  </Form.Label>
  <Form.Control
    type="text"
    placeholder="Mobile No."
    value={phone}
    onChange={(e) => {
      const value = e.target.value;

      // Allow only numbers
      if (/^\d*$/.test(value)) {
        // Limit to 10 digits
        if (value.length <= 10) {
          setPhone(value);
        }
      }
    }}
  />
  {/* Live validation */}
  {phone && phone.length !== 10 && (
    <small className="text-danger">Mobile number must be 10 digits</small>
  )}
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
