import React, { useState, useEffect } from "react";
import { Accordion, Button, Col, Container, Row, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { FaUsersLine } from "react-icons/fa6";
import { Link } from "react-router-dom";
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

const cardData = [
  {
    id: "0",
    title: "Badrinath Temple",
    text: "Dedicated to Lord Vishnu, located in Chamoli district at 3,300 meters, part of the Char Dham and Chota Char Dham",
    price: 1100,
    img: Badrinath,
  },
  {
    id: "1",
    title: "Kedarnath Temple",
    text: "One of the 12 Jyotirlingas, dedicated to Lord Shiva, located near the Mandakini River.",
    price: 2100,
    img: Kedarnath,
  },
  {
    id: "2",
    title: "Gangotri Temple",
    text: "Origin of the Ganges River, dedicated to Goddess Ganga.",
    price: 1500,
    img: Gangotri,
  },
  {
    id: "3",
    title: "Yamunotri Temple",
    text: "Dedicated to Goddess Yamuna, located at the Yamunotri glacier source.",
    price: 1800,
    img: Yamunotri,
  },
];

const TempleBookingInfo = () => {
  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;

  const [, setShow] = useState(false);
  const [selectedPersons, setSelectedPersons] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ Login state

  // pagination states
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCards = cardData.slice(indexOfFirstItem, indexOfLastItem);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
// const [, setPujaDate] = useState("");
// const [, setPujaTime] = useState("");
  // Default select the first ceremony on mount
  useEffect(() => {
    if (cardData.length > 0) {
      setSelectedCard(cardData[0]);
    }
  }, []);
  // Correct total calculation
  const totalAmount = selectedCard
    ? selectedCard.price * selectedPersons
    : 0;
  //  Login/Register button handler
  const handleLoginRegister = () => setIsLoggedIn(true);

  return (
    <div className="temp-donate">
      <Container className="temp-container-box temp-container-details">
        <div className="temp-detail-btn">
          <h1>Temple Booking</h1>
        </div>
        <Row>
          {/* Left Side Cards */}
          <Col lg={7} md={7} sm={12} className="mt-2">
            <Row className="g-4">
              {currentCards.map((item) => (
                <Col
                  lg={4}
                  md={6}
                  sm={12}
                  key={item.id}
                  onClick={() => setSelectedCard(item)}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className={`card-item ${
                      selectedCard?.id === item.id ? "active-card" : ""
                    }`}
                  >
                    <div className="card-image-wrapper">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="card-image"
                      />
                    </div>
                    <div className="card-text-temp">
                      <h5>{item.title}</h5>
                      <h6>{item.text}</h6>
                    </div>
                  </div>
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

          <Col lg={5} md={5} sm={12} className="mt-2 container-box-p">
             <div 
  className="text-center p-4 my-4 temp-regis"
  
>
  <h5>
  
    <BsInfoCircleFill className="temp-info-icon" />
   Please <strong>login</strong> first to coninue with Mandir booking.
  </h5>
  <p>Kindly click on the <strong>Login</strong> or <strong>Register</strong> button to continue.</p>
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

            <div
              className="tem-rhs-info temp-right-side-style"
              // style={{
              //   pointerEvents: isLoggedIn ? "auto" : "none", 
              //   opacity: isLoggedIn ? 1 : 0.5, 
              // }}
            >
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
                            minDate={new Date()}
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
        <Accordion.Header className="temp-accordin-btn">   <div>
               <img src={Diya} alt="img not found" className="img-fluid temp-img-btn"></img>
            </div> Ved Path <span>(₹2500 per Person)</span></Accordion.Header>
        <Accordion.Body>
          <Form.Group className="mb-3">
          
           Ved Path <span>(₹2500 per Person)</span>
          </Form.Group>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

                      <Accordion alwaysOpen={false} className="temp-accordin-btn"> 
      <Accordion.Item eventKey="0" className="temp-accordin-btn">
        <Accordion.Header className="temp-accordin-btn">   <div>
               <img src={Diya} alt="img not found" className="img-fluid temp-img-btn"></img>
            </div> Ved Path <span>(₹2500 per Person)</span></Accordion.Header>
        <Accordion.Body>
          <Form.Group className="mb-3">
          
           Ved Path <span>(₹2500 per Person)</span>
          </Form.Group>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
                      <Accordion alwaysOpen={false} className="temp-accordin-btn"> 
      <Accordion.Item eventKey="0" className="temp-accordin-btn">
        <Accordion.Header className="temp-accordin-btn">   <div>
               <img src={Diya} alt="img not found" className="img-fluid temp-img-btn"></img>
            </div> Ved Path <span>(₹2500 per Person)</span></Accordion.Header>
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

export default TempleBookingInfo;
