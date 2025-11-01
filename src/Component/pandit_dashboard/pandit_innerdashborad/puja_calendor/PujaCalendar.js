import React, { useState } from "react";
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
  // Sample events data (replace with your actual data)
  const [events] = useState([
    {
      title: 'Ganesh Chaturthi',
      start: new Date(2023, 8, 19),
      end: new Date(2023, 8, 19),
    },
    {
      title: 'Navratri Start',
      start: new Date(2023, 9, 15),
      end: new Date(2023, 9, 15),
    },
    {
      title: 'Diwali',
      start: new Date(2023, 10, 12),
      end: new Date(2023, 10, 12),
    }
  ]);

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
            </div>

            {/* Add Calendar Component */}
            <div style={{ height: '500px', marginTop: '20px' }}>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PujaCalendar;