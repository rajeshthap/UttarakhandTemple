import React, { useEffect, useState } from "react";
import "../../../../assets/CSS/PanditLeftNav.css";
import {
  Breadcrumb,
  Row,
  Button,
  Modal,
  Form,
  Col,
  Spinner,
} from "react-bootstrap";
import SearchFeature from "../../../temp_dashboard/temp_innerdashboard/SearchFeature";
import PanditLeftNav from "../../PanditLeftNav";
import axios from "axios";
import { useAuth } from "../../../GlobleAuth/AuthContext";

const CancelledRequests = () => {
  const { uniqueId } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //  Fetch Cancelled Bookings
  const fetchBookings = async () => {
    if (!uniqueId) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `https://mahadevaaya.com/backend/api/get-hire-pandit/?pandit_id=${uniqueId}`
      );

      const data = Array.isArray(res.data) ? res.data : [];

      // Filter only cancelled requests
      const cancelled = data.filter((item) =>
        item.number_of_pandits?.some(
          (p) =>
            p.pandit_id === uniqueId && p.status?.toLowerCase() === "rejected"
        )
      );

      setBookings(cancelled);
      setFilteredBookings(cancelled);
    } catch (error) {
      console.error("Error fetching cancelled requests:", error);
      setBookings([]);
      setFilteredBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [uniqueId]);

  //  Search handler
  const handleSearch = (query) => {
    if (!query) {
      setFilteredBookings(bookings);
      return;
    }

    const lower = query.toLowerCase();
    const filtered = bookings.filter(
      (b) =>
        b.full_name?.toLowerCase().includes(lower) ||
        b.mobile_number?.toLowerCase().includes(lower) ||
        b.pooja_type?.toLowerCase().includes(lower) ||
        b.location?.toLowerCase().includes(lower)
    );
    setFilteredBookings(filtered);
  };

  //  View modal
  const handleView = (booking) => {
    const pandit = booking.number_of_pandits.find(
      (p) => p.pandit_id === uniqueId
    );
    setSelectedBooking({ ...booking, status: pandit?.status || "rejected" });
    setShowModal(true);
  };

  //  Handle status change
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setSelectedBooking((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //  Update booking
  const handleBookingUpdate = async () => {
    if (!selectedBooking || !uniqueId) return;
    try {
      const payload = {
        hire_pandit_id: selectedBooking.hire_pandit_id,
        pandit_id: uniqueId,
        status: selectedBooking.status,
      };

      await axios.put(
        "https://mahadevaaya.com/backend/api/get-hire-pandit/",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Booking status updated successfully!");
      setShowModal(false);
      fetchBookings();
    } catch (err) {
      console.error(err);
      alert("Failed to update status. Try again!");
    }
  };

  return (
    <>
      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <aside className="pandit-sidebar">
          <PanditLeftNav />
        </aside>

        {/* Main Content */}
        <main className="main-container-box">
          <div className="content-box">
            <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
              <h1 className="fw500">
                <Breadcrumb>
                  <Breadcrumb.Item href="/Pandit_DashBoard">
                    <span className="fw700h1">Dashboard</span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>Booking Requests</Breadcrumb.Item>
                  <Breadcrumb.Item active>Cancelled Requests</Breadcrumb.Item>
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

                    {filteredBookings.length > 0 ? (
                      filteredBookings.map((booking, index) => {
                        const pandit = booking.number_of_pandits.find(
                          (p) => p.pandit_id === uniqueId
                        );
                        return (
                          <tr key={index}>
                            <td data-th="S.No">{index + 1}</td>
                            <td data-th="Full Name">{booking.full_name}</td>
                            <td data-th="Mobile">{booking.mobile_number}</td>
                            <td data-th="Pooja Type">{booking.pooja_type}</td>
                            <td data-th="Location">{booking.location}</td>
                            <td data-th="Date & Time">
                              {new Date(booking.date_and_time).toLocaleString()}
                            </td>
                            <td data-th="Status">
                              {pandit?.status || "rejected"}
                            </td>
                            <td data-th="Action">
                              <Button
                                className="event-click-btn"
                                size="sm"
                                onClick={() => handleView(booking)}
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
                            "No cancelled requests found."
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Row>

            {/* Full Detail Modal */}
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
                {selectedBooking && (
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">
                            Full Name
                          </Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedBooking.full_name || ""}
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
                            value={selectedBooking.mobile_number || ""}
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
                            value={selectedBooking.pooja_type || ""}
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
                            value={selectedBooking.language_preference || ""}
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
                              new Date(
                                selectedBooking.date_and_time
                              ).toLocaleString() || ""
                            }
                            disabled
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">
                            Location
                          </Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedBooking.location || ""}
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
                            value={selectedBooking.special_requirements || ""}
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
                            value={selectedBooking.payment_mode || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">
                            Grand Total
                          </Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedBooking.grand_total || ""}
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
                            value={selectedBooking.status || "rejected"}
                            onChange={handleBookingChange}
                          >
                            <option value="accepted">Accepted</option>
                            <option value="pending">Pending</option>
                            <option value="rejected">Rejected</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Modal.Body>

              <Modal.Footer>
                <Button
                  className="event-click-btn"
                  onClick={handleBookingUpdate}
                  disabled={!selectedBooking}
                >
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

export default CancelledRequests;
