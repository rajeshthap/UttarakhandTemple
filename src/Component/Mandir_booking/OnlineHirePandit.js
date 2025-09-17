import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import SendOtpModal from "../OTPModel/SendOtpModal"; // modal for OTP input (optional)

const OnlineHirePandit = () => {
  const [show, setShow] = useState(false); // OTP modal
  const [loadingOtp, setLoadingOtp] = useState(false);

  const handleShow = async () => {
    if (!formData.mobile_number) {
      alert("Please enter your Mobile Number first.");
      return;
    }

    try {
      setLoadingOtp(true);

      await axios.post(
        "https://brjobsedu.com/Temple_portal/api/Sentotp/",
        { phone: formData.mobile_number },
        { headers: { "Content-Type": "application/json" } }
      );
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Final Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

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
            Your support helps us preserve sacred traditions, maintain temple
            facilities, and serve the community with devotion and care.
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
                    <Form.Label>Full Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      className="temp-form-control"
                      required
                    />
                  </Form.Group>
                </Col>

                {/* Mobile */}
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Mobile Number *</Form.Label>
                    <Form.Control
                      type="text"
                      name="mobile_number"
                      value={formData.mobile_number}
                      onChange={handleChange}
                      className="temp-form-control"
                      required
                    />
                  </Form.Group>
                </Col>

                {/* Email */}
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="temp-form-control"
                      required
                    />
                  </Form.Group>
                </Col>

                {/* Address */}
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Address *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="temp-form-control"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <h2>Pooja / Ceremony Details</h2>
              <Row>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Type of Pooja *</Form.Label>
                    <Form.Select
                      name="pooja_type"
                      value={formData.pooja_type}
                      onChange={handleChange}
                      className="temp-form-control-option"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Griha Pravesh">Griha Pravesh</option>
                      <option value="Satyanarayan Katha">
                        Satyanarayan Katha
                      </option>
                      <option value="Marriage">Marriage</option>
                      <option value="Havan">Havan</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Language Preference *</Form.Label>
                    <Form.Select
                      name="language_preference"
                      value={formData.language_preference}
                      className="temp-form-control-option"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Sanskrit">Sanskrit</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Marathi">Marathi</option>
                      <option value="Tamil">Tamil</option>
                      <option value="Telugu">Telugu</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Date of Ceremony *</Form.Label>
                    <Form.Control
                      type="date"
                      name="date_of_ceremony"
                      value={formData.date_of_ceremony}
                      className="temp-form-control"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Preferred Time Slot *</Form.Label>
                    <Form.Select
                      name="time_slot"
                      value={formData.time_slot}
                      onChange={handleChange}
                      className="temp-form-control-option"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Location *</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., Lucknow, Uttar Pradesh"
                      className="temp-form-control"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Duration *</Form.Label>
                    <Form.Control
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      placeholder="e.g., 3 hours"
                      className="temp-form-control"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <h2 className="mt-3">Pandit Requirements</h2>
              <Row>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Number of Pandits *</Form.Label>
                    <Form.Control
                      type="number"
                      name="number_of_pandits"
                      value={formData.number_of_pandits}
                      className="temp-form-control"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Additional Assistants</Form.Label>
                    <Form.Control
                      type="number"
                      name="additional_assistants"
                      value={formData.additional_assistants}
                      onChange={handleChange}
                      className="temp-form-control"
                    />
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Special Requirements</Form.Label>
                    <Form.Control
                      type="text"
                      name="special_requirements"
                      value={formData.special_requirements}
                      onChange={handleChange}
                      className="temp-form-control"
                      placeholder="e.g., Need sound system"
                    />
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Estimated Fees</Form.Label>
                    <Form.Control
                      type="number"
                      name="estimated_fees"
                      value={formData.estimated_fees}
                      onChange={handleChange}
                      className="temp-form-control"
                      placeholder="e.g., 2500"
                    />
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Payment Mode *</Form.Label>
                    <Form.Select
                      name="payment_mode"
                      value={formData.payment_mode}
                      onChange={handleChange}
                      className="temp-form-control-option"
                      required
                    >
                      <option value="">Select</option>
                      <option value="upi">UPI</option>
                      <option value="netbanking">Net Banking</option>
                      <option value="card">Card</option>
                      <option value="cash">Cash at Temple</option>
                    </Form.Select>
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
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleShow(); // send OTP + show modal
                      }
                    }}
                  />
                  I agree to booking terms &amp; cancellation policy
                </label>
              </div>

              {/* OTP Modal */}
              <SendOtpModal
                show={show}
                handleClose={handleClose}
                setIsOtpVerified={setIsOtpVerified}
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
