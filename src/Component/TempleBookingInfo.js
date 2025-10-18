import React, { useState, useEffect } from "react";
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
import Diya from "../assets/images/Diya.png";
import "../assets/CSS/TempleBooking.css";
import PagingNation from "./paging/PagingNation";
import { useAuth } from "../Component/GlobleAuth/AuthContext";

const TempleBookingInfo = () => {
  const [templeData, setTempleData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedPersons, setSelectedPersons] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false); // ✅ Modal state

  const navigate = useNavigate();
  const { uniqueId } = useAuth(); // ✅ detect if user is logged in

  useEffect(() => {
    fetch("https://mahadevaaya.com/backend/api/temple-poojas-list/")
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data);
        setTempleData(data);
        if (data.length > 0) setSelectedCard(data[0]);
      })
      .catch((error) => console.error("Error fetching temple data:", error));
  }, []);

  const getImageUrl = (imgPath) => {
    if (!imgPath)
      return "https://mahadevaaya.com/backend/media/temple_images/default.png";
    const filename = imgPath.split("/").pop();
    return `https://mahadevaaya.com/backend/media/temple_images/${filename}`;
  };

  // Pagination logic
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCards = templeData.slice(indexOfFirstItem, indexOfLastItem);

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
  const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;

  const handleAccordionChange = (eventKey) => {
    if (activeAccordion !== eventKey) {
      setSelectedDateTime(null);
      setSelectedPersons(1);
      setActiveAccordion(eventKey);
    }
  };

  // ✅ Handle temple image click
  const handleCardClick = (item) => {
    if (!uniqueId) {
      setShowModal(true);
      return;
    }
    setSelectedCard(item);
  };

  return (
    <div className="temp-donate">
      <Container className="temp-container-box temp-container-details">
        <div className="temp-detail-btn">
          <h1>Temple Booking</h1>
        </div>
        <Row>
          {/* Left side temple cards */}
          <Col lg={7} md={7} sm={12}>
            {!uniqueId && (
              <div className="text-center p-2 my-4 temp-regis desktop-mobile">
                <p>
                  Kindly click on the <strong>Login</strong> or{" "}
                  <strong>Register</strong> button below to continue.
                </p>
                <Row className="mb-3">
                  <Col xs={12} md={6}>
                    <Link to="/Login">
                      <Button className="w-100 temp-login-btn">Login</Button>
                    </Link>
                  </Col>
                  <Col xs={12} md={6} className="mt-3">
                    <Link to="/DevoteeRegistration">
                      <Button className="w-100 temp-regis-btn">
                        Register
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </div>
            )}

            {/* Temple cards */}
            <Row className="g-4">
              {currentCards.map((item, idx) => (
                <Col
                  lg={4}
                  md={6}
                  sm={6}
                  xs={6}
                  key={idx}
                  onClick={() => handleCardClick(item)} // ✅ Updated click logic
                  style={{ cursor: "pointer" }}
                  className="d-flex"
                >
                  <div
                    className={`card-item flex-fill card card-shadow d-flex flex-column ${
                      selectedCard?.temple_name === item.temple_name
                        ? "active-card"
                        : ""
                    }`}
                  >
                    <div className="card-image-wrapper">
                      <img
                        src={getImageUrl(item.temple_image)}
                        alt={item.temple_name}
                        className="card-image"
                      />
                    </div>

                    <div className="card-text-temp flex-grow-1 d-flex flex-column">
                      <h5>{item.temple_name}</h5>
                      <h6 className="mb-3">{item.temple_description}</h6>
                      <div className="mt-auto">
                        <Row className="mb-1">
                          <Col lg={12} md={6} className="mb-2 text-center">
                            {item.temple_name === "Kedarnath Temple" && (
                              <Link
                                to="/KedarnathInfo"
                                className="click-btn btn btn-primary"
                              >
                                Read More..
                              </Link>
                            )}
                            {item.temple_name === "Badrinath Temple" && (
                              <Link
                                to="/BadrinathInfo"
                                className="click-btn btn btn-primary"
                              >
                                Read More..
                              </Link>
                            )}
                            {item.temple_name === "Yamunotri Temple" && (
                              <Link
                                to="/YamunotriInfo"
                                className="click-btn btn btn-primary"
                              >
                                Read More..
                              </Link>
                            )}
                            {item.temple_name === "Gangotri Temple" && (
                              <Link
                                to="/GangotriInfo"
                                className="click-btn btn btn-primary"
                              >
                                Read More..
                              </Link>
                            )}
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
            <PagingNation
              totalItems={templeData.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </Col>

          {/* Right side pooja accordion */}
          <Col lg={5} md={5} sm={12} className="mt-2 temp-right-side rhs-gob-mob">
            {!uniqueId && (
              <div className="text-center p-4 my-4 temp-regis">
                <h5>
                  <BsInfoCircleFill className="temp-info-icon" />
                  To continue with your Mandir booking, please{" "}
                  <strong>login</strong> or create an account.
                </h5>
                <Row className="mb-3">
                  <Col xs={12} md={6} className="mb-2 mb-md-0">
                    <Link to="/Login">
                      <Button className="w-100 temp-login-btn">Login</Button>
                    </Link>
                  </Col>
                  <Col xs={12} md={6}>
                    <Link to="/DevoteeRegistration">
                      <Button className="w-100 temp-regis-btn">Register</Button>
                    </Link>
                  </Col>
                </Row>
              </div>
            )}

            <div
              className={`tem-rhs-info temp-right-side-style ${
                !uniqueId ? "disabled-section" : ""
              }`}
              style={{
                pointerEvents: !uniqueId ? "none" : "auto",
                opacity: !uniqueId ? 0.5 : 1,
              }}
            >
              <h1>{selectedCard?.temple_name || "Temple Booking"}</h1>

              {selectedCard && selectedCard.poojas?.length > 0 ? (
                <Accordion
                  activeKey={activeAccordion}
                  onSelect={handleAccordionChange}
                  className="temp-accordin-btn"
                >
                  {selectedCard.poojas.map((pooja, index) => (
                    <Accordion.Item
                      eventKey={String(index)}
                      key={pooja.temple_pooja_id}
                      className="temp-accordin-btn"
                    >
                      <Accordion.Header>
                        <div className="d-flex align-items-center">
                          <img
                            src={Diya}
                            alt="pooja"
                            className="img-fluid temp-img-btn me-2"
                          />
                          <div>
                            <div className="temp-accor-heading">
                              {pooja.temple_pooja_name}{" "}
                              <span>
                                (₹{pooja.temple_pooja_price} per Person)
                              </span>
                            </div>
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Form.Group className="mb-3">
                          <Form.Label className="temp-label">
                            No. of Person <span className="temp-span-star">*</span>
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
                              {pooja.temple_pooja_price} Per Person
                            </p>
                          </div>

                          <div className="text-end mt-2">
                            <p>
                              Applicable Amount:{" "}
                              <span className="amount-span">
                                ₹{" "}
                                {pooja.temple_pooja_price * selectedPersons}/-
                              </span>
                            </p>
                          </div>

                          <h2>Cart Total</h2>
                          <p className="border-temp">
                            {pooja.temple_pooja_name}
                          </p>

                          <div className="d-flex justify-content-between">
                            <p>
                              {selectedPersons} × ₹{pooja.temple_pooja_price}
                            </p>
                            <span className="amount-span">
                              ₹{" "}
                              {pooja.temple_pooja_price * selectedPersons}/-
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
                                    temple_name: selectedCard.temple_name,
                                    pooja_details: `${pooja.temple_pooja_name} - ₹${pooja.temple_pooja_price}`,
                                    no_of_persons: selectedPersons,
                                    book_date_and_time: selectedDateTime,
                                    grand_total:
                                      pooja.temple_pooja_price *
                                      selectedPersons,
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

      {/*  Login/Register Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>
            To continue with temple booking, please{" "}
            <strong>Login</strong> or <strong>Register</strong>.
          </p>
          <Row className="mb-3">
            <Col xs={12} md={6} className="mb-2">
              <Link to="/Login">
                <Button
                  className="w-100 temp-login-btn"
                  onClick={() => setShowModal(false)}
                >
                  Login
                </Button>
              </Link>
            </Col>
            <Col xs={12} md={6}>
              <Link to="/DevoteeRegistration">
                <Button
                  className="w-100 temp-regis-btn"
                  onClick={() => setShowModal(false)}
                >
                  Register
                </Button>
              </Link>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TempleBookingInfo;
