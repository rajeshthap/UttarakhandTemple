import React, { useEffect, useState } from "react";
import { Row, Button, Breadcrumb, Modal, Form, Col } from "react-bootstrap";
import "../../../assets/CSS/AdminLeftNav.css";
import AdminLeftnav from "../AdminLeftnav";
import { useAuth } from "../../GlobleAuth/AuthContext";
import axios from "axios";
import { BASE_URLL } from "../../../Component/BaseURL";
import SearchFeature from "../../temp_dashboard/temp_innerdashboard/SearchFeature";
import ModifyAlert from "../../Alert/ModifyAlert";

const AllDevoteeBooking = () => {
  const { uniqueId } = useAuth();
  const [devotees, setDevotees] = useState([]);
  const [filteredDevotees, setFilteredDevotees] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedDevotee, setSelectedDevotee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  // ===================== FETCH DEVOTEES =====================
  const fetchDevotees = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URLL}api/get-all-registered/?role=user`
      );

      const devoteeList = res.data?.results || [];

      if (Array.isArray(devoteeList)) {
        const formatted = devoteeList.map((d) => ({
          ...d,
          devotee_photo_url: d.devotee_photo
            ? `https://mahadevaaya.com/backend${d.devotee_photo}`
            : null,
        }));
        setDevotees(formatted);
        setFilteredDevotees(formatted);
      }
    } catch (err) {
      console.error("Error fetching devotees:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevotees();
  }, []);

  // ===================== SEARCH =====================
  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredDevotees(devotees);
      return;
    }
    const lower = query.toLowerCase();
    const filtered = devotees.filter(
      (d) =>
        d.devotee_name?.toLowerCase().includes(lower) ||
        d.email?.toLowerCase().includes(lower) ||
        d.phone?.toLowerCase().includes(lower) ||
        d.user_id?.toLowerCase().includes(lower) ||
        d.gender?.toLowerCase().includes(lower)
    );
    setFilteredDevotees(filtered);
  };

  // ===================== HANDLE VIEW =====================
  const handleView = (devotee) => {
    setSelectedDevotee(devotee);
    setShowModal(true);
  };

  const getFileUrl = (path) => {
    if (!path) return null;
    return `https://mahadevaaya.com/backend${
      path.startsWith("/") ? path : "/" + path
    }`;
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
                <Breadcrumb.Item active>Devotee Booking</Breadcrumb.Item>
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
                    <th>User ID</th>
                    <th>Devotee Name</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>

                  {filteredDevotees.length > 0 ? (
                    filteredDevotees.map((devotee, index) => (
                      <tr key={devotee.id}>
                        <td data-th="S.No">{index + 1}</td>
                        <td data-th="User ID">{devotee.user_id}</td>
                        <td data-th="Devotee Name">{devotee.devotee_name}</td>
                        <td data-th="Gender">{devotee.gender}</td>
                        <td data-th="Email">{devotee.email}</td>
                        <td data-th="Phone">{devotee.phone}</td>
                        <td data-th="Status">{devotee.user_status}</td>
                        <td>
                          <Button
                            className="event-click-btn"
                            size="sm"
                            onClick={() => handleView(devotee)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        {loading ? "Loading..." : "No Devotees Found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Row>

          {/* ============== MODAL ============== */}
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            size="lg"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Devotee Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {selectedDevotee ? (
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label  className="temp-label">User ID</Form.Label>
                        <Form.Control
                        className="temp-form-control-option"
                          value={selectedDevotee.user_id || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Devotee Name</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedDevotee.devotee_name || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Gender</Form.Label>
                        <Form.Control
                             className="temp-form-control-option"
                          value={selectedDevotee.gender || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Email</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedDevotee.email || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Phone</Form.Label>
                        <Form.Control
                        className="temp-form-control-option"
                          value={selectedDevotee.phone || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Status</Form.Label>
                        <Form.Control
                        className="temp-form-control-option"
                          value={selectedDevotee.user_status || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Devotee Photo */}
                  <Row className="mt-4">
                    <Col md={6}>
                      <h6 style={{ fontSize: "14px", fontWeight: "600" }}>
                        Devotee Photo
                      </h6>
                      {selectedDevotee.devotee_photo ? (
                        <div className="my-2">
                          <img
                            src={getFileUrl(selectedDevotee.devotee_photo)}
                            alt="Devotee"
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
                              href={getFileUrl(selectedDevotee.devotee_photo)}
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
                        </div>
                      ) : (
                        <p className="text-muted">No photo uploaded.</p>
                      )}
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col>
                      <p>
                        <strong>Created At:</strong>{" "}
                        {new Date(
                          selectedDevotee.created_at
                        ).toLocaleString()}
                      </p>
                    </Col>
                  </Row>
                </Form>
              ) : (
                <div className="text-center text-muted py-3">
                  No devotee selected.
                </div>
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button
                className="event-click-cancel"
                onClick={() => setShowModal(false)}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default AllDevoteeBooking;
