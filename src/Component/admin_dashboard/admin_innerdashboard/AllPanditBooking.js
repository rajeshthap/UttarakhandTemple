import React, { useEffect, useState } from "react";
import { Row, Button, Breadcrumb, Modal, Form, Col } from "react-bootstrap";
import "../../../assets/CSS/AdminLeftNav.css";
import AdminLeftnav from "../AdminLeftnav";
import { useAuth } from "../../GlobleAuth/AuthContext";
import axios from "axios";
import { BASE_URLL } from "../../../Component/BaseURL";
import SearchFeature from "../../temp_dashboard/temp_innerdashboard/SearchFeature";
import ModifyAlert from "../../Alert/ModifyAlert";

const AllPanditBooking = () => {
  const { uniqueId } = useAuth();
  const [pandits, setPandits] = useState([]);
  const [filteredPandits, setFilteredPandits] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedPandit, setSelectedPandit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  // ===================== FETCH PANDITS =====================
  const fetchPandits = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URLL}api/get-all-registered/?role=pandit&status=accepted`
      );

      const panditList = res.data?.results || [];

      if (Array.isArray(panditList)) {
        const formatted = panditList.map((p) => ({
          ...p,
          pandit_image_url: `https://mahadevaaya.com/backend${p.pandit_image}`,
          aadhar_doc_url: `https://mahadevaaya.com/backend${p.aadhar_document}`,
        }));
        setPandits(formatted);
        setFilteredPandits(formatted);
      }
    } catch (err) {
      console.error("Error fetching pandits:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPandits();
  }, []);

  // ===================== SEARCH =====================
  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredPandits(pandits);
      return;
    }
    const lower = query.toLowerCase();
    const filtered = pandits.filter(
      (p) =>
        p.first_name?.toLowerCase().includes(lower) ||
        p.last_name?.toLowerCase().includes(lower) ||
        p.email?.toLowerCase().includes(lower) ||
        p.phone?.toLowerCase().includes(lower) ||
        p.city?.toLowerCase().includes(lower) ||
        p.state?.toLowerCase().includes(lower) ||
        p.country?.toLowerCase().includes(lower)
    );
    setFilteredPandits(filtered);
  };

  //  File URL helper
  const getFileUrl = (path) => {
    if (!path) return null;
    return `https://mahadevaaya.com/backend${
      path.startsWith("/") ? path : "/" + path
    }`;
  };

  //  Handle view click
  const handleView = (pandit) => {
    setSelectedPandit(pandit);
    setShowModal(true);
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="admin-sidebar">
        <AdminLeftnav />
      </aside>

      <main className="main-container">
        <div className="content-box">
          {/* ============== HEADER + SEARCH ============== */}
          <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
            <h1 className="fw500">
              <Breadcrumb>
                <Breadcrumb.Item href="/AdminDashBoard">
                  <span className="fw700h1">DashBoard</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Pandit Booking</Breadcrumb.Item>
              </Breadcrumb>
            </h1>

            <div>
              <SearchFeature onSearch={handleSearch} />
            </div>
          </div>

          {/*  Alert */}
          {alert.show && (
            <ModifyAlert
              variant={alert.variant}
              message={alert.message}
              onClose={() => setAlert({ show: false })}
            />
          )}

          {/* ============== TABLE ============== */}
          <Row className="mt-3">
            <div className="col-md-12">
              <table className="admin-rwd-table">
                <tbody>
                  <tr>
                    <th>S.No</th>
                    <th>Pandit Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Country</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>

                  {filteredPandits.length > 0 ? (
                    filteredPandits.map((pandit, index) => (
                      <tr key={pandit.id}>
                        <td data-th="S. No">{index + 1}</td>
                        <td data-th="Pandit Name">
                          {pandit.first_name} {pandit.last_name}
                        </td>
                        <td data-th="Email">{pandit.email}</td>
                        <td data-th="Phone">{pandit.phone}</td>
                        <td data-th="City">{pandit.city}</td>
                        <td data-th="State">{pandit.state}</td>
                        <td data-th="Country">{pandit.country}</td>
                        <td data-th="Status">{pandit.pandit_status || "Accepted"}</td>
                        <td>
                          <Button
                            className="event-click-btn"
                            size="sm"
                            onClick={() => handleView(pandit)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
                        {loading ? "Loading..." : "No Accepted Pandits Found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Row>

          {/* ============== MODAL ============== */}
          <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title>Pandit Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {selectedPandit ? (
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Pandit ID</Form.Label>
                        <Form.Control 
                        className="temp-form-control-option"
                        value={selectedPandit.pandit_id || ""} disabled />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Pandit Name</Form.Label>
                        <Form.Control
                        className="temp-form-control-option"
                          value={`${selectedPandit.first_name || ""} ${
                            selectedPandit.last_name || ""
                          }`}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Father's Name</Form.Label>
                        <Form.Control
                        className="temp-form-control-option"
                          value={selectedPandit.father_name || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Phone</Form.Label>
                        <Form.Control 
                        className="temp-form-control-option"
                        value={selectedPandit.phone || ""} disabled />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Email</Form.Label>
                        <Form.Control 
                        className="temp-form-control-option"
                        value={selectedPandit.email || ""} disabled />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Aadhar Number</Form.Label>
                        <Form.Control
                         className="temp-form-control-option"
                          value={selectedPandit.aadhar_number || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Address</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          as="textarea"
                          rows={2}
                          value={selectedPandit.permanent_address || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Location</Form.Label>
                        <Form.Control
                        className="temp-form-control-option"
                          value={`${selectedPandit.city || ""}, ${
                            selectedPandit.state || ""
                          }, ${selectedPandit.country || ""}`}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Zip Code</Form.Label>
                        <Form.Control 
                        className="temp-form-control-option"
                        value={selectedPandit.zipcode || ""} disabled />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Temple Association</Form.Label>
                        <Form.Control
                        className="temp-form-control-option"
                          value={selectedPandit.temple_association || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Pooja Details */}
                  <Row className="mt-4">
                    <Col>
                      <h5>Pooja Details</h5>
                      {selectedPandit.pandit_pooja_details?.length ? (
                        <table className="admin-rwd-table">
                          <tbody>
                            <tr>
                              <th>Pooja ID</th>
                              <th>Pooja Name</th>
                              <th>Price (₹)</th>
                            </tr>
                            {selectedPandit.pandit_pooja_details.map((pooja, i) => (
                              <tr key={i}>
                                <td>{pooja.pandit_pooja_id}</td>
                                <td>{pooja.pooja_name}</td>
                                <td>{pooja.pooja_price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p className="text-muted">No pooja details available.</p>
                      )}
                    </Col>
                  </Row>

                  {/* Documents Section */}
                  <Row className="mt-4 gy-4">
                    {[
                      { label: "Pandit Image", key: "pandit_image" },
                      { label: "Aadhar Document", key: "aadhar_document" },
                    ].map(({ label, key }, index) => (
                      <Col md={6} key={index}>
                        <h6 style={{ fontSize: "14px", fontWeight: "600" }}>{label}</h6>

                        {selectedPandit[key] ? (
                          <div className="my-2">
                            {/\.(jpg|jpeg|png)$/i.test(selectedPandit[key]) ? (
                              <>
                                <img
                                  src={getFileUrl(selectedPandit[key])}
                                  alt={label}
                                  style={{
                                    width: "100%",
                                    height: "150px",
                                    objectFit: "contain",
                                    borderRadius: "10px",
                                    border: "1px solid #ccc",
                                  }}
                                />
                                <div className="mt-2">
                                  <a
                                    href={getFileUrl(selectedPandit[key])}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="event-click-btn"
                                    style={{
                                      fontSize: "12px",
                                      padding: "3px 8px",
                                      textDecoration: "none",
                                    }}
                                  >
                                    View Full Image
                                  </a>
                                </div>
                              </>
                            ) : (
                              <a
                                href={getFileUrl(selectedPandit[key])}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="event-click-btn"
                                style={{
                                  fontSize: "12px",
                                  padding: "3px 8px",
                                  textDecoration: "none",
                                }}
                              >
                                📄 View Full PDF
                              </a>
                            )}
                          </div>
                        ) : (
                          <p className="text-muted">No document uploaded.</p>
                        )}
                      </Col>
                    ))}
                  </Row>
                </Form>
              ) : (
                <div className="text-center text-muted py-3">No pandit selected.</div>
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button className="event-click-cancel" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default AllPanditBooking;
