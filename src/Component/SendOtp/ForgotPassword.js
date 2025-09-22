import React, { useState, useEffect } from "react";
import { Button, Form, Col, Container, Row, InputGroup } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../CustomCss/custom.css";
import "../../assets/CSS/ForgotPassword.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
  const [resending, setResending] = useState(false);
  const [otpExpiry, setOtpExpiry] = useState(60);
  const [resendTimer, setResendTimer] = useState(0);
  const [maskedContact, setMaskedContact] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  const phoneRegex = /^\+?\d{10,15}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
      const maskedUser =
        user.length > 2 ? `${user[0]}****${user.slice(-1)}` : user;
      return `${maskedUser}@${domain}`;
    }
    return contact;
  };

  const handleSendOtp = async () => {
    if (!userType.trim()) {
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
        // setMessage("OTP Sent Successfully!");
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
        setErrors(value.length === 10 ? "" : "Mobile number must be 10 digits");
      }
    }
  };

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
        // setMessage("OTP Verified! Now reset your password.");
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
const handleSubmit = (e) => {
  e.preventDefault();
  let valid = true;

  if (!password.trim()) {
    setPasswordError("Please enter a new password");
    valid = false;
  } else if (!strongPasswordRegex.test(password)) {
    setPasswordError(
      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
    );
    valid = false;
  } else {
    setPasswordError("");
  }

  if (!confirmPassword.trim()) {
    setConfirmPasswordError("Please confirm your password");
    valid = false;
  } else if (password !== confirmPassword) {
    setConfirmPasswordError("Passwords do not match");
    valid = false;
  } else {
    setConfirmPasswordError("");
  }

  if (valid) {
    // ✅ submit to API or continue
    console.log("Form submitted", { password, confirmPassword });
  }
};

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      // setErrors("Enter both password fields");
      return;
    }
    if (password !== confirmPassword) {
      setErrors("Passwords do not match");
      return;
    }
    if (!strongPasswordRegex.test(password)) {
      setErrors(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      );
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
        // setMessage("OTP resent successfully!");
        setOtpExpiry(60);
        setResendTimer(60); // reset resend timer
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
    <div className="temp-donate">
      <Container className="temp-container">
        <div className="temple-registration-heading">
          <h2>Forgot Password</h2>
          <Row>
            <Form onSubmit={handleSubmit}>
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
                      onChange={(e) => setUserType(e.target.value)}
                      className="option-type"
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
                      placeholder="Enter your Mobile Number"
                      className="option-type"
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
                        if (/^\d*$/.test(value) && value.length <= 6) {
                          setOtp(value);
                        }
                      }}
                    />
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
                    {resending
                      ? "Resending..."
                      : resendTimer > 0
                      ? `Resend`
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
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => {
                          const value = e.target.value;
                          setPassword(value);

                          if (!strongPasswordRegex.test(value)) {
                            setPasswordError(
                              "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
                            );
                          } else {
                            setPasswordError("");
                          }

                          if (confirmPassword && value !== confirmPassword) {
                            setConfirmPasswordError("Passwords do not match");
                          } else {
                            setConfirmPasswordError("");
                          }
                        }}
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputGroup>
                    {passwordError && (
                      <small className="text-danger" style={{ fontSize: "12px" }}>
                        {passwordError}
                      </small>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      Confirm Password <span className="temp-span-star">*</span>
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showConfirmPassword ? "text" : "password"}
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
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputGroup>
                    {confirmPasswordError && (
                      <small className="text-danger" style={{ fontSize: "12px" }}>
                        {confirmPasswordError}
                      </small>
                    )}
                  </Form.Group>

                  <Button onClick={handleResetPassword} disabled={loading}>
                    {loading ? "Resetting..." : "Reset Password"}
                  </Button>
                  {errors && <p className="otperror mt-2">{errors}</p>}
                  {message && <p className="otpsuccess mt-2">{message}</p>}
                </>
              )}

            </Col>
            </Form>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default ForgotPassword;
