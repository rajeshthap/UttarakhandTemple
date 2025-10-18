import React, { useState } from "react";
import { Button, Col, Row, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import "../assets/CSS/Onlinebooking.css";

import { FaHandshake } from "react-icons/fa6";
import panditimg from "../assets/images/pandit-img.png";
import templeimg from "../assets/images/Mission-img.png";
import eventicon from "../assets/images/event-icon.png";
import seva from "../assets/images/seva.png";
import help from "../assets/images/help.png";
import { useAuth } from "./GlobleAuth/AuthContext"; // make sure path is correct

const OnlineBooking = () => {
  const navigate = useNavigate();
  const { uniqueId } = useAuth(); // Auth state
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  // Handles all buttons
  const handleBookingClick = (path) => {
    if (uniqueId) {
      navigate(path); // Redirect if logged in
    } else {
      setShowModal(true); // Show modal if not logged in
    }
  };

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
                  <Button
                    variant=""
                    className="click-btn"
                    onClick={() => handleBookingClick("/TempleBookingInfo")}
                  >
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
                    <img src={seva} alt="Donate" className="img-fluid" />
                  </div>
                </div>
                <h3>Donate Online</h3>
                <p>
                  <Button
                    variant=""
                    className="click-btn"
                    onClick={() => handleBookingClick("/ExtendYourDivine")}
                  >
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
                    <img src={help} alt="Seva" className="img-fluid" />
                  </div>
                </div>
                <h3>Seva Registration</h3>
                <p>
                  <Button
                    variant=""
                    className="click-btn"
                    onClick={() => handleBookingClick("/SevaRegistration")}
                  >
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
                    <img src={panditimg} alt="Pandit" className="img-fluid" />
                  </div>
                </div>
                <h3>Pandit Booking</h3>
                <p>
                  <Button
                    variant=""
                    className="click-btn"
                    onClick={() => handleBookingClick("/PanditBooking")}
                  >
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
                    <img src={eventicon} alt="Event" className="img-fluid" />
                  </div>
                </div>
                <h3>Event Participation</h3>
                <p>
                  <Button
                    variant=""
                    className="click-btn"
                    onClick={() => handleBookingClick("/EventParticipation")}
                  >
                    Click here
                  </Button>
                </p>
              </div>
            </Col>
          </Row>
        </div>

        {/* Modal for Login/Register */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div className="text-center p-4 temp-regis">
              <p>
                Kindly click on the <strong>Login</strong> or <strong>Register</strong> button below to continue.
              </p>
              <Row className="mb-3">
                <Col xs={12} md={6} className="mb-2 mb-md-0">
                  <Link to="/Login">
                    <Button className="w-100 temp-login-btn" onClick={handleCloseModal}>
                      Login
                    </Button>
                  </Link>
                </Col>
                <Col xs={12} md={6}>
                  <Link to="/DevoteeRegistration">
                    <Button className="w-100 temp-regis-btn" onClick={handleCloseModal}>
                      Register
                    </Button>
                  </Link>
                </Col>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default OnlineBooking;
