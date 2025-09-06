import React, { useState, useEffect } from "react";
import { Accordion, Button, Col, Container, Row, Form } from "react-bootstrap";
import Select from "react-select";
import { FaCheck, FaUsersLine } from "react-icons/fa6";
import { MdOutlineDateRange, MdStarRate } from "react-icons/md";
import { Link } from "react-router-dom";

import Badrinath from "../assets/images/Badrinath-Temple.png";
import Kedarnath from "../assets/images/Kedarnath-Temple.png";
import Gangotri from "../assets/images/Gangotri-Temple.png";
import Yamunotri from "../assets/images/yamunotri-temple.jpg";
import Cermanay from "../assets/images/Ceremony_image.png"

import PagingNation from "./paging/PagingNation";

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
  { id: "1", title: "Engagement Ceremony", text: "सगाई समारोह", price: 2100, img: Kedarnath },
  { id: "2", title: "Ganesh Chaturthi", text: "गणेश चतुर्थी", price: 1500, img: Gangotri },
  { id: "3", title: "Yagnopavit Sanskar", text: "यज्ञोपवीत संस्ककार", price: 1800, img: Yamunotri },
  { id: "4", title: "Vishwakarma Puja", text: "विश्वकर्मा पूजा", price: 1600, img: Yamunotri },
  { id: "5", title: "New Office Puja", text: "नए कार्यालय उद्घाटन पूजा", price: 2500, img: Yamunotri },
  { id: "6", title: "Vivah (Marriage)", text: "विवाह", price: 5100, img: Yamunotri },
  { id: "7", title: "Vivah (Marriage)", text: "विवाह", price: 5100, img: Yamunotri },
  { id: "8", title: "Vivah (Marriage)", text: "विवाह", price: 5100, img: Yamunotri },
  { id: "9", title: "Vivah (Marriage)", text: "विवाह", price: 5100, img: Yamunotri },
  { id: "10", title: "Vivah (Marriage)", text: "विवाह", price: 5100, img: Yamunotri },
  { id: "11", title: "Vivah (Marriage)", text: "विवाह", price: 5100, img: Yamunotri },
  { id: "12", title: "Vivah (Marriage)", text: "विवाह", price: 5100, img: Yamunotri },
];

const TempleInfo = () => {
  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;

  const [show, setShow] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  // pagination states
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCards = cardData.slice(indexOfFirstItem, indexOfLastItem);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

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
    <div className="temple-all-info">
      <Container className="temp-container temp-container-details">
        <h1>Online Pandit Booking for Puja Services</h1>
        <p>Experienced Pandit Ji for every Puja, just a click away</p>

        <Row>
          {/* Left Side Cards */}
          <Col lg={7} md={7} sm={12} className="mt-2">
           

            <Row className="g-4">
              {currentCards.map((item) => (
                <Col
                  lg={4} // show 3 per row
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
                      <img src={item.img} alt={item.title} className="card-image" />
                    </div>
                    <div className="card-text-temp">
                      <h5>{item.title}</h5>
                      <h6>{item.text}</h6>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            {/* Pagination Component */}
            <PagingNation
              totalItems={cardData.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </Col>

          {/* Right Side — Only Selected Ceremony */}
          <Col lg={5} md={5} sm={12} className="mt-2">
            <div className="tem-rhs-info">
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
                          Required Pandit <span className="temp-span-star">*</span>
                        </Form.Label>
                        <Select
                          isMulti
                          options={options}
                          placeholder="Select multiple"
                          closeMenuOnSelect={false}
                          className="temp-form-control-input"
                          value={selectedOptions}
                          onChange={setSelectedOptions} 
                        />

                        {/* Time */}
                        <Form.Group className="mb-3 mt-3">
                          <Form.Label className="temp-label mb-2">
                            Time <span className="temp-span-star">*</span>
                          </Form.Label>
                          <Form.Select className="temp-form-control-option">
                            <option value="">Select a Time</option>
                            <option value="Morning">Good Morning</option>
                            <option value="Evening">Evening</option>
                          </Form.Select>
                        </Form.Group>

                        {/* Date */}
                        <Form.Group className="mb-3 mt-3">
                          <Form.Label className="temp-label mb-2">
                            Puja Date <span className="temp-span-star">*</span>
                          </Form.Label>
                          <Form.Control type="date" className="temp-form-control" />
                        </Form.Group>

                        {/* Info */}
                        <div className="mt-3">
                          <p>
                            <MdOutlineDateRange className="temple-icon" /> {formattedDate}
                          </p>
                          <p>
                            <FaUsersLine className="temple-icon" />{" "}
                            {selectedOptions.length || 1},{" "}
                            Charges ₹{selectedCard.price} Per Person
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
                          <p>Grand Total</p>
                          <span className="amount-span">₹ {totalAmount}/-</span>
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
  );
};

export default TempleInfo;
