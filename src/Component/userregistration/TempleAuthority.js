import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../assets/CSS/TempleAuthority.css";
import { FaCheckCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import UploadFile from "../../assets/images/upload-icon.png";
import LocationState from "./LocationState";
import { Globaleapi } from "../GlobleAuth/Globleapi";
import SendOtp from "../SendOtp/SendOtp";
import VerifyOtp from "../VerifyOtp/VerifyOtp";
import Regimg1 from "../../assets/images/temple-img.jpg";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import ModifyAlert from "../Alert/ModifyAlert";

function TempleAuthority() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fileErrors, setFileErrors] = useState({});
  const navigate = useNavigate();
  const [, setShow] = useState(false);
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [banks, setBanks] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [documentErrors, setDocumentErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    state: "s",
    country: "s",
    city: "s",
    zip_code: "",
    temple_name: "",
    password: "",
    // confirm_password: "",
    temple_type: "",
    temple_facility: "",
    temple_address: "",
    year_of_establishment: "",
    temple_events: "",
    temple_ownership_type: "",
    phone: "",
    email: "",
    trust_committee_type: "",
    trust_committee_details: "",
    additional_details: "",
    bank_name: "s",
    account_number: "",
    // confirm_account_number: "",
    account_type: "",
    account_name: "",
    ifsc_code: "",
    role:"temple",
  });

  const [documents, setDocuments] = useState({
    temple_image: null,
    land_doc: null,
    noc_doc: null,
    trust_cert: null,
  });

  // Create refs for file inputs
  const fileInputRefs = {
    temple_image: useRef(null),
    land_doc: useRef(null),
    noc_doc: useRef(null),
    trust_cert: useRef(null),
  };

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get(
          "https://brjobsedu.com/Nandagora/api2/Bankdetails/"
        );
        const bankOptions = response.data.map((bank) => ({
          value: bank.bank_name,
          label: bank.bank_name,
        }));
        setBanks(bankOptions);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };
    fetchBanks();
  }, []);

  // Full form validation
  const validateForm = () => {
    let errors = {};
    let docErrors = {};

    if (!formData.state) errors.state = "State is required";
    if (!formData.country) errors.country = "Country is required";
    if (!formData.city) errors.city = "City is required";

    // Zip Code
    if (!formData.zip_code) {
      errors.zip_code = "Pin code is required";
    } else if (!/^\d{6}$/.test(formData.zip_code)) {
      errors.zip_code = "Pin code must be 6 digits";
    }

    // Temple Name
    if (!formData.temple_name) {
      errors.temple_name = "Temple name is required";
    }
    if (!formData.temple_events) {
      errors.temple_events = "Temple Events is required";
    }
    if (!formData.trust_committee_details) {
      errors.trust_committee_details = "Trust Committee Details is required";
    }
    if (!formData.temple_type) {
      errors.temple_type = "Temple Type is required";
    }
    if (!formData.temple_facility) {
      errors.temple_facility = "Temple Facility is required";
    }
    if (!formData.account_name) {
      errors.account_name = "Account Name is required";
    }
    if (!formData.temple_ownership_type) {
      errors.temple_ownership_type = "Temple ownership type is required";
    }
    if (!formData.temple_address) {
      errors.temple_address = "Temple Address is required";
    }
    if (!formData.ifsc_code) {
      errors.ifsc_code = "IFSC Code is required";
    }
    if (!formData.account_type) {
      errors.account_type = "Account type is required";
    }
    if (!formData.bank_name) {
      errors.bank_name = "Bank name is required";
    }

    // Year of Establishment
    if (!formData.year_of_establishment) {
      errors.year_of_establishment = "Year of Establishment is required";
    } else if (
      isNaN(formData.year_of_establishment) ||
      formData.year_of_establishment < 1800 ||
      formData.year_of_establishment > new Date().getFullYear()
    ) {
      errors.year_of_establishment = "Please enter a valid year";
    }

    // Password (strong validation)
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData.password
      )
    ) {
      errors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character";
    }
    if (!formData.confirm_password) {
      errors.confirm_password = "Confirm Password is required";
    } else if (formData.password !== formData.confirm_password) {
      errors.confirm_password = "Passwords do not match";
    }

    // Phone Number
    if (!formData.phone) {
      errors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone must be exactly 10 digits";
    }

    // Temple Email
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    // Account Number
    if (!formData.account_number) {
      errors.account_number = "Account number is required";
    } else if (!/^\d{9,16}$/.test(formData.account_number)) {
      errors.account_number = "Account number must be between 9 and 16 digits";
    }
    if (!formData.confirm_account_number) {
      errors.confirm_account_number = "Confirm Account Number is required";
    } else if (formData.account_number !== formData.confirm_account_number) {
      errors.confirm_account_number = "Confirm Account Numbers do not match";
    }

    // Document validation
    if (!documents.temple_image)
      docErrors.temple_image = "Temple image is required";
    if (!documents.land_doc)
      docErrors.land_doc = "Land ownership document is required";
    if (!documents.noc_doc) docErrors.noc_doc = "NOC certificate is required";
    if (!documents.trust_cert)
      docErrors.trust_cert = "Trust registration certificate is required";

    setFormErrors(errors);
    setDocumentErrors(docErrors);

    return (
      Object.keys(errors).length === 0 && Object.keys(docErrors).length === 0
    );
  };

  // Single field validation (real-time)
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "temple_name":
        if (!value) {
          error = "Temple name is required";
        } else if (/^\s+$/.test(value)) {
          error = "Temple name cannot be just spaces";
        } else if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(value)) {
          error =
            "Temple name should only contain letters with a single space between words";
        }
        break;
      case "zip_code":
        if (!/^\d{6}$/.test(value)) error = "Pin Code must be 6 digits";
        break;
      case "password":
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          )
        ) {
          error =
            "Password must be at least 8 characters, include uppercase, lowercase, number, and special character";
        }
        break;
      case "confirm_password":
        if (value !== formData.password) error = "Passwords do not match";
        break;
      case "phone":
        if (!value) {
          error = "Mobile number is required";
        } else if (!/^\d{10}$/.test(value)) {
          error = "Mobile number must be exactly 10 digits";
        }
        break;
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Invalid email format";
        }
        break;
      case "account_number":
        if (!/^\d{9,16}$/.test(value)) {
          error = "Account number must be between 9 and 16 digits";
        }
        break;
      case "year_of_establishment":
        if (!value) {
          error = "Year of Establishment is required";
        } else if (
          isNaN(value) ||
          value < 1800 ||
          value > new Date().getFullYear()
        ) {
          error = "Please enter a valid year";
        }
        break;
      case "confirm_account_number":
        if (value !== formData.account_number)
          error = "Account numbers do not match";
        break;
      default:
        break;
    }
    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "phone") {
      newValue = newValue.replace(/\D/g, "");
      if (newValue.length > 10) newValue = newValue.slice(0, 10);
    }
    if (name === "account_number" || name === "confirm_account_number") {
      newValue = newValue.replace(/\D/g, "");
      if (newValue.length > 16) newValue = newValue.slice(0, 16);
    }
    if (name === "email") {
      newValue = newValue.trim();
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
    validateField(name, newValue);
  };

  // Updated file handler to work with both drag-drop and file input
  const handleFileChange = (e, field) => {
    let file;

    // Handle both file input and drag-drop events
    if (e.target && e.target.files) {
      file = e.target.files[0];
      // Reset the file input value to allow selecting the same file again
      if (fileInputRefs[field]?.current) {
        fileInputRefs[field].current.value = "";
      }
    } else if (e.dataTransfer && e.dataTransfer.files) {
      file = e.dataTransfer.files[0];
    }

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/pdf"];

    // Reset previous errors
    setFileErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    setDocumentErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    // Type check
    if (!allowedTypes.includes(file.type)) {
      setFileErrors((prev) => ({
        ...prev,
        [field]: "Only JPG, PNG, or PDF  files are allowed.",
      }));
      return;
    }

    // Size check (100KB)
    if (file.size > 2 * 1024 * 1024) {
      setFileErrors((prev) => ({
        ...prev,
        [field]: "File size must be less than or equal to 2MB.",
      }));
      return;
    }

    // If valid, save file
    setDocuments({
      ...documents,
      [field]: file,
    });
  };

  const removeFile = (field) => {
    setDocuments({
      ...documents,
      [field]: null,
    });

    setDocumentErrors((prev) => ({
      ...prev,
      [field]: `${field.replace("_", " ")} is required`,
    }));
  };

  const buildPayload = () => {
    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      payload.append(key, formData[key] || "");
    });
    if (documents.temple_image)
      payload.append("temple_image", documents.temple_image);
    if (documents.land_doc) payload.append("land_doc", documents.land_doc);
    if (documents.noc_doc) payload.append("noc_doc", documents.noc_doc);
    if (documents.trust_cert)
      payload.append("trust_cert", documents.trust_cert);
    return payload;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) {
    setAlertMessage("Please fix validation errors before submitting");
    setShowAlert(true);
    return;
  }

  setLoading(true);
  const payload = buildPayload();

  try {
    const registerResult = await Globaleapi(payload);
    if (registerResult?.data?.success || registerResult?.status === 201) {
      setAlertMessage("Temple Registered Successfully!");
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
        navigate("/Login");
      }, 2000);
    } else {
      setAlertMessage(
        "Registration failed: " +
          (registerResult?.data?.message || "Unknown error")
      );
      setShowAlert(true);
    }
  } catch (error) {
    if (error.response && error.response.data) {
      const errorData = error.response.data;

      if (
        errorData.error &&
        errorData.error.toLowerCase().includes("email")
      ) {
        setFormErrors((prev) => ({ ...prev, email: errorData.error }));
        document.getElementsByName("email")[0]?.focus();
      } else if (
        errorData.error &&
        errorData.error.toLowerCase().includes("phone")
      ) {
        setFormErrors((prev) => ({ ...prev, phone: errorData.error }));
        document.getElementsByName("phone")[0]?.focus();
      } else {
        setAlertMessage(
          "Error: " + (errorData.message || "Something went wrong")
        );
        setShowAlert(true);
      }
    } else {
      setAlertMessage("Error: " + error.message);
      setShowAlert(true);
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="temp-donate">
      <Container className="temp-container">
        <div>
          <div className="mt-3 temple-registration-heading ">
            <h1>Temple Registration</h1>
            <div>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Row>
                    {!otpSent && !otpVerified && (
                      <>
                        <Col lg={6} md={6} sm={12}>
                          <SendOtp
                            phone={phone}
                            setPhone={setPhone}
                            onOtpSent={() => {
                              setOtpSent(true);
                              setFormData((prev) => ({
                                ...prev,
                                phone: phone,
                              }));
                            }}
                          />
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                          <img
                            src={Regimg1}
                            className="img-fluid"
                            alt="User Registration"
                          />
                        </Col>
                      </>
                    )}
                    {otpSent && !otpVerified && (
                      <>
                        <Col lg={6} md={6} sm={12}>
                          <VerifyOtp
                            phone={phone}
                            onVerified={() => {
                              setOtpVerified(true);
                              setOtpSent(false);
                              setFormData((prev) => ({
                                ...prev,
                                phone: phone,
                              }));
                            }}
                          />
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                          <img
                            src={Regimg1}
                            className="img-fluid"
                            alt="User Registration"
                          />
                        </Col>
                      </>
                    )}
                  </Row>
                  {otpVerified && (
                    <>
                      <Row className="mt-4">
                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Temple Name{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="temple_name"
                              value={formData.temple_name}
                              onChange={handleChange}
                              placeholder="Temple Name"
                              className="temp-form-control"
                            />
                            {formErrors.temple_name && (
                              <p className="text-danger">
                                {formErrors.temple_name}
                              </p>
                            )}
                          </Form.Group>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="passwordField"
                          >
                            <Form.Label className="temp-label">
                              Password <span className="temp-span-star">*</span>
                            </Form.Label>
                            <div className="password-wrapper">
                              <Form.Control
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Your Password"
                                className="temp-form-control"
                              />
                              <span
                                className="toggle-eye"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                              </span>
                            </div>
                            {formErrors.password && (
                              <p className="text-danger">
                                {formErrors.password}
                              </p>
                            )}
                          </Form.Group>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="confirmPasswordField"
                          >
                            <Form.Label className="temp-label">
                              Confirm Password{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <div className="password-wrapper">
                              <Form.Control
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirm_password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                placeholder=" Your Confirm Password"
                                className="temp-form-control"
                              />
                              <span
                                className="toggle-eye"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                              >
                                {showConfirmPassword ? (
                                  <FaEyeSlash />
                                ) : (
                                  <FaEye />
                                )}
                              </span>
                            </div>
                            {formErrors.confirm_password && (
                              <p className="text-danger">
                                {formErrors.confirm_password}
                              </p>
                            )}
                          </Form.Group>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Temple Type{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Select
                              className="temp-form-control-option"
                              name="temple_type"
                              value={formData.temple_type}
                              onChange={handleChange}
                            >
                              <option value="">Select Temple</option>
                              <option value="shiv">Shiva Temple</option>
                              <option value="vishnu">Vishnu Temple</option>
                              <option value="durga">Durga Temple</option>
                              <option value="ganesh">Ganesh Temple</option>
                              <option value="hanuman">Hanuman Temple</option>
                              <option value="other">Other</option>
                            </Form.Select>
                            {formErrors.temple_type && (
                              <p className="text-danger">
                                {formErrors.temple_type}
                              </p>
                            )}
                          </Form.Group>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Temple Facility{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Select
                              className="temp-form-control-option"
                              name="temple_facility"
                              value={formData.temple_facility}
                              placeholder="Facility"
                              onChange={handleChange}
                            >
                              <option value="">Select Facility</option>
                              <option value="parking">Parking</option>
                              <option value="restrooms">Restrooms</option>
                              <option value="drinkingWater">
                                Drinking Water
                              </option>
                              <option value="prasadCounter">
                                Prasad Counter
                              </option>
                              <option value="accommodation">
                                {" "}
                                Accommodation{" "}
                              </option>
                              <option value="wheelchairAccess">
                                {" "}
                                Wheelchair Access{" "}
                              </option>
                            </Form.Select>
                            {formErrors.temple_facility && (
                              <p className="text-danger">
                                {formErrors.temple_facility}
                              </p>
                            )}
                          </Form.Group>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Temple Address{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              name="temple_address"
                              value={formData.temple_address}
                              onChange={handleChange}
                              rows={3}
                              placeholder="Address"
                              className="temp-form-control"
                            />
                            {formErrors.temple_address && (
                              <p className="text-danger">
                                {formErrors.temple_address}
                              </p>
                            )}
                          </Form.Group>
                        </Col>
                        <LocationState
                          formData={formData}
                          handleInputChange={handleInputChange}
                          formErrors={formErrors}
                        />
                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Pin Code <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Control
                              type="number"
                              name="zip_code"
                              value={formData.zip_code}
                              onChange={handleChange}
                              placeholder="Enter Pin Code"
                              className="temp-form-control"
                            />
                            {formErrors.zip_code && (
                              <p className="text-danger">
                                {formErrors.zip_code}
                              </p>
                            )}
                          </Form.Group>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="yearOfEstablishment"
                          >
                            <Form.Label className="temp-label">
                              Year of Establishment{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Enter year"
                              className="temp-form-control-option"
                              name="year_of_establishment"
                              value={formData.year_of_establishment}
                              onChange={handleChange}
                              min="1800"
                              max={new Date().getFullYear()}
                            />
                            {formErrors.year_of_establishment && (
                              <p className="text-danger">
                                {formErrors.year_of_establishment}
                              </p>
                            )}
                          </Form.Group>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Temple Events{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Select
                              className="temp-form-control-option"
                              name="temple_events"
                              value={formData.temple_events}
                              onChange={handleChange}
                            >
                              <option value="">Select Event</option>
                              <option value="dailyPuja">Daily Puja</option>
                              <option value="aarti">
                                {" "}
                                Morning/Evening Aarti{" "}
                              </option>
                              <option value="festivals">
                                {" "}
                                Festivals (Diwali, Navratri, etc.){" "}
                              </option>
                              <option value="specialPuja">Special Puja</option>
                              <option value="annadhanam">
                                {" "}
                                Annadhanam (Food Offering){" "}
                              </option>
                              <option value="yatra">
                                {" "}
                                Annual Yatra/Pilgrimage{" "}
                              </option>
                            </Form.Select>
                            {formErrors.temple_events && (
                              <p className="text-danger">
                                {formErrors.temple_events}
                              </p>
                            )}
                          </Form.Group>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Temple Ownership Type{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Select
                              className="temp-form-control-option"
                              name="temple_ownership_type"
                              value={formData.temple_ownership_type}
                              onChange={handleChange}
                            >
                              <option value="">Select Ownership Type</option>
                              <option value="government">
                                {" "}
                                Government Owned{" "}
                              </option>
                              <option value="trust">
                                {" "}
                                Trust / Committee Managed{" "}
                              </option>
                              <option value="private">Private Ownership</option>
                              <option value="community">
                                {" "}
                                Community Managed{" "}
                              </option>
                              <option value="other">Other</option>
                            </Form.Select>
                            {formErrors.temple_ownership_type && (
                              <p className="text-danger">
                                {formErrors.temple_ownership_type}
                              </p>
                            )}
                          </Form.Group>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Mobile Number{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              maxLength={10}
                              className="temp-form-control"
                              placeholder="Enter Mobile Number"
                              disabled={otpVerified}
                            />
                            {formErrors.phone && (
                              <p className="text-danger">{formErrors.phone}</p>
                            )}
                          </Form.Group>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Email <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              placeholder="Enter Email ID"
                              value={formData.email || ""}
                              onChange={handleChange}
                              onBlur={(e) =>
                                validateField("email", e.target.value)
                              }
                            />
                            {formErrors.email && (
                              <p className="text-danger">{formErrors.email}</p>
                            )}
                          </Form.Group>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Trust/Managing Committee Details{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Select
                              className="temp-form-control-option"
                              name="trust_committee_details"
                              value={formData.trust_committee_details}
                              onChange={handleChange}
                            >
                              <option value="">Select Details</option>
                              <option value="public">Public Trust</option>
                              <option value="private">Private Trust</option>
                              <option value="committee">
                                {" "}
                                Managing Committee{" "}
                              </option>
                            </Form.Select>
                            {formErrors.trust_committee_details && (
                              <p className="text-danger">
                                {formErrors.trust_committee_details}
                              </p>
                            )}
                          </Form.Group>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Trust Committee Type{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Select
                              className="temp-form-control-option"
                              name="trust_committee_type"
                              value={formData.trust_committee_type}
                              onChange={handleChange}
                            >
                              <option value="">Select Trust Committee</option>
                              <option value="mandal">Mandal</option>
                              <option value="samiti">Samiti</option>
                              <option value="trust">Trust</option>
                              <option value="society">Society</option>
                            </Form.Select>
                            {formErrors.trust_committee_type && (
                              <p className="text-danger">
                                {formErrors.trust_committee_type}
                              </p>
                            )}
                          </Form.Group>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Control
                              as="textarea"
                              name="trust_committee_details"
                              // onChange={handleChange}
                              rows={4}
                              placeholder="Enter Additional Details"
                              className="temp-form-control mt-regi-top"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <div className="mt-3 temple-registration-heading ">
                        <h1>Temple Account No</h1>
                      </div>
                      <Row>
                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Bank Name{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Select
                              className="temp-form-control-option"
                              name="bank_name"
                              value={formData.bank_name}
                              onChange={handleChange}
                            >
                              <option value="">Select Bank Name</option>
                              {banks.map((bank, index) => (
                                <option key={index} value={bank.value}>
                                  {bank.label}
                                </option>
                              ))}
                            </Form.Select>
                            {formErrors.bank_name && (
                              <p className="text-danger">
                                {formErrors.bank_name}
                              </p>
                            )}
                          </Form.Group>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Account Number{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Enter Account Number"
                              name="account_number"
                              value={formData.account_number}
                              onChange={handleChange}
                              maxLength={16}
                              className="temp-form-control"
                            />
                            {formErrors.account_number && (
                              <p className="text-danger">
                                {formErrors.account_number}
                              </p>
                            )}
                          </Form.Group>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Confirm Account Number{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Enter Confirm Account Number"
                              name="confirm_account_number"
                              value={formData.confirm_account_number}
                              onChange={handleChange}
                              className="temp-form-control"
                            />
                            {formErrors.confirm_account_number && (
                              <p className="text-danger">
                                {formErrors.confirm_account_number}
                              </p>
                            )}
                          </Form.Group>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Account Type{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Select
                              className="temp-form-control-option"
                              name="account_type"
                              value={formData.account_type}
                              onChange={handleChange}
                            >
                              <option value="">Select Account Type</option>
                              <option value="savings">Savings Account</option>
                              <option value="current">Current Account</option>
                            </Form.Select>
                            {formErrors.account_type && (
                              <p className="text-danger">
                                {formErrors.account_type}
                              </p>
                            )}
                          </Form.Group>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Account Name{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="account_name"
                              value={formData.account_name}
                              onChange={handleChange}
                              placeholder="Account Name "
                              className="temp-form-control"
                            />
                            {formErrors.account_name && (
                              <p className="text-danger">
                                {formErrors.account_name}
                              </p>
                            )}
                          </Form.Group>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              IFSC Code{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="ifsc_code"
                              value={formData.ifsc_code}
                              onChange={handleChange}
                              placeholder="IFSC Code"
                              className="temp-form-control"
                            />
                            {formErrors.ifsc_code && (
                              <p className="text-danger">
                                {formErrors.ifsc_code}
                              </p>
                            )}
                          </Form.Group>
                        </Col>
                      </Row>
                      <div className="temple-registration-heading">
                        <h1>Supporting Documents</h1>
                      </div>
                      <Row>
                        {[
                          { key: "temple_image", label: "Temple Image Upload" },
                          {
                            key: "land_doc",
                            label: "Land Ownership Documents",
                          },
                          { key: "noc_doc", label: "NOC Certificate" },
                          {
                            key: "trust_cert",
                            label: "Trust Registration Certificate",
                          },
                        ].map((doc) => (
                          <Col lg={6} md={12} sm={12} key={doc.key}>
                            <Row className="temp-stepform-box">
                              <Col lg={5} md={5} sm={5}>
                                <fieldset
                                  className="upload_dropZone text-center"
                                  onDragOver={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                  }}
                                  onDrop={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleFileChange(e, doc.key);
                                  }}
                                >
                                  <legend className="visually-hidden">
                                    {doc.label}
                                  </legend>
                                  <img src={UploadFile} alt="upload-file" />
                                  <p className="temp-drop-txt my-2">
                                    Drag &amp; drop files <br />
                                    <i>or</i>
                                  </p>
                                  <input
                                    ref={fileInputRefs[doc.key]}
                                    id={`${doc.key}_upload`}
                                    className="invisible"
                                    type="file"
                                    accept="image/jpeg, image/png, image/svg+xml"
                                    onChange={(e) =>
                                      handleFileChange(e, doc.key)
                                    }
                                  />
                                  <label
                                    className="btn temp-primary-btn mb-1"
                                    htmlFor={`${doc.key}_upload`}
                                  >
                                    Choose file(s)
                                  </label>
                                  <p className="temp-upload-file">
                                    Upload size up to 10KB to 2MB (jpg, png,
                                    jpeg)
                                  </p>
                                  {fileErrors[doc.key] && (
                                    <div className="file-error-style">
                                      {fileErrors[doc.key]}
                                    </div>
                                  )}
                              
                                </fieldset>
                              </Col>
                              <Col
                                lg={7}
                                md={7}
                                sm={7}
                                className="temp-doc-subinfo mt-2"
                              >
                                <h3>
                                  {doc.label}{" "}
                                  <span className="temp-span-star">*</span>
                                </h3>
                                {documents[doc.key] ? (
                                  <>
                                    <div className="d-flex temp-doc-info">
                                      <Col lg={3} md={3} sm={3}>
                                        {new Date().toLocaleDateString()}
                                      </Col>
                                      <Col
                                        lg={9}
                                        md={9}
                                        sm={9}
                                        className="px-4 temp-success-doc"
                                      >
                                        <FaCheckCircle />{" "}
                                        {documents[doc.key].name} Uploaded
                                      </Col>
                                    </div>
                                    <div
                                      className="col temp-delete-icon"
                                      onClick={() => removeFile(doc.key)}
                                    >
                                      <h3>
                                        <RiDeleteBin6Line className="mx-1" />
                                        Click here to Remove
                                      </h3>
                                    </div>
                                  </>
                                ) : (
                                  documentErrors[doc.key] && (
                                    <div className="text-danger mt-2">
                                      {documentErrors[doc.key]}
                                    </div>
                                  )
                                )}
                              </Col>
                            </Row>
                          </Col>
                        ))}
                      </Row>
                      <div className="gap-3 mt-3 Temp-btn-submit">
                                             <Button
                                               variant="temp-submit-btn"
                                               className="temp-submit-btn mx-3"
                                               type="submit"
                                               disabled={loading}
                                               onClick={handleSubmit}
                                             >
                                               {loading ? (
                                                 <>
                                                   <span
                                                     className="spinner-border spinner-border-sm me-2"
                                                     role="status"
                                                     aria-hidden="true"
                                                   ></span>
                                                   Submitting...
                                                 </>
                                               ) : (
                                                 "Register Now"
                                               )}
                                             </Button>
                                           </div>
                    </>
                  )}
                </Row>
              </Form>
            </div>
          </div>
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

export default TempleAuthority;
