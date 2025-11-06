import React, { useEffect, useState } from "react";
import "../../../../assets/CSS/AdminLeftNav.css";
import AdminLeftnav from "../../AdminLeftnav";
import { Row, Breadcrumb, Button } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';

const PendingRequest = () => {
  const [activeTab, setActiveTab] = useState('Pandit'); // Default active tab

  const tabs = [
    { id: 'Pandit', label: 'Pandit', content: 'Pandit is the capital city of England.' },
    { id: 'Temple', label: 'Temple', content: 'Temple is the capital of France.' },
    { id: 'Devotee', label: 'Devotee', content: 'Devotee is the capital of Japan.' }
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
                <Breadcrumb.Item href="/AdminDashboard">
                  <span className="fw700h1">Admin</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Pending Requests</Breadcrumb.Item>
              </Breadcrumb>
            </h1>
          </div>

          <div className="mt-3 row">
            <div className="col-md-12">
              <div>
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
                {tabs.map((tab) => (
                  <div
                    key={tab.id}
                    id={tab.id}
                    className="tabcontent"
                    style={{ display: activeTab === tab.id ? 'block' : 'none' }}
                  >
                    <h3>{tab.label}</h3>
                    <p>{tab.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PendingRequest;