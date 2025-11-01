import React, { useState, useEffect } from "react";
import "../../../../assets/CSS/PanditLeftNav.css";
import { Breadcrumb } from "react-bootstrap";
import SearchFeature from "../../../temp_dashboard/temp_innerdashboard/SearchFeature";
import PanditLeftNav from "../../PanditLeftNav";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup localizer using moment
const localizer = momentLocalizer(moment);

const PujaCalendar = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch booking data from API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('https://your-api-endpoint.com/bookings');
        const data = await response.json();

        // Transform API data to calendar events format
        const events = data.map(booking => ({
          id: booking.id,
          title: `${booking.pujaName} - ${booking.customerName}`,
          start: new Date(booking.date),
          end: new Date(booking.date),
          allDay: true,
          resource: {
            bookingId: booking.id,
            status: booking.status,
            location: booking.location
          }
        }));

        setBookings(events);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        // Fallback to mock data if API fails
        setBookings([
          {
            id: 1,
            title: "Ganesh Puja - Ramesh Kumar",
            start: new Date(2023, 8, 19),
            end: new Date(2023, 8, 19),
            allDay: true,
            resource: { bookingId: 1, status: "Confirmed", location: "Temple A" }
          },
          {
            id: 2,
            title: "Navratri Pooja - Sita Sharma",
            start: new Date(2023, 9, 15),
            end: new Date(2023, 9, 15),
            allDay: true,
            resource: { bookingId: 2, status: "Pending", location: "Home" }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Custom event styling based on status
  const eventStyleGetter = (event) => {
    let backgroundColor = '#3174ad'; // Default color

    if (event.resource.status === 'Confirmed') {
      backgroundColor = '#28a745'; // Green
    } else if (event.resource.status === 'Pending') {
      backgroundColor = '#ffc107'; // Yellow
    } else if (event.resource.status === 'Cancelled') {
      backgroundColor = '#dc3545'; // Red
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        color: 'white',
        border: 'none',
        display: 'block'
      }
    };
  };

  // Custom event component
  const CustomEvent = ({ event }) => (
    <div>
      <strong>{event.title.split(' - ')[0]}</strong>
      <div>{event.title.split(' - ')[1]}</div>
      <div style={{ fontSize: '0.8em' }}>
        {event.resource.location} | {event.resource.status}
      </div>
    </div>
  );

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
                  <Breadcrumb.Item active>Puja Calendar</Breadcrumb.Item>
                </Breadcrumb>
              </h1>

              {/* Add booking button */}
              <button className="btn btn-primary">
                + Add New Booking
              </button>
            </div>

            {/* Calendar Controls */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <span className="me-3">
                  <span className="badge bg-success me-1"></span> Confirmed
                </span>
                <span className="me-3">
                  <span className="badge bg-warning me-1"></span> Pending
                </span>
                <span>
                  <span className="badge bg-danger me-1"></span> Cancelled
                </span>
              </div>

              <SearchFeature placeholder="Search bookings..." />
            </div>

            {/* Calendar Component */}
            <div className="calendar-container" style={{ height: '70vh', minHeight: '500px' }}>
              {loading ? (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <Calendar
                  localizer={localizer}
                  events={bookings}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: '100%' }}
                  views={['month', 'week', 'day']}
                  defaultView="month"
                  components={{
                    event: CustomEvent
                  }}
                  eventPropGetter={eventStyleGetter}
                  onSelectEvent={(event) => {
                    alert(`Booking Details:\n\nPuja: ${event.title.split(' - ')[0]}\nCustomer: ${event.title.split(' - ')[1]}\nStatus: ${event.resource.status}\nLocation: ${event.resource.location}`);
                  }}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PujaCalendar;