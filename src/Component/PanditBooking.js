import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Accordion, Button, Col, Container, Row, Form } from "react-bootstrap";
import Select from "react-select";
import { FaCheck, FaUsersLine } from "react-icons/fa6";
import { MdOutlineDateRange, MdStarRate } from "react-icons/md";
import { Link } from "react-router-dom";
//import Kedarnath from "../assets/images/Kedarnath-Temple.png";
//import Gangotri from "../assets/images/Gangotri-Temple.png";
//import Yamunotri from "../assets/images/yamunotri-temple.jpg";
import Cermanay from "../assets/images/Ceremony_image.png";
import Engagement from "../assets/images/Engagement.png";
import Ganesh from "../assets/images/Ganesh.png";
import Rudrabhishek from "../assets/images/Rudrabhishek.png";
import Yagnopavit from "../assets/images/Yagnopavit.png";
import Vishwakarma from "../assets/images/Vishwakarma.png";
import NewOffice from "../assets/images/NewOffice.png";
import Vivah from "../assets/images/Vivah.png";
import Annaprashan from "../assets/images/Annaprashan.png";
import Satyanarayan from "../assets/images/Satyanarayan.png";
import Bhoomi from "../assets/images/Bhoomi.png";
import Griha from "../assets/images/Griha.png";

import PagingNation from "./paging/PagingNation";
import { BsInfoCircleFill } from "react-icons/bs";

const options = [
  {
    value: "ajay",
    label: (
      <>
        Ajay Pandit{" "}
        {[...Array(5)].map((_, i) => (
          <MdStarRate key={i} className="star-icon red-star" />
        ))}
      </>
    ),
  },
  {
    value: "vijay",
    label: (
      <>
        Vijay Pandit{" "}
        {[...Array(5)].map((_, i) => (
          <MdStarRate key={i} className="star-icon red-star" />
        ))}
      </>
    ),
  },
  {
    value: "local",
    label: (
      <>
        Local Temple Association{" "}
        {[...Array(4)].map((_, i) => (
          <MdStarRate key={i} className="star-icon orange-star" />
        ))}
      </>
    ),
  },
];

const cardData = [
  { id: "0", title: "Naming Ceremony", text: "नामकरण समारोह", price: 1100, img: Cermanay },
  { id: "1", title: "Engagement Ceremony", text: "सगाई समारोह", price: 2100, img: Engagement },
  { id: "2", title: "Ganesh Chaturthi", text: "गणेश चतुर्थी", price: 1500, img: Ganesh },
  { id: "3", title: "Rudrabhishek Puja", text: "रुद्राभिषेक पूजा", price: 1800, img: Rudrabhishek },
  { id: "4", title: "Yagnopavit Sanskar", text: "यज्ञोपवीत संस्कार", price: 1600, img: Yagnopavit },
  { id: "5", title: "Vishwakarma Puja", text: "विश्वकर्मा पूजा", price: 2500, img: Vishwakarma },
  { id: "6", title: "New Office Opening Puja", text: "नए कार्यालय उद्घाटन पूजा", price: 5100, img: NewOffice },
  { id: "7", title: "Vivah (Marriage)", text: "विवाह", price: 5100, img: Vivah },
  { id: "8", title: "Annaprashan Sanskar Puja", text: "अन्नप्राशन संस्कार ", price: 5100, img: Annaprashan },
  { id: "9", title: "Satyanarayan Puja", text: "सत्यनारायण व्रत कथा एवं पूजा", price: 5100, img: Satyanarayan },
  { id: "10", title: "Bhoomi Puja", text: "नवीन भूमि पूजा", price: 5100, img: Bhoomi },
  { id: "11", title: "Griha Pravesh Puja", text: "नवीन गृह प्रवेश पूजा", price: 5100, img: Griha },
];

