import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import OTPModel from "../../OTPModel/OTPModel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ModifyAlert from "../../Alert/ModifyAlert";
import DatePicker from "react-datepicker";

const EventParticipation = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [show, setShow] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const [sendingOtp, setSendingOtp] = useState(false);
  const [temples, setTemples] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const [formData, setFormData] = useState({
    full_name: "",
    gender: "",
    age: "",
    mobile_number: "",
    email: "",
    id_proof_type: "",
    id_proof_number: "",
    temple_name: "",
    event_name: "",
    participation_type: "",
    number_of_participants: "",
    preferred_dates: "",
    preferred_time_slot: "",
    gotra: "",
    nakshatra_rashi: "",
    special_instructions: "",
    donation_amount: "",
    payment_mode: "",
  });

  const handleResendOtp = async () => {
    try {
      const res = await axios.post(
   "https://brjobsedu.com/Temple_portal/api/send-otp/",
        {
          phone: formData.mobile_number,
        }
      );

      if (res.data.success) {
      } else {
        setAlertMessage("Failed to resend OTP. Try again.");
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage("Something went wrong. Please try again.");
      setShowAlert(true);
    }
  };

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const res = await axios.get(
          "https://brjobsedu.com/Temple_portal/api/temples-for-divine/"
        );
        if (res.data && Array.isArray(res.data.temples)) {
          setTemples(res.data.temples);
        }
      } catch (err) {
        // console.error("Error fetching temples:", err);
      }
    };
    fetchTemples();
  }, []);

  //  Validation logic
  const validateFields = () => {
    const newErrors = {};

    if (!formData.full_name.trim())
      newErrors.full_name = "Full Name is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.age || isNaN(formData.age))
      newErrors.age = "Valid age is required";

    if (!formData.mobile_number) {
      newErrors.mobile_number = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile_number)) {
      newErrors.mobile_number = "Enter a valid 10-digit mobile number";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.id_proof_type)
      newErrors.id_proof_type = "ID Proof Type is required";

    if (!formData.id_proof_number) {
      newErrors.id_proof_number = "ID Proof Number is required";
    } else if (formData.id_proof_number.length > 16) {
      newErrors.id_proof_number =
        "ID Proof Number must be 16 characters or less";
    }

    if (!formData.temple_name)
      newErrors.temple_name = "Temple Name is required";
    if (!formData.event_name) newErrors.event_name = "Event Name is required";
    if (!formData.participation_type)
      newErrors.participation_type = "Participation Type is required";
    if (
      !formData.number_of_participants ||
      isNaN(formData.number_of_participants)
    )
      newErrors.number_of_participants =
        "Valid number of participants required";
    if (!formData.preferred_dates)
      newErrors.preferred_dates = "Preferred date is required";
    if (!formData.preferred_time_slot)
      newErrors.preferred_time_slot = "Date and Time is required";
    if (!formData.gotra.trim()) newErrors.gotra = "Gotra is required";
    if (!formData.nakshatra_rashi.trim())
      newErrors.nakshatra_rashi = "Nakshatra/Rashi is required";
    if (!formData.special_instructions.trim())
      newErrors.special_instructions = "Special Instructions are required";
    if (!formData.donation_amount || isNaN(formData.donation_amount))
      newErrors.donation_amount = "Valid Donation Amount is required";
    if (!formData.payment_mode)
      newErrors.payment_mode = "Payment mode is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (name === "mobile_number") {
      let errorMsg = "";
      if (!/^\d*$/.test(value)) {
        errorMsg = "Only digits allowed";
      } else if (value.length > 0 && !/^\d{10}$/.test(value)) {
        errorMsg = "Enter a valid 10-digit mobile number";
      }
      setErrors((prev) => ({ ...prev, mobile_number: errorMsg }));
    }

    if (name === "email") {
      let errorMsg = "";
      if (value.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorMsg = "Enter a valid email address";
      }
      setErrors((prev) => ({ ...prev, email: errorMsg }));
    }
  };

  const handleCheckbox = async (e) => {
    const checked = e.target.checked;

    if (!checked) {
      setAgreeTerms(false);
      return;
    }

    if (!validateFields()) {
      setAlertMessage(
        "Please fill all required fields correctly before verifying OTP."
      );
      setShowAlert(true);
      setAgreeTerms(false);
      return;
    }

    if (otpVerified) {
      setAgreeTerms(true);
      return;
    }

    try {
      setSendingOtp(true);
      await axios.post("https://brjobsedu.com/Temple_portal/api/Sentotp/", {
        phone: formData.mobile_number,
      });
      setShow(true);
      setAgreeTerms(true);
    } catch (err) {
      setAlertMessage("Failed to send OTP");
      setShowAlert(true);
    } finally {
      setSendingOtp(false);
    }
  };

  //  Submit only if OTP verified
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      setAlertMessage("Please fill all required fields.");
      setShowAlert(true);
      return;
    }

    if (!otpVerified) {
       setAlertMessage("Please verify OTP before registering.");
        setShowAlert(true);
    }

    try {
      const res = await axios.post(
        "https://brjobsedu.com/Temple_portal/api/TempleEventBooking/",
        formData
      );

      if (res.status === 200 || res.status === 201) {
        setTimeout(() => {
        setAlertMessage("Event Registered Successfully!");
        setShowAlert(true);
        }, 2000);
        
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.error("Server Error:", err.response.data);
        setAlertMessage("Booking failed: " + JSON.stringify(err.response.data));
        setShowAlert(true);
      } else {
        console.error("Error:", err);
        setAlertMessage("Something went wrong. Please try again.");
        setShowAlert(true);

      }
    }
  };

  //  Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) { setAlertMessage("Enter OTP");
      setShowAlert(true);
      return;
    }

    setVerifying(true);
    try {
      const res = await axios.post(
   "https://brjobsedu.com/Temple_portal/api/verify-otp/",
        { phone: formData.mobile_number, otp }
      );

      if (res.data.success) {
        setOtpVerified(true);
        setAlertMessage("OTP Verified Successfully!");
        setShowAlert(true);
        setTimeout(() => {
                  navigate("/PaymentConfirmation");

        }
, 2000);
      } else {
        setAlertMessage("Invalid OTP, try again.");
        setShowAlert(true);
      }
    } catch (err) {
      setAlertMessage("OTP verification failed");
      setShowAlert(true);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="temp-donate">
      <Container className="temp-container">
        <Form onSubmit={handleSubmit}>
          <h1>Mandir Event Participation </h1>
          <p>
            <i>Join Sacred Gatherings and Be Part of Divine Celebrations </i>
          </p>
          <Row>
            <Col lg={8} md={8} sm={12} className="mt-2">
              <h2>Devotee Information</h2>
              <Row className="mt-4">
                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Full Name <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      className="temp-form-control"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                    />
                    {errors.full_name && (
                      <small className="text-danger">{errors.full_name}</small>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Gender <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      className="temp-form-control-option"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male </option>
                      <option value="Female">Female </option>
                      <option value="Other">Other </option>
                    </Form.Select>
                    {errors.gender && (
                      <small className="text-danger">{errors.gender}</small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Age <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Age"
                      className="temp-form-control"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                    />
                    {errors.age && (
                      <small className="text-danger">{errors.age}</small>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Mobile Number <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Mobile Number"
                      className="temp-form-control"
                      name="mobile_number"
                      value={formData.mobile_number}
                      onChange={handleChange}
                    />
                    {errors.mobile_number && (
                      <small className="text-danger">
                        {errors.mobile_number}
                      </small>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12}>
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
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <small className="text-danger">{errors.email}</small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      ID Proof Type <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      className="temp-form-control-option"
                      name="id_proof_type"
                      value={formData.id_proof_type}
                      onChange={handleChange}
                    >
                      <option value="">Select ID Proof </option>
                      <option value="Aadhar Card">Aadhar Card </option>
                      <option value="PAN ">PAN </option>
                      <option value="Passport ">Passport </option>
                      <option value="Voter ID">Voter ID </option>
                    </Form.Select>
                    {errors.id_proof_type && (
                      <small className="text-danger">
                        {errors.id_proof_type}
                      </small>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      ID Proof Number <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter ID Proof Number"
                      className="temp-form-control"
                      name="id_proof_number"
                      value={formData.id_proof_number}
                      onChange={handleChange}
                      maxLength={16}
                    />

                    {errors.id_proof_number && (
                      <small className="text-danger">
                        {errors.id_proof_number}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                <h2>Event Details </h2>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Temple Name <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      className="temp-form-control-option"
                      name="temple_name"
                      value={formData.temple_name}
                      onChange={handleChange}
                    >
                      <option value="">Select Temple Name</option>
                      {temples.map((temple) => (
                        <option key={temple.id} value={temple.temple_name}>
                          {temple.temple_name} – {temple.city}, {temple.state}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.temple_name && (
                      <small className="text-danger">
                        {errors.temple_name}
                      </small>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Event Name <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      className="temp-form-control-option"
                      name="event_name"
                      value={formData.event_name}
                      onChange={handleChange}
                    >
                      <option value="">Select Event Name</option>
                      <option value="Maha Shivratri">Maha Shivratri </option>
                      <option value="Navratri Pooja">Navratri Pooja</option>
                      <option value="Rath Yatra">Rath Yatra </option>
                      <option value="Diwali ">Diwali </option>
                      <option value="Mahotsav ">Mahotsav </option>
                    </Form.Select>
                    {errors.event_name && (
                      <small className="text-danger">{errors.event_name}</small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Participation Type{" "}
                      <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      className="temp-form-control-option"
                      name="participation_type"
                      value={formData.participation_type}
                      onChange={handleChange}
                    >
                      <option value="">Select Participation </option>
                      <option value="online">Online </option>
                      <option value="offline">Offline </option>
                    
                    </Form.Select>
                    {errors.participation_type && (
                      <small className="text-danger">
                        {errors.participation_type}
                      </small>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Number of Participants{" "}
                      <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Number of Participants"
                      className="temp-form-control"
                      name="number_of_participants"
                      value={formData.number_of_participants}
                      onChange={handleChange}
                    />
                    {errors.number_of_participants && (
                      <small className="text-danger">
                        {errors.number_of_participants}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                  <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3 ">
                          <Form.Label className="temp-label mb-2">
                            Event Date & Time <span className="temp-span-star">*</span>
                          </Form.Label>
                          <div>
                            <DatePicker
                              selected={selectedDateTime}
                              onChange={setSelectedDateTime}
                              showTimeSelect
                              timeFormat="hh:mm aa"
                              timeIntervals={30}
                              dateFormat="MMMM d, yyyy h:mm aa"
                              placeholderText="Select Date and time"
                              className="form-control temp-form-control-option w-100"
                              minDate={new Date()}
                              required
                            />
                          </div>
                         {errors.preferred_time_slot && (
                      <small className="text-danger">
                        {errors.preferred_time_slot}
                      </small>
                    )}
                          
                        </Form.Group>
                        </Col>

                {/* <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Preferred Date <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Preferred Dates"
                      className="temp-form-control"
                      name="preferred_dates"
                      value={formData.preferred_dates}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    {errors.preferred_dates && (
                      <small className="text-danger">
                        {errors.preferred_dates}
                      </small>
                    )}
                  </Form.Group>
                </Col> */}

                {/* <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Preferred Time Slot{" "}
                      <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      className="temp-form-control-option"
                      name="preferred_time_slot"
                      value={formData.preferred_time_slot}
                      onChange={handleChange}
                    >
                      <option value="">Select Time Slot</option>
                      <option value="Morning">Morning </option>
                      <option value="Afternoon">Afternoon </option>
                      <option value="Evening">Evening </option>
                    </Form.Select>
                    {errors.preferred_time_slot && (
                      <small className="text-danger">
                        {errors.preferred_time_slot}
                      </small>
                    )}
                  </Form.Group>
                </Col> */}

                <h2>Additional Details</h2>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">Gotra </Form.Label>
                    <span className="temp-span-star"> *</span>
                    <Form.Control
                      type="text"
                      placeholder="Enter Gotra"
                      className="temp-form-control"
                      name="gotra"
                      value={formData.gotra}
                      onChange={handleChange}
                    />
                    {errors.gotra && (
                      <small className="text-danger">{errors.gotra}</small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Nakshatra / Rashi{" "}
                      <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Nakshatra / Rashi "
                      className="temp-form-control"
                      name="nakshatra_rashi"
                      value={formData.nakshatra_rashi}
                      onChange={handleChange}
                    />
                    {errors.nakshatra_rashi && (
                      <small className="text-danger">
                        {errors.nakshatra_rashi}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Special Instructions / Seva Requests{" "}
                      <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Special Instructions / Seva Requests"
                      className="temp-form-control"
                      name="special_instructions"
                      value={formData.special_instructions}
                      onChange={handleChange}
                    />
                    {errors.special_instructions && (
                      <small className="text-danger">
                        {errors.special_instructions}
                      </small>
                    )}
                  </Form.Group>
                </Col>
                <h2>Payment Details</h2>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Donation Amount <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Donation Amount"
                      className="temp-form-control"
                      name="donation_amount"
                      value={formData.donation_amount}
                      onChange={handleChange}
                    />
                    {errors.donation_amount && (
                      <small className="text-danger">
                        {errors.donation_amount}
                      </small>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Payment Mode <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      className="temp-form-control-option"
                      name="payment_mode"
                      value={formData.payment_mode}
                      onChange={handleChange}
                    >
                      <option value="">Select Payment Mode</option>
                      <option value="upi">UPI </option>
                      <option value="card">Card </option>
                    </Form.Select>
                    {errors.payment_mode && (
                      <small className="text-danger">
                        {errors.payment_mode}
                      </small>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    className="mx-2"
                    checked={agreeTerms}
                    onChange={handleCheckbox}
                    disabled={sendingOtp}
                  />
                  {sendingOtp && (
                    <small className="text-muted">Sending...</small>
                  )}
                  I agree to booking terms & cancellation policy
                </label>
              </div>

              <div className="gap-3 mt-3 mb-3 Temp-btn-submit">
                <Button
                  variant="temp-submit-btn"
                  className="temp-submit-btn mx-3"
                  type="submit"
                  disabled={!agreeTerms || !otpVerified}
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
            </Col>
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
                    <li>
                      Net Banking – Secure online transfers through major Indian
                      banks.
                    </li>
                    <li>
                      Debit Card – Quick and convenient payment using your bank
                      card.
                    </li>
                    <li>
                      Credit Card – Hassle-free donations with instant
                      confirmation.
                    </li>
                    <li>
                      UPI (Unified Payments Interface) – Fast, mobile-based
                      payment option.
                    </li>
                    <li>
                      BharatPe QR – Scan & Pay instantly via supported payment
                      apps.
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
        <ModifyAlert
          message={alertMessage}
          show={showAlert}
          setShow={setShowAlert}
        />

        <OTPModel
          show={show}
          handleClose={() => setShow(false)}
          otp={otp}
          setOtp={setOtp}
          handleVerifyOtp={handleVerifyOtp}
          verifying={verifying}
          phone={formData.mobile_number}
          handleResendOtp={handleResendOtp}
        />
      </Container>
    </div>
  );
};

export default EventParticipation;
