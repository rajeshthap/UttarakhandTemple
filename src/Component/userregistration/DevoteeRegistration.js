import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form, InputGroup } from "react-bootstrap";
import axios from "axios";
import "../../assets/CSS/TempleAuthority.css";
import Regimg from "../../assets/images/User-regi-img.png";
import SendOtp from "../SendOtp/SendOtp";
import VerifyOtp from "../VerifyOtp/VerifyOtp";
import { FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ModifyAlert from "../Alert/ModifyAlert";
import UploadFile from "../../assets/images/upload-icon.png";
import { CheckPhoneApi, Globaleapi } from "../GlobleAuth/Globleapi";

function DevoteeRegistration() {
  const [phone, setPhone] = useState("");
  const [isOtpDisabled, setIsOtpDisabled] = useState(false);
  const [phoneChecked, setPhoneChecked] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  // Input states
  const [devoteeName, setDevoteeName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // File states
  const [dragging, setDragging] = useState(null);
  const [formDataFiles, setFormDataFiles] = useState({ devotee_photo: null });
  const [fileErrors, setFileErrors] = useState({});

  // Error states
  const [errors, setErrors] = useState({});

  // Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

  const checkPhoneExistence = async () => {
  if (!phone) {
    setMessage("Please enter a phone number");
    setIsOtpDisabled(true);
    setPhoneChecked(false);
    return true;
  }

  try {
    const formData = new FormData();
    formData.append("phone", phone);

    const response = await CheckPhoneApi(formData);

    const phoneList = response.data.phones || response.data;

    if (Array.isArray(phoneList) && phoneList.includes(phone)) {
      setMessage("Phone number already exists!");
      setIsOtpDisabled(true);
      setPhoneChecked(true);
      return true;
    } else {
      setMessage("");
      setIsOtpDisabled(false);
      setPhoneChecked(true);
      return false;
    }
  } catch (error) {
    console.error(error);
    setMessage("Error checking phone number");
    setIsOtpDisabled(true);
    setPhoneChecked(false);
    return true;
  }
};
useEffect(() => {
  // Push the current page into history so user can't go back
  window.history.pushState(null, "", window.location.href);

  const handlePopState = () => {

    window.history.pushState(null, "", window.location.href);
  };
  // Use lowercase 'popstate'
  window.addEventListener("popstate", handlePopState);

  return () => {
    window.removeEventListener("popstate", handlePopState);
  };
}, [navigate]);

  // Field validation
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
      case "confirmPassword":
        if (!value.trim()) error = "Confirm Password is required";
        else if (value !== password) error = "Passwords do not match";
        break;
      default:
        break;
    }
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (error) newErrors[name] = error;
      else delete newErrors[name];
      if (Object.keys(newErrors).length === 0 && phone) setMessage("");
      return newErrors;
    });
  };

  // Full validation
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
    if (!confirmPassword.trim())
      newErrors.confirmPassword = "Confirm Password is required";
    else if (confirmPassword !== password)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  // File input change
  const handleInputChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];

      // Validate size
      if (file.size < 10 * 1024 || file.size > 2 * 1024 * 1024) {
        setFileErrors((prev) => ({
          ...prev,
          [name]: "File size must be between 10KB and 2MB",
        }));
        return;
      } else {
        setFileErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }

      setFormDataFiles((prev) => ({
        ...prev,
        [name]: file,
      }));
    }
  };

  // Form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    const newErrors = validateAll();
    setErrors(newErrors);

    // Validate photo
    if (!formDataFiles.devotee_photo) {
      setFileErrors((prev) => ({
        ...prev,
        devotee_photo: "User photo is required",
      }));
      setMessage("Please fix the errors above");
      return;
    } else {
      setFileErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.devotee_photo;
        return newErrors;
      });
    }

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
    formData.append("devotee_photo", formDataFiles.devotee_photo);
    formData.append("role", "user");

    try {
      const res = await Globaleapi(formData);

      // Reset all
      setDevoteeName("");
      setGender("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFormDataFiles({ devotee_photo: null });
      setErrors({});
      setFileErrors({});
      setMessage("");
      setAlertMessage("User Registered Successfully!");
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
        navigate("/Login");
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
        <ModifyAlert
          message={message}
          show={!!message}
          setShow={() => setMessage("")}
        />
        <div className="temple-registration-heading">
          <h1>User Registration</h1>
          <Form onSubmit={handleRegister}>
            <Row>
              <Col lg={6} md={6}>
                <Row>
                  {!otpSent && !otpVerified && (
                    <SendOtp
                      phone={phone}
                      setPhone={setPhone}
                      onOtpSent={() => setOtpSent(true)}
                      disabled={
                        !phoneChecked || isOtpDisabled || phone.length !== 10
                      }
                    />
                  )}

                  {otpSent && !otpVerified && (
                    <Col lg={12}>
                      <VerifyOtp
                        phone={phone}
                        onVerified={() => {
                          setOtpVerified(true);
                          setOtpSent(false);
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
                            disabled
                            
                            placeholder="Enter Mobile Number"
                          />
                        </Form.Group>
                      </Col>

                      {/* Devotee Name */}
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

                      {/* Confirm Password */}
                      <Col lg={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            Confirm Password{" "}
                            <span className="temp-span-star">*</span>
                          </Form.Label>
                          <InputGroup>
                            <Form.Control
                              type={showConfirmPassword ? "text" : "password"}
                              value={confirmPassword}
                              onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                validateField(
                                  "confirmPassword",
                                  e.target.value
                                );
                              }}
                              placeholder="Re-enter Password"
                              className="temp-form-control-bg"
                            />
                            <Button
                              variant="outline-secondary"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                          </InputGroup>
                          {errors.confirmPassword && (
                            <small className="alert-txt">
                              {errors.confirmPassword}
                            </small>
                          )}
                        </Form.Group>
                      </Col>

                      {/* User Photo Upload */}
                      <Col lg={12}>
                        <Row className="temp-stepform-box">
                          <Col lg={8} md={8} sm={12}>
                            <fieldset
                              className={`upload_dropZone text-center ${
                                dragging === "devotee_photo" ? "drag-over" : ""
                              }`}
                              onDragOver={(e) => {
                                e.preventDefault();
                                setDragging("devotee_photo");
                              }}
                              onDragLeave={() => setDragging(null)}
                              onDrop={(e) => {
                                e.preventDefault();
                                setDragging(null);
                                const file = e.dataTransfer.files[0];
                                if (file) {
                                  handleInputChange({
                                    target: {
                                      name: "devotee_photo",
                                      files: [file],
                                    },
                                  });
                                }
                              }}
                            >
                              <legend className="visually-hidden">
                                Upload Photo
                              </legend>
                              <img src={UploadFile} alt="upload-file" />
                              <p className="temp-drop-txt my-2">
                                Drag & drop photo <br /> <i>or</i>
                              </p>
                              <input
                                id="devotee_photo"
                                name="devotee_photo"
                                type="file"
                                accept="image/*"
                                className="invisible"
                                onChange={handleInputChange}
                              />
                              <label
                                className="btn temp-primary-btn mb-1"
                                htmlFor="devotee_photo"
                              >
                                Choose file
                              </label>
                              <p className="temp-upload-file">
                                Upload size 10KB-2MB (jpg, png, jpeg)
                              </p>
                            </fieldset>
                            {fileErrors.devotee_photo && (
                              <div className="alert-txt text-center">
                                {fileErrors.devotee_photo}
                              </div>
                            )}
                          </Col>

                          <Col
                            lg={4}
                            md={4}
                            sm={12}
                            className="temp-doc-subinfo mt-2"
                          >
                            <h3>
                              User Photo{" "}
                              <span className="temp-span-star">*</span>
                            </h3>
                            {formDataFiles.devotee_photo && (
                              <>
                                <div className="d-flex temp-doc-info">
                                  <Col lg={3}>
                                    {new Date().toLocaleDateString()}
                                  </Col>
                                  <Col lg={9} className="px-4 temp-success-doc">
                                    <FaCheckCircle /> Uploaded Successfully
                                  </Col>
                                </div>
                                <div
                                  className="col temp-delete-icon"
                                  onClick={() => {
                                    setFormDataFiles({ devotee_photo: null });
                                    setFileErrors((prev) => ({
                                      ...prev,
                                      devotee_photo: "User photo is required",
                                    }));
                                  }}
                                >
                                  <h3>
                                    <RiDeleteBin6Line className="mx-1" /> Click
                                    here to Remove
                                  </h3>
                                </div>
                              </>
                            )}
                          </Col>
                        </Row>
                      </Col>

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
                              {loading ? "Registering..." : "Register Now"}
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
