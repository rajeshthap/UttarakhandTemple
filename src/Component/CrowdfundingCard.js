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
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URLL } from "../Component/BaseURL";
import { useAuth } from "./GlobleAuth/AuthContext";
import { AiFillEye } from "react-icons/ai";


const CrowdfundingCard = () => {
  const { uniqueId } = useAuth();
  const navigate = useNavigate();

  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const fundsPerPage = 6;
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTemple, setFilterTemple] = useState("");
  const [selectedFund, setSelectedFund] = useState(null);
  const [showFundModal, setShowFundModal] = useState(false);

  // Fetch API data
  useEffect(() => {
    let isMounted = true;
    const fetchFunds = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${BASE_URLL}/api/reg-fund-raise/`);
        if (!isMounted) return;
        if (Array.isArray(res.data)) {
          setFunds(res.data.reverse());
        } else if (res.data && Array.isArray(res.data.results)) {
          setFunds(res.data.results.reverse());
        } else {
          setFunds([]);
        }
      } catch (err) {
        console.error("Error fetching fund data:", err);
        setError("Failed to load crowdfunding campaigns. Please try again later.");
        setFunds([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchFunds();
    return () => {
      isMounted = false;
    };
  }, []);

  const getFileUrl = (path) => {
    if (!path) return null;
    if (/^https?:\/\//i.test(path)) return path;
    const normalized = path.startsWith("/") ? path.slice(1) : path;
    return `${BASE_URLL}/${normalized}`;
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
    } catch {
      return dateString;
    }
  };

  const filteredFunds = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return funds.filter((fund) => {
      const temple = (fund.temple_name || "").toLowerCase();
      const name = (fund.fund_raise_name || "").toLowerCase();
      if (filterTemple && temple !== filterTemple.toLowerCase()) return false;
      if (!q) return true;
      return (
        temple.includes(q) ||
        name.includes(q) ||
        (fund.description || "").toLowerCase().includes(q)
      );
    });
  }, [funds, searchQuery, filterTemple]);

  const indexOfLast = currentPage * fundsPerPage;
  const indexOfFirst = indexOfLast - fundsPerPage;
  const currentFunds = filteredFunds.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.max(1, Math.ceil(filteredFunds.length / fundsPerPage));

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterTemple]);

  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const handlePrevious = () => setCurrentPage((p) => Math.max(1, p - 1));

  const handleOpenModal = (fund) => {
    setSelectedFund(fund);
    setShowFundModal(true);
  };

  const handleCloseModal = () => {
    setSelectedFund(null);
    setShowFundModal(false);
  };

  const handleDonateClick = (fund) => {
    navigate("/DonateCrowd", {
      state: {
        temple_name: fund.temple_name,
        fund_raise_name: fund.fund_raise_name,
        fund_id: fund.fund_id,
      },
    });
  };

  const uniqueTemples = useMemo(() => {
    const setT = new Set();
    funds.forEach((f) => {
      if (f.temple_name) setT.add(f.temple_name);
    });
    return Array.from(setT).sort();
  }, [funds]);

  return (
    <div className="temp-donate">
      <Container className="temp-container-box temp-container-details">
        <h1>Crowdfunding Campaigns</h1>
        <p>
          <i>
            Support temple development projects and welfare initiatives. Your
            contribution makes a divine difference.
          </i>
        </p>

        {/* Search + Filter */}
        <Row className="mb-3">
          <Col md={6} className="mb-2">
            <Form.Control
              placeholder="Search by temple, fund name or description..."
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
            <small className="text-muted">{filteredFunds.length} campaigns</small>
          </Col>
        </Row>

        {/* Cards */}
        <Row>
          <Col lg={8} md={8} sm={12} className="mt-2">
            {loading ? (
              <div className="text-center my-4">
                <Spinner animation="border" variant="warning" />
              </div>
            ) : error ? (
              <p className="text-center text-danger mt-4">{error}</p>
            ) : filteredFunds.length === 0 ? (
              <p className="text-center mt-4">No crowdfunding campaigns found.</p>
            ) : (
              <>
                <Row className="g-4">
                  {currentFunds.map((fund, index) => {
                    const fundImageUrl = getFileUrl(fund.fund_image); //  ADDED: Fund image
                    const docUrl = getFileUrl(fund.documents); //  ADDED: Document URL

                    return (
                      <Col lg={6} md={6} sm={12} key={fund.id ?? index}>
                        <Card className="event-box h-100">
                          {/*  Updated: Show fund image on card */}
                          <div>
                            <img
                              src={
                                fundImageUrl ||
                                "https://via.placeholder.com/400x250?text=No+Image+Available"
                              }
                              alt="Crowdfunding"
                              className="card-event-image"
                            />
                          </div>

                          <Card.Body className="event-card">
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <h5 className="event-heading">{fund.temple_name}</h5>
                                <Card.Title className="mt-2 event-heading-sub">
                                  {fund.fund_raise_name}
                                </Card.Title>
                              </div>
                              <div className="text-end">
                                <Badge bg="info" className="event-active">
                                  ₹{fund.estimated_cost}
                                </Badge>
                              </div>
                            </div>

                            <Card.Text className="mt-2">
                              {fund.description || "No description available."}
                            </Card.Text>

                            {/* Progress bar with tooltip */}
                            <div className="mt-3">
                              <div className="d-flex justify-content-between small">
                                <span>
                                  <strong>Collected:</strong>{" "}
                                  ₹{parseFloat(fund.amount_collected || 0).toLocaleString("en-IN")}
                                </span>
                                <span>
                                  <strong>Remaining:</strong>{" "}
                                  ₹{(
                                    parseFloat(fund.estimated_cost || 0) -
                                    parseFloat(fund.amount_collected || 0)
                                  ).toLocaleString("en-IN")}
                                </span>
                              </div>

                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip id={`tooltip-${fund.fund_id}`}>
                                    Collected ₹{parseFloat(fund.amount_collected || 0).toLocaleString("en-IN")} of ₹
                                    {parseFloat(fund.estimated_cost || 0).toLocaleString("en-IN")}
                                  </Tooltip>
                                }
                              >
                                <div className="progress mt-2" style={{ height: "8px", cursor: "pointer" }}>
                                  <div
                                    className="progress-bar bg-success"
                                    role="progressbar"
                                    style={{
                                      width: `${Math.min(
                                        (parseFloat(fund.amount_collected || 0) /
                                          parseFloat(fund.estimated_cost || 1)) *
                                        100,
                                        100
                                      )}%`,
                                    }}
                                  ></div>
                                </div>
                              </OverlayTrigger>
                            </div>

                            {/* Fund ID + Date */}
                            <div className="d-flex justify-content-between mt-2 event-time-txt">
                              <div>
                                <strong className="event-data-txt">Fund ID:</strong>{" "}
                                {fund.fund_id}
                              </div>
                              <div>
                                <strong className="event-data-txt">Created:</strong>{" "}
                                {formatDate(fund.created_at)}
                              </div>
                            </div>



                            <div className="d-flex justify-content-between mt-3">
                              <Button
                                variant="warning"
                                className="event-click-btn"
                                onClick={() => handleOpenModal(fund)}
                              >
                                View
                              </Button>
                              <Button
                                variant="temp-submit-btn"
                                className="event-click-btn"
                                onClick={() => handleDonateClick(fund)}
                              >
                                Donate
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>

                {/* Pagination */}
                <div className="d-flex justify-content-center mt-4 mb-3">
                  <Pagination>
                    <Pagination.Prev onClick={handlePrevious} disabled={currentPage === 1} />
                    {(() => {
                      const items = [];
                      const maxButtons = 5;
                      let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
                      let end = Math.min(totalPages, start + maxButtons - 1);
                      if (end - start < maxButtons - 1)
                        start = Math.max(1, end - maxButtons + 1);
                      for (let p = start; p <= end; p++) {
                        items.push(
                          <Pagination.Item
                            key={p}
                            active={p === currentPage}
                            onClick={() => setCurrentPage(p)}
                          >
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

          {/* RHS Info Section */}
          <Col lg={4} md={4} sm={12} className="mt-2">
            <div className="tem-rhs">
              <h3>Support Guidelines</h3>
              <ul>
                <li>All contributions are voluntary and non-refundable.</li>
                <li>Use Indian payment methods only for donations.</li>
                <li>Projects are verified by the temple administration.</li>
                <li>PDF documents contain the fund purpose details.</li>
              </ul>
            </div>
          </Col>
        </Row>

        {/* Modal */}
        <Modal show={showFundModal} onHide={handleCloseModal} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title className="event-heading-title">
              {selectedFund?.fund_raise_name || "Fund Details"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedFund ? (
              <Row>
                <Col md={5} className="mb-3">
                  {/*  Fund Image in modal */}
                  <img
                    src={
                      getFileUrl(selectedFund.fund_image) ||
                      "https://via.placeholder.com/400x250?text=No+Image+Available"
                    }
                    alt={selectedFund.fund_raise_name}
                    className="card-event-image"
                  />
                </Col>
                <Col md={7}>
                  <h5 className="event-heading">{selectedFund.temple_name}</h5>
                  <p>
                    <strong className="event-data-txt">Fund ID:</strong>{" "}
                    {selectedFund.fund_id}
                  </p>
                  <p>
                    <strong className="event-data-txt">Estimated Cost:</strong>{" "}
                    ₹{selectedFund.estimated_cost}
                  </p>
                  <p>
                    <strong className="event-data-txt">Created:</strong>{" "}
                    {formatDate(selectedFund.created_at)}
                  </p>
                  <p>
                    <strong className="event-data-txt">Description:</strong>{" "}
                    {selectedFund.description}
                  </p>

                  {/*  Added document view button */}
                  {selectedFund.documents && (
                    <p className="mb-1 d-flex align-items-center">
                      <strong className="event-data-txt me-1">Document:</strong>
                      <span
                        onClick={() => window.open(getFileUrl(selectedFund.documents), "_blank")}
                        className="text-primary text-decoration-none event-data-txt d-inline-flex align-items-center"
                        style={{ cursor: "pointer" }}
                      >
                        <AiFillEye className="me-1" size={14} /> View Document
                      </span>
                    </p>
                  )}
                </Col>
              </Row>
            ) : (
              <div>Loading details...</div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="" className="event-click-cancel" onClick={handleCloseModal}>
              Close
            </Button>
            <Button
              variant="temp-submit-btn"
              className="event-click-btn"
              onClick={() => handleDonateClick(selectedFund)}
            >
              Donate
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default CrowdfundingCard;
