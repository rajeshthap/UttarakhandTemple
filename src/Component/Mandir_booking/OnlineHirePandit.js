import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import SendOtpModal from "../OTPModel/SendOtpModal";

const OnlineHirePandit = () => {
  const [show, setShow] = useState(false); // OTP modal
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [newErrors, setnewErrors] = useState({});

  const handleShow = async () => {
    if (!formData.mobile_number) {
      alert("all required feild fill please.");
      return;
    }

    try {
      setLoadingOtp(true);

      await axios.post(
        "https://brjobsedu.com/Temple_portal/api/Sentotp/",
        { phone: formData.mobile_number },
        { headers: { "Content-Type": "application/json" } }
      );
      setnewErrors({});
      localStorage.setItem("phone", formData.mobile_number);
      setShow(true);
      alert("OTP sent successfully!");
    } catch (err) {
      console.error("Error sending OTP:", err.response?.data || err.message);
      alert("Failed to send OTP. Try again.");
    } finally {
      setLoadingOtp(false);
    }
  };

  const handleClose = () => setShow(false);
  const [isOtpVerified, setIsOtpVerified] = useState(
    localStorage.getItem("otpVerified") === "true"
  );
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
    let newErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full Name is required";
    }
    if (
      !formData.mobile_number ||
      !/^[0-9]{10}$/.test(formData.mobile_number)
    ) {
      newErrors.mobile_number = "Valid 10-digit Mobile Number is required";
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid Email is required";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.pooja_type) {
      newErrors.pooja_type = "Please select Pooja type";
    }
    if (!formData.language_preference) {
      newErrors.language_preference = "Please select Language";
    }
    if (!formData.date_of_ceremony) {
      newErrors.date_of_ceremony = "Please select ceremony date";
    }
    if (!formData.time_slot) {
      newErrors.time_slot = "Please select time slot";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    if (!formData.duration.trim()) {
      newErrors.duration = "Duration is required";
    }
    if (!formData.number_of_pandits) {
      newErrors.number_of_pandits = "Enter number of Pandits";
    }
    if (!formData.additional_assistants) {
      newErrors.additional_assistants = "Enter number of Assistants";
    }
    if (!formData.special_requirements.trim()) {
      newErrors.special_requirements = "Enter Special Requirements";
    }
    if (!formData.estimated_fees) {
      newErrors.estimated_fees = "Estimated Fees is required";
    }
    if (!formData.payment_mode) {
      newErrors.payment_mode = "Please select Payment Mode";
    }

    setnewErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]: value,
  });

  if (newErrors[name]) {
    setnewErrors((prev) => {
      const updated = { ...prev };
      delete updated[name]; // remove error message
      return updated;
    });
  }
};


  // Final Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      return alert("Please fill all required fields.");
    }

    try {
      const res = await axios.post(
        "https://brjobsedu.com/Temple_portal/api/OnlinepanditHIre/",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Booking Successful:", res.data);
      alert("Register Successfully!");

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
      console.error("Error booking pandit:", err.response?.data || err.message);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <Container className="temp-container">
        <h1>Online Hire Pandit</h1>
        <p>
          <i>
            Book experienced Pandits for Pooja, Seva, and religious rituals at your convenience.
          </i>
        </p>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={8} md={8} sm={12} className="mt-2">
              <h2>Devotee Information</h2>

              <Row className="mt-4">
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
                      onChange={handleChange}
                      className="temp-form-control"
                      placeholder="Enter Name"
                    />
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
  type="text"
  name="mobile_number"
  value={formData.mobile_number}
  onChange={handleChange}
  placeholder="Enter 10-digit Mobile No."
  maxLength={10}
  className={`temp-form-control ${newErrors.mobile_number ? "" : ""}`}
/>
{newErrors.mobile_number && (
  <div className="invalid-feedback">{newErrors.mobile_number}</div>
)}


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
                      Email <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="temp-form-control"
                      placeholder="Enter Email ID"
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

              <h2>
                  <h2>Pooja / Ceremony Details</h2>
              </h2>
              <Row>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Type of Pooja <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      name="pooja_type"
                      value={formData.pooja_type}
                      onChange={handleChange}
                      className="temp-form-control-option"
                    >
                      <option value="">Select a Pooja</option>
                      <option value="Griha Pravesh">Griha Pravesh</option>
                      <option value="Satyanarayan Katha">
                        Satyanarayan Katha
                      </option>
                      <option value="Marriage">Marriage</option>
                      <option value="Havan">Havan</option>
                    </Form.Select>
                    {newErrors.pooja_type && (
                      <small className="text-danger">
                        {newErrors.pooja_type}
                      </small>
                    )}
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
                      name="date_of_ceremony"
                      value={formData.date_of_ceremony}
                      onChange={handleChange}
                      className="temp-form-control"
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
                      Duration <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
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

              <h2 className="mt-3">Pandit Requirements</h2>
              <Row>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Number of Pandits{" "}
                      <span className="temp-span-star">*</span>
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
                      className="temp-form-control"
                      placeholder="Enter Number"
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
                      type="text"
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
                      className="temp-form-control"
                      placeholder="Enter Amount in Rs."
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
                      <option value="">Select a Payment Mode</option>
                      <option value="upi">UPI</option>
                      <option value="netbanking">Net Banking</option>
                      <option value="card">Card</option>
                      <option value="cash">Cash at Temple</option>
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
                    onChange={async (e) => {
                      const checked = e.target.checked;

                      if (checked) {
                        // Validate form before sending OTP
                        const isValid = validateFields(); // call your validation
                        if (!isValid) {
                          alert(
                            "Please fill all required fields correctly before verifying OTP."
                          );
                          return; // stop if validation fails
                        }

                        await handleShow(); // send OTP only if form is valid
                      } else {
                        setAgreeTerms(false); // uncheck logic
                      }
                    }}
                  />
                  I agree to booking terms & cancellation policy
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
                {!isOtpVerified && (
                  <p style={{ color: "red", marginBottom: "10px" }}>
                    Please verify your phone first by clicking the checkbox
                    above.
                  </p>
                )}

                <Button
                  variant="primary"
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
    </div>
  );
};

export default OnlineHirePandit;
