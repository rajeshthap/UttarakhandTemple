import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import OTPModel from "../../OTPModel/OTPModel";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SevaRegistration = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [agree, setAgree] = useState(false);
  const [, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const [temples, setTemples] = useState([]);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    gender: "",
    age: "",
    mobile_number: "",
    email: "",
    id_proof_type: "",
    id_proof_number: "",
    temple_name: "",
    type_of_seva: "",
    preferred_dates: "",
    time_slot: "",
    frequency: "",
    participation_mode: "",
    gotra: "",
    nakshatra_rashi: "",
    special_instructions: "",
    seva_donation_amount: "",
    payment_mode: "",
  });

  const handleResendOtp = async () => {
    try {

      const res = await axios.post("https://brjobsedu.com/Temple_portal/api/Sentotp/", {
        phone: formData.mobile_number,
      });

      if (res.data.success) {

      } else {
        alert("Failed to resend OTP. Try again.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert("Something went wrong. Please try again.");
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
        console.error("Error fetching temples:", err);
      }
    };
    fetchTemples();
  }, []);

  const handleAgreeChange = async (e) => {
    const checked = e.target.checked;

    if (!checked) {
      setAgree(false);
      return;
    }

    //  validate required fields before OTP
    if (!validateFields()) {
      alert("Please fill all required fields correctly before verifying OTP.");
      setAgree(false);
      return;
    }

    //  if OTP already verified, no need to resend
    if (isVerified) {
      setAgree(true);
      return;
    }

    //  otherwise send OTP
    try {
      const res = await axios.post(
        "https://brjobsedu.com/Temple_portal/api/Sentotp/",
        {
          phone: formData.mobile_number,
        }
      );

      if (res.data.success) {
        setOtpSent(true);
        setShow(true); // open modal
        setAgree(true);

      } else {
        alert(res.data.message || "Failed to send OTP");
        setAgree(false);
      }
    } catch (err) {
      console.error("OTP Send Error:", err);
      alert("Error sending OTP");
      setAgree(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(
        "https://brjobsedu.com/Temple_portal/api/Verify/",
        {
          phone: formData.mobile_number,
          otp: otp,
        }
      );

      if (res.data.success) {
        setIsVerified(true);
        alert("Phone number verified!");
        handleClose(); // close modal
        navigate("/PaymentConfirmation");
      } else {
        alert(res.data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error("OTP Verify Error:", err);
      alert("Error verifying OTP");
    }
  };

  const validateFields = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.full_name)) {
      newErrors.full_name = "Only alphabets are allowed";
    }

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
      newErrors.id_proof_number = "ID Proof Number cannot exceed 16 characters";
    }

    if (!formData.temple_name)
      newErrors.temple_name = "Temple Name is required";

    if (!formData.type_of_seva)
      newErrors.type_of_seva = "Type of Seva is required";

    if (!formData.preferred_dates)
      newErrors.preferred_dates = "Preferred date is required";

    if (!formData.time_slot) newErrors.time_slot = " Time slot is required";

    if (!formData.frequency) newErrors.frequency = " Frequency is required";

    if (!formData.participation_mode)
      newErrors.participation_mode = " Participation Mode is required";

    if (!formData.gotra.trim()) newErrors.gotra = "Gotra is required";

    if (!formData.nakshatra_rashi.trim())
      newErrors.nakshatra_rashi = "Nakshatra/Rashi is required";

    if (!formData.special_instructions.trim())
      newErrors.special_instructions = "Special Instructions are required";

    if (!formData.seva_donation_amount || isNaN(formData.seva_donation_amount))
      newErrors.seva_donation_amount = "Seva Donation Amount is required";

    if (!formData.payment_mode)
      newErrors.payment_mode = "Payment mode is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "mobile_number") {
      let errorMsg = "";
      if (!/^\d*$/.test(value)) {
        errorMsg = "Only digits allowed";
      } else if (value.length > 0 && !/^\d{10}$/.test(value)) {
        errorMsg = "Enter a valid 10-digit mobile number";
      }
      setErrors((prev) => ({ ...prev, mobile_number: errorMsg }));
    }
    if (name === "id_proof_number") {
      let errorMsg = "";
      if (value.length > 16) {
        errorMsg = "ID Proof Number cannot exceed 16 characters";
      }
      setErrors((prev) => ({ ...prev, id_proof_number: errorMsg }));
    }

    if (name === "email") {
      let errorMsg = "";
      if (value.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorMsg = "Enter a valid email address";
      }
      setErrors((prev) => ({ ...prev, email: errorMsg }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return alert("Please fill all required fields.");
    }

    if (!isVerified) {
      alert("Please verify your phone number before submitting.");
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();

      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const res = await axios.post(
        "https://brjobsedu.com/Temple_portal/api/Sevabooking/",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Seva Registration Response:", res.data);

      if (res.data.message === "Seva booking created successfully") {
        alert("Seva Registration Successful!");
        //navigate("/PaymentConfirmation");
        setFormData({
          full_name: "",
          gender: "",
          age: "",
          mobile_number: "",
          email: "",
          id_proof_type: "",
          id_proof_number: "",
          temple_name: "",
          type_of_seva: "",
          preferred_dates: "",
          time_slot: "",
          frequency: "",
          participation_mode: "",
          gotra: "",
          nakshatra_rashi: "",
          special_instructions: "",
          seva_donation_amount: "",
          payment_mode: "",
        });
      } else {
        alert(res.data.message || "Seva Registration failed");
      }
    } catch (err) {
      console.error(err);

      if (err.response && err.response.data) {
        const errorData = err.response.data;
        alert(errorData.message || "Something went wrong!");
      } else {
        alert(err.message || "Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container className="temp-container">
        <h1>Mandri Seva Registration </h1>
        <p>
          <i>
            Serve the Divine, Register Your Seva with Devotion{" "}
          </i>
        </p>
        <Form onSubmit={handleSubmit}>
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
                      onChange={(e) => {
                        const value = e.target.value;

                        // Allow only alphabets and spaces
                        if (/^[A-Za-z\s]*$/.test(value)) {
                          handleInputChange(e);
                          setErrors((prev) => ({ ...prev, full_name: "" }));
                        } else {
                          setErrors((prev) => ({
                            ...prev,
                            full_name: "Only alphabets are allowed",
                          }));
                        }
                      }}
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
                      placeholder="Gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Gender </option>
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
                      type="text"
                      placeholder="Enter Age"
                      className="temp-form-control"
                      name="age"
                      value={formData.age}
                      onChange={(e) => {
                        const value = e.target.value;

                        // Allow only digits
                        if (/^\d*$/.test(value)) {
                          handleInputChange(e);
                          setErrors((prev) => ({ ...prev, age: "" }));
                        } else {
                          setErrors((prev) => ({
                            ...prev,
                            age: "Only digits are allowed",
                          }));
                        }
                      }}
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
                      type="text"
                      placeholder="Enter Mobile Number"
                      className="temp-form-control"
                      name="mobile_number"
                      value={formData.mobile_number}
                      onChange={(e) => {
                        const value = e.target.value;

                        // Only allow digits and max 10
                        if (/^\d*$/.test(value) && value.length <= 10) {
                          handleInputChange(e);

                          // Remove error if input becomes valid
                          if (value.length === 10) {
                            setErrors((prev) => ({ ...prev, mobile_number: "" }));
                          } else {
                            setErrors((prev) => ({
                              ...prev,
                              mobile_number: "Mobile number must be 10 digits",
                            }));
                          }
                        } else {
                          setErrors((prev) => ({
                            ...prev,

                          }));
                        }
                      }}
                    />
                    {errors.mobile_number && (
                      <small className="text-danger">{errors.mobile_number}</small>
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
                      placeholder="Enter Email"
                      className="temp-form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
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
                      placeholder="ID Proof Type"
                      name="id_proof_type"
                      value={formData.id_proof_type}
                      maxLength={formData.id_proof_type === "Aadhar" ? 16 : 20}
                      onChange={handleInputChange}
                    >
                      <option value="">Select ID Proof </option>
                      <option value="Aadhar">Aadhar </option>
                      <option value="PAN">PAN </option>
                      <option value="Passport">Passport </option>
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
                      type="text"
                      placeholder="Enter ID Proof Number"
                      className="temp-form-control"
                      name="id_proof_number"
                      value={formData.id_proof_number}
                      onChange={handleInputChange}
                    />
                    {errors.id_proof_number && (
                      <small className="text-danger">
                        {errors.id_proof_number}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                <h2>Seva Details </h2>

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
                      onChange={handleInputChange}
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
                      Type of Seva <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      className="temp-form-control-option"
                      placeholder="Seva Type"
                      name="type_of_seva"
                      value={formData.type_of_seva}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Seva Type</option>
                      <option value="Annadanam">Annadanam </option>
                      <option value="Deep Aradhana">Deep Aradhana</option>
                      <option value="Abhishekam">Abhishekam </option>
                      <option value="Archana">Archana </option>
                      <option value="Daily Pooja Sponsorship">
                        Daily Pooja Sponsorship{" "}
                      </option>
                    </Form.Select>
                    {errors.type_of_seva && (
                      <small className="text-danger">
                        {errors.type_of_seva}
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
                      Preferred Date(s){" "}
                      <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Preferred Dates"
                      className="temp-form-control"
                      name="preferred_dates"
                      value={formData.preferred_dates}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    {errors.preferred_dates && (
                      <small className="text-danger">
                        {errors.preferred_dates}
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
                      Time Slot <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      className="temp-form-control-option"
                      name="time_slot"
                      placeholder="Enter Time Slot"
                      value={formData.time_slot}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Time Slot</option>
                      <option value="Morning">Morning </option>
                      <option value="Afternoon">Afternoon </option>
                      <option value="Evening">Evening </option>
                    </Form.Select>
                    {errors.time_slot && (
                      <small className="text-danger">{errors.time_slot}</small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Frequency <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      className="temp-form-control-option"
                      name="frequency"
                      placeholder="Enter Frequency"
                      value={formData.frequency}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Frequency</option>
                      <option value="once">One-time </option>
                      <option value="daily">Daily </option>
                      <option value="weekly">Weekly </option>
                      <option value="monthly">Monthly </option>
                      <option value="yearly">Yearly </option>
                    </Form.Select>
                    {errors.frequency && (
                      <small className="text-danger">{errors.frequency}</small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Participation Mode{" "}
                      <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      className="temp-form-control-option"
                      placeholder="Participation Mode"
                      name="participation_mode"
                      value={formData.participation_mode}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Mode of Participation</option>
                      <option value="online">Online </option>
                      <option value="offline">Offline</option>
                      <option value="both">Both</option>
                    </Form.Select>
                    {errors.participation_mode && (
                      <small className="text-danger">
                        {errors.participation_mode}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                <h2>Additional Details</h2>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Gotra <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Gotra"
                      className="temp-form-control"
                      name="gotra"
                      value={formData.gotra}
                      onChange={handleInputChange}
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
                      placeholder="Nakshatra / Rashi "
                      className="temp-form-control"
                      name="nakshatra_rashi"
                      value={formData.nakshatra_rashi}
                      onChange={handleInputChange}
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
                      Any Specific Sankalp / Instructions for Pooja{" "}
                      <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Any Specific Sankalp"
                      className="temp-form-control"
                      name="special_instructions"
                      value={formData.special_instructions}
                      onChange={handleInputChange}
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
                      type="text"
                      placeholder="Enter the Amount"
                      className="temp-form-control"
                      name="seva_donation_amount"
                      value={formData.seva_donation_amount}
                      onChange={handleInputChange}
                    />
                    {errors.seva_donation_amount && (
                      <small className="text-danger">
                        {errors.seva_donation_amount}
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
                      placeholder="Payment Mode"
                      value={formData.payment_mode}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Payment Mode</option>
                      <option value="upi">UPI</option>
                      <option value="card">Card</option>
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
                    checked={agree}
                    onChange={handleAgreeChange}
                  />
                  I agree to booking terms &amp; cancellation policy
                </label>
              </div>

              <div className="gap-3 mt-3 mb-3 Temp-btn-submit">
                <Button
                  variant="temp-submit-btn"
                  className="temp-submit-btn mx-3"
                  type="submit"
                  disabled={!agree || !isVerified}
                >
                  Registration Now
                </Button>
                <Button
                  variant="secondary"
                  className="temp-cancle-btn"
                  type="button"
                  onClick={() => setFormData({})}
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
      </Container>
      <OTPModel
        show={show}
        handleClose={handleClose}
        otp={otp}
        setOtp={setOtp}
        handleVerifyOtp={handleVerifyOtp}
        phone={formData.mobile_number}
        handleResendOtp={handleResendOtp}

      />
    </div>
  );
};

export default SevaRegistration;
