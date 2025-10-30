import React from "react";
import "../../../../assets/CSS/PanditLeftNav.css";
import SpecialAnnouncements from "../../../Home/SpecialAnnouncements";
import PanditLeftNav from "../../PanditLeftNav";

const Panditannouncement = () => {
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
               <SpecialAnnouncements />
        </main>
     
      </div>
    </>
  );
};

export default Panditannouncement;
