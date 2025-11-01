import React, { useState, useEffect } from "react";
import "../../../../assets/CSS/PanditLeftNav.css";
import {
  Breadcrumb,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import PanditLeftNav from "../../PanditLeftNav";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { useAuth } from "../../../GlobleAuth/AuthContext";

const localizer = momentLocalizer(moment);

const PujaCalendar = () => {
  const { uniqueId } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState("month");
  const [date, setDate] = useState(new Date());

  // modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleClose = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  //  Fetch requests
  const fetchRequests = async () => {
    if (!uniqueId) return;
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        `https://mahadevaaya.com/backend/api/get-hire-pandit/?pandit_id=${uniqueId}`
      );

      const data = Array.isArray(res.data) ? res.data : [];

      const events = data
        .map((item) => {
          if (!item.date_and_time) return null;
          const bookingDate = new Date(item.date_and_time);

          const panditData = item.number_of_pandits?.find(
            (p) => p.pandit_id === uniqueId
          );
          if (!panditData) return null;

          const status =
            panditData.status?.toLowerCase() === "accepted"
              ? "Accepted"
              : panditData.status?.toLowerCase() === "rejected"
              ? "Rejected"
              : "Pending";

          return {
            id: item.hire_pandit_id || item.id,
            title: `${item.pooja_type || "Pooja"} - ${status}`,
            start: bookingDate,
            end: bookingDate,
            allDay: true,
            resource: {
              ...item,
              status,
              hireId: item.hire_pandit_id,
            },
          };
        })
        .filter(Boolean);

      setBookings(events);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to fetch booking data. Please try again later.");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [uniqueId]);

  //  Update status
  const handleUpdateStatus = async () => {
    if (!selectedBooking || !selectedBooking.resource?.hireId) return;
    try {
      const payload = {
        hire_pandit_id: selectedBooking.resource.hireId,
        pandit_id: uniqueId,
        status: selectedBooking.resource.status,
      };

      await axios.put(
        "https://mahadevaaya.com/backend/api/get-hire-pandit/",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Booking status updated successfully!");
      handleClose();
      fetchRequests();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Try again!");
    }
  };

  //  Color coding
  const eventStyleGetter = (event) => {
    let backgroundColor = "#3174ad";
    if (event.resource.status === "Accepted") backgroundColor = "#28a745";
    else if (event.resource.status === "Pending") backgroundColor = "#ffc107";
    else if (event.resource.status === "Rejected") backgroundColor = "#dc3545";

    return {
      style: {
        backgroundColor,
        borderRadius: "6px",
        color: "white",
        border: "none",
        display: "block",
        padding: "4px 6px",
        textAlign: "center",
      },
    };
  };

  //  Custom Event Display
  const CustomEvent = ({ event }) => (
    <div>
      <strong style={{ display: "block", fontSize: "12px" }}>
        {event.title.split(" - ")[0]}
      </strong>
      <div
        style={{
          fontSize: "0.8em",
          marginTop: "2px",
          padding: "1px 4px",
          borderRadius: "4px",
          background:
            event.resource.status === "Accepted"
              ? "#1e7e34"
              : event.resource.status === "Pending"
              ? "#e0a800"
              : "#b02a37",
          color: "white",
        }}
      >
        {event.resource.status}
      </div>
    </div>
  );

  // Custom Toolbar
  const CustomToolbar = (toolbar) => {
    const goToToday = () => toolbar.onNavigate("TODAY");
    const goToBack = () => toolbar.onNavigate("PREV");
    const goToNext = () => toolbar.onNavigate("NEXT");

    return (
     <>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <Button
            size="sm"
            variant="outline-primary"
            className="me-2"
            onClick={goToBack}
          >
            ←
          </Button>
          <Button
            size="sm"
            variant="outline-primary"
            className="me-2"
            onClick={goToToday}
          >
            Today
          </Button>
          <Button size="sm" variant="outline-primary" onClick={goToNext}>
            →
          </Button>
        </div>
        <h5 className="m-0 fw-semibold">{toolbar.label}</h5>
        <div>
          <Button
            size="sm"
            variant={toolbar.view === "month" ? "primary" : "outline-primary"}
            className="me-2"
            onClick={() => toolbar.onView("month")}
          >
            Month
          </Button>
          <Button
            size="sm"
            variant={toolbar.view === "week" ? "primary" : "outline-primary"}
            className="me-2"
            onClick={() => toolbar.onView("week")}
          >
            Week
          </Button>
          <Button
            size="sm"
            variant={toolbar.view === "day" ? "primary" : "outline-primary"}
            onClick={() => toolbar.onView("day")}
          >
            Day
          </Button>
        </div>
      </div>

 
 {/* <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <Button
            size="sm"
            variant="outline-primary"
            className="me-2"
            onClick={goToBack}
          >
            ←
          </Button>
          <Button
            size="sm"
            variant="outline-primary"
            className="me-2"
            onClick={goToToday}
          >
            T
          </Button>
          <Button size="sm" variant="outline-primary" onClick={goToNext}>
            →
          </Button>
        </div>
        <h5 className="m-0 fw-semibold">{toolbar.label}</h5>
        <div className="pandit-mob-view">
          <Button
            size="sm"
            variant={toolbar.view === "month" ? "primary" : "outline-primary"}
            className="me-2"
            onClick={() => toolbar.onView("month")}
          >
            M
          </Button>
          <Button
            size="sm"
            variant={toolbar.view === "week" ? "primary" : "outline-primary"}
            className="me-2"
            onClick={() => toolbar.onView("week")}
          >
            W
          </Button>
          <Button
            size="sm"
            variant={toolbar.view === "day" ? "primary" : "outline-primary"}
            onClick={() => toolbar.onView("day")}
          >
            D
          </Button>
        </div>
      </div> */}
  </>

    );
  };

  //  Prevent past dates
  const handleSelectEvent = (event) => {
    const eventDate = new Date(event.start);
    const today = new Date();

    // Compare only dates (ignore time)
    const isPast = eventDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);

    if (isPast) {
      alert("Date has been Passed.");
      return; // do not open modal
    }

    setSelectedBooking(event);
    setShowModal(true);
  };

  return (
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
                <Breadcrumb.Item active>Puja Calendar</Breadcrumb.Item>
              </Breadcrumb>
            </h1>
          </div>

          {/*  Status Legend */}
          <div className="d-flex justify-content-start align-items-center mb-3 gap-4 flex-wrap">
            <div className="d-flex align-items-center">
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 4,
                  background: "#28a745",
                  marginRight: 8,
                }}
              ></span>
              <span className="fw-semibold">Accepted</span>
            </div>
            <div className="d-flex align-items-center">
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 4,
                  background: "#ffc107",
                  marginRight: 8,
                }}
              ></span>
              <span className="fw-semibold">Pending</span>
            </div>
            <div className="d-flex align-items-center">
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 4,
                  background: "#dc3545",
                  marginRight: 8,
                }}
              ></span>
              <span className="fw-semibold">Rejected</span>
            </div>
          </div>

          {/* 🔹 Calendar */}
          <div
            className="calendar-container shadow-sm border rounded p-2"
            style={{ height: "75vh", background: "#fff" }}
          >
            {loading ? (
              <div className="d-flex justify-content-center align-items-center h-100">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : error ? (
              <div className="alert alert-danger text-center">{error}</div>
            ) : (
              <Calendar
                localizer={localizer}
                events={bookings}
                startAccessor="start"
                endAccessor="end"
                date={date}
                onNavigate={(newDate) => setDate(newDate)}
                views={["month", "week", "day"]}
                view={currentView}
                onView={(view) => setCurrentView(view)}
                defaultView="month"
                popup
                components={{
                  event: CustomEvent,
                  toolbar: CustomToolbar,
                }}
                eventPropGetter={eventStyleGetter}
                onSelectEvent={handleSelectEvent}
              />
            )}
          </div>
        </div>
      </main>

      {/* 🔹 Modal */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedBooking && (
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="temp-label">Full Name</Form.Label>
                    <Form.Control
                      className="temp-form-control-option"
                      value={selectedBooking.resource.full_name || ""}
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
                      value={selectedBooking.resource.mobile_number || ""}
                      disabled
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="temp-label">Pooja Type</Form.Label>
                    <Form.Control
                      className="temp-form-control-option"
                      value={selectedBooking.resource.pooja_type || ""}
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
                      value={selectedBooking.resource.language_preference || ""}
                      disabled
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="temp-label">Date & Time</Form.Label>
                    <Form.Control
                      className="temp-form-control-option"
                      value={
                        selectedBooking.resource.date_and_time
                          ? new Date(
                              selectedBooking.resource.date_and_time
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
                      value={selectedBooking.resource.location || ""}
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
                      value={
                        selectedBooking.resource.special_requirements || ""
                      }
                      disabled
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="temp-label">Payment Mode</Form.Label>
                    <Form.Control
                      className="temp-form-control-option"
                      value={selectedBooking.resource.payment_mode || ""}
                      disabled
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="temp-label">Grand Total</Form.Label>
                    <Form.Control
                      className="temp-form-control-option"
                      value={selectedBooking.resource.grand_total || ""}
                      disabled
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="temp-label">Status</Form.Label>
                    <Form.Select
                      className="temp-form-control-option"
                      value={selectedBooking.resource.status || ""}
                      onChange={(e) =>
                        setSelectedBooking((prev) => ({
                          ...prev,
                          resource: {
                            ...prev.resource,
                            status: e.target.value,
                          },
                        }))
                      }
                    >
                      <option value="">Select</option>
                      {["pending", "accepted", "rejected"]
                        .filter(
                          (status) =>
                            status.toLowerCase() !==
                            (
                              selectedBooking.resource.status || ""
                            ).toLowerCase()
                        )
                        .map((status) => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
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
          <Button className="event-click-cancel" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PujaCalendar;
