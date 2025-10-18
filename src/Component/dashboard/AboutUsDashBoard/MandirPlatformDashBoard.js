import React from "react";
import "../../../assets/CSS/LeftNav.css";
import LeftNav from "../LeftNav";
import MandirMahadevaya from "../../Home/MandirMahadevaya";


const MandirPlatformDashBoard = () => {
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
               <MandirMahadevaya />
        </main>
     
      </div>
    </>
  );
};

export default MandirPlatformDashBoard;
