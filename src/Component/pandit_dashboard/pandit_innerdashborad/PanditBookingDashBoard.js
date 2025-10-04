import React from "react";
import "../../../assets/CSS/PanditLeftNav.css";
import PanditLeftNav from "../PanditLeftNav";
import MandirBooking from "../../Mandir_booking/MandirBooking";

const PanditBookingDashBoard = () => {
  return (
    <>
      {/* Main Wrapper */}
      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <PanditLeftNav />
        </aside>
        {/* Right-hand Main Container */}
        
        <main className="main-container-box">
               <MandirBooking />
        </main>
     
      </div>
    </>
  );
};

export default PanditBookingDashBoard;
