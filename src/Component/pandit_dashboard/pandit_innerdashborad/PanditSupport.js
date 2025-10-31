import React from "react";
import "../../../assets/CSS/PanditLeftNav.css";

import axios from "axios";
import PanditLeftNav from "../PanditLeftNav";
import { BASE_URLL } from "../../BaseURL"; // Update to your backend base URL
import SupportPage from "../../temp_dashboard/support/SupportPage";
import { Breadcrumb } from "react-bootstrap";

const PanditSupport = () => {
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
                                <Breadcrumb.Item href="/MainDashBoard">
                                  <span className="fw700h1">DashBoard</span>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>My Profile</Breadcrumb.Item>
                              </Breadcrumb>
                            </h1>
            
                            
                          </div>
          <SupportPage />
        </div>
      </main>
    </div>
  );
};

export default PanditSupport;
