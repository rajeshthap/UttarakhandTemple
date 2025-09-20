import React, { useState, useEffect } from "react";
import { Button, Form, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../CustomCss/custom.css";
import "../../assets/CSS/ForgotPassword.css"

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [contact, setContact] = useState("");
  const [userType, setUserType] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState("");   // for API/OTP errors
  const [resending, setResending] = useState(false);
  const [otpExpiry, setOtpExpiry] = useState(60);
  const [resendTimer, setResendTimer] = useState(60);
  const [maskedContact, setMaskedContact] = useState("");

  // separate error states for inputs
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

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

  const maskContact = (contact) => {
    if (phoneRegex.test(contact)) {
      return `XXXXXX${contact.slice(-4)}`;
    } else if (emailRegex.test(contact)) {
      const [user, domain] = contact.split("@");
      const maskedUser = user.length > 2 ? `${user[0]}****${user.slice(-1)}` : user;
      return `${maskedUser}@${domain}`;
    }
    return contact;
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
        setOtpExpiry(60);
        setResendTimer(60);
        setMaskedContact(maskContact(contact));
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

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (value.length <= 10) {
        setContact(value);
        if (value.length === 10) {
          setErrors(""); 
        } else {
          setErrors("Mobile number must be 10 digits");
        }
      }
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) return setErrors("Enter the OTP sent to your contact");

    const payload = { ...getContactPayload(), otp };
    if (!payload) return setErrors("Invalid contact");

    if (otpExpiry <= 0) {
      setErrors("OTP expired, please resend");
      return;
    }

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
      } else {
        setErrors(res.data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      setErrors("Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      setErrors("Enter both password fields");
      return;
    }
    if (password !== confirmPassword) {
      setErrors("Passwords do not match");
      return;
    }

    const payload = { ...getContactPayload(), otp, password };

    setLoading(true);
    setErrors("");
    setMessage("");

    try {
      await axios.post(
        "https://brjobsedu.com/Temple_portal/api/forgetpassword/",
        payload
      );
      switch (userType.toLowerCase()) {
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

  // Resend OTP function
  const handleResendOtp = async () => {
    const payload = getContactPayload();
    if (!payload) return setErrors("Invalid contact");

    setResending(true);
    setErrors("");
    setMessage("");

    try {
      const res = await axios.post(
        "https://brjobsedu.com/Temple_portal/api/Sentotp/",
        payload
      );
      if (res.data.success) {
        setMessage("OTP resent successfully!");
        setOtpExpiry(60);
        setResendTimer(60);
      } else {
        setErrors(res.data.message || "Failed to resend OTP");
      }
    } catch (err) {
      setErrors("Error resending OTP");
    } finally {
      setResending(false);
    }
  };

  // OTP expiry countdown
  useEffect(() => {
    let otpInterval;
    if (otpExpiry > 0 && step === 2) {
      otpInterval = setInterval(() => setOtpExpiry(prev => prev - 1), 1000);
    }
    return () => clearInterval(otpInterval);
  }, [otpExpiry, step]);

  // Resend button countdown
  useEffect(() => {
    let resendInterval;
    if (resendTimer > 0 && step === 2) {
      resendInterval = setInterval(() => setResendTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(resendInterval);
  }, [resendTimer, step]);

  return (
    <Container className="temp-container">
      <div className="temple-registration-heading">
        <h2>Forgot Password</h2>
        <Row>
          <Col lg={6} md={6} sm={12} className="mt-1">

            {/* Step 1: Contact */}
            {step === 1 && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label className="temp-label-lg-bg">
                    User Type <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)} className="option-type"
                  >
                    <option value="">Select type</option>
                    <option value="Temple">Temple</option>
                    <option value="Pandit">Pandit</option>
                    <option value="Devotee">Devotee</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="temp-label-lg-bg">
                    Mobile Number <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your Mobile Number" className="option-type"
                    value={contact}
                    onChange={handleChange}
                  />
                  {errors && <small className="text-danger">{errors}</small>}
                </Form.Group>

                <Button onClick={handleSendOtp} disabled={loading}>
                  {loading ? "Sending..." : "Send OTP"}
                </Button>
              </>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <>
               <Form.Group className="mb-3">
  <Form.Label>
    Enter OTP <span className="temp-span-star">*</span>
  </Form.Label>
  <Form.Control
    type="text"
    placeholder="Enter OTP"
    value={otp}
    onChange={(e) => {
      const value = e.target.value;
      // Allow only digits
      if (/^\d*$/.test(value)) {
        // Limit to 6 digits
        if (value.length <= 6) {
          setOtp(value);
        }
      }
    }}
  />
  {/* Live validation */}
  {otp && otp.length !== 6 && (
    <small className="text-danger">OTP must be exactly 6 digits</small>
  )}
</Form.Group>


                <p className="otperror mt-2">
                  {otpExpiry > 0
                    ? `OTP valid for ${otpExpiry}s`
                    : "OTP expired, please resend"}
                </p>

                {maskedContact && <p className="otpsuccess">OTP Sent To: {maskedContact}</p>}

                <Button onClick={handleVerifyOtp} disabled={loading || otpExpiry <= 0}>
                  {loading ? "Verifying..." : "Verify"}
                </Button>

                <Button
                  variant="secondary"
                  onClick={handleResendOtp}
                  disabled={resending || resendTimer > 0}
                  className="ms-2"
                >
                  {resendTimer > 0
                    ? `Resend in ${resendTimer}s`
                    : resending
                      ? "Resending..."
                      : "Resend OTP"}
                </Button>
              </>
            )}

            {/* Step 3: Reset Password */}
            {step === 3 && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>
                    New Password <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => {
                      const value = e.target.value;
                      setPassword(value);

                      const strongPasswordRegex =
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

                      if (!strongPasswordRegex.test(value)) {
                        setPasswordError(
                          "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
                        );
                      } else {
                        setPasswordError("");
                      }
                    }}
                  />
                  {passwordError && <small className="text-danger">{passwordError}</small>}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    Confirm Password <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => {
                      const value = e.target.value;
                      setConfirmPassword(value);

                      if (password !== value) {
                        setConfirmPasswordError("Passwords do not match");
                      } else {
                        setConfirmPasswordError("");
                      }
                    }}
                  />
                  {confirmPasswordError && <small className="text-danger">{confirmPasswordError}</small>}
                </Form.Group>

                <Button onClick={handleResetPassword} disabled={loading}>
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </>
            )}

            {errors && <p className="otperror mt-2">{errors}</p>}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ForgotPassword;
