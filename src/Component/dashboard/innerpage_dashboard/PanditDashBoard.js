import React from "react";
import "../../../assets/CSS/LeftNav.css";
import LeftNav from "../LeftNav";
import OnlineHirePandit from "../../Mandir_booking/OnlineHirePandit";

const PanditDashBoard = () => {
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
               <OnlineHirePandit />
        </main>
     
      </div>
    </>
  );
};

export default PanditDashBoard;
