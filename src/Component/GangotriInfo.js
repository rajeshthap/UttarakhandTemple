import React, { useState } from "react";
import { Button, Col, Container, Row, Form, Modal } from "react-bootstrap";

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

import Gangotri from "../assets/images/GangotriInfo.jpg";

import "../assets/CSS/TempleBooking.css";
import { useAuth } from "./GlobleAuth/AuthContext";

const GangotriInfo = () => {
    const navigate = useNavigate();
    const { uniqueId } = useAuth();

    const handleBookClick = () => {
        if (uniqueId) {
            // User logged in → navigate directly
            navigate("/MandirBooking");
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
                    <h1>Gangotri Temple – The Origin of the Holy Ganga </h1>
                </div>
                <Row>
                    {/* Left Side Cards */}
                    <Col lg={7} md={7} sm={12} className="">
                        <div className="text-center p-4 my-4 temp-regis desktop-mobile ">
                            {!uniqueId && (
                                <>
                                    <h5>
                                        <BsInfoCircleFill className="temp-info-icon" />
                                        <strong></strong>To continue with your Mandir booking, please login
                                        or create an account.
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
                                </>)}
                        </div>
                        <Row className="g-4">
                            <Col lg={5} md={5} sm={12} xs={12} className="pl-2" >

                                <div className="temp-img">
                                    <img src={Gangotri} alt="Gangotri Info"
                                        className="img-fluid temp-img" />


                                </div>
                                <Row className="text-center Badri-link align-items-center">
                                    <Col className="">
                                        <div className="nav-link">

                                            <TiWeatherPartlySunny className="temp-icon-2" />
                                            <div>
                                                <Link to="https://www.accuweather.com/en/in/badrinathpuri/3001096/weather-forecast/3001096" className="temp-weather">Weather</Link>

                                            </div>
                                        </div>

                                    </Col>

                                    <Col className="">
                                        <div className="nav-link">

                                            <SiGooglemaps className="temp-icon-2" />
                                            <div>
                                                <Link to="https://maps.app.goo.gl/NS5netSzRbWipeNr8" className="temp-weather">Google Maps</Link>
                                            </div>
                                        </div>

                                    </Col>
                                </Row>
                            </Col>

                            <Col lg={7} md={7} sm={12} xs={12} className="p-0">
                                <div className="Badri-card mt-0">
                                    <Row className="temp-route">
                                        <Col lg={6} md={12} sm={12} xs={12} >
                                            <Row>
                                                <Col lg={2} md={2} sm={2} xs={2} className="temp-book-icon" >
                                                    <div className="icon-big text-center temp-icon">
                                                        <FaCalendarAlt /></div>
                                                </Col>
                                                <Col lg={10} md={10} sm={10} xs={10} className="temp-card" >
                                                    <div className="carditem-1">
                                                        <h3>Best time to visit Gangotri</h3>
                                                        <p class="card-title">May, Jun, Jul, Aug, Sep, Oct, Nov</p>
                                                    </div></Col></Row>
                                        </Col>
                                        <Col lg={6} md={12} sm={12} xs={12}  >
                                            <Row className="temp-card-mob">
                                                <Col lg={2} md={2} sm={2} xs={2}  >
                                                    <div className="icon-big text-center temp-icon">
                                                        <MdLocationPin /></div>
                                                </Col>
                                                <Col lg={10} md={10} sm={10} xs={10} className="temp-card" >
                                                    <div className="carditem-1">
                                                        <h3>Located in</h3>
                                                        <p class="card-title">Uttarkashi, Garhwal Uttarakhand</p>
                                                    </div></Col></Row>
                                        </Col>
                                    </Row>



                                    <Row className="temp-route">
                                        <Col lg={6} md={12} sm={12} xs={12} >
                                            <Row>
                                                <Col lg={2} md={2} sm={2} xs={2} className="temp-book-icon" >
                                                    <div className="icon-big text-center temp-icon">
                                                        <FaCalendarAlt /></div>
                                                </Col>
                                                <Col lg={10} md={10} sm={10} xs={10} className="temp-card" >
                                                    <div className="carditem-1">
                                                        <h3>Recommended Stay</h3>
                                                        <p class="card-title">1 to 2 days</p>
                                                    </div></Col></Row>
                                        </Col>
                                        <Col lg={6} md={12} sm={12} xs={12}  >
                                            <Row className="temp-card-mob">
                                                <Col lg={2} md={2} sm={2} xs={2} >
                                                    <div className="icon-big text-center temp-icon">
                                                        <FaTrainSubway /></div>
                                                </Col>
                                                <Col lg={10} md={10} sm={10} xs={10} className="temp-card" >
                                                    <div className="carditem-1">
                                                        <h3>Nearest Railway Station</h3>
                                                        <p class="card-title">Rishikesh, 234 to 250 kms</p>
                                                    </div></Col></Row>
                                        </Col>
                                    </Row>


                                    <Row className="temp-route">
                                        <Col lg={6} md={12} sm={12} xs={12} >
                                            <Row>
                                                <Col lg={2} md={2} sm={2} xs={2} className="temp-book-icon" >
                                                    <div className="icon-big text-center temp-icon">
                                                        <PiAirplaneTiltFill /></div>
                                                </Col>
                                                <Col lg={10} md={10} sm={10} xs={10} className="temp-card" >
                                                    <div className="carditem-1">
                                                        <h3>Nearest Airport</h3>
                                                        <p class="card-title">Jolly Grant Airport, 287 kms</p>
                                                    </div></Col></Row>
                                        </Col>
                                        <Col lg={6} md={12} sm={12} xs={12}  >
                                            <Row className="temp-card-mob">
                                                <Col lg={2} md={2} sm={2} xs={2}  >
                                                    <div className="icon-big text-center temp-icon">
                                                        <HiSpeakerWave /></div>
                                                </Col>
                                                <Col lg={10} md={10} sm={10} xs={10} className="temp-card" >
                                                    <div className="carditem-1">
                                                        <h3>Famous for</h3>
                                                        <p class="card-title">Badrinath, Kedarnath and Yamunotri</p>
                                                    </div></Col></Row>
                                        </Col>
                                    </Row>
                                    <div className="d-flex justify-content-center mt-3">
                                        <Link to="/MandirBooking"><Button className="temp-view-more-btn" onClick={handleBookClick}>Book Puja / Offer Donation</Button></Link>
                                    </div>
                                </div>

                            </Col>
                            {!uniqueId && (

                                <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
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
                                    <span className="text-color">Gangotri Temple</span>, dedicated to <span className="text-color">Goddess Ganga</span>, is one of the most sacred shrines in India and a vital part of the <span className="text-color">Char Dham Yatra</span> in Uttarakhand. Located at an altitude of <span className="text-color">3,100 meters</span> in the <span className="text-color">Uttarkashi district</span>, the temple marks the origin of the <span className="text-color">River Ganga</span>, which is believed to have descended from heaven to cleanse the sins of mankind.
                                </p>
                            </Container>

                            <Container>
                                <h1>History </h1>

                                <p>
                                    The present temple was built in the 18th century by Amar Singh Thapa, a Gorkha general, and later renovated by the Maharaja of Jaipur. The structure is made entirely of white granite, giving it a serene and divine appearance against the backdrop of snow-clad Himalayan peaks.
                                    <br />

                                    According to Hindu mythology, King Bhagirath performed intense penance here to bring the Goddess Ganga down from heaven to Earth to purify the souls of his ancestors. Pleased by his devotion, Lord Shiva received Ganga in his matted locks to soften her descent, and thus the sacred river began flowing from the Gaumukh Glacier, about 19 km upstream from Gangotri.
                                    <br />
                                    <br />
                                    <h3>Temple and Pilgrimage </h3>
                                    The main sanctum houses a beautiful silver idol of Goddess Ganga, symbolizing purity and divine grace. Every year, thousands of devotees visit Gangotri to seek blessings and take a holy dip in the Bhagirathi River.
                                    <br />

                                    The temple opens in May (on Akshaya Tritiya) and closes in November (on Diwali). During winter, due to heavy snowfall, the idol of Goddess Ganga is moved to Mukhba village, near Harsil, where prayers continue until the temple reopens.
                                    <br />
                                    <br />
                                    <h3>Spiritual Essence </h3>
                                    Gangotri is not only a temple but a sacred symbol of faith, purity, and devotion. It marks the beginning of the Ganga’s journey — a river revered as the lifeline of India — and represents the eternal connection between the divine, nature, and humanity.

                                </p>
                            </Container>
                        </Row>


                    </Col>
                    {!uniqueId && (
                        <Col lg={5} md={5} sm={12} className="mt-2 temp-right-side rhs-gob-mob">
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
                </Row>
            </Container>
        </div>
    );
};

export default GangotriInfo;
