import React from "react";
import "../../../assets/CSS/LeftNav.css";
import LeftNav from "../LeftNav";
import MissionVision from "../../Home/MissionVision";

const MissionDashBoard = () => {
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
               <MissionVision />
        </main>
     
      </div>
    </>
  );
};

export default MissionDashBoard;
