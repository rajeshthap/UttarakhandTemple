import React from "react";
import "../../../assets/CSS/LeftNav.css";
import LeftNav from "../LeftNav";
import AboutUs from "../../Home/AboutUs";


const AboutDashBoard = () => {
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
               <AboutUs />
        </main>
     
      </div>
    </>
  );
};

export default AboutDashBoard;
