import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import OTPModel from "../../OTPModel/OTPModel";

const EventParticipation = () => {
  const [show, setShow] = useState(false);

  const [prasadDelivery, setPrasadDelivery] = useState("");
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [agree, setAgree] = useState(false);
  return (
    <div>
      <Container className="temp-container">
        <h1>Mandri Event Participation </h1>
        <p>
          <i>
            Your support helps us preserve sacred traditions, maintain temple
            facilities, and serve the community with devotion and care.{" "}
          </i>
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
                    <option value="">Select Gender Type</option>
                    <option value="Male">Male </option>
                    <option value="Female">Female </option>
                    <option value="Other">Other </option>

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
                    ID Proof Type <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Select className="temp-form-control-option">
                    <option value="">Select ID Proof Type</option>
                    <option value="Aadhar">Aadhar </option>
                    <option value="PAN ">PAN </option>
                    <option value="Passport ">Passport </option>
                    <option value="Voter ID">Voter ID </option>
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
                    type="number"
                    placeholder=""
                    className="temp-form-control"
                  />
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
                  <Form.Select className="temp-form-control-option">
                    <option value="">Select Temple Name</option>
                    <option value="Kedarnath Temple">Kedarnath Temple </option>
                    <option value="Somnath Temple">Somnath Temple</option>
                    <option value="Badrinath Temple">Badrinath Temple </option>
                    <option value="Jagannath Temple">Jagannath Temple </option>
                  </Form.Select>
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
                  <Form.Select className="temp-form-control-option">
                    <option value="">Select Event Name</option>
                    <option value="Maha Shivratri">Maha Shivratri </option>
                    <option value="Navratri Pooja">Navratri Pooja</option>
                    <option value="Rath Yatra">Rath Yatra </option>
                    <option value="Diwali ">Diwali  </option>
                    <option value="Mahotsav ">Mahotsav  </option>

                  </Form.Select>
                </Form.Group>
              </Col>

              <Col lg={6} md={6} sm={12}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="temp-label">
                    Participation Type  <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Select className="temp-form-control-option">
                    <option value="">Select Participation Type </option>
                    <option value="Individual ">Individual  </option>
                    <option value="Family ">Family </option>
                    <option value="Group">Group </option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="temp-label">
                    Number of Participants <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Number of Participants"
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
                    Preferred Date(s) <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Preferred Date(s)"
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
                    Preferred Time Slot{" "}
                    <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Select className="temp-form-control-option">
                    <option value="">Select Time Slot</option>
                    <option value="Morning ">Morning </option>
                    <option value="Afternoon ">Afternoon </option>
                    <option value="Evening">Evening </option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <h2>Additional Details</h2>

              <Col lg={6} md={6} sm={12}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="temp-label">Gotra </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Gotra"
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
                    Nakshatra / Rashi{" "}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nakshatra / Rashi "
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
                    Special Instructions / Seva Requests{" "}
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Special Instructions / Seva Requests"
                    className="temp-form-control"
                  />
                </Form.Group>
              </Col>
              <h2>Payment Details</h2>

             
            </Row>
            <div>
              <label>
                <input type="checkbox" name="agreeTerms" className="mx-2" />I
                agree to booking terms &amp; cancellation policy
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
      </Container>
      <OTPModel show={show} handleClose={handleClose} />
    </div>
  );
};

export default EventParticipation;
