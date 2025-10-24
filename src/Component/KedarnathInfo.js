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

import Kedarnath from "../assets/images/KedarnathInfo.jpg";
import "../assets/CSS/TempleBooking.css";
import { useAuth } from "./GlobleAuth/AuthContext";

const KedarnathInfo = () => {
  const navigate = useNavigate();
  const { uniqueId } = useAuth();

  const handleBookClick = () => {
    if (uniqueId) {
      // User logged in → navigate directly
      navigate("/TempleBookingInfo");
    } else {
      // User NOT logged in → show modal
      setShowLoginModal(true);
    }
  };

  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleCloseModal = () => setShowLoginModal(false);
  const [, setShow] = useState(false);
  const [] = useState(null);

  const [, setIsLoggedIn] = useState(false); // Login state

  const handleShow = () => setShow(true);

  const handleLoginRegister = () => setIsLoggedIn(true);
  return (
    <div className="temp-donate">
      <Container className="temp-container-box temp-container-details">
        <div className="temp-detail-btn">
          <h1>Kedarnath Temple - The Sacred Abode Of Lord Shiva</h1>
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
                </>
              )}
            </div>
            <Row className="g-4">
              <Col lg={5} md={5} sm={12} xs={12} className="pl-2">
                <div className="temp-img">
                  <img
                    src={Kedarnath}
                    alt="Kedarnath Info"
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
                            <h3>Best time to visit Kedarnath</h3>
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
                              Rudraprayag, Garhwal Uttarakhand
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
                            <p class="card-title">1 days</p>
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
                            <p class="card-title">Rishikesh, 210-216 kms</p>
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
                              Jolly Grant Airport,238-244 kms
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
                              Kedarnath temple, Char Dham Yatra, Trekking,
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
              {!uniqueId && (
                <Modal
                  show={showLoginModal}
                  onHide={() => setShowLoginModal(false)}
                  centered
                >
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body className="text-center">
                    <div className="text-center p-4 my-4 temp-regis">
                      <h5>
                        <BsInfoCircleFill className="temp-info-icon" />
                        To continue with your Puja booking, please{" "}
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
                  </Modal.Body>
                </Modal>
              )}
              <Container className="mt-4">
                <p>
                  <span className="text-color">Kedarnath Temple</span> is one of
                  the most revered pilgrimage destinations in Northern India,
                  nestled amidst the majestic Himalayas on the banks of the
                  sacred <span className="text-color"> Mandakini River</span>.
                  Situated at an altitude of{" "}
                  <span className="text-color">
                    3,584 meters above sea level
                  </span>
                  , this ancient temple stands as a symbol of unwavering faith
                  and devotion to <span className="text-color">Lord Shiva</span>
                  .
                  <br />
                  <br />
                  The region, historically known as{" "}
                  <span className="text-color">“Kedar Khand”</span>, holds
                  immense spiritual significance and is deeply rooted in Hindu
                  mythology. <span className="text-color">Kedarnath</span> forms
                  an integral part of both the{" "}
                  <span className="text-color">Char Dham Yatra</span> and the{" "}
                  <span className="text-color">Panch Kedar circuit</span> of
                  Uttarakhand. It is also one of the{" "}
                  <span className="text-color">twelve Jyotirlingas</span> of{" "}
                  <span className="text-color">Lord Shiva</span> spread across
                  India, making it one of the holiest shrines for devotees.
                  <br />
                  <br />
                  Nestled amidst the snow-clad peaks of the Garhwal Himalayas,{" "}
                  <span className="text-color">Kedarnath Temple</span> stands as
                  one of the holiest and most revered shrines dedicated to{" "}
                  <span className="text-color">Lord Shiva</span>. Situated in
                  the{" "}
                  <span className="text-color">
                    Chamoli district of Uttarakhand
                  </span>
                  , the region itself is home to over{" "}
                  <span className="text-color">200 Shiva temples</span>, with
                  Kedarnath being the most significant and spiritually powerful
                  among them.
                  <br />
                  According to Hindu mythology, after the{" "}
                  <span className="text-color">Kurukshetra War</span>, the{" "}
                  <span className="text-color">Pandavas</span>, burdened by
                  guilt for killing their own kin, sought Lord Shiva’s blessings
                  for redemption. The Lord, wishing to avoid them, took the form
                  of a <span className="text-color">bull (Nandi)</span> and fled
                  towards the Himalayas. When the Pandavas finally found him at{" "}
                  <span className="text-color">Kedarnath</span>, Shiva dived
                  into the earth, leaving behind his{" "}
                  <span className="text-color">hump</span> on the surface —
                  which is worshipped here.
                  <br />
                  The{" "}
                  <span className="text-color">
                    other parts of Lord Shiva’s body
                  </span>{" "}
                  appeared in four different places:
                  <br />
                  <ul>
                    <li>
                      Arms at <span className="text-color">Tungnath</span>
                    </li>
                    <li>
                      Face at <span className="text-color">Rudranath</span>
                    </li>
                    <li>
                      Navel at <span className="text-color">Madhmaheshwar</span>
                    </li>
                    <li>
                      Hair and head at{" "}
                      <span className="text-color">Kalpeshwar</span>
                    </li>
                  </ul>
                  Together with Kedarnath, these five sacred sites are known as
                  the <span className="text-color">Panch Kedar </span>(meaning
                  “Five Kedars” in Sanskrit), each representing a divine
                  manifestation of Lord Shiva.
                  <br />
                  The temple itself presents a majestic sight, standing tall on
                  a vast plateau surrounded by towering, snow-covered peaks. The
                  original shrine was rebuilt in the{" "}
                  <span className="text-color">8th century AD</span> by{" "}
                  <span className="text-color">
                    Jagad Guru Adi Shankaracharya
                  </span>
                  , close to the site of an even older temple said to have been
                  constructed by the{" "}
                  <span className="text-color">Pandavas</span>.
                  <br />
                  Architecturally, the temple is an awe-inspiring masterpiece.
                  Built from{" "}
                  <span className="text-color">
                    massive, evenly cut grey stone slabs
                  </span>
                  , it raises wonder as to how such heavy stones were
                  transported and assembled centuries ago in this remote
                  mountain terrain. The temple comprises a{" "}
                  <span className="text-color">Garbha Griha</span> (sanctum)
                  that houses the sacred Jyotirlinga and a{" "}
                  <span className="text-color">Mandapa</span> (assembly hall)
                  adorned with intricate carvings of deities and mythological
                  scenes. Outside the entrance, a grand{" "}
                  <span className="text-color">statue of Nandi</span>, the
                  divine bull and Lord Shiva’s mount, stands guard.
                  <br />
                  The conical rock formation inside the sanctum is worshipped as{" "}
                  <span className="text-color">
                    Lord Shiva in his Sadashiva form
                  </span>
                  , symbolizing eternal truth and divine energy.
                  <br />
                  Encircled by serene beauty and the chants of devotees,{" "}
                  <span className="text-color">Kedarnath</span> is not just a
                  temple — it is an experience of faith, resilience, and
                  spiritual awakening amidst the Himalayan silence.
                </p>
              </Container>

              <Container>
                <h1>History</h1>
                <h3>Kedarnath Temple – The Eternal Abode of Lord Shiva</h3>
                <p>
                  Perched majestically at an altitude of{" "}
                  <span className="text-color">3,581 meters</span> in the{" "}
                  <span className="text-color">Rudra Himalaya range</span> of
                  Uttarakhand,{" "}
                  <span className="text-color">Kedarnath Temple </span>stands as
                  one of the holiest and most awe-inspiring shrines of Lord
                  Shiva. It is believed that Lord Shiva manifested here in the
                  form of a <span className="text-color">Jyotirlinga</span>, a
                  pillar of divine cosmic light. Among the{" "}
                  <span className="text-color">twelve Jyotirlingas</span> spread
                  across India, <span className="text-color">Kedarnath</span> is
                  the highest and one of the most spiritually significant.
                  <br />
                  <br />
                  Built over a thousand years ago by{" "}
                  <span className="text-color">
                    Jagad Guru Adi Shankaracharya
                  </span>
                  , this ancient stone temple stands as a timeless symbol of
                  devotion, strength, and architectural brilliance. It is
                  located near the{" "}
                  <span className="text-color">
                    origin of the Mandakini River
                  </span>{" "}
                  and can be reached after a{" "}
                  <span className="text-color">16 km trek from Gaurikund</span>,
                  surrounded by snow-clad Himalayan peaks and serene natural
                  beauty.
                  <br />
                  <br />
                  <h3>Architecture and Sanctity </h3>
                  The temple is constructed from{" "}
                  <span className="text-color">
                    massive grey stone slabs
                  </span>{" "}
                  resting on a large rectangular platform. A broad flight of
                  steps leads devotees to the sanctum, where inscriptions in the{" "}
                  <span className="text-color">ancient Pali language</span> can
                  still be seen on the stones. The{" "}
                  <span className="text-color">inner walls</span> of the shrine
                  are beautifully adorned with carvings of deities and scenes
                  from sacred Hindu mythology.
                  <br />
                  Inside the <span className="text-color">Garbha Griha </span>
                  (sanctum) lies a{" "}
                  <span className="text-color">
                    natural conical rock formation
                  </span>
                  , revered as the divine manifestation of{" "}
                  <span className="text-color">
                    Lord Shiva in his Sadashiva form
                  </span>
                  . This sacred rock represents the{" "}
                  <span className="text-color">hump of the Lord</span>, believed
                  to have appeared when He disappeared into the ground to evade
                  the Pandavas. The{" "}
                  <span className="text-color">priests and devotees</span>{" "}
                  perform daily pujas and archanas here with deep reverence.
                  Alongside the main form, there is also a{" "}
                  <span className="text-color">
                    portable idol of Lord Shiva (Utsava Murti)
                  </span>{" "}
                  that is used during special rituals and processions.
                  <br />
                  Standing guard outside the temple is the grand{" "}
                  <span className="text-color">statue of Nandi</span>, the
                  divine bull and faithful vehicle of Lord Shiva — a symbol of
                  eternal devotion and strength.
                  <br />
                  <br />
                  <h3>Legend and Divine Origin </h3>
                  The{" "}
                  <span className="text-color">
                    origin of Kedarnath Temple
                  </span>{" "}
                  is deeply rooted in the epic Mahabharata. After the great war
                  of Kurukshetra, the{" "}
                  <span className="text-color">Pandavas</span>, burdened with
                  guilt for having slain their kin, sought forgiveness from Lord
                  Shiva. To test their devotion, Shiva took the form of a{" "}
                  <span className="text-color">bull (Nandi)</span> and eluded
                  them repeatedly through the Himalayas. When He finally
                  appeared at Kedarnath, He dived into the earth, leaving behind
                  His hump on the surface — which is now enshrined in the
                  temple.
                  <br />
                  <span className="text-color">
                    The other parts of Lord Shiva’s body
                  </span>{" "}
                  appeared in four sacred places — Tungnath (arms), Rudranath
                  (face), Madhmaheshwar (navel), and Kalpeshwar (hair and head)
                  — collectively known as the{" "}
                  <span className="text-color">Panch Kedar</span>, the five holy
                  abodes of Lord Shiva.
                  <br />
                  <br />
                  <h3>Seasonal Worship and Rituals </h3>
                  Due to <span className="text-color">extreme winters</span> and
                  heavy snowfall from{" "}
                  <span className="text-color">November to April</span>, the
                  temple remains closed during these months. Before the onset of
                  winter, on an auspicious day announced by the{" "}
                  <span className="text-color">
                    Badrinath-Kedarnath Temple Committee (BKTC)
                  </span>
                  , the{" "}
                  <span className="text-color">
                    Utsava Murti (symbolic idol)
                  </span>{" "}
                  of Lord Shiva is ceremoniously carried from Kedarnath to{" "}
                  <span className="text-color">Ukhimath</span>, where it is
                  worshipped throughout the winter.
                  <br />
                  In <span className="text-color">May</span>, as the snow melts
                  and the paths reopen, the idol is reverently brought back to
                  Kedarnath amid chants, prayers, and hymns, marking the
                  reopening of the temple for pilgrims. The shrine usually
                  closes on the{" "}
                  <span className="text-color">
                    first day of Kartik (October–November)
                  </span>{" "}
                  and reopens in{" "}
                  <span className="text-color">Vaishakh (April–May)</span> each
                  year.
                  <br />
                  <br />
                  <h3>A Journey of Faith </h3>
                  The pilgrimage to Kedarnath is not merely a physical journey
                  through the mountains — it is a spiritual voyage into the
                  heart of divinity. Surrounded by the{" "}
                  <span className="text-color">
                    awe-inspiring silence of the Himalayas
                  </span>
                  , the temple stands as a living symbol of faith, resilience,
                  and the eternal presence of Lord Shiva.
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

export default KedarnathInfo;
