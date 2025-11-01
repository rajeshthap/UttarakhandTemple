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
import { PiArrowsCounterClockwiseBold } from "react-icons/pi";

const UpcomingPuja = () => {
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
      //  Check if current pandit’s status is pending
      const isPending = item.number_of_pandits?.some(
        (p) =>
          p.pandit_id === uniqueId && p.status?.toLowerCase() === "pending"
      );
      if (!isPending) return false;

      //  Compare using fetched date_and_time
      const bookingDate = new Date(item.date_and_time);

      // Calculate days between now and booking date
      const diffDays = (bookingDate - now) / (1000 * 60 * 60 * 24);

      //  Show only poojas that are scheduled AFTER 7 days from now
      return diffDays > 7;
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

  // Auto-refresh every minute
  useEffect(() => {
    const interval = setInterval(fetchRequests, 60000);
    return () => clearInterval(interval);
  }, [uniqueId]);

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

  const handleView = (request) => {
    const pandit = request.number_of_pandits.find(
      (p) => p.pandit_id === uniqueId
    );
    setSelectedRequest({ ...request, status: pandit?.status || "pending" });
    setShowModal(true);
  };

  const handleStatusChange = (e) => {
    const { name, value } = e.target;
    setSelectedRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
                  <Breadcrumb.Item active>
                    Upcoming Pujas
                  </Breadcrumb.Item>
                </Breadcrumb>
              </h1>
              <div>
                <SearchFeature onSearch={handleSearch} />
              </div>
            </div>

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
                            <td>{index + 1}</td>
                            <td>{req.full_name}</td>
                            <td>{req.mobile_number}</td>
                            <td>{req.pooja_type}</td>
                            <td>{req.location}</td>
                            <td>
                              {new Date(req.date_and_time).toLocaleString()}
                            </td>
                            <td>{pandit?.status || "pending"}</td>
                            <td>
                              <Button
                                className="event-click-btn"
                                size="sm"
                                onClick={() => handleView(req)}
                              >
                             <PiArrowsCounterClockwiseBold className="add-edit-icon" />   Change Status
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
                            "No upcoming poojas (7 days after start date) found."
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Row>

            {/* Modal */}
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
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            value={selectedRequest.full_name || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Mobile</Form.Label>
                          <Form.Control
                            value={selectedRequest.mobile_number || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Pooja Type</Form.Label>
                          <Form.Control
                            value={selectedRequest.pooja_type || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Date & Time</Form.Label>
                          <Form.Control
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
                          <Form.Label>Status</Form.Label>
                          <Form.Select
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
                <Button onClick={handleUpdateStatus} className="event-click-btn">
                  Update
                </Button>
                <Button
                  onClick={() => setShowModal(false)}
                  className="event-click-cancel"
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

export default UpcomingPuja;
