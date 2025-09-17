import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import OTPModel from "../OTPModel/OTPModel";
const TempleFacilityBooking = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [agree, setAgree] = useState(false);
  return (
    <div>
      <Container className="temp-container">
        <h1>Temple Facility Booking</h1>
        <p>
          <i>
            Your support helps us preserve sacred traditions, maintain temple
            facilities, and serve the community with devotion and care.{" "}
          </i>
        </p>
        <Row>
          <Col lg={8} md={8} sm={12} className="mt-2">
            <h2>Devotee/Guest Details</h2>
            <Row className="mt-4">
              <Col lg={6} md={6} sm={12}>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="temp-label">
                    Temple Type{" "}
                    <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Select className="temp-form-control-option">
                    <option value="">Select Temple </option>
                    <option value="42">Vishnu Temple</option>
                    <option value="43">Durga Temple</option>
                    <option value="44">Ganesh Temple</option>
                    <option value="45">Hanuman Temple</option>
                    <option value="46">Shiva Temple</option>
                  </Form.Select>
                </Form.Group>
              </Col>
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
                    Mobile Number <span className="temp-span-star">*</span>
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
                    Address <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    className="temp-form-control"
                  />
                </Form.Group>
              </Col>
            </Row>
            <h2>Booking Details</h2>
            <Row>

              <Col lg={6} md={6} sm={12}>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="temp-label">
                    Type of Facility <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Select className="temp-form-control-option">
                    <option value="">Select Temple Type</option>
                    <option value="Dharamshala Room">Dharamshala Room </option>
                    <option value="Guest Room">Guest Room </option>
                    <option value="Guest Room">
                      Marriage / Function Hall{" "}
                    </option>
                    <option value="Guest Room">
                      Dining Hall / Bhojanalaya{" "}
                    </option>
                    <option value="Guest Room">Parking Space </option>
                    <option value="Guest Room">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col lg={6} md={6} sm={12}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="temp-label">
                    Number of Rooms / Hall Capacity{" "}
                    <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Control
                    type="input"
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
                    Check-in Date & Time{" "}
                    <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
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
                    Check-out Date & Time{" "}
                    <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
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
                    Number of Guests <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder=""
                    className="temp-form-control"
                  />
                </Form.Group>
              </Col>
            </Row>
            <h2>Additional Services</h2>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="temp-label">
                    Meal / Prasad Facility Required{" "}
                    <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Select className="temp-form-control-option">
                    <option value="">Select Temple Type</option>
                    <option value="shiv">yes </option>
                    <option value="vishnu">No</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col lg={6} md={6} sm={12}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="temp-label">
                    Meal / Prasad Facility Required{" "}
                    <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Select className="temp-form-control-option">
                    <option value="">Select Temple Type</option>
                    <option value="shiv">yes </option>
                    <option value="vishnu">No</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            {/* Payment Details */}

            <h2>Payment & Confirmation</h2>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="temp-label">
                    Estimated Charges<span className="temp-span-star">*</span>
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
                    Payment Mode<span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Select className="temp-form-control-option">
                    <option value="Select a option">Select an City</option>
                    <option value="Net Banking">Net Banking</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Credit Card ">Credit Card </option>
                    <option value="UPI ">UPI </option>
                    <option value="UPI ">Bharat QR </option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <div>
              <label>
                <input type="checkbox" name="agreeTerms" className="mx-2" />I agree to booking
                terms &amp; cancellation policy
              </label>
            </div>

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
      </Container >
      <OTPModel show={show} handleClose={handleClose} />
    </div >
  );
};

export default TempleFacilityBooking;
