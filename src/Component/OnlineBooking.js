import React, { useState } from "react";
import { Button, Col, Row, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../assets/CSS/Onlinebooking.css";

import { FaHandshake } from "react-icons/fa6";
import panditimg from "../assets/images/pandit-img.png";
import templeimg from "../assets/images/Mission-img.png";
import eventicon from "../assets/images/event-icon.png";
import seva from "../assets/images/seva.png";
import help from "../assets/images/help.png";


const OnlineBooking = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div className="container-fluid p-0">
      <div className="online-booking-wrapper">
        <h2>Online Booking Seva</h2>

        <div className="container">
          <Row>
            {/* Darshan & Pooja Booking */}
            <Col>
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3 align-items-stretch">
                <div className="features-icons-icon d-flex flex-fill rounded-circle mb-3 booking-info">
                  <div className="m-auto booking-icon">
                    <img src={templeimg} alt="About by god" className="img-fluid" />
                  </div>
                </div>
                <h3>Darshan & Pooja Booking</h3>
                <p>
                  <Button variant="" className="click-btn" onClick={handleShow}>
                    Click here
                  </Button>
                </p>
              </div>
            </Col>

            {/* Donate Online */}
            <Col>
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="features-icons-icon d-flex flex-fill rounded-circle mb-3 booking-info">
                  <div className="m-auto booking-icon">
                    <img src={seva} alt="About by god" className="img-fluid" />
                  </div>
                </div>
                <h3>Donate Online</h3>
                <p>
                  <Button variant="" className="click-btn" onClick={handleShow}>
                    Click here
                  </Button>
                </p>
              </div>
            </Col>

            {/* Seva Registration */}
            <Col>
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="features-icons-icon d-flex flex-fill rounded-circle mb-3 booking-info">
                  <div className="m-auto booking-icon">
                    <img src={help} alt="About by god" className="img-fluid" />
                  </div>
                </div>
                <h3>Seva Registration</h3>
                <p>
                  <Button variant="" className="click-btn" onClick={handleShow}>
                    Click here
                  </Button>
                </p>
              </div>
            </Col>

            {/* Pandit Booking */}
            <Col>
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="features-icons-icon d-flex flex-fill rounded-circle mb-3 booking-info">
                  <div className="m-auto booking-icon">
                    <img src={panditimg} alt="About by god" className="img-fluid" />
                  </div>
                </div>
                <h3>Pandit Booking</h3>
                <p>
                  <Button variant="" className="click-btn" onClick={handleShow}>
                    Click here
                  </Button>
                </p>
              </div>
            </Col>

            {/* Event Participation */}
            <Col>
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="features-icons-icon d-flex flex-fill rounded-circle mb-3 booking-info">
                  <div className="m-auto booking-icon">
                    <img src={eventicon} alt="About by god" className="img-fluid" />
                  </div>
                </div>
                <h3>Event Participation</h3>
                <p>
                  <Button variant="" className="click-btn" onClick={handleShow}>
                    Click here
                  </Button>
                </p>
              </div>
            </Col>
          </Row>
        </div>

        {/* Modal for Login/Register */}
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
         
        </Modal.Header>
    <Modal.Body>
  <div className="text-center p-4 temp-regis ">
    <p>
      Kindly click on the <strong>Login</strong> or <strong>Register</strong> button below to continue.
    </p>
    <Row className="mb-3">
      <Col xs={12} md={6} className="mb-2 mb-md-0">
        <Link to="/Login">
          <Button
            className="w-100 temp-login-btn"
            onClick={handleClose}  // <- use handleClose
          >
            Login
          </Button>
        </Link>
      </Col>
      <Col xs={12} md={6}>
        <Link to="/DevoteeRegistration">
          <Button
            className="w-100 temp-regis-btn"
            onClick={handleClose}  // <- use handleClose
          >
            Register
          </Button>
        </Link>
      </Col>
    </Row>
  </div>
</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  );
};

export default OnlineBooking;
