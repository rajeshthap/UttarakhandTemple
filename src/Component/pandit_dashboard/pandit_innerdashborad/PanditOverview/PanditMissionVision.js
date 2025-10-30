import React from "react";
import "../../../../assets/CSS/PanditLeftNav.css";
import PanditLeftNav from "../../PanditLeftNav";

import MissionVision from "../../../Home/MissionVision";

const PanditMissionVision = () => {
  return (
    <>
      {/* Main Wrapper */}
      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <aside className="pandit-sidebar">
          <PanditLeftNav />
        </aside>
        {/* Right-hand Main Container */}
        
        <main className="main-container-box">
               <MissionVision />
        </main>
     
      </div>
    </>
  );
};

export default PanditMissionVision;
