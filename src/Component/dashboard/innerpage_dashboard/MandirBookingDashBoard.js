import React from "react";
import "../../../assets/CSS/LeftNav.css";
import LeftNav from "../LeftNav";

import MandirBooking from "../../Mandir_booking/MandirBooking";

const MandirBookingDashBoard = () => {
  return (
    <>
      {/* Main Wrapper */}
      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <LeftNav />
        </aside>
        {/* Right-hand Main Container */}
        
        <main className="main-container-box">
               <MandirBooking />
        </main>
     
      </div>
    </>
  );
};

export default MandirBookingDashBoard;
