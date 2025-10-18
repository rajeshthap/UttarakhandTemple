import React from "react";
import "../../../assets/CSS/LeftNav.css";
import LeftNav from "../LeftNav";
import MissionVision from "../../Home/MissionVision";
import PanditBooking from "../../PanditBooking";
import TempleBookingInfo from "../../TempleBookingInfo";

const MandirBookingInfoDashBoard = () => {
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
               <TempleBookingInfo />
        </main>
     
      </div>
    </>
  );
};

export default MandirBookingInfoDashBoard;
