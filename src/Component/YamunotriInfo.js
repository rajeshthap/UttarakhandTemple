import React, { useState } from "react";
import { Button, Col, Container, Row, Modal } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import { BsInfoCircleFill } from "react-icons/bs";
import "../assets/CSS/BadrinathInfo.css";
import { FaCalendarAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { FaTrainSubway } from "react-icons/fa6";
import { PiAirplaneTiltFill } from "react-icons/pi";
import { HiSpeakerWave } from "react-icons/hi2";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { SiGooglemaps } from "react-icons/si";
// Correct image imports

import Yamunotri from "../assets/images/YamunotriInfo.jpg";
import "../assets/CSS/TempleBooking.css";
import { useAuth } from "./GlobleAuth/AuthContext";

const YamunotriInfo = () => {
  const navigate = useNavigate();
  const { uniqueId } = useAuth();

  const handleBookClick = () => {
    if (uniqueId) {
      navigate("/TempleBookingInfo");
    } else {
      setShowLoginModal(true);
    }
  };

  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleCloseModal = () => setShowLoginModal(false);

  return (
    <div className="temp-donate">
      <Container className="temp-container-box temp-container-details">
        <div className="temp-detail-btn">
          <h1>Yamunotri Temple – The Origin of the Holy Yamuna </h1>
        </div>
        <Row>
          {/* Left Side Cards */}
          <Col lg={7} md={7} sm={12} className="">
            <div className="text-center p-4 my-4 temp-regis desktop-mobile ">
              {!uniqueId && (
                <>
                  <h5>
                    <BsInfoCircleFill className="temp-info-icon" />
                    <strong></strong>To continue with your Mandir booking,
                    please login or create an account.
                  </h5>
                  <p>
                    Kindly click on the <strong>Login</strong> or{" "}
                    <strong>Register</strong> button below to continue.
                  </p>
                  <Row className="mb-3">
                    <Col xs={12} md={6} className="mb-2 mb-md-0">
                      <Link to="/Login">
                        <Button className="w-100 temp-login-btn">Login</Button>
                      </Link>
                    </Col>
                    <Col xs={12} md={6}>
                      <Link to="/DevoteeRegistration">
                        <Button className="w-100 temp-regis-btn">
                          Register
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </>
              )}
            </div>
            <Row className="g-4">
              <Col lg={5} md={5} sm={12} xs={12} className="pl-2">
                <div className="temp-img">
                  <img
                    src={Yamunotri}
                    alt="Yamunotri Info"
                    className="img-fluid temp-img"
                  />
                </div>
                <Row className="text-center Badri-link align-items-center">
                  <Col className="">
                    <div className="nav-link">
                      <TiWeatherPartlySunny className="temp-icon-2" />
                      <div>
                        <Link
                          to="https://www.accuweather.com/en/in/badrinathpuri/3001096/weather-forecast/3001096"
                          className="temp-weather"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Weather
                        </Link>
                      </div>
                    </div>
                  </Col>

                  <Col className="">
                    <div className="nav-link">
                      <SiGooglemaps className="temp-icon-2" />
                      <div>
                        <Link
                          to="https://maps.app.goo.gl/NS5netSzRbWipeNr8"
                          className="temp-weather"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Google Maps
                        </Link>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col lg={7} md={7} sm={12} xs={12} className="p-0">
                <div className="Badri-card mt-0">
                  <Row className="temp-route">
                    <Col lg={6} md={12} sm={12} xs={12}>
                      <Row>
                        <Col
                          lg={2}
                          md={2}
                          sm={2}
                          xs={2}
                          className="temp-book-icon"
                        >
                          <div className="icon-big text-center temp-icon">
                            <FaCalendarAlt />
                          </div>
                        </Col>
                        <Col
                          lg={10}
                          md={10}
                          sm={10}
                          xs={10}
                          className="temp-card"
                        >
                          <div className="carditem-1">
                            <h3>Best time to visit Yamunotri</h3>
                            <p class="card-title">
                              May, Jun, Jul, Aug, Sep, Oct, Nov
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={6} md={12} sm={12} xs={12}>
                      <Row className="temp-card-mob">
                        <Col lg={2} md={2} sm={2} xs={2}>
                          <div className="icon-big text-center temp-icon">
                            <MdLocationPin />
                          </div>
                        </Col>
                        <Col
                          lg={10}
                          md={10}
                          sm={10}
                          xs={10}
                          className="temp-card"
                        >
                          <div className="carditem-1">
                            <h3>Located in</h3>
                            <p class="card-title">
                              Uttarkashi, Garhwal Uttarakhand
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row className="temp-route">
                    <Col lg={6} md={12} sm={12} xs={12}>
                      <Row>
                        <Col
                          lg={2}
                          md={2}
                          sm={2}
                          xs={2}
                          className="temp-book-icon"
                        >
                          <div className="icon-big text-center temp-icon">
                            <FaCalendarAlt />
                          </div>
                        </Col>
                        <Col
                          lg={10}
                          md={10}
                          sm={10}
                          xs={10}
                          className="temp-card"
                        >
                          <div className="carditem-1">
                            <h3>Recommended Stay</h3>
                            <p class="card-title">1 day</p>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={6} md={12} sm={12} xs={12}>
                      <Row className="temp-card-mob">
                        <Col lg={2} md={2} sm={2} xs={2}>
                          <div className="icon-big text-center temp-icon">
                            <FaTrainSubway />
                          </div>
                        </Col>
                        <Col
                          lg={10}
                          md={10}
                          sm={10}
                          xs={10}
                          className="temp-card"
                        >
                          <div className="carditem-1">
                            <h3>Nearest Railway Station</h3>
                            <p class="card-title">Rishikesh, 200 to 222 kms</p>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row className="temp-route">
                    <Col lg={6} md={12} sm={12} xs={12}>
                      <Row>
                        <Col
                          lg={2}
                          md={2}
                          sm={2}
                          xs={2}
                          className="temp-book-icon"
                        >
                          <div className="icon-big text-center temp-icon">
                            <PiAirplaneTiltFill />
                          </div>
                        </Col>
                        <Col
                          lg={10}
                          md={10}
                          sm={10}
                          xs={10}
                          className="temp-card"
                        >
                          <div className="carditem-1">
                            <h3>Nearest Airport</h3>
                            <p class="card-title">
                              Jolly Grant Airport, 238.9 kms
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={6} md={12} sm={12} xs={12}>
                      <Row className="temp-card-mob">
                        <Col lg={2} md={2} sm={2} xs={2}>
                          <div className="icon-big text-center temp-icon">
                            <HiSpeakerWave />
                          </div>
                        </Col>
                        <Col
                          lg={10}
                          md={10}
                          sm={10}
                          xs={10}
                          className="temp-card"
                        >
                          <div className="carditem-1">
                            <h3>Famous for</h3>
                            <p class="card-title">
                              Kedarnath Temple, Char Dham Yatra, Trekking,
                              Himalayas, Pilgrimage, Panch Kedar
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-center mt-3">
                    <Button
                      className="temp-view-more-btn"
                      onClick={handleBookClick}
                    >
                      Book Puja / Offer Donation
                    </Button>
                  </div>
                </div>
              </Col>
              <Modal
                show={!uniqueId && showLoginModal}
                onHide={handleCloseModal}
                centered
              >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="text-center">
                  <div className="text-center p-4 my-4 temp-regis">
                    <h5>
                      <BsInfoCircleFill className="temp-info-icon" /> To
                      continue with your Puja booking, please{" "}
                      <strong>login</strong> or create an account.
                    </h5>
                    <p>
                      Kindly click on the <strong>Login</strong> or{" "}
                      <strong>Register</strong> button below to continue.
                    </p>
                    <Row className="mb-3">
                      <Col xs={12} md={6} className="mb-2 mb-md-0">
                        <Link to="/Login">
                          <Button className="w-100 temp-login-btn">
                            Login
                          </Button>
                        </Link>
                      </Col>
                      <Col xs={12} md={6}>
                        <Link to="/DevoteeRegistration">
                          <Button className="w-100 temp-regis-btn">
                            Register
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                  </div>
                </Modal.Body>
              </Modal>
              <Container className="mt-4">
                <p>
                  Yamunotri Temple, dedicated to{" "}
                  <span className="text-color">Goddess Yamuna</span>, is one of
                  the sacred <span className="text-color">Char Dham</span>{" "}
                  shrines of Uttarakhand and the first stop in the Char Dham
                  Yatra. Nestled amidst the Garhwal Himalayas at an altitude of
                  about <span className="text-color">3,293 meters</span>, the
                  temple marks the{" "}
                  <span className="text-color">
                    origin of the holy River Yamuna
                  </span>
                  , which is considered the sister of Yama (the God of Death)
                  and the daughter of Surya (the Sun God).
                  <br />
                  Surrounded by snow-clad peaks and serene natural beauty,
                  Yamunotri offers a divine and peaceful experience to every
                  devotee. The journey to this temple involves a scenic trek
                  through dense forests, gushing waterfalls, and hot water
                  springs — a true blend of spirituality and adventure.
                </p>
              </Container>

              <Container>
                <h1>History </h1>

                <p>
                  The <span className="text-color">original temple</span> of
                  Yamunotri is believed to have been constructed by{" "}
                  <span className="text-color">
                    Maharaja Pratap Shah of Tehri Garhwal
                  </span>{" "}
                  in the <span className="text-color">19th century</span>.
                  However, the{" "}
                  <span className="text-color">spiritual significance</span> of
                  this site dates back to{" "}
                  <span className="text-color">ancient times</span>, as it is
                  mentioned in various
                  <span className="text-color">
                    {" "}
                    Hindu scriptures and Puranas
                  </span>
                  . According to mythology,{" "}
                  <span className="text-color">Goddess Yamuna</span> is revered
                  for her purity and benevolence. It is believed that taking a
                  dip in the Yamuna River absolves one of sins and protects from
                  untimely death.
                  <br />
                  <br />
                  Near the temple lies the{" "}
                  <span className="text-color">Divya Shila</span>, a sacred rock
                  where devotees offer prayers before entering the temple, and
                  the <span className="text-color">Surya Kund</span>, a hot
                  water spring where rice and potatoes are cooked and offered as
                  prasad to the deity.
                  <br />
                  <br />
                  Despite the extreme climatic conditions, the temple continues
                  to attract thousands of pilgrims each year, who visit to seek
                  the blessings of{" "}
                  <span className="text-color">Maa Yamuna</span> and begin their{" "}
                  <span className="text-color">
                    spiritual Char Dham journey
                  </span>{" "}
                  from this divine abode.
                </p>
              </Container>
            </Row>
          </Col>
          {!uniqueId && (
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
            </Col>
          )}
          {/* Right Side Info */}
          <Col lg={4} md={4} sm={12}>
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
                <h2 className="mt-2 mb-3">Accepted Payment Methods</h2>
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
    </div>
  );
};

export default YamunotriInfo;
