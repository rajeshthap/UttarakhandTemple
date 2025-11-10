import React, { useEffect, useState } from "react";
import "../../../../assets/CSS/AdminLeftNav.css";
import AdminLeftnav from "../../AdminLeftnav";
import { Row, Breadcrumb, Button } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import AdminPastEvent from "./AdminPastEvent";
import AdminUpcomingEvent from "./AdminUpcomingEvent";
import AdminActiveEvent from "./AdminActiveEvent";

const AllEvents = () => {
  const [activeTab, setActiveTab] = useState('Past'); // Default active tab

  const tabs = [
    { id: 'Past', label: 'Past' },
    { id: 'Upcoming', label: 'Upcoming' },
    { id: 'ActiveEvent', label: 'ActiveEvent'  },
    
  ];

  return (
    <div className="dashboard-wrapper">
      <aside className="admin-sidebar">
        <AdminLeftnav />
      </aside>

      <main className="main-container">
        <div className="content-box">
          <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
            <h1 className="fw500">
              <Breadcrumb>
                <Breadcrumb.Item href="/AdminDashBoard">
                  <span className="fw700h1">DashBoard</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Pending Requests</Breadcrumb.Item>
              </Breadcrumb>
            </h1>
          </div>

          <div className="mt-3 row">
            <div className="col-md-12">
            
                {/* Tab Navigation */}
                <div className="tab">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`tablinks ${activeTab === tab.id ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
              <div className="tabcontent ">
                {activeTab === "Past" && (
                  <AdminPastEvent />
                )}

                {activeTab === "Upcoming" && (
                  <AdminUpcomingEvent/>
                )}

                {activeTab === "ActiveEvent" && (
                    <AdminActiveEvent/>
                )} 
              </div>

               
            
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllEvents;