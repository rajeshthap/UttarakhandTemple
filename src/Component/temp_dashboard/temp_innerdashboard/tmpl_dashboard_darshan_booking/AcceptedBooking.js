import React, { useEffect, useState } from "react";
import "../../../../assets/CSS/LeftNav.css";
import TempleLeftNav from "../../TempleLeftNav";
import SearchFeature from "../SearchFeature";
import { Form, Button, Modal, Row, Col, Breadcrumb} from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../../GlobleAuth/AuthContext";

const AcceptedBooking = () => {
  const { uniqueId } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://mahadevaaya.com/backend/api/get-darshan-pooja-booking/",
        {
          params: {
            creator_id: uniqueId,
            status: "accepted",
          },
        }
      );

      if (res.data && Array.isArray(res.data)) {
        setBookings(res.data);
        setFilteredBookings(res.data);
      } else if (res.data && Array.isArray(res.data.data)) {
        setBookings(res.data.data);
        setFilteredBookings(res.data.data);
      } else {
        setBookings([]);
        setFilteredBookings([]);
      }
    } catch (err) {
      setBookings([]);
      setFilteredBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (uniqueId) fetchBookings();
  }, [uniqueId]);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredBookings(bookings);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = bookings.filter(
      (b) =>
        b.darshan_pooja_id?.toLowerCase().includes(lowerQuery) ||
        b.temple_name?.toLowerCase().includes(lowerQuery) ||
        b.full_name?.toLowerCase().includes(lowerQuery) ||
        b.email?.toLowerCase().includes(lowerQuery) ||
        b.mobile_number?.toLowerCase().includes(lowerQuery)
    );
    setFilteredBookings(filtered);
  };

  const handleView = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setSelectedBooking((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBookingUpdate = async () => {
    if (!selectedBooking) return;

    try {
      const { darshan_pooja_id, status } = selectedBooking;

      if (!uniqueId || !darshan_pooja_id) {
        alert("Missing temple_id or darshan_pooja_id — cannot update.");
        console.error("Missing IDs:", {
          temple_id: uniqueId,
          darshan_pooja_id: darshan_pooja_id,
        });
        return;
      }

      const payload = {
        temple_id: uniqueId,
        darshan_pooja_id: darshan_pooja_id,
        status: status?.toLowerCase() || "",
      };

      await axios.put(
        "https://mahadevaaya.com/backend/api/get-darshan-pooja-booking/",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Booking status updated successfully!");
      setShowModal(false);
      fetchBookings();
    } catch (error) {
      alert("Failed to update booking. Try again!");
    }
  };

  return (
    <>
      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <aside className="temp-sidebar">
          <TempleLeftNav />
        </aside>

        {/* Main Section */}
        <main className="main-container-box">
          <div className="content-box">
        <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
                                  <h1 className="fw500">
                                    <Breadcrumb>
                                      <Breadcrumb.Item href="/TempleDashBoard">
                                        <span className="fw700h1">DashBoard</span>
                                      </Breadcrumb.Item>
                                      <Breadcrumb.Item active>Accepted Booking</Breadcrumb.Item>
                                    </Breadcrumb>
                                  </h1>
                        <div>
                <SearchFeature onSearch={handleSearch} />
              </div>
                                  
                                </div>

            {/* TABLE SECTION */}
            <Row className="mt-3">
              <div className="col-md-12">
                <table className="rwd-table">
                  <tbody>
                    <tr>
                      <th>S.No</th>
                      <th>Darshan & Pooja ID</th>
                      <th>Temple Name</th>
                      <th>Devotee Name</th>
                      <th>Devotee Email</th>
                      <th>Devotee Mobile</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>

                    {filteredBookings.length > 0 ? (
                      filteredBookings.map((booking, index) => (
                        <tr key={index}>
                          <td data-th="S.No">{index + 1}</td>
                          <td data-th="Darshan & Pooja ID">
                            {booking.darshan_pooja_id || "N/A"}
                          </td>
                          <td data-th="Temple Name">{booking.temple_name}</td>
                          <td data-th="Devotee Name">{booking.full_name}</td>
                          <td data-th="Devotee Email">
                            {booking.email || "N/A"}
                          </td>
                          <td data-th="Devotee Mobile">
                            {booking.mobile_number}
                          </td>
                          <td data-th="Status">{booking.status || "accepted"}</td>
                          <td>
                            <Button
                              className="event-click-btn"
                              size="sm"
                              onClick={() => handleView(booking)}
                            >
                              Reject/Pending
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
                          {loading ? "Loading..." : "No bookings found."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Row>

            {/* Edit Booking Modal */}
            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}
              size="lg"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit Booking</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                {selectedBooking && (
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">
                            Darshan & Pooja ID
                          </Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedBooking.darshan_pooja_id || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">
                            Temple Name
                          </Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedBooking.temple_name || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">
                            Devotee Name
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
                            Devotee Mobile
                          </Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedBooking.mobile_number || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">Email</Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedBooking.email || ""}
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
                            value={selectedBooking.status || ""}
                            onChange={handleBookingChange}
                          >
                            <option value="">Select Status</option>
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

export default AcceptedBooking;
