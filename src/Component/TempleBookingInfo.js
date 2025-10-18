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

import { Link, useNavigate } from "react-router-dom";
import { BsInfoCircleFill } from "react-icons/bs";
import DatePicker from "react-datepicker";
import axios from "axios";
import Diya from "../assets/images/Diya.png";
import "../assets/CSS/TempleBooking.css";
import PagingNation from "./paging/PagingNation";
import { useAuth } from "../Component/GlobleAuth/AuthContext";
import { BASE_URLL } from "./BaseURL";


const TempleBookingInfo = () => {
  const [templeData, setTempleData] = useState([]);
  const [temples, setTemples] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedPersons, setSelectedPersons] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { uniqueId } = useAuth();

  useEffect(() => {
    fetch(`${BASE_URLL}api/temple-poojas-list/`)
      .then((res) => res.json())
      .then((data) => {
        setTempleData(data);
        if (data.length > 0) setSelectedCard(data[0]);
      })
      .catch((error) => console.error("Error fetching temple data:", error));
  }, []);

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const res = await axios.get(`${BASE_URLL}api/temple-names-list/`);
        if (res.data && Array.isArray(res.data.temple_names)) {
          setTemples(res.data.temple_names);
        }
      } catch (err) {
        console.error("Error fetching temples:", err);
      }
    };
    fetchTemples();
  }, []);
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  // Filter temples based on search
  const filteredTempleData = templeData.filter((t) =>
    t.temple_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getImageUrl = (imgPath) => {
    if (!imgPath)
      return "https://mahadevaaya.com/backend/media/temple_images/default.png";
    const filename = imgPath.split("/").pop();
    return `https://mahadevaaya.com/backend/media/temple_images/${filename}`;
  };

  // Pagination
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCards = filteredTempleData.slice(indexOfFirstItem, indexOfLastItem);

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
        {/* Search Bar */}
   <Row className="mb-4">
  <Col md={6} lg={6} >
    <Form.Label>Search / Select Temple</Form.Label>
    <div className="d-flex">
      {/* Search input */}
      <Form.Control
        type="text"
        placeholder="Search Temple..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} className="temp-search"
       
      />
 
      <Form.Select
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          const selected = templeData.find(
            (t) => t.temple_name === e.target.value
          );
          if (selected) setSelectedCard(selected);
          else setSelectedCard(null);
        }}
         className="temp-list"
      >
        <option value="">-- Select Temple --</option>
        {temples
          .filter((t) =>
            t.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((t, idx) => (
            <option key={idx} value={t}>
              {t}
            </option>
          ))}
      </Form.Select>
    </div>
  </Col>
</Row>



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
                  onClick={() => handleCardClick(item)}
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
              totalItems={filteredTempleData.length}
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
                        {/* Accordion Content */}
                        {/* ... your existing accordion content ... */}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              ) : (
                <p className="text-muted">
                  Select a temple to view available Poojas.
                </p>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      {/* Login/Register Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="text-center">
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
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TempleBookingInfo;
