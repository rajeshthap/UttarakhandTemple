import React from "react";
import "../../../../assets/CSS/LeftNav.css";
import TempleLeftNav from "../../TempleLeftNav";
import SearchFeature from "../SearchFeature";

const RejectedBooking = () => {
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
            <SearchFeature />
            <div>Rejected Bookings</div>
          </div>
        </main>
      </div>
    </>
  );
};

export default RejectedBooking;
