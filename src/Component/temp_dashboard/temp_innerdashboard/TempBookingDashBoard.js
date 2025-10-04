import React from "react";
import "../../../assets/CSS/PanditLeftNav.css";
import TempleLeftNav from "../TempleLeftNav";

import MandirBooking from "../../Mandir_booking/MandirBooking";


const TempBookingDashBoard = () => {
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
               <MandirBooking />
        </main>
     
      </div>
    </>
  );
};

export default TempBookingDashBoard;
