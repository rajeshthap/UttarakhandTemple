import React, { useState } from "react";
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

function TempleAuthority() {
  const [show, setShow] = useState(false);
   const [phone, setPhone] = useState(""); 
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    state: "",
    country: "",
    city: "",
    zip_code: "",
    temple_name: "",
    password: "",
    confirm_password: "",
    temple_type: "",
    temple_facility: "",
    temple_address: "",
    year_of_establishment: "",
    temple_events: "",
    temple_ownership_type: "",
    phone: "",
    temple_email: "",
    trust_committee_type: "",
    trust_committee_details: "",
    additional_details: "",
    bank_name: "",
    account_number: "",
    confirm_account_number: "",
    account_type: "",
    account_name: "",
    ifsc_code: "",
  });

  const [documents, setDocuments] = useState({
    temple_image: null,
    land_doc: null,
    noc_doc: null,
    trust_cert: null,
  });

  const validateForm = () => {
    let errors = {};

    if (!formData.state) errors.state = "State is required";
    if (!formData.country) errors.country = "Country is required";
    if (!formData.city) errors.city = "City is required";

    if (!formData.zip_code) {
      errors.zip_code = "Zip code is required";
    } else if (!/^\d{6}$/.test(formData.zip_code)) {
      errors.zip_code = "Zip code must be 6 digits";
    }

    if (!formData.temple_name) errors.temple_name = "Temple name is required";

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirm_password) {
      errors.confirm_password = "Confirm Password is required";
    } else if (formData.password !== formData.confirm_password) {
      errors.confirm_password = "Passwords do not match";
    }

    if (!formData.phone) {
      errors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone must be 10 digits";
    }

    if (!formData.temple_email) {
      errors.temple_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.temple_email)) {
      errors.temple_email = "Invalid email format";
    }

    if (!formData.account_number) {
      errors.account_number = "Account number is required";
    }
    if (formData.account_number !== formData.confirm_account_number) {
      errors.confirm_account_number = "Account numbers do not match";
    }

    if (!formData.ifsc_code) {
      errors.ifsc_code = "IFSC Code is required";
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc_code)) {
      errors.ifsc_code = "Invalid IFSC code";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; 
  };

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
        if (!/^\d{6}$/.test(value)) error = "Zip code must be 6 digits";
        break;

      case "password":
        if (value.length < 6) error = "Password must be at least 6 characters";
        break;

      case "confirm_password":
        if (value !== formData.password) error = "Passwords do not match";
        break;

      case "phone":
        if (!/^\d{10}$/.test(value)) error = "Phone must be 10 digits";
        break;

      case "temple_email":
        if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid email format";
        break;

      case "ifsc_code":
        if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) error = "Invalid IFSC code";
        break;

      case "confirm_account_number":
        if (value !== formData.account_number)
          error = "Account numbers do not match";
        break;

      default:
        break;
    }

    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value); // live validation on custom handler
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value); // live validation on normal handler
  };
  const handleFileChange = (e, field) => {
    setDocuments({ ...documents, [field]: e.target.files[0] });
  };

  const removeFile = (field) => {
    setDocuments({ ...documents, [field]: null });
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
      alert("Please fix validation errors before submitting");
      return;
    }

    const payload = buildPayload();

    try {
      const registerResult = await Globaleapi(payload);
      console.log("Registration Response:", registerResult.data);
      alert("Temple registered ");
      setShow(true);
    } catch (err) {
      alert("Registration or OTP sending failed! Please try again.");
    }
  };

  return (
    <div>
      <Container className="temp-container">
        <div>
          <div className="mt-3 temple-registration-heading ">
            <h1>Temple Registration</h1>
            <div>
              <Form Form onSubmit={handleSubmit}>
                <Row>
                   {!otpSent && !otpVerified && (
                  <Col lg={12} md={12} sm={12}>
                    <SendOtp
                      phone={phone}
                      setPhone={setPhone}
                      onOtpSent={() => setOtpSent(true)}
                    />
                  </Col>
                )}

                {otpSent && !otpVerified && (
                  <Col lg={12} md={12} sm={12}>
                    <VerifyOtp
                      phone={phone}
                      onVerified={() => {
                        setOtpVerified(true);
                        setOtpSent(false);
                      }}
                    />
                  </Col>
                )}
                 {otpVerified && (
                  <>
                <Row className="mt-4">
                 
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Temple Name <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="temple_name"
                        value={formData.temple_name}
                        onChange={handleChange}
                        placeholder="Temple Name"
                      />
                      {formErrors.temple_name && (
                        <p className="text-danger">{formErrors.temple_name}</p>
                      )}
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Password <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder=""
                        className="temp-form-control"
                      />
                       {formErrors.password && (
                        <p className="text-danger">{formErrors.password}</p>
                      )}
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Confirm Password{" "}
                        <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        placeholder=""
                        className="temp-form-control"
                      />
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
                        Temple Type <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Select
                        className="temp-form-control-option"
                        name="temple_type"
                        value={formData.temple_type}
                        onChange={handleChange}
                      >
                        <option value="">Select Temple Type</option>
                        <option value="shiv">Shiv Temple</option>
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
                        onChange={handleChange}
                      >
                        <option value="">Select Facility</option>
                        <option value="parking">Parking</option>
                        <option value="restrooms">Restrooms</option>
                        <option value="drinkingWater">Drinking Water</option>
                        <option value="prasadCounter">Prasad Counter</option>
                        <option value="accommodation">Accommodation</option>
                        <option value="wheelchairAccess">
                          Wheelchair Access
                        </option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Temple Address <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        name="temple_address"
                        value={formData.temple_address}
                        onChange={handleChange}
                        rows={3}
                        placeholder=""
                        className="temp-form-control"
                      />
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
                        ZipCode <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="zip_code"
                        value={formData.zip_code}
                        onChange={handleChange}
                        placeholder=""
                        className="temp-form-control"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Year of Establishment{" "}
                        <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Select
                        className="temp-form-control-option"
                        name="year_of_establishment"
                        value={formData.year_of_establishment}
                        onChange={handleChange}
                      >
                        <option value="Select an option">
                          Select an Establishment
                        </option>
                        <option value="">Select Year</option>
                        <option value="2035">2035</option>
                        <option value="2034">2034</option>
                        <option value="2033">2033</option>
                        <option value="2032">2032</option>
                        <option value="2031">2031</option>
                        <option value="2030">2030</option>
                        <option value="2029">2029</option>
                        <option value="2028">2028</option>
                        <option value="2027">2027</option>
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                        <option value="2015">2015</option>
                        <option value="2014">2014</option>
                        <option value="2013">2013</option>
                        <option value="2012">2012</option>
                        <option value="2011">2011</option>
                        <option value="2010">2010</option>
                        <option value="2009">2009</option>
                        <option value="2008">2008</option>
                        <option value="2007">2007</option>
                        <option value="2006">2006</option>
                        <option value="2005">2005</option>
                        <option value="2004">2004</option>
                        <option value="2003">2003</option>
                        <option value="2002">2002</option>
                        <option value="2001">2001</option>
                        <option value="2000">2000</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Temple Events <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Select
                        className="temp-form-control-option"
                        name="temple_events"
                        value={formData.temple_events}
                        onChange={handleChange}
                      >
                        <option value="">Select Event</option>
                        <option value="dailyPuja">Daily Puja</option>
                        <option value="aarti">Morning/Evening Aarti</option>
                        <option value="festivals">
                          Festivals (Diwali, Navratri, etc.)
                        </option>
                        <option value="specialPuja">Special Puja</option>
                        <option value="annadhanam">
                          Annadhanam (Food Offering)
                        </option>
                        <option value="yatra">Annual Yatra/Pilgrimage</option>
                      </Form.Select>
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
                        <option value="government">Government Owned</option>
                        <option value="trust">Trust / Committee Managed</option>
                        <option value="private">Private Ownership</option>
                        <option value="community">Community Managed</option>
                        <option value="other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        phone Number <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder=""
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="temp-form-control"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        temple_email ID{" "}
                        <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="temple_email"
                        name="temple_email"
                        value={formData.temple_email || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            temple_email: e.target.value,
                          })
                        }
                      />
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
                        <option value="public">Public Trust</option>
                        <option value="private">Private Trust</option>
                        <option value="committee">Managing Committee</option>
                      </Form.Select>
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
                        value={formData.trust_committee_details}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Enter additional details"
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
                        Bank Name <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Select
                        className="temp-form-control-option"
                        name="bank_name"
                        value={formData.bank_name}
                        onChange={handleChange}
                      >
                        <option value="Select an option">
                          Select an Bank Name
                        </option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Account Number <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder=""
                        name="account_number"
                        value={formData.account_number}
                        onChange={handleChange}
                        className="temp-form-control"
                      />
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
                        placeholder=""
                        name="confirm_account_number"
                        value={formData.confirm_account_number}
                        onChange={handleChange}
                        className="temp-form-control"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Account Type <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Select
                        className="temp-form-control-option"
                        name="account_type"
                        value={formData.account_type}
                        onChange={handleChange}
                      >
                        <option value="">Select Account Type</option>
                        <option value="">Select Account Type</option>
                        <option value="savings">Savings Account</option>
                        <option value="current">Current Account</option>
                        <option value="other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Account Name <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="account_name"
                        value={formData.account_name}
                        onChange={handleChange}
                        placeholder=""
                        className="temp-form-control"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        IFSC Code <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="ifsc_code"
                        value={formData.ifsc_code}
                        onChange={handleChange}
                        placeholder=""
                        className="temp-form-control"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="temple-registration-heading">
                  <h1>Supporting Documents</h1>
                </div>
                <Row>
                  {[
                    { key: "temple_image", label: "Temple Image Upload" },
                    { key: "land_doc", label: "Land Ownership Documents" },
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
                            onDragOver={(e) => e.preventDefault()} 
                            onDrop={(e) => {
                              e.preventDefault();
                              const file = e.dataTransfer.files[0];
                              if (file)
                                handleFileChange(
                                  { target: { files: [file] } },
                                  doc.key
                                );
                            }}
                          >
                            <legend className="visually-hidden">
                              {doc.label}
                            </legend>
                            <img src={UploadFile} alt="upload-file" />
                            <p className="temp-drop-txt my-2">
                              Drag &amp; drop files
                              <br />
                              <i>or</i>
                            </p>

                            {/* Hidden File Input */}
                            <input
                              id={`${doc.key}_upload`}
                              className="invisible"
                              type="file"
                              accept="image/jpeg, image/png, image/svg+xml"
                              onChange={(e) => handleFileChange(e, doc.key)}
                            />
                            <label
                              className="btn temp-primary-btn mb-1"
                              htmlFor={`${doc.key}_upload`}
                            >
                              Choose file(s)
                            </label>

                            <p className="temp-upload-file">
                              Upload size up to 10KB to 100KB (jpg, png)
                            </p>
                          </fieldset>
                        </Col>

                        {/* Uploaded File Info */}
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

                          {documents[doc.key] && (
                            <>
                              <div className="d-flex temp-doc-info">
                                <Col lg={3} md={3} sm={3}>
                                  {new Date().toLocaleDateString()}{" "}
                                  {/* upload date */}
                                </Col>
                                <Col
                                  lg={9}
                                  md={9}
                                  sm={9}
                                  className="px-4 temp-success-doc"
                                >
                                  <FaCheckCircle /> {documents[doc.key].name}{" "}
                                  Uploaded
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
                          )}
                        </Col>
                      </Row>
                    </Col>
                  ))}
                </Row>
                
                <div className="gap-3 mt-3 Temp-btn-submit">
                  <Button
                    variant="primary"
                    className="temp-submit-btn mx-3"
                    type="submit"
                  >
                    Registration Now
                  </Button>
                  <Button
                    variant="secondary"
                    className="temp-cancle-btn"
                    type="button"
                  >
                    Cancel
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

export default TempleAuthority;
