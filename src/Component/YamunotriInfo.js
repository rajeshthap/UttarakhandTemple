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

import Yamunotri from "../assets/images/YamunotriInfo.jpg";
import Diya from "../assets/images/Diya.png";
import "../assets/CSS/TempleBooking.css";



const YamunotriInfo = () => {
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
                    <h1>Yamunotri Temple – The Origin of the Holy Yamuna </h1>
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
                                    <img src={Yamunotri} alt="Yamunotri Info"
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
                                                        <h3>Best time to visit Yamunotri</h3>
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
                                                        <p class="card-title">1 day</p>
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
                                                        <p class="card-title">Rishikesh, 200 to 222 kms</p>
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
                                                        <p class="card-title">Jolly Grant Airport, 238.9 kms</p>
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
                                                        <p class="card-title">Kedarnath Temple, Char Dham Yatra, Trekking, Himalayas, Pilgrimage, Panch Kedar</p>
                                                    </div></Col></Row>
                                        </Col>
                                    </Row>
                                    <div className="d-flex justify-content-center mt-3">
                                        <Button className="temp-view-more-btn">Book Puja / Offer Donation</Button>
                                    </div>
                                </div>

                            </Col>
                            <Container className="mt-4">
                                <p>
                                    Yamunotri Temple, dedicated to <span className="text-color">Goddess Yamuna</span>, is one of the sacred <span className="text-color">Char Dham</span> shrines of Uttarakhand and the first stop in the Char Dham Yatra. Nestled amidst the Garhwal Himalayas at an altitude of about <span className="text-color">3,293 meters</span>, the temple marks the <span className="text-color">origin of the holy River Yamuna</span>, which is considered the sister of Yama (the God of Death) and the daughter of Surya (the Sun God).
                                    <br />

                                    Surrounded by snow-clad peaks and serene natural beauty, Yamunotri offers a divine and peaceful experience to every devotee. The journey to this temple involves a scenic trek through dense forests, gushing waterfalls, and hot water springs — a true blend of spirituality and adventure.
                                </p>
                            </Container>

                            <Container>
                                <h1>History </h1>

                                <p>
                                    The <span className="text-color">original temple</span> of Yamunotri is believed to have been constructed by <span className="text-color">Maharaja Pratap Shah of Tehri Garhwal</span> in the <span className="text-color">19th century</span>. However, the <span className="text-color">spiritual significance</span> of this site dates back to <span className="text-color">ancient times</span>, as it is mentioned in various<span className="text-color"> Hindu scriptures and Puranas</span>.
                                    According to mythology, <span className="text-color">Goddess Yamuna</span> is revered for her purity and benevolence. It is believed that taking a dip in the Yamuna River absolves one of sins and protects from untimely death.
                                    <br />
                                    <br />
                                    Near the temple lies the <span className="text-color">Divya Shila</span>, a sacred rock where devotees offer prayers before entering the temple, and the <span className="text-color">Surya Kund</span>, a hot water spring where rice and potatoes are cooked and offered as prasad to the deity.
                                    <br />
                                    <br />


                                    Despite the extreme climatic conditions, the temple continues to attract thousands of pilgrims each year, who visit to seek the blessings of <span className="text-color">Maa Yamuna</span> and begin their <span className="text-color">spiritual Char Dham journey</span> from this divine abode.




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

export default YamunotriInfo;
