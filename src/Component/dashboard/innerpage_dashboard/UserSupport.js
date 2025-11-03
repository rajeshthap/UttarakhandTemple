import React from "react";
import "../../../assets/CSS/PanditLeftNav.css";

import axios from "axios";

import { BASE_URLL } from "../../BaseURL"; // Update to your backend base URL
import SupportPage from "../../temp_dashboard/support/SupportPage";
import { Breadcrumb } from "react-bootstrap";
import LeftNav from "../LeftNav";

const UserSupport = () => {
  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <LeftNav />
      </aside>

      <main className="main-container-box">
        <div className="content-box">
             <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
                            <h1 className="fw500">
                              <Breadcrumb>
                                <Breadcrumb.Item href="/MainDashBoard">
                                  <span className="fw700h1">DashBoard</span>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>Support</Breadcrumb.Item>
                              </Breadcrumb>
                            </h1>
            
                            
                          </div>
          <SupportPage />
        </div>
      </main>
    </div>
  );
};

export default UserSupport;
