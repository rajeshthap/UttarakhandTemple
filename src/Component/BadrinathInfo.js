import React, { useState, useEffect } from "react";
import { Accordion, Button, Col, Container, Row, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
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

import Badrinath from "../assets/images/BadrinathInfo.png";
import Diya from "../assets/images/Diya.png";
import "../assets/CSS/TempleBooking.css";
import PagingNation from "./paging/PagingNation";


const BadrinathInfo = () => {
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

    const [show, setShow] = useState(false);
    const [selectedPersons, setSelectedPersons] = useState(1);
    const [selectedCard, setSelectedCard] = useState(null);

    const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state

    // pagination states
    const itemsPerPage = 8;

    const [showPopup, setShowPopup] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
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
                    <h1>Shri Badrinath Dham - The Sacred Abode Of Lord Vishnu</h1>
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

                                <div className="Badri-img">
                                    <img src={Badrinath} alt="Badrinath Info"
                                        className="img-fluid Badri-img" />


                                </div>
                                <Row>
                                    <Col lg={4} md={4} sm={6} xs={6} className="">
                                        <div className="nav-link">

                                            <TiWeatherPartlySunny />
                                            <div>
                                                <Link to="https://www.accuweather.com/en/in/badrinathpuri/3001096/weather-forecast/3001096" className="temp-weather">Weather</Link>

                                            </div>
                                        </div>

                                    </Col>
                                   
                                    <Col lg={4} md={4} sm={6} xs={6} className="">
                                        <div className="nav-link">

                                          <SiGooglemaps />
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
                                                <Col lg={2} md={2} sm={1} xs={1} className="temp-book-icon" >
                                                    <div className="icon-big text-center temp-icon">
                                                        <FaCalendarAlt /></div>
                                                </Col>
                                                <Col lg={10} md={10} sm={11} xs={11} className="temp-card" >
                                                    <div className="carditem-1">
                                                        <h3>Best time to visit Badrinath</h3>
                                                        <p class="card-title">May, Jun, Jul, Aug, Sep, Oct, Nov</p>
                                                    </div></Col></Row>
                                        </Col>
                                        <Col lg={6} md={12} sm={12} xs={12}  >
                                            <Row className="temp-card-mob">
                                                <Col lg={2} md={2} sm={1} xs={1}  >
                                                    <div className="icon-big text-center temp-icon">
                                                        <MdLocationPin /></div>
                                                </Col>
                                                <Col lg={10} md={10} sm={11} xs={11} className="temp-card" >
                                                    <div className="carditem-1">
                                                        <h3>Located in</h3>
                                                        <p class="card-title">Chamoli, Garhwal Uttarakhand</p>
                                                    </div></Col></Row>
                                        </Col>
                                    </Row>



                                    <Row className="temp-route">
                                        <Col lg={6} md={12} sm={12} xs={12} >
                                            <Row>
                                                <Col lg={2} md={2} sm={1} xs={1} className="temp-book-icon" >
                                                    <div className="icon-big text-center temp-icon">
                                                        <FaCalendarAlt /></div>
                                                </Col>
                                                <Col lg={10} md={10} sm={11} xs={11} className="temp-card" >
                                                    <div className="carditem-1">
                                                        <h3>Recommended Stay</h3>
                                                        <p class="card-title">1 days</p>
                                                    </div></Col></Row>
                                        </Col>
                                        <Col lg={6} md={12} sm={12} xs={12}  >
                                            <Row className="temp-card-mob">
                                                <Col lg={2} md={2} sm={1} xs={1}  >
                                                    <div className="icon-big text-center temp-icon">
                                                        <FaTrainSubway /></div>
                                                </Col>
                                                <Col lg={10} md={10} sm={11} xs={11} className="temp-card" >
                                                    <div className="carditem-1">
                                                        <h3>Nearest Railway Station</h3>
                                                        <p class="card-title">Rishikesh, 295 kms</p>
                                                    </div></Col></Row>
                                        </Col>
                                    </Row>


                                    <Row className="temp-route">
                                        <Col lg={6} md={12} sm={12} xs={12} >
                                            <Row>
                                                <Col lg={2} md={2} sm={1} xs={1} className="temp-book-icon" >
                                                    <div className="icon-big text-center temp-icon">
                                                        <PiAirplaneTiltFill /></div>
                                                </Col>
                                                <Col lg={10} md={10} sm={11} xs={11} className="temp-card" >
                                                    <div className="carditem-1">
                                                        <h3>Nearest Airport</h3>
                                                        <p class="card-title">Jolly Grant Airport, 314 kms</p>
                                                    </div></Col></Row>
                                        </Col>
                                        <Col lg={6} md={12} sm={12} xs={12}  >
                                            <Row className="temp-card-mob">
                                                <Col lg={2} md={2} sm={1} xs={1}  >
                                                    <div className="icon-big text-center temp-icon">
                                                        <HiSpeakerWave /></div>
                                                </Col>
                                                <Col lg={10} md={10} sm={11} xs={11} className="temp-card" >
                                                    <div className="carditem-1">
                                                        <h3>Famous for</h3>
                                                        <p class="card-title">Badrinath temple, Char Dham Yatra, Pilgrimage, Temple</p>
                                                    </div></Col></Row>
                                        </Col>
                                    </Row>
                                    <div className="d-flex justify-content-center mt-3">
                                        <Button className="temp-view-more-btn">Book Puja / Offer Donation</Button>
                                    </div>
                                </div>

                            </Col>
                               <Container>
                                <p>
                                   Badrinath is one of the most sacred shrines for Vaishnavites and holds a divine place among the <span className="text-color"> 108 Divya Desams</span>, the holy abodes of Lord Vishnu. The town of Badrinath is also part of the revered <span className="text-color">Panch Badri temples</span>, which include <span className="text-color">Yog Dhyan Badri, Bhavishya Badri, Adi Badri</span>, and <span className="text-color">Vriddha Badri</span>, along with the main <span className="text-color">Badrinath Temple</span>.
                                   <br/>
                                   <br/>
                                   Nestled in the lap of the Himalayas,<span className="text-color"> Badrinath</span> is one of the most sacred pilgrimage destinations in India and a vital part of the <span className="text-color">Char Dham Yatra</span>. Dedicated to <span className="text-color">Lord Vishnu</span>, this holy town radiates divine energy and spiritual serenity, attracting devotees and travelers from around the world.
                                </p>
                               </Container>

                               <Container>
                                <h1>History</h1>
                                <h3>The Divine Origin and Significance of Badrinath Dham</h3>
                                <p>
                                    The sacred name Badrinath finds its origin in the local word <span className="text-color">“Badari”</span>, referring to a wild berry that grows abundantly in this region. As legend goes, when <span className="text-color">Lord Vishnu</span> meditated amidst the Himalayas, His consort <span className="text-color">Goddess Lakshmi</span> assumed the form of a Badari tree to shield Him from the harsh sun. Thus, this divine land came to be known as <span className="text-color">Badarika-Ashram</span>, the eternal abode of Lord Vishnu.
                                    <br/>
                                   <br/>

                                   Badrinath is not merely a temple — it is a <span className="text-color">spiritual haven</span>, home to countless saints, sages, and pilgrims who come here seeking inner peace and enlightenment.
                                    <br/>
                                   <br/>
                                   According to the <span className="text-color">Skanda Purana</span>, the sacred idol of <span className="text-color">Lord Badrinarayan</span> was discovered by <span className="text-color">Adi Guru Shankaracharya</span> in <span className="text-color">Narad Kund</span> and later <span className="text-color">re-enshrined in the 8th century A.D</span>. It is believed that Adi Shankaracharya re-established this holy shrine to <span className="text-color">revive the fading glory of Sanatan Dharma</span> and unite the nation under one divine bond. During that era, when Buddhism was spreading across the Himalayas, his mission was to <span className="text-color">restore the strength and sanctity of Hinduism</span>.
                                     <br/>
                                   <br/>
                                   The temple of Badrinath, also revered as <span className="text-color">Badari Vishal</span>, stands as a timeless testament to this spiritual resurgence. Infused with the essence of ancient scriptures, the shrine is mentioned in numerous Puranas and epics. From the <span className="text-color">Pandavas’ final pilgrimage to Swargarohini – the ascent to heaven</span>, to the divine visits of Lord Krishna and revered sages, Badrinath has been the silent witness to countless sacred tales.
                                     <br/>
                                   <br/>
                                    
                                    The <span className="text-color">Skanda Purana</span> beautifully extols its glory, declaring:
                                         <br/>
                                   <br/>
                                            <span className="text-color">“There are several sacred shrines in heaven, on earth, and in hell; but there is no shrine like Badrinath.”</span>

                                              <br/>
                                   <br/>
                                   As described in the <span className="text-color">Vamana Purana</span>, this is the very place where the twin sages <span className="text-color">Nara and Narayana</span>, the fifth incarnation of Lord Vishnu, performed intense penance. Over the ages, great sages like <span className="text-color">Kapila Muni, Gautama, Kashyapa</span>, and <span className="text-color">Bhakta Narada</span> attained divine realization here. The land also attracted revered scholars and spiritual luminaries such as <span className="text-color">Adi Shankaracharya, Ramanujacharya, Madhavacharya</span>, and <span className="text-color">Sri Nityananda</span>, who came here in search of higher wisdom and divine grace — a tradition that continues unbroken even today.

                                </p>
                               </Container>
                        </Row>
                      

                        {/* Pagination */}
                        <PagingNation

                        />
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
                                                {/* Time */}
                                                {/* <Form.Group className="mb-3 mt-3">
                          <Form.Label className="temp-label mb-2">
                            Time <span className="temp-span-star">*</span>
                          </Form.Label>
                          <Form.Select className="temp-form-control-option">
                            <option value="">Select Your Time</option>
                            <option value="Morning">Morning</option>
                            <option value="Evening">Evening</option>
                          </Form.Select>
                        </Form.Group> */}

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

export default BadrinathInfo;
