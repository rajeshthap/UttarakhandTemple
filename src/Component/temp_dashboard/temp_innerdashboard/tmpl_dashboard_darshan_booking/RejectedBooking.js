import React, { useEffect, useState } from "react";
import "../../../../assets/CSS/LeftNav.css";
import TempleLeftNav from "../../TempleLeftNav";
import SearchFeature from "../SearchFeature";
import { Form, Button, Modal, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../../GlobleAuth/AuthContext";

const Rejectedbooking = () => {
  const { uniqueId } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://mahadevaaya.com/backend/api/get-darshan-pooja-booking/`,
        {
          params: {
            creator_id: uniqueId,
            status: "rejected", // Added status param as per your endpoint
          },
        }
      );

      if (res.data && Array.isArray(res.data)) {
        console.log("Bookings fetched:", res.data);
        setBookings(res.data);
      } else {
        console.warn("Unexpected API response:", res.data);
        setBookings([]);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (uniqueId) fetchBookings();
  }, [uniqueId]);

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
      console.log("Updating booking:", selectedBooking);

      const formData = new FormData();
      formData.append("booking_id", selectedBooking.booking_id);
      formData.append("status", selectedBooking.status || "");
      formData.append("remarks", selectedBooking.remarks || "");

      const response = await axios.put(
        `https://mahadevaaya.com/backend/api/get-darshan-pooja-booking/`,
        formData
      );

      console.log("Booking update response:", response.data);
      alert("Booking updated successfully!");

      setShowModal(false);
      fetchBookings(); // Refresh list after update
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("Failed to update booking. Try again!");
    }
  };

  return (
    <>
      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <TempleLeftNav />
        </aside>

        {/* Main Section */}
        <main className="main-container-box">
          <div className="content-box">
            <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
              <h1 className="fw500">
                <span className="fw700h1">New </span>Bookings
              </h1>
              <div>
                <SearchFeature />
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

                    {bookings.length > 0 ? (
                      bookings.map((booking, index) => (
                        <tr key={index}>
                          <td data-th="S.No">{index + 1}</td>
                          <td data-th="Darshan & Pooja ID">
                            {booking.darshan_and_pooja_id || "N/A"}
                          </td>
                          <td data-th="Temple Name">{booking.temple_name}</td>
                          <td data-th="Devotee Name">{booking.full_name}</td>
                          <td data-th="Devotee Email">{booking.email || "N/A"}</td>
                          <td data-th="Devotee Mobile">{booking.mobile_number}</td>
                          <td data-th="Status">{booking.status || "New"}</td>
                          <td>
                            <Button
                              className="event-click-btn"
                              size="sm"
                              onClick={() => handleView(booking)}
                            >
                              View
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
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
              <Modal.Header closeButton>
                <Modal.Title>Edit Booking</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                {selectedBooking && (
                  <Form>
                    {/* ROW 1 */}
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">
                            Darshan & Pooja ID
                          </Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedBooking.darshan_and_pooja_id || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">Temple Name</Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedBooking.temple_name || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* ROW 2 */}
                    <Row className="mt-2">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">Devotee Name</Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedBooking.full_name || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">Devotee Mobile</Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedBooking.mobile_number || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* ROW 3 */}
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
                            <option value="New">New</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* ROW 4 */}
                    <Row className="mt-2">
                      <Col md={12}>
                        <Form.Group>
                          <Form.Label className="temp-label">Remarks</Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            as="textarea"
                            rows={2}
                            name="remarks"
                            placeholder="Add remarks or comments"
                            value={selectedBooking.remarks || ""}
                            onChange={handleBookingChange}
                          />
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
                <Button className="event-click-cancel" onClick={() => setShowModal(false)}>
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

export default Rejectedbooking;
