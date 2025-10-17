import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import SendOtpModal from "../OTPModel/SendOtpModal";
import ModifyAlert from "../Alert/ModifyAlert";
import { useNavigate } from "react-router-dom";
import { BASE_URLL } from "../BaseURL";

const OnlineHirePandit = () => {
  const [show, setShow] = useState(false); // OTP modal
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [newErrors, setnewErrors] = useState({});

  // alert state
  const [showModifyAlert, setShowModifyAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  // Send OTP

  const poojaOptions = {
    "Book Pandit Online for Puja": [
      "Annaprashan Sanskar Puja",
      "Satyanarayan Puja",
      "Bhoomi Puja",
      "Griha Pravesh Puja",
      "New Office Opening Pooja",
      "Vivah (Marriage) Puja",
      "Vishwakarma Puja",
      "Yagnopavit Sanskar",
      "Rudrabhishek Puja",
      "Engagement Ceremony (Sagai)",
      "Naming Ceremony",
      "Ganesh Chaturthi Puja",
      "Vehicle / Vahan Puja",
      "Mundan Sanskar Puja",
      "Navratri Durga Puja",
      "Brihaspati Vrat Udyapan Puja",
      "Ekadashi Vrat Udyapan Puja",
      "Godh Bharai Puja (Baby Shower)",
      "Haldi Ceremony",
      "Janamdin / Birthday Puja",
      "Mahalakshmi Puja",
      "Vastu Shanti Puja",
      "Vishnu Sahastranam Path Puja",
      "Kaal Sarp Dosh Nivaran Puja",
      "Office / Business Puja",
      "Namakarana Puja",
      "Hartalika Teej Puja",
      "Karwa Chauth Puja",
      "Diwali Lakshmi Puja",
      "Dhanteras Puja",
      "Vara Mahalakshmi Puja",
      "Devi Poojan",
      "Kuber Puja",
      "Narak Chaturdashi Puja",
      "Kali Puja",
      "Ganesh Lakshmi Puja",
      "Govardhan Puja",
      "Annakut Puja",
      "Bhai Dooj Puja",
      "Chopda Pooja",
    ],
    "Book Pandit Online for Havans": [
      "Ayush Havan",
      "Chandi Path Havan",
      "Lakshmi Kubera Havan",
      "Navagraha Havan",
      "Shuddhikaran Puja and Havan",
      "Maha Ganapati Homa",
      "Dhanvantari Homa",
      "Bhagavathi Homa",
      "Navmi Havan",
      "Drishti Durga Homa",
      "Mahalaxmi Havan",
    ],
    "Book Pandit Online for Jaaps": [
      "Maha Mrityunjaya Jaap Puja",
      "Gayatri Mantra Jaap Puja",
      "Santan Gopal Mantra Jaap",
      "Shani Dosh Nivaran Jaap",
      "Rahu Graha Shanti Mantra Jaap",
      "Sampoorna Sunderkand Paath",
      "Akhand Ramayana Path",
      "Hanuman Chalisa Paath",
      "Bajrang Baan Path",
      "Navchandi Paath",
      "Durga Saptashati Path",
      "Kanak Dhara Path",
      "Shri Sukt Paath",
      "Lalita Sahasranama Path",
      "Kanakadhara Stotram Path",
    ],
    "Book Pandit Online for Pitru Paksha Puja": [
      "Pitru Dosh Nivaran Puja",
      "Shradh Puja & Karma for Ancestors Peace",
      "Barsi Puja",
      "Bharani Shradh Pitru Paksha",
      "Tripindi Shradha Puja",
      "Garud Puran Path",
      "Tarpan Shradh Puja",
      "Pind Daan Shradh Puja",
    ],
  };

  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSelectPooja = (pooja) => {
    setFormData({ pooja_type: pooja });
    setIsOpen(false); // close dropdown after selecting pooja
  };
  const handleShow = async () => {
    if (!formData.mobile_number) {
      setAlertMessage("all required feild fill please");
      setShowModifyAlert(true);
      return;
    }

    try {
      setLoadingOtp(true);

      await axios.post(
        `${BASE_URLL}api/send-otp/`,
        { phone: formData.mobile_number },
        { headers: { "Content-Type": "application/json" } }
      );
      setnewErrors({});
      localStorage.setItem("phone", formData.mobile_number);
      setShow(true);
    } catch (err) {
      console.error("Error sending OTP:", err.response?.data || err.message);
      setAlertMessage("Failed to send OTP. Try again.");
      setShowModifyAlert(true);
    } finally {
      setLoadingOtp(false);
    }
  };

  const handleClose = () => setShow(false);
  const [isOtpVerified, setIsOtpVerified] = useState();
  // localStorage.getItem("otpVerified") === "true"
  // Form state
  const [formData, setFormData] = useState({
    full_name: "",
    mobile_number: "",
    email: "",
    address: "",
    pooja_type: "",
    language_preference: "",
    date_of_ceremony: "",
    time_slot: "",
    location: "",
    duration: "",
    number_of_pandits: "",
    additional_assistants: "",
    special_requirements: "",
    estimated_fees: "",
    payment_mode: "",
  });

  const validateFields = () => {
    let errors = {};

    if (!formData.full_name.trim()) {
      errors.full_name = "Full Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.full_name)) {
      errors.full_name = "Only alphabets are allowed";
    }

    if (
      !formData.mobile_number ||
      !/^[0-9]{10}$/.test(formData.mobile_number)
    ) {
      errors.mobile_number = "Valid 10-digit Mobile Number is required";
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Valid Email is required";
    }

    if (!formData.address.trim()) {
      errors.address = "Address is required";
    }

    if (!formData.pooja_type) {
      errors.pooja_type = "Please select Pooja type";
    }

    if (!formData.language_preference) {
      errors.language_preference = "Please select Language";
    }

    if (!formData.date_of_ceremony) {
      errors.date_of_ceremony = "Please select ceremony date";
    }

    if (!formData.time_slot) {
      errors.time_slot = "Please select time slot";
    }

    if (!formData.location.trim()) {
      errors.location = "Location is required";
    }

    if (!formData.duration.trim()) {
      errors.duration = "Duration is required";
    }

    if (!formData.number_of_pandits) {
      errors.number_of_pandits = "Enter number of Pandits";
    }

    if (!formData.additional_assistants) {
      errors.additional_assistants = "Enter number of Assistants";
    }

    if (!formData.special_requirements.trim()) {
      errors.special_requirements = "Enter Special Requirements";
    }

    if (!formData.estimated_fees) {
      errors.estimated_fees = "Estimated Fees is required";
    }

    if (!formData.payment_mode) {
      errors.payment_mode = "Please select Payment Mode";
    }

    setnewErrors(errors);

    if (Object.keys(errors).length > 0) {
      setAlertMessage("Please fill all required fields.");
      setShowModifyAlert(true);
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only digits & max 10 for mobile
    if (name === "mobile_number" && !/^\d{0,10}$/.test(value)) {
      return;
    }

    // Update formData
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Remove existing error for the field immediately when user types
    if (newErrors[name]) {
      setnewErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }

    // Live validation while typing
    setnewErrors((prev) => {
      const updated = { ...prev };

      if (name === "mobile_number") {
        if (!value) {
          updated.mobile_number = "Mobile Number is required";
        } else if (!/^[0-9]{10}$/.test(value)) {
          updated.mobile_number = "Only digits allowed";
        } else {
          delete updated.mobile_number;
        }
      }

      if (name === "email") {
        if (!value) {
          updated.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          updated.email = "Enter a valid Email address";
        } else {
          delete updated.email;
        }
      }

      if (name === "date_of_ceremony") {
        if (!value) {
          updated.date_of_ceremony = "Date of Ceremony is required";
        } else {
          const today = new Date();
          const selected = new Date(value);
          if (selected < today.setHours(0, 0, 0, 0)) {
            updated.date_of_ceremony = "Past dates are not allowed";
          } else {
            delete updated.date_of_ceremony;
          }
        }
      }

      return updated;
    });
  };

  // Final Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      setAlertMessage("Please fill all required fields.");
      setShowModifyAlert(true);
      return;
    }

    try {
       await axios.post(
        `${BASE_URLL}api/OnlinepanditHIre/`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      setAlertMessage("Pandit booked successfully!");
      setShowModifyAlert(true);
      setTimeout(() => {
        navigate("/PaymentConfirmation");
      }, 2000);

      // Reset form
      setFormData({
        full_name: "",
        mobile_number: "",
        email: "",
        address: "",
        pooja_type: "",
        language_preference: "",
        date_of_ceremony: "",
        time_slot: "",
        location: "",
        duration: "",
        number_of_pandits: "",
        additional_assistants: "",
        special_requirements: "",
        estimated_fees: "",
        payment_mode: "",
      });

      // Remove OTP verification from localStorage after submit
      localStorage.removeItem("otpVerified");
      localStorage.clear();
      setIsOtpVerified(false);

      setIsOtpVerified(false);
    } catch (err) {
      // console.error("Error booking pandit:", err.response?.data || err.message);

      if (err.response?.data) {
        const errors = err.response.data.booking_errors || err.response.data;

        // Save backend errors
        setnewErrors(errors);

        // Focus on the first invalid field
        const firstErrorField = Object.keys(errors)[0];
        if (firstErrorField) {
          const el = document.querySelector(`[name="${firstErrorField}"]`);
          if (el) el.focus();
        }
      } else {
        setAlertMessage("Something went wrong. Please try again.");
        setShowModifyAlert(true);
      }
    }
  };

  return (
    <div className="temp-donate">
      <Container className="temp-container">
        <h1>Online Hire Pandit</h1>
        <p>
          <i>
            Book experienced Pandits for Pooja, Seva, and religious rituals at
            your convenience.
          </i>
        </p>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={8} md={8} sm={12} className="mt-2">
              <h2>Devotee Information</h2>

              <Row className="">
                {/* Full Name */}
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Full Name <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={(e) => {
                        const value = e.target.value;

                        // Allow only alphabets and spaces (no digits)
                        if (/^[A-Za-z\s]*$/.test(value)) {
                          handleChange(e); // keep your existing handler
                        }
                      }}
                      className="temp-form-control"
                      placeholder="Enter Name"
                    />{" "}
                    {newErrors.full_name && (
                      <small className="text-danger">
                        {newErrors.full_name}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                {/* Mobile */}
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Mobile Number <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="mobile_number"
                      value={formData.mobile_number}
                      onChange={handleChange}
                      placeholder="Enter Mobile Number"
                      maxLength={10}
                      className="temp-form-control"
                    />
                    {newErrors.mobile_number && (
                      <small className="text-danger">
                        {newErrors.mobile_number}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                {/* Email */}
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Email ID <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Email ID"
                      className="temp-form-control"
                    />
                    {newErrors.email && (
                      <small className="text-danger">{newErrors.email}</small>
                    )}
                  </Form.Group>
                </Col>

                {/* Address */}
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Address <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="temp-form-control"
                      placeholder="Enter Address"
                    />
                    {newErrors.address && (
                      <small className="text-danger">{newErrors.address}</small>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <h2 className="mt-2">Pooja / Ceremony Details</h2>

              <Row>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Select Pooja <span className="temp-span-star">*</span>
                    </Form.Label>

                    <div
                      ref={dropdownRef}
                      style={{ position: "relative", userSelect: "none" }}
                    >
                      <div
                        onClick={() => setIsOpen(!isOpen)}
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          padding: "8px",
                          cursor: "pointer",
                          background: "#fff",
                        }}
                      >
                        {formData.pooja_type || "Select Category / Pooja"}
                      </div>

                      {isOpen && (
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            right: 0,
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            background: "#fff",
                            maxHeight: "250px",
                            overflowY: "auto",
                            zIndex: 1000,
                          }}
                        >
                          {Object.keys(poojaOptions).map((category) => (
                            <div key={category}>
                              <div
                                onClick={() => toggleCategory(category)}
                                style={{
                                  padding: "8px",
                                  cursor: "pointer",
                                  fontWeight: "bold",
                                  background: "#f5f5f5",
                                  borderBottom: "1px solid #ddd",
                                }}
                              >
                                {category}
                                <span style={{ float: "right" }}>
                                  {expandedCategories[category] ? "" : ""}
                                </span>
                              </div>

                              {expandedCategories[category] &&
                                poojaOptions[category].map((pooja) => (
                                  <div
                                    key={pooja}
                                    onClick={() => handleSelectPooja(pooja)}
                                    style={{
                                      padding: "8px 16px",
                                      cursor: "pointer",
                                      background:
                                        formData.pooja_type === pooja
                                          ? "#e6f7ff"
                                          : "#fff",
                                    }}
                                  >
                                    {pooja}
                                  </div>
                                ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Language Preference{" "}
                      <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      name="language_preference"
                      value={formData.language_preference}
                      className="temp-form-control-option"
                      onChange={handleChange}
                    >
                      <option value="">Select Language Preference</option>
                      <option value="Sanskrit">Sanskrit</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Marathi">Marathi</option>
                      <option value="Tamil">Tamil</option>
                      <option value="Telugu">Telugu</option>
                    </Form.Select>
                    {newErrors.language_preference && (
                      <small className="text-danger">
                        {newErrors.language_preference}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Date of Ceremony <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Preferred Dates"
                      className="temp-form-control"
                      name="date_of_ceremony"
                      value={formData.date_of_ceremony}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    {newErrors.date_of_ceremony && (
                      <small className="text-danger">
                        {newErrors.date_of_ceremony}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Preferred Time Slot{" "}
                      <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      name="time_slot"
                      value={formData.time_slot}
                      onChange={handleChange}
                      className="temp-form-control-option"
                    >
                      <option value="">Select Preferred a Time Slot</option>
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                    </Form.Select>
                    {newErrors.time_slot && (
                      <small className="text-danger">
                        {newErrors.time_slot}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Location <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="temp-form-control"
                      placeholder="Enter Location"
                    />
                    {newErrors.location && (
                      <small className="text-danger">
                        {newErrors.location}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Duration(Hrs) <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="temp-form-control"
                      placeholder="Enter Duration"
                    />
                    {newErrors.duration && (
                      <small className="text-danger">
                        {newErrors.duration}
                      </small>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <h2 className="mt-2">Pandit Requirements</h2>
              <Row>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Number of Pandits{" "}
                      <span className="temp-span-star">*</span>{" "}
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="number_of_pandits"
                      value={formData.number_of_pandits}
                      onChange={handleChange}
                      className="temp-form-control"
                      placeholder="Enter Number"
                    />
                    {newErrors.number_of_pandits && (
                      <small className="text-danger">
                        {newErrors.number_of_pandits}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Additional Assistants{" "}
                      <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="additional_assistants"
                      value={formData.additional_assistants}
                      onChange={handleChange}
                      className="temp-form-control "
                      placeholder="Enter Number Assistants"
                    />
                    {newErrors.additional_assistants && (
                      <small className="text-danger">
                        {newErrors.additional_assistants}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Special Requirements{" "}
                      <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="special_requirements"
                      value={formData.special_requirements}
                      onChange={handleChange}
                      className="temp-form-control"
                      placeholder="Enter Requirements"
                    />
                    {newErrors.special_requirements && (
                      <small className="text-danger">
                        {newErrors.special_requirements}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Estimated Fees <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="estimated_fees"
                      value={formData.estimated_fees}
                      onChange={handleChange}
                      className="temp-form-control "
                      placeholder="Enter Estimated Fees"
                    />
                    {newErrors.estimated_fees && (
                      <small className="text-danger">
                        {newErrors.estimated_fees}
                      </small>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Payment Mode <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      name="payment_mode"
                      value={formData.payment_mode}
                      onChange={handleChange}
                      className="temp-form-control-option"
                    >
                      <option value="">Select Payment Mode</option>
                      <option value="upi">UPI</option>
                      <option value="card">Card</option>
                    </Form.Select>
                    {newErrors.payment_mode && (
                      <small className="text-danger">
                        {newErrors.payment_mode}
                      </small>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              {/* Send OTP Checkbox */}
              <div className="mt-3">
                <label>
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    className="mx-2"
                    checked={agreeTerms}
                    disabled={loadingOtp} // disable checkbox while loading
                    onChange={async (e) => {
                      const checked = e.target.checked;

                      if (checked) {
                        // Validate form before sending OTP
                        const isValid = validateFields();
                        if (!isValid) {
                          if (!isValid) {
                            setAlertMessage(
                              "Please fill all required fields correctly before verifying OTP."
                            );
                            setShowModifyAlert(true);
                            setAgreeTerms(false);
                            return;
                          }
                        }

                        try {
                          setLoadingOtp(true);
                          await handleShow();
                          setAgreeTerms(true);
                        } catch (error) {
                          console.error("Error sending OTP:", error);
                          setAgreeTerms(false);
                        } finally {
                          setLoadingOtp(false);
                        }
                      } else {
                        setAgreeTerms(false);
                      }
                    }}
                  />
                  {loadingOtp
                    ? "Sending OTP..."
                    : "I agree to booking terms & cancellation policy"}
                </label>
              </div>

              {/* OTP Modal */}
              <SendOtpModal
                show={show}
                handleClose={handleClose}
                setIsOtpVerified={setIsOtpVerified}
                checked={agreeTerms}
              />

              {/* Buttons */}
              <div className="gap-3 mt-3 Temp-btn-submit">
                <Button
                  variant=""
                  className="temp-submit-btn mx-3"
                  type="submit"
                  disabled={!isOtpVerified} // Disabled until OTP verified
                >
                  Register Now
                </Button>

                <Button
                  variant="secondary"
                  className="temp-cancle-btn"
                  type="button"
                >
                  Cancel
                </Button>
              </div>
            </Col>

            {/* Right Guidelines */}
            <Col lg={4} md={4} sm={12} className="mt-2 ">
              <div className="tem-rhs">
                <h3>Guidelines for Online Donation</h3>
                <div>
                  <ul>
                    <li>
                      Fields marked with{" "}
                      <span className="temp-span-star">* </span>are mandatory.
                    </li>
                    <li>
                      As per Government of India (GOI) regulations,{" "}
                      <span className="temp-span-star">
                        foreign cards are not supported
                      </span>
                      . Devotees residing outside{" "}
                      <span className="temp-span-star">
                        India may donate through Indian payment modes/cards{" "}
                      </span>
                      only.
                    </li>
                    <li>
                      Donations above{" "}
                      <span className="temp-span-star">₹1,00,000 </span> entitle
                      you to{" "}
                      <span className="temp-span-star">
                        free Puja and Darshan for one year
                      </span>
                      .
                    </li>
                    <li>
                      Donations can be made{" "}
                      <span className="temp-span-star">on any day</span>, even
                      when the temple is closed.
                    </li>
                  </ul>
                  <h2>Accepted Payment Methods</h2>
                  <ul>
                    <li>Net Banking – Secure online transfers</li>
                    <li>Debit Card – Quick and convenient</li>
                    <li>Credit Card – Hassle-free donations</li>
                    <li>UPI – Fast, mobile-based payment option</li>
                    <li>BharatPe QR – Scan & Pay instantly</li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
      <ModifyAlert
        message={alertMessage}
        show={showModifyAlert}
        setShow={setShowModifyAlert}
      />
    </div>
  );
};

export default OnlineHirePandit;
