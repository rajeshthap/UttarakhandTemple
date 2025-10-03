import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Col } from "react-bootstrap";

const VerifyOtp = ({ phone, onVerified }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(60); // countdown for resend
  const [otpExpiry, setOtpExpiry] = useState(60); // OTP validity

  const maskedPhone = phone ? `XXXXXX${phone.slice(-4)}` : "XXXXXXXXXX";

  // Countdown for Resend button
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Countdown for OTP expiry
  useEffect(() => {
    let interval;
    if (otpExpiry > 0) {
      interval = setInterval(() => setOtpExpiry((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpExpiry]);

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setMessage("OTP is required");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(
   "https://brjobsedu.com/Temple_portal/api/verify-otp/",
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

  const handleResendOtp = async () => {
    try {
      setResending(true);
      setTimer(60); 
      setOtpExpiry(60); 

      const res = await axios.post(
   "https://brjobsedu.com/Temple_portal/api/send-otp/",
        { phone }
      );

      if (res.data.success) {
      } else {
        setMessage(res.data.message || "Failed to resend OTP.");
      }
    } catch (err) {
    } finally {
      setResending(false);
    }
  };

  return (
    <div>
      <Col lg={12} md={12} sm={12}>
        <Form.Group className="mb-3">
          <Form.Label>
            Mobile Number <span className="temp-span-star"> *</span>
          </Form.Label>
          <Form.Control type="text" value={maskedPhone} readOnly />
        </Form.Group>
      </Col>

     <Col lg={12} md={12} sm={12}>
  <Form.Group className="mb-3">
    <Form.Label>
      Enter OTP <span className="temp-span-star"> *</span>
    </Form.Label>

    <Form.Control
      type="text"
      inputMode="numeric"
      placeholder="Enter OTP"
      value={otp}
      onChange={(e) => {
        // keep only digits and limit to 6 chars
        const cleaned = e.target.value.replace(/\D/g, "").slice(0, 6);
        setOtp(cleaned);
      }}
      maxLength={6}
    />

    {/* Live validation shown only under the input */}
    {otp && otp.length !== 6 && (
      <small className="text-danger">OTP must be exactly 6 digits</small>
    )}
  </Form.Group>
</Col>


      <p className={`otperror ${otpExpiry > 0 ? "countdown" : ""}`}>
        {otpExpiry > 0
          ? `OTP valid for ${otpExpiry}s`
          : "OTP expired, please resend"}
      </p>

      <p className="otpsuccess">{message}</p>

      <Button
        variant="success"
        onClick={handleVerifyOtp}
        disabled={loading || otpExpiry <= 0}
        className="me-2"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </Button>

      <Button
        variant="secondary"
        onClick={handleResendOtp}
        disabled={resending || timer > 0}
      >
        {timer > 0
          ? `Resend`
          : resending
          ? "Resending..."
          : "Resend OTP"}
      </Button>

    </div>
  );
};

export default VerifyOtp;
