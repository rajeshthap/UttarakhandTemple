import React, { useState } from "react";
import { Button, Col, Container, Row, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../assets/CSS/TempleAuthority.css";
import { FaCheckCircle } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import UploadFile from "../../assets/images/upload-icon.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SendOtp from "../SendOtp/SendOtp";
import VerifyOtp from "../VerifyOtp/VerifyOtp";
import LocationState from "../userregistration/LocationState";
import Regimg1 from "../../assets/images/pandit-img.png";
import Select from "react-select";

function PanditRegistration() {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    father_name: "",
    email: "",
    password: "",
    phone: "",
    aadhar_number: "",
    permanent_address: "",
    country: "",
    state: "",
    city: "",
    zipcode: "",
    pandit_role: "",
    temple_association: "",
    temple_image: "",
    aadhar_document: "",
  });

  const roleOptions = [
    { value: "pooja", label: "पूजा विशेषज्ञ" },
    { value: "vedic_chanting", label: "वैदिक मंत्रोच्चार" },
    { value: "astrology", label: "ज्योतिष" },
    { value: "wedding", label: "विवाह संस्कार" },
    { value: "funeral", label: "अंत्येष्टि संस्कार" },
    { value: "festival", label: "त्योहार आयोजन" },
    { value: "temple_priest", label: "मंदिर पुजारी" },
    { value: "home_pooja", label: "गृह पूजा" },
    { value: "yagya", label: "यज्ञ विशेषज्ञ" },
    { value: "other", label: "अन्य" },
  ];

  const [preview, setPreview] = useState({
    temple_image: null,
    aadhar_document: null,
  });

  const [errorReason_querys, setErrorReason_querys] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors] = useState({});

  const navigate = useNavigate();

  const handleInputChangeCity = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value); // live validation on custom handler
  };

  // Validate individual fields
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "first_name":
        if (!value) error = "First name is required";
        else if (!/^[A-Z][a-zA-Z]*$/.test(value))
          error =
            "First name must start with a capital letter and contain only alphabets";
        break;

      case "last_name":
        if (!value) error = "Last name is required";
        else if (!/^[A-Z][a-zA-Z]*$/.test(value))
          error =
            "Last name must start with a capital letter and contain only alphabets";
        break;

      case "father_name":
        if (!value) {
          error = "Father's name is required";
        } else if (!/^([A-Z][a-z]+)(\s[A-Z][a-z]+)*$/.test(value)) {
          error =
            "Each word in father's name must start with a capital letter and contain only alphabets";
        }
        break;

      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Invalid email format";
        }
        break;

      case "phone":
        if (!value) {
          error = "Mobile number is required";
        } else if (!/^\d{10}$/.test(value)) {
          error = "Mobile number must be exactly 10 digits";
        }
        break;

      case "aadhar_number":
        if (!value) {
          error = "Aadhar number is required";
        } else if (!/^\d{12}$/.test(value)) {
          error = "Aadhar number must be exactly 12 digits";
        }
        break;

      case "password":
        if (!value) {
          error = "Password is required";
        } else if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          )
        ) {
          error =
            "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
        }
        break;

      case "confirmPassword":
        if (value !== formData.password) {
          error = "Passwords do not match";
        }
        break;

      default:
        break;
    }

    setErrorReason_querys((prev) => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files.length > 0) {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      setPreview({ ...preview, [name]: URL.createObjectURL(file) });
      validateField(name, file);
    } else {
      let newValue = value;

      // First Name & Last Name: No spaces + capitalize first letter
      if (name === "first_name" || name === "last_name") {
        newValue = newValue.replace(/\s/g, "");
        if (newValue.length > 0) {
          newValue =
            newValue.charAt(0).toUpperCase() + newValue.slice(1).toLowerCase();
        }
      }

      if (name === "father_name") {
        newValue = newValue
          .split(" ")
          .map((word) =>
            word
              ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              : ""
          )
          .join(" ");
      }

      // Phone: only digits, max 10
      if (name === "phone") {
        newValue = newValue.replace(/\D/g, "");
        if (newValue.length > 10) newValue = newValue.slice(0, 10);
      }

      // Aadhaar: only digits, max 12
      if (name === "aadhar_number") {
        newValue = newValue.replace(/\D/g, "");
        if (newValue.length > 12) newValue = newValue.slice(0, 12);
      }

      setFormData({ ...formData, [name]: newValue });
      validateField(name, newValue);
    }
  };

  const validateForm = () => {
    let errors = {};

    //  First Name
    if (!formData.first_name) {
      errors.first_name = "First name is required";
    } else if (!/^[A-Z][a-zA-Z]*$/.test(formData.first_name)) {
      errors.first_name =
        "First name must start with a capital letter and contain only alphabets";
    }

    //  Last Name
    if (!formData.last_name) {
      errors.last_name = "Last name is required";
    } else if (!/^[A-Z][a-zA-Z]*$/.test(formData.last_name)) {
      errors.last_name =
        "Last name must start with a capital letter and contain only alphabets";
    }

    //  Email validation
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    //  Mobile number (10 digits only)
    if (!formData.phone) {
      errors.phone = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Mobile number must be exactly 10 digits";
    }

    //  Aadhaar (12 digits only)
    if (!formData.aadhar_number) {
      errors.aadhar_number = "Aadhar number is required";
    } else if (!/^\d{12}$/.test(formData.aadhar_number)) {
      errors.aadhar_number = "Aadhar number must be exactly 12 digits";
    }

    //  Password strength
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData.password
      )
    ) {
      errors.password =
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
    }

    //  Confirm Password
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    //  Address validations
    if (!formData.permanent_address)
      errors.permanent_address = "Address is required";
    if (!formData.country) errors.country = "Country is required";
    if (!formData.state) errors.state = "State is required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.zipcode) errors.zipcode = "Zip code is required";
    if (!formData.temple_association)
      errors.temple_association = "Temple association is required";

    //  File validations
    if (!formData.temple_image)
      errors.temple_image = "Pandit image is required";
    if (!formData.aadhar_document)
      errors.aadhar_document = "Aadhar document is required";

    setErrorReason_querys(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const formDataToSend = new FormData();

      for (let key in formData) {
        if (key === "pandit_role" && formData[key].length > 0) {
          formData[key].forEach((role) =>
            formDataToSend.append("pandit_role", role)
          );
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }
      const res = await axios.post(
        "https://brjobsedu.com/Temple_portal/api/pandit/",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Login Response:", res.data);
      navigate("/PanditLogin");
      console.log("Form submitted successfully:", res.data);

      // redirect to login or dashboard page

      console.log("API Response:", res.data);
      if (res.data.success === true || res.data.success === "true") {
        setFormData({
          first_name: "",
          last_name: "",
          father_name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          aadhar_number: "",
          permanent_address: "",
          country: "",
          state: "",
          city: "",
          zipcode: "",
          temple_association: "",
          temple_image: "",
          aadhar_document: "",
          pandit_role: [],
        });
      } else {
        alert(res.data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);

      if (err.response && err.response.data) {
        const errorData = err.response.data;

        if (errorData.error?.toLowerCase().includes("email")) {
          setErrorReason_querys((prev) => ({
            ...prev,
            email: errorData.error,
          }));
          document.getElementsByName("email")[0]?.focus();
        } else if (errorData.error?.toLowerCase().includes("phone")) {
          setErrorReason_querys((prev) => ({
            ...prev,
            phone: errorData.error,
          }));
          document.getElementsByName("phone")[0]?.focus();
        } else if (errorData.error?.toLowerCase().includes("aadhar")) {
          setErrorReason_querys((prev) => ({
            ...prev,
            aadhar_number: errorData.error,
          }));
          document.getElementsByName("aadhar_number")[0]?.focus();
        } else {
          alert(errorData.message || "Something went wrong");
        }
      } else {
        alert(err.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container className="temp-container">
        <div>
          <div className=" temple-registration-heading  ">
            <h1>Pandit Registration</h1>
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
                            onOtpSent={() => setOtpSent(true)}
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
                              First Name{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter First Name"
                              className="temp-form-control"
                              name="first_name"
                              value={formData.first_name}
                              onChange={handleInputChange}
                            />
                            {errorReason_querys.first_name && (
                              <div className="alert-txt">
                                {errorReason_querys.first_name}
                              </div>
                            )}
                          </Form.Group>
                        </Col>

                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Last Name{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Last Name"
                              className="temp-form-control"
                              name="last_name"
                              value={formData.last_name}
                              onChange={handleInputChange}
                            />
                            {errorReason_querys.last_name && (
                              <div className="alert-txt">
                                {errorReason_querys.last_name}
                              </div>
                            )}
                          </Form.Group>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Father's Name{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Father Name"
                              className="temp-form-control"
                              name="father_name"
                              value={formData.father_name}
                              onChange={handleInputChange}
                            />
                            {errorReason_querys.father_name && (
                              <div className="alert-txt">
                                {errorReason_querys.father_name}
                              </div>
                            )}
                          </Form.Group>
                        </Col>

                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Email ID <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Enter Email ID"
                              className="temp-form-control"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                            {errorReason_querys.email && (
                              <div className="alert-txt">
                                {errorReason_querys.email}
                              </div>
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
                              placeholder="Enter Mobile Number"
                              className="temp-form-control"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                            {errorReason_querys.phone && (
                              <div className="alert-txt">
                                {errorReason_querys.phone}
                              </div>
                            )}
                          </Form.Group>
                        </Col>

                        <Col md={4} lg={4} sm={12}>
                          <Form.Group className="mb-3">
                            <Form.Label>
                              Password <span className="temp-span-star"> *</span>
                            </Form.Label>
                            <InputGroup>
                              <Form.Control
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Your Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="temp-form-control"
                              />
                              <InputGroup.Text
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ cursor: "pointer" }}
                              >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                              </InputGroup.Text>
                            </InputGroup>
                            {errorReason_querys.password && (
                              <div className="alert-txt">
                                {errorReason_querys.password}
                              </div>
                            )}
                          </Form.Group>
                        </Col>

                        <Col md={4} lg={4} sm={12}>
                          <Form.Group className="mb-3">
                            <Form.Label>
                              Confirm Password
                              <span className="temp-span-star"> *</span>
                            </Form.Label>
                            <InputGroup>
                              <Form.Control
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm Your Password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="temp-form-control"
                              />
                              <InputGroup.Text
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                style={{ cursor: "pointer" }}
                              >
                                {showConfirmPassword ? (
                                  <FaEyeSlash />
                                ) : (
                                  <FaEye />
                                )}
                              </InputGroup.Text>
                            </InputGroup>
                            {errorReason_querys.confirmPassword && (
                              <div className="alert-txt">
                                {errorReason_querys.confirmPassword}
                              </div>
                            )}
                          </Form.Group>
                        </Col>

                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Aadhar Number (for ID verification){" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Aadhar Number"
                              className="temp-form-control"
                              name="aadhar_number"
                              value={formData.aadhar_number}
                              onChange={handleInputChange}
                            />
                            {errorReason_querys.aadhar_number && (
                              <div className="alert-txt">
                                {errorReason_querys.aadhar_number}
                              </div>
                            )}
                          </Form.Group>
                        </Col>

                        <Col lg={4} md={4} sm={12}>
                          <Form.Group className="mb-3">
                            <Form.Label className="temp-label">
                              Pandit Role
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Select
                              isMulti
                              options={roleOptions}
                              placeholder="Select Role"
                              closeMenuOnSelect={false}
                              className="temp-form-control-input"
                              value={roleOptions.filter((option) =>
                                formData.pandit_role?.includes(option.value)
                              )}
                              onChange={(selected) => {
                                const values = selected
                                  ? selected.map((opt) => opt.value)
                                  : [];
                                setFormData((prev) => ({
                                  ...prev,
                                  pandit_role: values,
                                }));
                              }}
                              styles={{
                                valueContainer: (provided) => ({
                                  ...provided,
                                  maxHeight: "38px",
                                  overflowY: "auto",
                                }),
                              }}
                            />
                            {errorReason_querys.pandit_role && (
                              <div className="alert-txt">
                                {errorReason_querys.pandit_role}
                              </div>
                            )}
                          </Form.Group>
                        </Col>

                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Permanent Address{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Address"
                              className="temp-form-control"
                              name="permanent_address"
                              value={formData.permanent_address}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>

                        <LocationState
                          formData={formData}
                          handleInputChange={handleInputChangeCity}
                          formErrors={formErrors}
                        />

                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              ZipCode <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="ZIP Code"
                              className="temp-form-control"
                              name="zipcode"
                              value={formData.zipcode}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>

                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Temple Association{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Select
                              className="temp-form-control-option"
                              placeholder="Enter Temple Association"
                              name="temple_association"
                              value={formData.temple_association}
                              onChange={handleInputChange}
                            >
                              <option value="Select a option">
                                Select a Temple Association
                              </option>
                              <option value="option1">
                                Local Temple Association
                              </option>
                              <option value="option2">
                                State Temple Association
                              </option>
                              <option value="option3">
                                National Temple Association
                              </option>
                              <option value="option3">Independent</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <div className="temple-registration-heading">
                        <h1>Supporting Documents</h1>
                      </div>

                      <Row>
                        {/* Pandit Image Upload */}
                        <Col lg={6} md={12} sm={12}>
                          <Row className="temp-stepform-box">
                            <Col lg={5} md={5} sm={5}>
                              <fieldset
                                className={`upload_dropZone text-center ${
                                  dragging === "pandit_image" ? "drag-over" : ""
                                }`}
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  setDragging("pandit_image");
                                }}
                                onDragLeave={() => setDragging(null)}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  setDragging(null);
                                  const file = e.dataTransfer.files[0];
                                  if (file) {
                                    handleInputChange({
                                      target: {
                                        name: "pandit_image",
                                        files: [file],
                                        type: "file",
                                      },
                                    });
                                  }
                                }}
                              >
                                <legend className="visually-hidden">
                                  Pandit Image Upload
                                </legend>
                                <img src={UploadFile} alt="upload-file" />

                                <p className="temp-drop-txt my-2">
                                  Drag &amp; drop files
                                  <br />
                                  <i>or</i>
                                </p>

                                <input
                                  id="pandit_image"
                                  name="pandit_image"
                                  type="file"
                                  accept="image/jpeg, image/png"
                                  className="invisible"
                                  onChange={handleInputChange}
                                />
                                <label
                                  className="btn temp-primary-btn mb-1"
                                  htmlFor="pandit_image"
                                >
                                  Choose file
                                </label>
                                <p className="temp-upload-file">
                                  Upload size up to 100KB (jpg, png)
                                </p>
                              </fieldset>
                            </Col>

                            <Col
                              lg={7}
                              md={7}
                              sm={7}
                              className="temp-doc-subinfo mt-2"
                            >
                              <h3>
                                Pandit Image Upload{" "}
                                <span className="temp-span-star">*</span>
                              </h3>
                              {formData.pandit_image && (
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
                                      <FaCheckCircle /> Uploaded Successfully
                                    </Col>
                                  </div>
                                  <div
                                    className="col temp-delete-icon"
                                    onClick={() =>
                                      setFormData({
                                        ...formData,
                                        pandit_image: "",
                                      })
                                    }
                                  >
                                    <h3>
                                      <RiDeleteBin6Line className="mx-1" />
                                      Click here to Remove
                                    </h3>
                                  </div>
                                </>
                              )}
                            </Col>
                          </Row>
                        </Col>
                        {/* Aadhaar Card Upload */}
                        <Col lg={6} md={12} sm={12}>
                          <Row className="temp-stepform-box">
                            <Col lg={5} md={5} sm={5}>
                              <fieldset
                                className={`upload_dropZone text-center ${
                                  dragging === "aadhar_document"
                                    ? "drag-over"
                                    : ""
                                }`}
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  setDragging("aadhar_document");
                                }}
                                onDragLeave={() => setDragging(null)}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  setDragging(null);
                                  const file = e.dataTransfer.files[0];
                                  if (file) {
                                    handleInputChange({
                                      target: {
                                        name: "aadhar_document",
                                        files: [file],
                                        type: "file",
                                      },
                                    });
                                  }
                                }}
                              >
                                <legend className="visually-hidden">
                                  Aadhar Card Upload
                                </legend>
                                <img src={UploadFile} alt="upload-file" />

                                <p className="temp-drop-txt my-2">
                                  Drag &amp; drop files
                                  <br />
                                  <i>or</i>
                                </p>

                                <input
                                  id="aadhar_document"
                                  name="aadhar_document"
                                  type="file"
                                  accept="image/jpeg, image/png, application/pdf"
                                  className="invisible"
                                  onChange={handleInputChange}
                                />
                                <label
                                  className="btn temp-primary-btn mb-1"
                                  htmlFor="aadhar_document"
                                >
                                  Choose file
                                </label>
                                <p className="temp-upload-file">
                                  Upload size up to 200KB (jpg, png, pdf)
                                </p>
                              </fieldset>
                            </Col>

                            <Col
                              lg={7}
                              md={7}
                              sm={7}
                              className="temp-doc-subinfo mt-2"
                            >
                              <h3>
                                Aadhar Card Documents{" "}
                                <span className="temp-span-star">*</span>
                              </h3>
                              {formData.aadhar_document && (
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
                                      <FaCheckCircle /> Uploaded Successfully
                                    </Col>
                                  </div>
                                  <div
                                    className="col temp-delete-icon"
                                    onClick={() =>
                                      setFormData({
                                        ...formData,
                                        aadhar_document: "",
                                      })
                                    }
                                  >
                                    <h3>
                                      <RiDeleteBin6Line className="mx-1" />
                                      Click here to Remove
                                    </h3>
                                  </div>
                                </>
                              )}
                            </Col>
                          </Row>
                        </Col>
                                  
                      </Row>

                      <div className="gap-3 mt-3 Temp-btn-submit">
                        <Button
                          variant="temp-submit-btn"
                          className="temp-submit-btn mx-3"
                          type="submit"
                          disabled={loading}
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
    </div>
  );
}

export default PanditRegistration;
