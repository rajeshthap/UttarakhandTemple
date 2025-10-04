import React from "react";
import "../../../assets/CSS/PanditLeftNav.css";
import ExtendYourDivine from "../../DonateToTemples/ExtendYourDivine";
import PanditLeftNav from "../PanditLeftNav";

const PanditDonateDashBoard = () => {
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
               <ExtendYourDivine />
        </main>
     
      </div>
    </>
  );
};

export default PanditDonateDashBoard;
