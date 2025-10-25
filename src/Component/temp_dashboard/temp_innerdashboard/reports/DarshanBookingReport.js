import React from "react";
import "../../../../assets/CSS/LeftNav.css";
import TempleLeftNav from "../../TempleLeftNav";
import SearchFeature from "../SearchFeature";

const DarshanBookingReport = () => {
  return (
    <>
      {/* Main Wrapper */}
      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <TempleLeftNav />
        </aside>

        {/* Right-hand Main Container */}

        <main className="main-container-box">
          <div className="content-box">
            <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3 ">
              <h1 className="fw500">
                <span className="fw700h1">Darshan </span> Bookings Report
              </h1>
              <SearchFeature />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default DarshanBookingReport;
