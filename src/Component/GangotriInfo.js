import React, { useState, useEffect } from "react";
import { Accordion, Button, Col, Container, Row, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { FaUsersLine } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { BsInfoCircleFill } from "react-icons/bs";
import "../assets/CSS/BadrinathInfo.css";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { FaTrainSubway } from "react-icons/fa6";
import { PiAirplaneTiltFill } from "react-icons/pi";
import { HiSpeakerWave } from "react-icons/hi2";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { SiGooglemaps } from "react-icons/si";
// Correct image imports

import Gangotri from "../assets/images/GangotriInfo.jpg";
import Diya from "../assets/images/Diya.png";
import "../assets/CSS/TempleBooking.css";



const GangotriInfo = () => {
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    // Helper to round up to next 30 min interval
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

    const today = new Date();
    const isToday =
        selectedDateTime &&
        selectedDateTime.getDate() === today.getDate() &&
        selectedDateTime.getMonth() === today.getMonth() &&
        selectedDateTime.getFullYear() === today.getFullYear();

    // 6:00 AM
    const minTime = isToday
        ? getNextInterval(today)
        : new Date(today.getFullYear(), today.getMonth(), today.getDate(), 6, 0);
    // 11:30 PM
    const maxTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        30
    );

    const [, setShow] = useState(false);
    const [selectedPersons, setSelectedPersons] = useState(1);
    const [selectedCard, ] = useState(null);

    const [, setIsLoggedIn] = useState(false); // Login state


  

    const handleShow = () => setShow(true);
    // const [, setPujaDate] = useState("");
    // const [, setPujaTime] = useState("");
    // Default select the first ceremony on mount
    useEffect(() => {

    }, []);
    // Correct total calculation
    const totalAmount = selectedCard
        ? selectedCard.price * selectedPersons
        : 0;
    //  Login/Register button handler
    const handleLoginRegister = () => setIsLoggedIn(true);

    const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;

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
                                      <Link to="/MandirBooking"><Button className="temp-view-more-btn">Book Puja / Offer Donation</Button></Link>
                                    </div>
                                </div>

                            </Col>
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
                                    <br/>

                                    The temple opens in May (on Akshaya Tritiya) and closes in November (on Diwali). During winter, due to heavy snowfall, the idol of Goddess Ganga is moved to Mukhba village, near Harsil, where prayers continue until the temple reopens.
                                      <br />
                                    <br />
                                    <h3>Spiritual Essence </h3>
                                    Gangotri is not only a temple but a sacred symbol of faith, purity, and devotion. It marks the beginning of the Ganga’s journey — a river revered as the lifeline of India — and represents the eternal connection between the divine, nature, and humanity. 

                                </p>
                            </Container>
                        </Row>


                    </Col>

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

                        <div className="tem-rhs-info temp-right-side-style">
                            <h1>Temple Booking</h1>

                            {selectedCard ? (
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header className="accordion-header-title">
                                            {selectedCard.title}{" "}
                                            <span className="temp-span-temple">
                                                (₹{selectedCard.price} per person)
                                            </span>
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
                                                        Pooja Date & Time{" "}
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
                                              

                                                {/* Info */}
                                                <div className="mt-3">
                                                    <p>
                                                        <MdOutlineDateRange className="temple-icon" />{" "}
                                                        {formattedDate}
                                                    </p>
                                                    <p>
                                                        <FaUsersLine className="temple-icon" />{" "}
                                                        {selectedPersons} Person(s), Charges ₹
                                                        {selectedCard.price} Per Person
                                                    </p>
                                                </div>

                                                {/* Amount */}
                                                <div className="text-end mt-2">
                                                    <p>
                                                        Applicable Amount:{" "}
                                                        <span className="amount-span">₹ {totalAmount}/-</span>
                                                    </p>
                                                </div>

                                                {/* Cart */}
                                                <h2>Cart Total</h2>
                                                <p className="border-temp">{selectedCard.title}</p>
                                                <div className="d-flex justify-content-between">
                                                    <p>
                                                        {selectedPersons} × ₹{selectedCard.price}
                                                    </p>
                                                    <span className="amount-span">₹ {totalAmount}/-</span>
                                                </div>

                                                {/* Button */}
                                                <div className="gap-3 mt-3 mb-3 Temp-btn-submit">
                                                    <Button
                                                        variant="temp-submit-btn"
                                                        className="temp-submit-btn mx-3"
                                                        type="submit"
                                                        onClick={handleShow}
                                                    >
                                                        <FaCheck /> Proceed for devotee details
                                                    </Button>
                                                </div>

                                                <Accordion alwaysOpen={false} className="temp-accordin-btn">
                                                    <Accordion.Item eventKey="0" className="temp-accordin-btn">
                                                        <Accordion.Header className="temp-accordin-btn">
                                                            {" "}
                                                            <div>
                                                                <img
                                                                    src={Diya}
                                                                    alt="img not found"
                                                                    className="img-fluid temp-img-btn"
                                                                ></img>
                                                            </div>{" "}
                                                            Ved Path <span>(₹2500 per Person)</span>
                                                        </Accordion.Header>
                                                        <Accordion.Body>
                                                            <Form.Group className="mb-3">
                                                                Ved Path <span>(₹2500 per Person)</span>
                                                            </Form.Group>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>

                                                <Accordion alwaysOpen={false} className="temp-accordin-btn">
                                                    <Accordion.Item eventKey="0" className="temp-accordin-btn">
                                                        <Accordion.Header className="temp-accordin-btn">
                                                            {" "}
                                                            <div>
                                                                <img
                                                                    src={Diya}
                                                                    alt="img not found"
                                                                    className="img-fluid temp-img-btn"
                                                                ></img>
                                                            </div>{" "}
                                                            Ved Path <span>(₹2500 per Person)</span>
                                                        </Accordion.Header>
                                                        <Accordion.Body>
                                                            <Form.Group className="mb-3">
                                                                Ved Path <span>(₹2500 per Person)</span>
                                                            </Form.Group>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                                <Accordion alwaysOpen={false} className="temp-accordin-btn">
                                                    <Accordion.Item eventKey="0" className="temp-accordin-btn">
                                                        <Accordion.Header className="temp-accordin-btn">
                                                            {" "}
                                                            <div>
                                                                <img
                                                                    src={Diya}
                                                                    alt="img not found"
                                                                    className="img-fluid temp-img-btn"
                                                                ></img>
                                                            </div>{" "}
                                                            Ved Path <span>(₹2500 per Person)</span>
                                                        </Accordion.Header>
                                                        <Accordion.Body>
                                                            <Form.Group className="mb-3">
                                                                Ved Path <span>(₹2500 per Person)</span>
                                                            </Form.Group>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
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
    );
};

export default GangotriInfo;
