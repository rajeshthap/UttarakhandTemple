import React, { useState } from "react";
import "../../../assets/CSS/TempleLeftNav.css";
import TempleLeftNav from "../TempleLeftNav";

import SupportPage from "./SupportPage";
import { Breadcrumb } from "react-bootstrap";

const TempleSupport = () => {


  return (
    <div className="dashboard-wrapper">
      <aside className="pandit-sidebar">
        <TempleLeftNav />
      </aside>
 <main className="main-container-box">
        <div className="content-box">
             <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
                            <h1 className="fw500">
                              <Breadcrumb>
                                <Breadcrumb.Item href="/TempleDashBoard">
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

export default TempleSupport;
