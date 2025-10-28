import React from "react";
import "../../../assets/CSS/LeftNav.css";
import LeftNav from "../LeftNav";
import AboutUs from "../../Home/AboutUs";

const SevaDetails = () => {
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
              Seva Details
        </main>
     
      </div>
    </>
  );
};

export default SevaDetails;
