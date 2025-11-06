import React, { useEffect, useState } from "react";
import { Row, Button, Breadcrumb, Modal, Form, Col } from "react-bootstrap";
import "../../../assets/CSS/AdminLeftNav.css";
import AdminLeftnav from "../AdminLeftnav";
import axios from "axios";
import { BASE_URLL } from "../../../Component/BaseURL";
import SearchFeature from "../../temp_dashboard/temp_innerdashboard/SearchFeature";
import ModifyAlert from "../../Alert/ModifyAlert";

const DonateCrowdFunding = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  // ===================== FETCH DONATIONS =====================
  const fetchDonations = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URLL}api/get-all-crowd-donations/`);
      const donationList = res.data?.donations || [];
      setDonations(donationList);
      setFilteredDonations(donationList);
    } catch (err) {
      console.error("Error fetching crowd donations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  // ===================== SEARCH =====================
  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredDonations(donations);
      return;
    }
    const lower = query.toLowerCase();
    const filtered = donations.filter(
      (d) =>
        d.pilgrim_name?.toLowerCase().includes(lower) ||
        d.temple_name?.toLowerCase().includes(lower) ||
        d.email_id?.toLowerCase().includes(lower) ||
        d.mobile_number?.toLowerCase().includes(lower) ||
        d.donation_id?.toLowerCase().includes(lower) ||
        d.fund_name?.toLowerCase().includes(lower)
    );
    setFilteredDonations(filtered);
  };

  //  Handle view click
  const handleView = (donation) => {
    setSelectedDonation(donation);
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
                <Breadcrumb.Item href="/AdminDashboard">
                  <span className="fw700h1">Dashboard</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Crowd Funding Donations</Breadcrumb.Item>
              </Breadcrumb>
            </h1>

            <div>
              <SearchFeature onSearch={handleSearch} />
            </div>
          </div>

          {/* ============== ALERT ============== */}
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
                    <th>Donation ID</th>
                    <th>Pilgrim Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Temple Name</th>
                    <th>Fund Name</th>
                    <th>Amount (₹)</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>

                  {filteredDonations.length > 0 ? (
                    filteredDonations.map((donation, index) => (
                      <tr key={donation.id}>
                        <td data-th="S. No">{index + 1}</td>
                        <td data-th="Donation ID">{donation.donation_id}</td>
                        <td data-th="Pilgrim Name">{donation.pilgrim_name}</td>
                        <td data-th="Email">{donation.email_id}</td>
                        <td data-th="Mobile">{donation.mobile_number}</td>
                        <td data-th="Temple Name">{donation.temple_name}</td>
                        <td data-th="Fund Name">{donation.fund_name}</td>
                        <td data-th="Amount">{donation.amount}</td>
                        <td data-th="Status">
                          {donation.donation_status ? "Completed" : "Pending"}
                        </td>
                        <td>
                          <Button
                            className="event-click-btn"
                            size="sm"
                            onClick={() => handleView(donation)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center">
                        {loading ? "Loading..." : "No Crowd Funding Donations Found"}
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
              <Modal.Title>Crowd Funding Donation Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {selectedDonation ? (
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Donation ID</Form.Label>
                        <Form.Control
                          value={selectedDonation.donation_id || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Pilgrim Name</Form.Label>
                        <Form.Control
                          value={selectedDonation.pilgrim_name || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Email ID</Form.Label>
                        <Form.Control
                          value={selectedDonation.email_id || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control
                          value={selectedDonation.mobile_number || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Temple Name</Form.Label>
                        <Form.Control
                          value={selectedDonation.temple_name || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Fund Name</Form.Label>
                        <Form.Control
                          value={selectedDonation.fund_name || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Amount (₹)</Form.Label>
                        <Form.Control
                          value={selectedDonation.amount || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                          value={
                            selectedDonation.donation_status
                              ? "Completed"
                              : "Pending"
                          }
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Donation Date</Form.Label>
                        <Form.Control
                          value={
                            selectedDonation.created_at
                              ? new Date(
                                  selectedDonation.created_at
                                ).toLocaleString()
                              : ""
                          }
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Temple ID</Form.Label>
                        <Form.Control
                          value={selectedDonation.temple_id || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              ) : (
                <div className="text-center text-muted py-3">
                  No donation selected.
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

export default DonateCrowdFunding;
