import React from "react";
import "../../../../assets/CSS/PanditLeftNav.css";
import SpecialAnnouncements from "../../../Home/SpecialAnnouncements";
import PanditLeftNav from "../../PanditLeftNav";
import AboutUs from "../../../Home/AboutUs";
import MandirMahadevaya from "../../../Home/MandirMahadevaya";

const PanditMandirMahadevaya = () => {
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
               <MandirMahadevaya />
        </main>
     
      </div>
    </>
  );
};

export default PanditMandirMahadevaya;
