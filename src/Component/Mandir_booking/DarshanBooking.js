import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import OTPModel from "../OTPModel/OTPModel";
import LocationState from "../userregistration/LocationState";
const DarshanBooking = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [darshanType, setDarshanType] = useState("");
  const [amount, setAmount] = useState("");
  const handleDarshanChange = (e) => {
    const value = e.target.value;
    setDarshanType(value);

    // Autofill amount logic
    if (value === "Puja") {
      setAmount(500);
    } else if (value === "Darshan") {
      setAmount(200);
    } else if (value === "Festival Booking") {
      setAmount(1000);
    } else if (value === "Abhishekam") {
      setAmount(1000);
    } else if (value === "Archana") {
      setAmount(1000);
    } else if (value === "Rudrabhishek") {
      setAmount(1000);
    } else if (value === "Other") {
      setAmount(1000);
    } else {
      setAmount(""); // reset if no predefined amount
    }
  };
  return (
    <div>
      <Container className="temp-container">
        <h1>Darshan Booking</h1>
        <p>
          <i>
            Book Your Sacred Darshan and Connect with the Divine{" "}
          </i>
        </p>
        <Row>
          <Col lg={8} md={8} sm={12} className="mt-2">
            <h2>Personal Details</h2>
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
                    placeholder=""
                    className="temp-form-control"
                  />
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
                    placeholder=""
                    className="temp-form-control"
                  />
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
                  <Form.Select className="temp-form-control-option">
                    <option value="">Select Temple Type</option>
                    <option value="shiv">Male </option>
                    <option value="vishnu">Female </option>
                  </Form.Select>
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
                    type="Date"
                    placeholder=""
                    className="temp-form-control"
                  />
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
                    placeholder=""
                    className="temp-form-control"
                  />
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
                  <Form.Select className="temp-form-control-option">
                    <option value="">Select Temple Type</option>
                    <option value="shiv">Aadhar </option>
                    <option value="vishnu">PAN </option>
                    <option value="vishnu"> Voter ID </option>
                    <option value="durga"> Passport </option>
                  </Form.Select>
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
                    placeholder=""
                    className="temp-form-control"
                  />
                </Form.Group>
              </Col>
            </Row>
            <h2>Darshan Booking Details</h2>
            <Row>

              {/* Booking Details */}
              <Col lg={6} md={6} sm={12}>
                <Form.Group className="mb-3" controlId="templeType">
                  <Form.Label className="temp-label">
                    Temple Name <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Select
                    className="temp-form-control-option"
                    name="temple_type"
                  >
                    <option value="">Select Temple Type</option>
                    <option value="shiv">Shiva Temple</option>
                    <option value="vishnu">Vishnu Temple</option>
                    <option value="durga">Durga Temple</option>
                    <option value="ganesha">Ganesha Temple</option>
                    <option value="hanuman">Hanuman Temple</option>
                    <option value="krishna">Krishna Temple</option>
                    <option value="buddha">Buddha Temple</option>
                    <option value="jain">Jain Temple</option>
                    <option value="sai">Sai Baba Temple</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col lg={6} md={6} sm={12}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="temp-label">
                    Preferred Date <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Control
                    type="Date"
                    placeholder=""
                    className="temp-form-control"
                  />
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Form.Group controlId="donationFor">
                  <Form.Label>
                    Preferred Time Slot{" "}
                    <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Select aria-label="Select donation purpose">
                    <option>Select Purpose</option>
                    <option value="temple">Morning</option>
                    <option value="festivals">Afternoon </option>
                    <option value="charity">Evening</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <h2 className="pt-4">Address Details</h2>
            <Row>

              <Col lg={6} md={6} sm={12}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="temp-label">
                    Country <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Select className="temp-form-control-option">
                    <option value="Select an option">Select a Country</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="temp-label">
                    State <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Select className="temp-form-control-option">
                    <option value="Select a option">Select a State</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="temp-label">
                    City <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Select className="temp-form-control-option">
                    <option value="Select a option">Select a City</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col lg={6} md={6} sm={12}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="temp-label">
                    ZipCode <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder=""
                    className="temp-form-control"
                  />
                </Form.Group>
              </Col>

              <Col lg={6} md={6} sm={12}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="temp-label">
                    Prasad Delivery <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Select className="temp-form-control-option">
                    <option value="Select a option">Select a  Prasad Delivery</option>
                    <option value="option1">Yes</option>
                    <option value="option2">No</option>
                  </Form.Select>
                </Form.Group>
              </Col>
 <LocationState />
              <Col lg={6} md={6} sm={12}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="temp-label">
                    Accommodation Required{" "}
                    <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Select className="temp-form-control-option">
                    <option value="Select a option">Select a Accommodation</option>
                    <option value="option1">Yes</option>
                    <option value="option2">No</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col lg={6} md={6} sm={12}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="temp-label">
                    Special Requests <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder=""
                    className="temp-form-control"
                  />
                </Form.Group>
              </Col>
            </Row>
            <h2>Payment Details</h2>
            <Row>
              {/* Payment Details */}

              <Col lg={6} md={6} sm={12}>
                <Form.Group className="mb-3" controlId="darshanType">
                  <Form.Label className="temp-label">
                    Darshan Type <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Select
                    className="temp-form-control-option"
                    value={darshanType}
                    onChange={handleDarshanChange}
                  >
                    <option value="">Select Temple Type</option>
                    <option value="Darshan">Darshan</option>
                    <option value="Puja">Puja</option>
                    <option value="Festival Booking">Festival Booking</option>
                    <option value="Abhishekam">Abhishekam</option>
                    <option value="Archana">Archana</option>
                    <option value="Rudrabhishek">Rudrabhishek</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Form.Group className="mb-3" controlId="amount">
                  <Form.Label className="temp-label">
                    Amount (Rs.) <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)} // allow manual edit
                    className="temp-form-control"
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="gap-3 mt-3 mb-3 Temp-btn-submit">
              <Button
                variant="temp-submit-btn"
                className="temp-submit-btn mx-3"
                type="submit"
                onClick={handleShow}
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
      </Container>
      <OTPModel show={show} handleClose={handleClose} />
    </div>
  );
};

export default DarshanBooking;
