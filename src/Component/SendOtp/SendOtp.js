import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Col } from "react-bootstrap";
import { CheckPhoneApi } from "../GlobleAuth/Globleapi";

const SendOtp = ({ phone, setPhone, onOtpSent }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const checkPhoneExistence = async () => {
  try {
    const res = await CheckPhoneApi(); 
    const users = res.data;

    if (!Array.isArray(users) || users.length === 0) {
      return false; 
    }

    const phoneExists = users.some(u => u.phone === phone);

    if (phoneExists) {
      setMessage("Phone number already exists!");
      return true; 
    }

    return false; 
  } catch (err) {
    console.error("Error checking phone:", err);
    setMessage("Could not verify phone number, trying anyway...");
    return false; 
  }
};


  const handleSendOtp = async () => {
    if (!phone || phone.length !== 10) {
      setMessage("Enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const exists = await checkPhoneExistence();
      if (exists) {
        setLoading(false);
        return; 
      }

      //  Only send OTP if phone does NOT exist
      const res = await axios.post(
        "https://brjobsedu.com/Temple_portal/api/send-otp/",
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
            Mobile Number <span className="temp-span-star">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Mobile No."
            value={phone}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value) && value.length <= 10) {
                setPhone(value);
                setMessage(""); // reset on typing
              }
            }}
          />
          {phone && phone.length !== 10 && (
            <small className="text-danger">Mobile number must be 10 digits</small>
          )}
        </Form.Group>
      </Col>

      <Button
        variant="danger"
        onClick={handleSendOtp}
        disabled={loading || !phone || phone.length !== 10}
      >
        {loading ? "Checking..." : "Send OTP"}
      </Button>

      {message && <p className="text-danger">{message}</p>}
    </div>
  );
};

export default SendOtp;
