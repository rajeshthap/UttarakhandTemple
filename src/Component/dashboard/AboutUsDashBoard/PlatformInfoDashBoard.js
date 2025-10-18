import React from "react";
import "../../../assets/CSS/LeftNav.css";
import LeftNav from "../LeftNav";
import PlatFormInfo from "../../Home/PlatFormInfo";


const PlatformInfoDashBoard = () => {
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
               <PlatFormInfo />
        </main>
     
      </div>
    </>
  );
};

export default PlatformInfoDashBoard;
