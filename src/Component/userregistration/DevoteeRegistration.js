import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Form,
  InputGroup,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import "../../assets/CSS/TempleAuthority.css";
import Regimg from "../../assets/images/User-regi-img.png";
import SendOtp from "../SendOtp/SendOtp";
import VerifyOtp from "../VerifyOtp/VerifyOtp";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ModifyAlert from "../Alert/ModifyAlert";

function DevoteeRegistration() {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  // Input states
  const [devoteeName, setDevoteeName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error states
  const [errors, setErrors] = useState({});

  // Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

  // Validate just one field and update errors state.
  // Also clear the general message if no errors remain.
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "devoteeName":
        if (!value.trim()) error = "Name is required";
        break;
      case "gender":
        if (!value) error = "Gender is required";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!emailRegex.test(value)) error = "Invalid email format";
        break;
      case "password":
        if (!value.trim()) error = "Password is required";
        else if (!passwordRegex.test(value))
          error =
            "Password must be 8+ chars, include uppercase, lowercase, number & special char";
        break;
      default:
        break;
    }

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (error) newErrors[name] = error;
      else delete newErrors[name];

      // If there are no more field errors and phone exists, clear the general message
      if (Object.keys(newErrors).length === 0 && phone) {
        setMessage("");
      }

      return newErrors;
    });
  };

  // Synchronous full validation — returns errors object
  const validateAll = () => {
    const newErrors = {};
    if (!devoteeName.trim()) newErrors.devoteeName = "Name is required";
    if (!gender) newErrors.gender = "Gender is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format";

    if (!password.trim()) newErrors.password = "Password is required";
    else if (!passwordRegex.test(password))
      newErrors.password =
        "Password must be 8+ chars, include uppercase, lowercase, number & special char";

    return newErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    // Validate all fields synchronously
    const newErrors = validateAll();
    setErrors(newErrors); // show errors immediately in UI

    // If phone missing or there are errors, stop and show the general message
    if (!phone || Object.keys(newErrors).length > 0) {
      setMessage("Please fix the errors above");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("devotee_name", devoteeName);
    formData.append("gender", gender);
    formData.append("email", email);
    formData.append("password", password);

    try {
      const res = await axios.post(
        "https://brjobsedu.com/Temple_portal/api/Userregistration/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log("API Response:", res.data);

      // Directly redirect after API response
      setDevoteeName("");
      setGender("");
      setEmail("");
      setPassword("");
      setErrors({});
      setMessage("");
      setAlertMessage("User Registered Successfully!");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate("/DevoteeLogin");
      }, 2000);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        let apiMsg =
          err.response.data.error ||
          err.response.data.message ||
          JSON.stringify(err.response.data);
        setMessage(apiMsg);
      } else {
        setAlertMessage("Error While Registering");
        setShowAlert(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="temp-donate">
      <Container className="temp-container">
        <div className="temple-registration-heading">
          <h1>User Registration</h1>
          <Form onSubmit={handleRegister}>
            <Row>
              <Col lg={6} md={6}>
                <Row>
                  {!otpSent && !otpVerified && (
                    <Col lg={12}>
                      <SendOtp
                        phone={phone}
                        setPhone={setPhone}
                        onOtpSent={() => setOtpSent(true)}
                      />
                    </Col>
                  )}

                  {otpSent && !otpVerified && (
                    <Col lg={12}>
                      <VerifyOtp
                        phone={phone}
                        onVerified={() => {
                          setOtpVerified(true);
                          setOtpSent(false);
                          // clear any previous message when OTP verified
                          setMessage("");
                        }}
                      />
                    </Col>
                  )}

                  {otpVerified && (
                    <>
                      {/* Phone */}
                      <Col lg={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            Mobile Number{" "}
                            <span className="temp-span-star">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={phone}
                            readOnly
                            className="temp-form-control-bg"
                          />
                        </Form.Group>
                      </Col>
                      {/* Name */}
                      <Col lg={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            Devotee Name{" "}
                            <span className="temp-span-star">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={devoteeName}
                            onChange={(e) => {
                              setDevoteeName(e.target.value);
                              validateField("devoteeName", e.target.value);
                            }}
                            placeholder="Enter Name"
                            className="temp-form-control-bg"
                          />
                          {errors.devoteeName && (
                            <small className="alert-txt">
                              {errors.devoteeName}
                            </small>
                          )}
                        </Form.Group>
                      </Col>
                      {/* Gender */}
                      <Col lg={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            Gender <span className="temp-span-star">*</span>
                          </Form.Label>
                          <Form.Select
                            value={gender}
                            onChange={(e) => {
                              setGender(e.target.value);
                              validateField("gender", e.target.value);
                            }}
                            className="temp-form-control-option-bg"
                          >
                            <option value="">Please Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                          </Form.Select>
                          {errors.gender && (
                            <small className="alert-txt">{errors.gender}</small>
                          )}
                        </Form.Group>
                      </Col>

                      {/* Email */}
                      <Col lg={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            Email <span className="temp-span-star">*</span>
                          </Form.Label>
                          <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              validateField("email", e.target.value);
                            }}
                            placeholder="Enter Email"
                            className="temp-form-control-bg"
                          />
                          {errors.email && (
                            <small className="alert-txt">{errors.email}</small>
                          )}
                        </Form.Group>
                      </Col>
                      {/* Password */}
                      <Col lg={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            Password <span className="temp-span-star">*</span>
                          </Form.Label>
                          <InputGroup>
                            <Form.Control
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                                validateField("password", e.target.value);
                              }}
                              placeholder="Enter Password"
                              className="temp-form-control-bg"
                            />
                            <Button
                              variant="outline-secondary"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                          </InputGroup>
                          {errors.password && (
                            <small className="alert-txt">
                              {errors.password}
                            </small>
                          )}
                        </Form.Group>
                      </Col>

                      {/* General Error/Success Message */}
                      {message && (
                        <Col lg={12}>
                          <Alert
                            variant={
                              message.toLowerCase().includes("success")
                                ? "success"
                                : "danger"
                            }
                            dismissible
                            onClose={() => setMessage("")}
                            className="mt-2"
                          >
                            {message}
                          </Alert>
                        </Col>
                      )}

                      {/* Submit */}
                      <div className="d-grid gap-3 text-center mt-3">
                        <Row>
                          <Col lg={12}>
                            <Button
                              variant="danger"
                              type="submit"
                              disabled={loading}
                              className="temp-submit-btn"
                            >
                              {loading ? "Registering..." : "Register"}
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </>
                  )}
                </Row>
              </Col>

              {/* Right Image */}
              <Col lg={6} md={6} sm={12}>
                <img
                  src={Regimg}
                  className="img-fluid"
                  alt="User Registration"
                />
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
      <ModifyAlert
        message={alertMessage}
        show={showAlert}
        setShow={setShowAlert}
      />
    </div>
  );
}

export default DevoteeRegistration;
