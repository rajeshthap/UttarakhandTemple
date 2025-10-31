import React, { useEffect, useState } from "react";
import "../../../../assets/CSS/PanditLeftNav.css";
import {
  Breadcrumb,
  Row,
  Spinner,
  Button,
  Modal,
  Form,
  Col,
} from "react-bootstrap";
import SearchFeature from "../../../temp_dashboard/temp_innerdashboard/SearchFeature";
import PanditLeftNav from "../../PanditLeftNav";
import axios from "axios";
import { useAuth } from "../../../GlobleAuth/AuthContext";

const NewPujaBooking = () => {
  const { uniqueId } = useAuth();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchRequests = async () => {
    if (!uniqueId) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `https://mahadevaaya.com/backend/api/get-hire-pandit/?pandit_id=${uniqueId}`
      );

      const data = Array.isArray(res.data) ? res.data : [];
      const now = new Date();

      const pendingData = data.filter((item) => {
        const isPending = item.number_of_pandits?.some(
          (p) =>
            p.pandit_id === uniqueId && p.status?.toLowerCase() === "pending"
        );

        if (!isPending) return false;

        //  Only show if within 7 days AFTER date_and_time
        const bookingDate = new Date(item.date_and_time);
        const diffDays = (now - bookingDate) / (1000 * 60 * 60 * 24);
        return diffDays >= 0 && diffDays <= 7;
      });

      setRequests(pendingData);
      setFilteredRequests(pendingData);
    } catch (error) {
      console.error("Error fetching pending requests:", error);
      setRequests([]);
      setFilteredRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [uniqueId]);
  //  Auto-refresh every 1 minute to remove expired ones
  useEffect(() => {
    const interval = setInterval(fetchRequests, 60000);
    return () => clearInterval(interval);
  }, [uniqueId]);

  //  Search
  const handleSearch = (query) => {
    if (!query) {
      setFilteredRequests(requests);
      return;
    }
    const lower = query.toLowerCase();
    const filtered = requests.filter(
      (req) =>
        req.full_name?.toLowerCase().includes(lower) ||
        req.mobile_number?.toLowerCase().includes(lower) ||
        req.pooja_type?.toLowerCase().includes(lower) ||
        req.location?.toLowerCase().includes(lower)
    );
    setFilteredRequests(filtered);
  };

  //  Open Modal
  const handleView = (request) => {
    const pandit = request.number_of_pandits.find(
      (p) => p.pandit_id === uniqueId
    );
    setSelectedRequest({ ...request, status: pandit?.status || "pending" });
    setShowModal(true);
  };

  //  Handle status change
  const handleStatusChange = (e) => {
    const { name, value } = e.target;
    setSelectedRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //  Update status API call
  const handleUpdateStatus = async () => {
    if (!selectedRequest || !uniqueId) return;
    try {
      const payload = {
        hire_pandit_id: selectedRequest.hire_pandit_id,
        pandit_id: uniqueId,
        status: selectedRequest.status,
      };

      await axios.put(
        "https://mahadevaaya.com/backend/api/get-hire-pandit/",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Booking status updated successfully!");
      setShowModal(false);
      fetchRequests();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Try again!");
    }
  };

  return (
    <>
      <div className="dashboard-wrapper">
        <aside className="pandit-sidebar">
          <PanditLeftNav />
        </aside>

        <main className="main-container-box">
          <div className="content-box">
            <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
              <h1 className="fw500">
                <Breadcrumb>
                  <Breadcrumb.Item href="/Pandit_DashBoard">
                    <span className="fw700h1">Dashboard</span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>Booking Requests</Breadcrumb.Item>
                  <Breadcrumb.Item active>Pending Requests</Breadcrumb.Item>
                </Breadcrumb>
              </h1>
              <div>
                <SearchFeature onSearch={handleSearch} />
              </div>
            </div>

            {/* Table Section */}
            <Row className="mt-3">
              <div className="col-md-12">
                <table className="pandit-rwd-table">
                  <tbody>
                    <tr>
                      <th>S.No</th>
                      <th>Full Name</th>
                      <th>Mobile</th>
                      <th>Pooja Type</th>
                      <th>Location</th>
                      <th>Date & Time</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>

                    {filteredRequests.length > 0 ? (
                      filteredRequests.map((req, index) => {
                        const pandit = req.number_of_pandits.find(
                          (p) => p.pandit_id === uniqueId
                        );
                        return (
                          <tr key={index}>
                            <td data-th="S.No">{index + 1}</td>
                            <td data-th="Full Name">{req.full_name}</td>
                            <td data-th="Mobile">{req.mobile_number}</td>
                            <td data-th="Pooja Type">{req.pooja_type}</td>
                            <td data-th="Location">{req.location}</td>
                            <td data-th="Date & Time">
                              {new Date(req.date_and_time).toLocaleString()}
                            </td>
                            <td data-th="Status">{pandit?.status || "pending"}</td>
                            <td data-th="Action">
                              <Button
                                className="event-click-btn"
                                size="sm"
                                onClick={() => handleView(req)}
                              >
                                Change Status
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
                          {loading ? (
                            <Spinner animation="border" />
                          ) : (
                            "No pending poojas within 7 days from their booking date."
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Row>

            {/* Modal Section */}
            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}
              size="lg"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Booking Details</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                {selectedRequest && (
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">
                            Full Name
                          </Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedRequest.full_name || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">
                            Mobile Number
                          </Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedRequest.mobile_number || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">
                            Pooja Type
                          </Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedRequest.pooja_type || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">
                            Language Preference
                          </Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedRequest.language_preference || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">
                            Date & Time
                          </Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={
                              selectedRequest.date_and_time
                                ? new Date(
                                    selectedRequest.date_and_time
                                  ).toLocaleString()
                                : ""
                            }
                            disabled
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">Location</Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedRequest.location || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">
                            Special Requirements
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            className="temp-form-control-option"
                            value={selectedRequest.special_requirements || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">
                            Payment Mode
                          </Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedRequest.payment_mode || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">Grand Total</Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedRequest.grand_total || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">Status</Form.Label>
                          <Form.Select
                            className="temp-form-control-option"
                            name="status"
                            value={selectedRequest.status || "pending"}
                            onChange={handleStatusChange}
                          >
                            <option value="pending">Pending</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Modal.Body>

              <Modal.Footer>
                <Button className="event-click-btn" onClick={handleUpdateStatus}>
                  Update
                </Button>
                <Button
                  className="event-click-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </main>
      </div>
    </>
  );
};

export default NewPujaBooking;
