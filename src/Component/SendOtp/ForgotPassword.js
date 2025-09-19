import React, { useState } from "react";
import { Button, Form, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [contact, setContact] = useState("");
  const [userType, setUserType] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const phoneRegex = /^\+?\d{10,15}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const getContactPayload = () => {
    const trimmedContact = contact.trim();
    const trimmedUserType = userType.trim();
    if (phoneRegex.test(trimmedContact))
      return { phone: trimmedContact, type: trimmedUserType };
    if (emailRegex.test(trimmedContact))
      return { email: trimmedContact, type: trimmedUserType };
    return null;
  };

  // Step 1: Send OTP
  const handleSendOtp = async () => {
    const currentUserType = userType.trim();
    if (!currentUserType) {
      setErrors("Please select user type");
      return;
    }

    const payload = getContactPayload();
    if (!payload) {
      setErrors("Enter a valid phone number or email");
      return;
    }

    setLoading(true);
    setErrors("");
    setMessage("");

    try {
      const res = await axios.post(
        "https://brjobsedu.com/Temple_portal/api/Sentotp/",
        payload
      );

      if (res.data.success) {
        setMessage("OTP Sent Successfully!");
        setStep(2);
        console.log("User type after sending OTP:", currentUserType);
      } else {
        setErrors(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      setErrors("Error while sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    const currentUserType = userType.trim();
    if (!otp) return setErrors("Enter the OTP sent to your contact");

    const payload = { ...getContactPayload(), otp };
    if (!payload) return setErrors("Invalid contact");

    setLoading(true);
    setErrors("");
    setMessage("");

    try {
      const res = await axios.post(
        "https://brjobsedu.com/Temple_portal/api/Verify/",
        payload
      );

      if (res.data.success) {
        setMessage("OTP Verified! Now reset your password.");
        setStep(3);
        console.log("User type after Verifying OTP:", currentUserType);
      } else {
        setErrors(res.data.message || "Invalid OTP");
      }
    } catch {
      setErrors("Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  //Reset password
  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      setErrors("Enter both password fields");
      return;
    }
    if (password !== confirmPassword) {
      setErrors("Passwords do not match");
      return;
    }

    const currentUserType = userType;
    const payload = { ...getContactPayload(), otp, password };

    setLoading(true);
    setErrors("");
    setMessage("");

    try {
      await axios.post(
        "https://brjobsedu.com/Temple_portal/api/forgetpassword/",
        payload
      );
      switch (currentUserType.toLowerCase()) {
        case "temple":
          navigate("/AuthorityLogin");
          break;
        case "pandit":
          navigate("/PanditLogin");
          break;
        default:
          navigate("/DevoteeLogin");
      }
    } catch (err) {
      console.error(err);
      setErrors("Error Resetting Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="temp-container">
      <div className="temple-registration-heading">
        <h2>Forgot Password</h2>
        <Row>
          <Col lg={6} md={6} sm={12} className="mt-4">
            {step === 1 && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label className="temp-label-lg-bg">User Type <span className="temp-span-star">*</span></Form.Label>
                  <Form.Select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                  >
                    <option value="">Select type </option>
                    <option value="Temple">Temple</option>
                    <option value="Pandit">Pandit</option>
                    <option value="Devotee">Devotee</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="temp-label-lg-bg">Email or Mobile Number <span className="temp-span-star">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your email or phone"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </Form.Group>

                <Button onClick={handleSendOtp} disabled={loading}>
                  {loading ? "Sending..." : "Send OTP"}
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Enter OTP *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </Form.Group>
                <Button onClick={handleVerifyOtp} disabled={loading}>
                  {loading ? "Verifying..." : "Verify OTP"}
                </Button>
              </>
            )}

            {step === 3 && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>New Password  <span class="temp-span-star">*</span></Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password <span class="temp-span-star">*</span></Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                <Button onClick={handleResetPassword} disabled={loading}>
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </>
            )}

            {message && <p className="success mt-2">{message}</p>}
            {errors && <p className="error mt-2">{errors}</p>}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ForgotPassword;
