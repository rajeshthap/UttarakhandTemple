import React from "react";
import "../../../assets/CSS/PanditLeftNav.css";
import OnlineHirePandit from "../../Mandir_booking/OnlineHirePandit";
import PanditLeftNav from "../PanditLeftNav";

const PanditBookDashBoard = () => {
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
               <OnlineHirePandit />
        </main>
     
      </div>
    </>
  );
};

export default PanditBookDashBoard;
