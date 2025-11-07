import React, { useState } from "react";
import "../../../../assets/CSS/AdminLeftNav.css";
import AdminLeftnav from "../../AdminLeftnav";
import { Breadcrumb } from "react-bootstrap";
import TempleAccepted from "../../TempleAccepted";
import PanditAccepted from "../../PanditAccepted";


const AcceptedRequest = () => {
  const [activeTab, setActiveTab] = useState("Pandit");

  const tabs = [
    { id: "Pandit", label: "Pandit" },
    { id: "Temple", label: "Temple" },
    { id: "Devotee", label: "Devotee" },
  ];

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <AdminLeftnav />
      </aside>

      {/* Main Section */}
      <main className="admin-container">
        <div className="content-box">
          {/* Breadcrumb */}
          <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
            <h1 className="fw500">
              <Breadcrumb>
                <Breadcrumb.Item href="/AdminDashboard">
                  <span className="fw700h1">DashBoard</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Accepted Requests</Breadcrumb.Item>
              </Breadcrumb>
            </h1>
          </div>

          {/* Tabs */}
          <div className="mt-3 row">
            <div className="col-md-12">
              <div className="tab">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`tablinks ${activeTab === tab.id ? "active" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="tabcontent ">
                {activeTab === "Pandit" && (
                  <PanditAccepted />
                )}

                {activeTab === "Temple" && (
                  <TempleAccepted />
                )}

                {activeTab === "Devotee" && (
                  <div>
                    <h3>Devotee</h3>
                    <p>Devotee pending requests will appear here...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AcceptedRequest;
