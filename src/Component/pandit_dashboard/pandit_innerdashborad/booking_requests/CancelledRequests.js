import React from "react";
import "../../../../assets/CSS/PanditLeftNav.css";
import { Breadcrumb } from "react-bootstrap";
import SearchFeature from "../../../temp_dashboard/temp_innerdashboard/SearchFeature";
import PanditLeftNav from "../../PanditLeftNav";
const CancelledRequests = () => {

  return (
    <>
      <div className="dashboard-wrapper">
        <aside className="sidebar">
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
                    <Breadcrumb.Item active>Booking Requests</Breadcrumb.Item>
                    <Breadcrumb.Item active>Cancelled Requests</Breadcrumb.Item>
                  </Breadcrumb>
                </h1>
                <div>
                  <SearchFeature />
                </div>
              </div>
          </div>
        </main>
      </div>
    </>
  );
};
export default CancelledRequests;
