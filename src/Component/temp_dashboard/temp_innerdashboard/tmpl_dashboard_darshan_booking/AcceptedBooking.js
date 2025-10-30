import React, { useEffect, useState } from "react";
import "../../../../assets/CSS/LeftNav.css";
import TempleLeftNav from "../../TempleLeftNav";
import SearchFeature from "../SearchFeature";
import { Form, Button, Modal, Table, Row,Col } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../../GlobleAuth/AuthContext";

const AcceptedBooking = () => {
  const { uniqueId } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //  Fetch booking data
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://mahadevaaya.com/backend/api/get-darshan-pooja-booking/`,
        {
          params: { creator_id: uniqueId },
        }
      );

      if (res.data && Array.isArray(res.data)) {
        console.log(" Bookings fetched:", res.data);
        setBookings(res.data);
      } else {
        console.warn(" Unexpected API response format:", res.data);
        setBookings([]);
      }
    } catch (err) {
      console.error(" Error fetching bookings:", err);
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

// for handling field edits
const handleBookingChange = (e) => {
  const { name, value } = e.target;
  setSelectedBooking((prev) => ({
    ...prev,
    [name]: value,
  }));
};

// for updating booking (replace with your real API)
const handleBookingUpdate = async () => {
  try {
    console.log("Updating booking:", selectedBooking);
    alert("Booking updated successfully!");
    setShowModal(false);
  } catch (error) {
    console.error("Error updating booking:", error);
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
                <span className="fw700h1">Accepted </span>Bookings
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
                      <th>Booking Date & Time</th>
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
                          <td data-th="Booking Date & Time">
                            {new Date(booking.book_date_and_time).toLocaleString()}
                          </td>
                          <td data-th="Temple Name">{booking.temple_name}</td>
                          <td data-th="Devotee Name">{booking.full_name}</td>
                          <td data-th="Devotee Email">N/A</td>
                          <td data-th="Devotee Mobile">{booking.mobile_number}</td>
                          <td data-th="Status">Accepted</td>
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
                          {loading ? "Loading..." : "No accepted bookings found."}
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
                          <Form.Label className="temp-label">Booking Number</Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedBooking.booking_number || ""}
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
                            <option value="Accepted">Accepted</option>
                            <option value="Pending">Pending</option>
                            <option value="Rejected">Rejected</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* ROW 4 */}
                    <Row className="mt-2">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">Booking Date</Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedBooking.book_date_and_time || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">Total Amount (₹)</Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedBooking.grand_total || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* ROW 5 */}
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

export default AcceptedBooking;
