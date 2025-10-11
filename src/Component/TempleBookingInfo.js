import React, { useState } from "react";
import {
  Accordion,
  Button,
  Col,
  Container,
  Row,
  Form,
  Modal,
} from "react-bootstrap";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { FaUsersLine } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { BsInfoCircleFill } from "react-icons/bs";
import DatePicker from "react-datepicker";

// Correct image imports
import Kedarnath from "../assets/images/Kedarnath-Temple.png";
import Gangotri from "../assets/images/Gangotri-Temple.png";
import Yamunotri from "../assets/images/yamunotri-temple.jpg";
import Badrinath from "../assets/images/Badrinath-Temple.png";
import Diya from "../assets/images/Diya.png";
import "../assets/CSS/TempleBooking.css";
import PagingNation from "./paging/PagingNation";

// =================== Temple and Pooja Data ===================
const templePoojas = {
  "Badrinath Temple": [
    {
      name: "Swaran Aarti ",
      subtitle: "Daily/Periodic  Between 5pm to 7pm (For 5-10 minutes)",
      price: 501,
    },
    {
      name: "Ved Path ",
      subtitle:
        "Daily/Periodic Morning 7:30AM to 12 Noon & Evening 3 PM to 5 PM",
      price: 2500,
    },
    {
      name: "Abhishek Puja",
      subtitle: "Daily/Periodic 4:30am to 6:30am",
      price: 4500,
    },
    {
      name: "Geeta Path ",
      subtitle:
        "Daily/Periodic Morning 7:30AM to 12 Noon & Evening 3 PM to 5 PM",
      price: 2500,
    },
    {
      name: "Karpoor Arti",
      subtitle: "Daily/Periodic  Between 5pm to 7pm (For 5-10 minutes)",
      price: 201,
    },
    {
      name: "Astotari Puja ",
      subtitle: "Daily/Periodic Between 5pm to 7pm (For 5-10 minutes)",
      price: 401,
    },
    {
      name: "Chandi Arti ",
      subtitle: "/Daily/Periodic Between 5pm to 7pm (For 5-10 minutes)",
      price: 401,
    },
    {
      name: "Entire Pujas of a Day  ",
      subtitle: "Daily/Periodic Morning till Evening",
      price: 12000,
    },
    {
      name: "Maha-Abhishek Puja ",
      subtitle: "Daily/Periodic 4:30am to 6:30am",
      price: 4700,
    },
    {
      name: "Shayan Aarti with Geet Govind Path ",
      subtitle: "Daily/Periodic End of the Day",
      price: 3100,
    },
    {
      name: "Shrimad Bhagwat Sapth Path  ",
      subtitle: "Daily/Periodic For One Week",
      price: 51000,
    },
    {
      name: "Vishnusahasranam Path  ",
      subtitle: "Daily/Periodic Between 6pm to 9pm (For 10-15 minutes)",
      price: 701,
    },
    {
      name: "Akhand Jyoti One Day-Non-Attending  ",
      subtitle: "Daily/Periodic As Per Norms",
      price: 1500,
    },
    {
      name: "Vishnusahasranamawali Path  ",
      subtitle: "Daily/Periodic  Between 5pm to 7pm (For 5-10 minutes)",
      price: 601,
    },
  ],
  "Kedarnath Temple": [
    {
      name: "Whole Day Pujas",
      subtitle: "Daily/Periodic Morning Till Evening",
      price: 28600,
    },
    {
      name: "Sampurna Aarti",
      subtitle: "Daily/Periodic  1 Hour(Evening between 6 PM to 7:30 PM)",
      price: 2800,
    },
    {
      name: "Shodashopachar Puja",
      subtitle: "Daily/Periodic  Morning between 12 AM to 4 AM",
      price: 5500,
    },
  ],
  "Gangotri Temple": [
    {
      name: "Charan Paduka Puja in Gangotri",
      subtitle: "Daily/Periodic Morning",
      price: 3499,
    },
    {
      name: "Dhara Puja in Gangotri",
      subtitle: "Daily/Periodic Morning",
      price: 2499.0,
    },
    {
      name: "Ganga Puja in Gangotri",
      subtitle: "Daily/Periodic Morning",
      price: 2499.0,
    },
    {
      name: "Tarpan Puja in Gangotri",
      subtitle: "Daily/Periodic Morning",
      price: 3499,
    },
    {
      name: "Pind Daan in Gangotri",
      subtitle: "Daily/Periodic Morning",
      price: 3499,
    },
  ],
  "Yamunotri Temple": [
    {
      name: "Manorath Puja in Yamunotri",
      subtitle: " Daily/Periodic Morning",
      price: 7099.0,
    },
    {
      name: "Vishesh Puja in Yamunotri",
      subtitle: "Daily/Periodic Morning",
      price: 12699.0,
    },
    {
      name: "Garud Ganga Puja in Yamunotri",
      subtitle: "Daily/Periodic Morning",
      price: 3499,
    },
  ],
};

