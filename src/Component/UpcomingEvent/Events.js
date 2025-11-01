import React, { useEffect, useState, useMemo } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Card,
  Spinner,
  Modal,
  Form,
  Badge,
  Pagination,
} from "react-bootstrap";
import axios from "axios";
import { BASE_URLL } from "../BaseURL";
import { useAuth } from "../GlobleAuth/AuthContext";
import { useNavigate } from "react-router-dom";



const Events = () => {
  const { uniqueId } = useAuth();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTemple, setFilterTemple] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);

  // fetch
  useEffect(() => {
    let isMounted = true;
    const fetchFestivals = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${BASE_URLL}/api/reg-festival/`);
        if (!isMounted) return;
        if (Array.isArray(res.data)) {
          setEvents(res.data.reverse());
        } else if (res.data && Array.isArray(res.data.results)) {
          setEvents(res.data.results.reverse());
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error("Error fetching festivals:", err);
        setError("Failed to load events. Please try again later.");
        setEvents([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchFestivals();
    return () => {
      isMounted = false;
    };
  }, []);

  const getImageUrl = (imgPath) => {
    if (!imgPath) return "https://mahadevaaya.com/backend/media/temple_images/default.png";

    // If it's already a full URL, return as-is
    if (/^https?:\/\//i.test(imgPath)) return imgPath;

    // Define the media base URL
    const MEDIA_BASE_URL = `${BASE_URLL}/media/`;

    // Remove leading slash if present
    const normalizedPath = imgPath.startsWith('/') ? imgPath.substring(1) : imgPath;

    // Handle paths that start with "media/"
    if (normalizedPath.startsWith('media/')) {
      return `${MEDIA_BASE_URL}${normalizedPath.substring(6)}`;
    }

    // For all other cases, append to media base
    return `${MEDIA_BASE_URL}${normalizedPath}`;
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  const filteredEvents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return events.filter((ev) => {
      const temple = (ev.temple_name || "").toString().toLowerCase();
      const fest = (ev.festival_name || "").toString().toLowerCase();
      if (filterTemple && temple !== filterTemple.toLowerCase()) return false;
      if (!q) return true;
      return temple.includes(q) || fest.includes(q) || (ev.description || "").toLowerCase().includes(q);
    });
  }, [events, searchQuery, filterTemple]);

  const indexOfLast = currentPage * eventsPerPage;
  const indexOfFirst = indexOfLast - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / eventsPerPage));

  useEffect(() => {
    // if filtering/search changes reset to page 1
    setCurrentPage(1);
  }, [searchQuery, filterTemple]);

  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const handlePrevious = () => setCurrentPage((p) => Math.max(1, p - 1));

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };
  const handleCloseModal = () => {
    setSelectedEvent(null);
    setShowEventModal(false);
  };

  const handleRegister = (event) => {
     navigate("/EventParticipation", {
    state: {
      festival: event,
      temple_name: event.temple_name,
      festival_name: event.festival_name,
    },
  });

  };

  const uniqueTemples = useMemo(() => {
    const setT = new Set();
    events.forEach((e) => {
      if (e.temple_name) setT.add(e.temple_name);
    });
    return Array.from(setT).sort();
  }, [events]);

  return (


    <>

      <Container className="temp-container">
        <h1>Temple Festival Booking</h1>
        <p>
          <i>
            Your support helps us preserve sacred traditions, maintain temple
            facilities, and serve the community with devotion and care.
          </i>
        </p>

        <Row className="mb-3">
          <Col md={6} className="mb-2">
            <Form.Control
              placeholder="Search by temple, festival or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Col>

          <Col md={3} className="mb-2">
            <Form.Select
              value={filterTemple}
              onChange={(e) => setFilterTemple(e.target.value)}
            >
              <option value="">All Temples</option>
              {uniqueTemples.map((t, i) => (
                <option key={i} value={t}>
                  {t}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={3} className="d-flex justify-content-end align-items-center">
            <small className="text-muted">{filteredEvents.length} events</small>
          </Col>
        </Row>

        <Row>
          <Col lg={8} md={8} sm={12} className="mt-2">
            {loading ? (
              <div className="text-center my-4">
                <Spinner animation="border" variant="warning" />
              </div>
            ) : error ? (
              <p className="text-center text-danger mt-4">{error}</p>
            ) : filteredEvents.length === 0 ? (
              <p className="text-center mt-4">No events found.</p>
            ) : (
              <>
                <Row className="g-4">
                  {currentEvents.map((event, index) => (
                    <Col lg={6} md={6} sm={12} key={event.id ?? index}>
                      <Card className="event-box h-100">
                        <div>
                          <img
                            src={getImageUrl(event.image)}
                            alt={event.festival_name || "Festival"}
                            className="card-event-image"

                          />
                        </div>

                        <Card.Body className="event-card">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h5 className="event-heading">{event.temple_name || "Temple Name"}</h5>
                              <Card.Title className="mt-2 event-heading-sub">{event.festival_name || "Festival Name"}</Card.Title>
                            </div>
                            <div className="text-end">
                              {event.is_active ? (
                                <Badge bg="success" className="event-active ">Active</Badge>
                              ) : (
                                <Badge bg="secondary" className="event-secondary">Inactive</Badge>
                              )}
                            </div>
                          </div>

                          <Card.Text className="mt-2">
                            {event.description || "No description available."}
                          </Card.Text>

                          <div className="d-flex justify-content-between mt-3 event-time-txt ">
                            <div>
                              <strong className="event-data-txt">Start:</strong> {event.start_day || ""} ({formatDate(event.start_date_time)})
                            </div>
                            <div>
                              <strong className="event-data-txt">End:</strong> {event.end_day || ""} ({formatDate(event.end_date_time)})
                            </div>
                          </div>

                          <div className="d-flex justify-content-between mt-3">
                            <Button variant="warning" className="event-click-btn" onClick={() => handleOpenModal(event)}>
                              View
                            </Button>
                            <Button variant="temp-submit-btn" className="event-click-btn" onClick={() => handleRegister(event)}>
                              Book Now
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>

                {/* Pagination Controls */}
                <div className="d-flex justify-content-center mt-4 mb-3">
                  <Pagination>
                    <Pagination.Prev onClick={handlePrevious} disabled={currentPage === 1} />

                    {/* show up to 5 page items centered on current page */}
                    {(() => {
                      const items = [];
                      const maxButtons = 5;
                      let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
                      let end = Math.min(totalPages, start + maxButtons - 1);
                      if (end - start < maxButtons - 1) start = Math.max(1, end - maxButtons + 1);
                      for (let p = start; p <= end; p++) {
                        items.push(
                          <Pagination.Item key={p} active={p === currentPage} onClick={() => setCurrentPage(p)}>
                            {p}
                          </Pagination.Item>
                        );
                      }
                      return items;
                    })()}

                    <Pagination.Next onClick={handleNext} disabled={currentPage === totalPages} />
                  </Pagination>
                </div>
              </>
            )}
          </Col>

          <Col lg={4} md={4} sm={12} className="mt-2">
            <div className="tem-rhs">
              <h3>Guidelines for Online Donation</h3>
              <div>
                <ul>
                  <li>
                    Fields marked with <span className="temp-span-star">* </span> are mandatory.
                  </li>
                  <li>
                    As per Government of India (GOI) regulations, <span className="temp-span-star">foreign cards are not supported</span>.
                    Devotees residing outside <span className="temp-span-star">India may donate through Indian payment modes/cards </span>only.
                  </li>
                  <li>
                    Donations above <span className="temp-span-star">₹1,00,000</span> entitle you to <span className="temp-span-star">free Puja and Darshan for one year</span>.
                  </li>
                  <li>
                    Donations can be made <span className="temp-span-star">on any day</span>, even when the temple is closed.
                  </li>
                </ul>

                <h2>Accepted Payment Methods</h2>
                <ul>
                  <li>Net Banking – Secure online transfers through major Indian banks.</li>
                  <li>Debit Card – Quick and convenient payment using your bank card.</li>
                  <li>Credit Card – Hassle-free donations with instant confirmation.</li>
                  <li>UPI – Fast, mobile-based payment option.</li>
                  <li>BharatPe QR – Scan & Pay instantly via supported payment apps.</li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>

        {/* Event Details Modal */}
        <Modal show={showEventModal} onHide={handleCloseModal} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title className="event-heading-title">{selectedEvent?.festival_name || "Event Details"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedEvent ? (
              <>
                <Row>
                  <Col md={5} className="mb-3">
                    <img
                      src={getImageUrl(selectedEvent.image)}
                      alt={selectedEvent.festival_name}
                      className="card-event-image"
                    />
                  </Col>
                  <Col md={7}>
                    <h5 className="event-heading">{selectedEvent.temple_name}</h5>
                    <div className="event-time-txt">
                      <p className="mb-1"><strong className="event-data-txt">Start:</strong> {selectedEvent.start_day} ({formatDate(selectedEvent.start_date_time)})</p>
                      <p className="mb-1"><strong className="event-data-txt">End:</strong> {selectedEvent.end_day} ({formatDate(selectedEvent.end_date_time)})</p>
                      <p className="mb-2"><strong className="event-data-txt">Venue / Notes:</strong> {selectedEvent.venue || "-"}</p>
                      <p>{selectedEvent.description || "No additional information."}</p>
                    </div>
                  </Col>
                </Row>
              </>
            ) : (
              <div>Loading details...</div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="" className="event-click-cancel " onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="temp-submit-btn" className="event-click-btn btn" onClick={() => { if (selectedEvent) handleRegister(selectedEvent); }}>
              Book Now
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

    </>
  );
};

export default Events;
