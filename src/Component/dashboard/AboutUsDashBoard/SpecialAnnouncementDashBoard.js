import React from "react";
import "../../../assets/CSS/LeftNav.css";
import LeftNav from "../LeftNav";
import SpecialAnnouncements from "../../Home/SpecialAnnouncements";

const SpecialAnnouncementDashBoard = () => {
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
               <SpecialAnnouncements />
        </main>
     
      </div>
    </>
  );
};

export default SpecialAnnouncementDashBoard;