// =================== Temple Card Data ===================
const cardData = [
  {
    id: "0",
    title: "Badrinath Temple",
    text: "Dedicated to Lord Vishnu, located in Chamoli district at 3,300 meters, part of the Char Dham and Chota Char Dham",
    price: 1100,
    img: Badrinath,
    link: "Read More..",
    path: "/BadrinathInfo",
  },
  {
    id: "1",
    title: "Kedarnath Temple",
    text: "One of the 12 Jyotirlingas, dedicated to Lord Shiva, located near the Mandakini River.",
    price: 2100,
    img: Kedarnath,
    link: "Read More..",
    path: "#",
  },
  {
    id: "2",
    title: "Gangotri Temple",
    text: "Origin of the Ganges River, dedicated to Goddess Ganga.",
    price: 1500,
    img: Gangotri,
    link: "Read More",
    path: "#",
  },
  {
    id: "3",
    title: "Yamunotri Temple",
    text: "Dedicated to Goddess Yamuna, located at the Yamunotri glacier source.",
    price: 1800,
    img: Yamunotri,
    link: "Read More",
    path: "#",
  },
];

const TempleBookingInfo = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedCard, setSelectedCard] = useState(cardData[0]);
  const [selectedPersons, setSelectedPersons] = useState(1);
  const [, setIsLoggedIn] = useState(false);
  const [, setShowPopup] = useState(false);
  // const [show, setShow] = useState(false);
  const navigate = useNavigate();
  // const [showReadMore, setShowReadMore] = useState(false);
  // const [selectedTemple, setSelectedTemple] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [formResetKey, setFormResetKey] = useState(0);

  const handleAccordionChange = (eventKey) => {
    if (activeAccordion !== eventKey) {
      // Reset form states when switching to a new accordion
      setSelectedDateTime(null);
      setSelectedPersons("");
      setFormResetKey((prev) => prev + 1); // Forces form to re-render clean
      setActiveAccordion(eventKey);
    }
  };

  // Pagination logic
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCards = cardData.slice(indexOfFirstItem, indexOfLastItem);

  // Date/time logic
  const today = new Date();
  const getNextInterval = (date = new Date()) => {
    let minutes = date.getMinutes();
    let nextMinutes = minutes <= 30 ? 30 : 0;
    let nextHour = nextMinutes === 0 ? date.getHours() + 1 : date.getHours();
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      nextHour,
      nextMinutes
    );
  };

  const isToday =
    selectedDateTime &&
    selectedDateTime.getDate() === today.getDate() &&
    selectedDateTime.getMonth() === today.getMonth() &&
    selectedDateTime.getFullYear() === today.getFullYear();

  const minTime = isToday
    ? getNextInterval(today)
    : new Date(today.getFullYear(), today.getMonth(), today.getDate(), 6, 0);
  const maxTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    30
  );
  const totalAmount = selectedCard ? selectedCard.price * selectedPersons : 0;
  const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;

  // Login/Register handler
  const handleLoginRegister = () => setIsLoggedIn(true);

  return (
    <div className="temp-donate">
      <Container className="temp-container-box temp-container-details">
        <div className="temp-detail-btn">
          <h1>Temple Booking</h1>
        </div>

        <Row>
          {/* Left side temple cards */}
          <Col lg={7} md={7} sm={12}>
            <div className="text-center p-2 my-4 temp-regis desktop-mobile">
              <p>
                Kindly click on the <strong>Login</strong> or{" "}
                <strong>Register</strong> button below to continue.
              </p>
              <Row className="mb-3">
                <Col xs={12} md={6}>
                  <Link to="/Login">
                    <Button
                      className="w-100 temp-login-btn"
                      onClick={handleLoginRegister}
                    >
                      Login
                    </Button>
                  </Link>
                </Col>
                <Col xs={12} md={6} className="mt-3">
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
                  lg={4}
                  md={6}
                  sm={6}
                  xs={6}
                  key={item.id}
                  onClick={() => setSelectedCard(item)}
                  style={{ cursor: "pointer" }}
                  className="d-flex"
                >
                  <div
                    className={`card-item flex-fill card card-shadow d-flex flex-column ${selectedCard?.id === item.id ? "active-card" : ""}`}
                  >
                    <div className="card-image-wrapper">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="card-image"

                      />
                    </div>
                    <div className="card-text-temp flex-grow-1 d-flex flex-column">
                      <h5>{item.title}</h5>
                      <h6 className="mb-3">{item.text}</h6>
                      <div className="mt-auto">
                        <Row className="mb-1">
                          <Col lg={12} md={6} className="mb-2">
                            <Button
                              className="click-btn"
                              onClick={() => navigate(item.path)}
                            >
                              {item.link}
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                  {/* Popup Modal for Register/Login message */}
                  <Modal
                    // show={showPopup}
                    onHide={() => setShowPopup(false)}
                    centered
                  >
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                      <div className="text-center p-4 my-4 temp-regis">
                        <h5>
                          <BsInfoCircleFill className="temp-info-icon" />
                          <strong></strong>To continue with your Puja booking,
                          please login or create an account.
                        </h5>
                        <p>
                          Kindly click on the <strong>Login</strong> or{" "}
                          <strong>Register</strong> button below to continue.
                        </p>
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
                    <Modal.Footer className="">
                      <Button
                        className="modal-cloce-btn"
                        onClick={() => setShowPopup(false)}
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Col>
              ))}
            </Row>

            <PagingNation
              totalItems={cardData.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </Col>

          {/* Right side pooja accordion */}

          <Col
            lg={5}
            md={5}
            sm={12}
            className="mt-2 temp-right-side rhs-gob-mob"
          >
            <div className="text-center p-4 my-4 temp-regis">
              <h5>
                <BsInfoCircleFill className="temp-info-icon" />
                To continue with your Mandir booking, please{" "}
                <strong>login</strong> or create an account.
              </h5>
              <p>
                Kindly click on the <strong>Login</strong> or{" "}
                <strong>Register</strong> button below to continue.
              </p>
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
              <h1>{selectedCard?.title || "Temple Booking"}</h1>

              {selectedCard ? (
                <Accordion
                  activeKey={activeAccordion}
                  onSelect={handleAccordionChange}
                  className="temp-accordin-btn"
                >
                  {templePoojas[selectedCard.title]?.map((pooja, index) => (
                    <Accordion.Item
                      eventKey={String(index)}
                      key={index}
                      className="temp-accordin-btn"
                    >
                      <Accordion.Header className="temp-accordin-btn">
                        <div className="d-flex align-items-center">
                          <img
                            src={Diya}
                            alt="pooja"
                            className="img-fluid temp-img-btn me-2"
                          />
                          <div>
                            <div className="temp-accor-heading">
                              {pooja.name}{" "}
                              <span>(₹{pooja.price} per Person)</span>
                            </div>
                            <div className="text-muted small temp-accor-font mt-2">
                              {pooja.subtitle}
                            </div>
                          </div>
                        </div>
                      </Accordion.Header>

                      <Accordion.Body>
                        <Form.Group className="mb-3">
                          <Form.Label className="temp-label">
                            No. of Person{" "}
                            <span className="temp-span-star">*</span>
                          </Form.Label>
                          <Form.Select
                            className="temp-form-control-option"
                            value={selectedPersons}
                            onChange={(e) =>
                              setSelectedPersons(Number(e.target.value))
                            }
                          >
                            {Array.from({ length: 10 }, (_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </Form.Select>

                          <Form.Group className="mb-3 mt-3">
                            <Form.Label className="temp-label mb-2">
                              Temple Booking Date & Time{" "}
                              <span className="temp-span-star">*</span>
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

                          <div className="mt-3">
                            <p>
                              <MdOutlineDateRange className="temple-icon" />{" "}
                              {formattedDate}
                            </p>
                            <p>
                              <FaUsersLine className="temple-icon" />{" "}
                              {selectedPersons} Person(s), Charges ₹
                              {pooja.price} Per Person
                            </p>
                          </div>

                          <div className="text-end mt-2">
                            <p>
                              Applicable Amount:{" "}
                              <span className="amount-span">
                                ₹ {pooja.price * selectedPersons}/-
                              </span>
                            </p>
                          </div>

                          <h2>Cart Total</h2>
                          <p className="border-temp">{pooja.name}</p>
                          <div className="d-flex justify-content-between">
                            <p>
                              {selectedPersons} × ₹{pooja.price}
                            </p>
                            <span className="amount-span">
                              ₹ {pooja.price * selectedPersons}/-
                            </span>
                          </div>

                          <div className="gap-3 mt-3 mb-3 Temp-btn-submit">
                            <Button
                              variant="temp-submit-btn"
                              className="temp-submit-btn mx-3"
                              type="button"
                              onClick={() => {
                                navigate("/MandirBooking", {
                                  state: {
                                    temple_name: selectedCard.title,
                                    pooja_name: pooja.name,
                                    no_of_persons: selectedPersons,
                                    mandir_book_date_and_time: selectedDateTime,
                                    grand_total: pooja.price * selectedPersons,
                                  },
                                });
                              }}
                            >
                              <FaCheck /> Proceed for devotee details
                            </Button>
                          </div>
                        </Form.Group>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              ) : (
                <p className="text-muted">
                  👉 Select a temple to view available Poojas.
                </p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TempleBookingInfo;