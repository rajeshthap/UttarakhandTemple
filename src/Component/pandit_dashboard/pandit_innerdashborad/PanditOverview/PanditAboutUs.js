import React from "react";
import "../../../../assets/CSS/PanditLeftNav.css";
import PanditLeftNav from "../../PanditLeftNav";
import AboutUs from "../../../Home/AboutUs";

const PanditAboutUs = () => {
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
               <AboutUs />
        </main>
     
      </div>
    </>
  );
};

export default PanditAboutUs;
