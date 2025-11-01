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
  const [error, setError] = useState(null);
  const [apiResponse, setApiResponse] = useState(null); // For debugging

  // Fetch booking data from API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching data from API...");
        const response = await fetch('https://mahadevaaya.com/backend/api/get-darshan-pooja-booking/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add any required authentication headers here
            // 'Authorization': 'Bearer YOUR_TOKEN_HERE',
          },
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);
        setApiResponse(data); // Store for debugging

        // Check if data is an array
        if (!Array.isArray(data)) {
          throw new Error("API response is not an array");
        }

        // Transform API data to calendar events format
        const events = data.map(booking => {
          // Validate required fields
          if (!booking.id || !booking.pujaName || !booking.customerName || !booking.date) {
            console.warn("Invalid booking data:", booking);
            return null;
          }

          return {
            id: booking.id,
            title: `${booking.pujaName} - ${booking.customerName}`,
            start: new Date(booking.date),
            end: new Date(booking.date),
            allDay: true,
            resource: {
              bookingId: booking.id,
              status: booking.status || 'Confirmed', // Default status if not provided
              location: booking.location || 'Temple' // Default location if not provided
            }
          };
        }).filter(event => event !== null); // Remove invalid events

        console.log("Transformed events:", events);
        setBookings(events);

        if (events.length === 0) {
          console.warn("No valid events found in API response");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError(error.message);

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

  // Function to retry API call
  const retryFetch = () => {
    setLoading(true);
    setError(null);
    // This will trigger the useEffect again
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
                  <Breadcrumb.Item active>Puja Calendar</Breadcrumb.Item>
                </Breadcrumb>
              </h1>

              {/* Add booking button */}
              <button className="btn btn-primary">
                + Add New Booking
              </button>
            </div>

            {/* Error message */}
            {error && (
              <div className="alert alert-danger d-flex justify-content-between align-items-center">
                <div>
                  <strong>Error:</strong> {error}
                  <div className="mt-2">
                    <small>Check browser console for more details</small>
                  </div>
                </div>
                <button className="btn btn-outline-danger btn-sm" onClick={retryFetch}>
                  Retry
                </button>
              </div>
            )}

            {/* Debug info (remove in production) */}
            {process.env.NODE_ENV === 'development' && apiResponse && (
              <div className="alert alert-info">
                <strong>Debug Info:</strong>
                <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
              </div>
            )}

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