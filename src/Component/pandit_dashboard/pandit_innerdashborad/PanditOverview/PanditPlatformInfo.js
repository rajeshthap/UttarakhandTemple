import React from "react";
import "../../../../assets/CSS/PanditLeftNav.css";
import PanditLeftNav from "../../PanditLeftNav";
import PlatFormInfo from "../../../Home/PlatFormInfo";

const PanditPlatformInfo = () => {
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
               <PlatFormInfo />
        </main>
     
      </div>
    </>
  );
};

export default PanditPlatformInfo;
