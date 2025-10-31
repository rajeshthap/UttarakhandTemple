import React from "react";
import "../../../assets/CSS/PanditLeftNav.css";
import ExtendYourDivine from "../../DonateToTemples/ExtendYourDivine";
import TempleLeftNav from "../TempleLeftNav";


const TempDonateDashBoard = () => {
  return (
    <>
      {/* Main Wrapper */}
      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <aside className="temp-sidebar">
          <TempleLeftNav />
        </aside>

        {/* Right-hand Main Container */}
        
        <main className="main-container-box">
               <ExtendYourDivine />
        </main>
     
      </div>
    </>
  );
};

export default TempDonateDashBoard;