const PanditBooking = () => {
  // Move selectedDateTime useState to the top before any logic uses it
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  // Helper to round up to next 30 min interval
  const getNextInterval = (date = new Date()) => {
    let minutes = date.getMinutes();
    let nextMinutes = minutes <= 30 ? 30 : 0;
    let nextHour = nextMinutes === 0 ? date.getHours() + 1 : date.getHours();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), nextHour, nextMinutes);
  };

  const today = new Date();
  const isToday =
    selectedDateTime &&
    selectedDateTime.getDate() === today.getDate() &&
    selectedDateTime.getMonth() === today.getMonth() &&
    selectedDateTime.getFullYear() === today.getFullYear();

  // 6:00 AM
  const minTime = isToday ? getNextInterval(today) : new Date(today.getFullYear(), today.getMonth(), today.getDate(), 6, 0);
  // 11:30 PM
  const maxTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 30);

  const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;

  const [, setShow] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // pagination states
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCards = cardData.slice(indexOfFirstItem, indexOfLastItem);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleLoginRegister = () => setIsLoggedIn(true);
  // Default select the first ceremony on mount
  useEffect(() => {
    if (cardData.length > 0) {
      setSelectedCard(cardData[0]);
    }
  }, []);

  // Calculate total price based on selected pandits
  const totalAmount =
    selectedCard && selectedOptions.length > 0
      ? selectedCard.price * selectedOptions.length
      : selectedCard?.price || 0;

  return (
    <>
      <div className="temp-donate">
        <Container className="temp-container temp-container-details">
          <h1>Pandit Booking</h1>
          <p>Experienced Pandit Ji for every Puja, just a click away</p>
          

          <Row>
            {/* Left Side Cards */}
            <Col lg={7} md={7} sm={12} className="">
              <div className="text-center p-4 my-4 temp-regis desktop-mobile "
              >
                <h5>

                  <BsInfoCircleFill className="temp-info-icon" />
                  To continue with your Puja booking, please <strong>login</strong> or create an account.
                </h5>
                <p>Kindly click on the <strong>Login</strong> or <strong>Register</strong> button below to continue.</p>
                <Row className="mb-3">
                  <Col xs={12} md={6} className="mb-2 mb-md-0">
                    <Link to="/Login">
                      <Button
                        className="w-100 temp-login-btn"
                        onClick={handleLoginRegister}
                      >
                        Login
                      </Button>
                    </Link>
                  </Col>
                  <Col xs={12} md={6}>
                    <Link to="/DevoteeRegistration">
                      <Button
                        className="w-100 temp-regis-btn"
                        onClick={handleLoginRegister}
                      >
                        Register
                      </Button>
                    </Link>
                  </Col>
                </Row>

              </div>
              <Row className="g-4">
                {currentCards.map((item) => (
                  <Col
                    lg={3}
                    md={6}
                    sm={6}
                    xs={6}
                    key={item.id}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className={`card-item-page ${selectedCard?.id === item.id ? "active-card" : ""
                        }`}
                    >
                      <div className="card-image-wrapper-temple-page">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="card-image"
                          onClick={() => setShowPopup(true)}
                        />
                      </div>
                      <div className="card-text-temp">
                        <h5>{item.title}</h5>
                        <h6>{item.text}</h6>
                      </div>
                    </div>
                    {/* Popup Modal for Register/Login message */}
                    <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
                      <Modal.Header closeButton>

                      </Modal.Header>
                      <Modal.Body>
                        <div
                          className="text-center p-4 my-4 temp-regis"

                        >
                          <h5>

                            <BsInfoCircleFill className="temp-info-icon" />
                            <strong></strong>To continue with your Puja booking, please login or create an account.
                          </h5>
                          <p>Kindly click on the <strong>Login</strong> or <strong>Register</strong> button below to continue.</p>
                          <Row className="mb-3">
                            <Col xs={12} md={6} className="mb-2 mb-md-0">
                              <Link to="/Login">
                                <Button
                                  className="w-100 temp-login-btn"
                                  onClick={handleLoginRegister}
                                >
                                  Login
                                </Button>
                              </Link>
                            </Col>
                            <Col xs={12} md={6}>
                              <Link to="/DevoteeRegistration">
                                <Button
                                  className="w-100 temp-regis-btn"
                                  onClick={handleLoginRegister}
                                >
                                  Register
                                </Button>
                              </Link>
                            </Col>
                          </Row>

                        </div>
                        {/* <p className="text-center">Please register and login first</p> */}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="primary" onClick={() => setShowPopup(false)}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Col>
                ))}
              </Row>

              {/* Pagination */}
              <PagingNation
                totalItems={cardData.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />
            </Col>

            {/* Right Side – Ceremony Details */}
            <Col lg={5} md={5} sm={12} className="mt-2 temp-right-side rhs-gob-mob  ">
              <div
                className="text-center p-4 my-4 temp-regis "

              >
                <h5>

                  <BsInfoCircleFill className="temp-info-icon" />
                  To continue with your Puja booking, please <strong>login </strong>or create an account.
                </h5>
                <p>Kindly click on the <strong>Login</strong> or <strong>Register</strong> button below to continue.</p>
                <Row className="mb-3">
                  <Col xs={12} md={6} className="mb-2 mb-md-0">
                    <Link to="/Login">
                      <Button
                        className="w-100 temp-login-btn"
                        onClick={handleLoginRegister}
                      >
                        Login
                      </Button>
                    </Link>
                  </Col>
                  <Col xs={12} md={6}>
                    <Link to="/DevoteeRegistration">
                      <Button
                        className="w-100 temp-regis-btn"
                        onClick={handleLoginRegister}
                      >
                        Register
                      </Button>
                    </Link>
                  </Col>
                </Row>

              </div>
              <div className="tem-rhs-info temp-right-side-style">
                <h1>Online Pandit Booking</h1>

                {selectedCard ? (
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header className="accordion-header-title">
                        {selectedCard.title}{" "}
                        <span className="temp-span-temple">
                          (₹{selectedCard.price} per Pandit)
                        </span>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Form.Group className="mb-3">
                          <Form.Label className="temp-label">
                            Required Pandit{" "}
                            <span className="temp-span-star">*</span>
                          </Form.Label>
                          <Select
                            isMulti
                            options={options}
                            placeholder="Select Available Pandits"
                            closeMenuOnSelect={false}
                            className="temp-form-control-input"
                            value={selectedOptions}
                            onChange={setSelectedOptions}
                          />

                          {/* Time */}
                          <Form.Group className="mb-3 mt-3">
                            <Form.Label className="temp-label mb-2">
                              Pooja Date & Time <span className="temp-span-star">*</span>
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
                                minDate={today}
                                minTime={minTime}
                                maxTime={maxTime}
                                required
                              />
                            </div>
                          </Form.Group>

                          {/* Date */}
                          {/* <Form.Group className="mb-3 mt-3">
                          <Form.Label className="temp-label mb-2">
                            Puja Date <span className="temp-span-star">*</span>
                          </Form.Label>
                          <Form.Control
                            type="date"
                            className="temp-form-control"
                          />
                        </Form.Group> */}

                          {/* Info */}
                          <div className="mt-3">
                            <p>
                              <MdOutlineDateRange className="temple-icon" />{" "}
                              {formattedDate}
                            </p>
                            <p>
                              <FaUsersLine className="temple-icon" />{" "}
                              {selectedOptions.length || 1}, Charges ₹
                              {selectedCard.price} Per Person
                            </p>
                          </div>

                          {/* Amount */}
                          <div className="text-end mt-2">
                            <p>
                              Applicable Amount:{" "}
                              <span className="amount-span">
                                ₹ {totalAmount}/-
                              </span>
                            </p>
                          </div>

                          {/* Cart */}
                          <h2>Cart Total</h2>
                          <p className="border-temp">{selectedCard.title}</p>
                          <div className="d-flex justify-content-between">
                            <p>Grand Total</p>
                            <span className="amount-span">
                              ₹ {totalAmount}/-
                            </span>
                          </div>

                          {/* Button */}
                          <div className="gap-3 mt-3 mb-3 Temp-btn-submit">
                            <Link to="/MandirBooking">
                              <Button
                                variant="temp-submit-btn"
                                className="temp-submit-btn mx-3"
                                type="submit"
                                onClick={handleShow}
                              >
                                <FaCheck /> Proceed for devotee details
                              </Button>
                            </Link>
                          </div>
                        </Form.Group>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                ) : (
                  <p className="text-muted">
                    👉 Select a ceremony from the left to view details here.
                  </p>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>

  );
};

export default PanditBooking;
