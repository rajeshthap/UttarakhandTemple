import React, { useEffect, useState } from "react";
import "../../../../assets/CSS/AdminLeftNav.css";

import AdminLeftnav from "../../AdminLeftnav";
import { Row, Breadcrumb, Button } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';


const PendingRequest = () => {


  
 

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







          


        </div>
      </main>
    </div>
  );
};

export default PendingRequest;
